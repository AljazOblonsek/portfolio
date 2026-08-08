import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDirectory = path.join(rootDirectory, 'src', 'posts');
const publicDirectory = path.join(rootDirectory, 'public');
const generatedPostsDirectory = path.join(publicDirectory, 'posts');

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, '');
const siteName = 'Aljaz Oblonsek';
const siteTitle = 'Aljaz Oblonsek - Software Engineer';
const siteDescription =
  'Software engineer writing about TypeScript, React, Next.js, NestJS, testing and AWS. Personal site and blog of Aljaz Oblonsek.';
const authorName = 'Aljaz Oblonsek';
const authorEmail = 'aljaz.oblonsek@outlook.com';
const socials = {
  linkedin: 'https://www.linkedin.com/in/aljaz-oblonsek/',
  github: 'https://github.com/AljazOblonsek',
};

const sourceNames = {
  personal: 'Personal blog',
  medium: 'Medium',
  atlassian: 'Atlassian blog',
  company: 'Company blog',
};

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const readPosts = () =>
  fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const { data, content } = matter(
        fs.readFileSync(path.join(postsDirectory, fileName), 'utf8')
      );

      return {
        id,
        title: data.title,
        description: data.description,
        coverPath: data.coverPath,
        postedAt: data.date,
        source: data.source ?? 'personal',
        externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
        content: content.replaceAll('{{NEXT_PUBLIC_BASE_URL}}', siteUrl).trim(),
      };
    })
    .sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

const getPostUrl = (post) => post.externalUrl ?? `${siteUrl}/posts/${post.id}`;

const getPostMarkdownUrl = (post) =>
  post.externalUrl ? undefined : `${siteUrl}/posts/${post.id}.md`;

const buildRss = (posts) => {
  const items = posts
    .map((post) => {
      const url = getPostUrl(post);

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="${post.externalUrl ? 'false' : 'true'}">${escapeXml(url)}</guid>`,
        `      <pubDate>${new Date(post.postedAt).toUTCString()}</pubDate>`,
        `      <dc:creator>${escapeXml(authorName)}</dc:creator>`,
        `      <category>${escapeXml(sourceNames[post.source] ?? sourceNames.personal)}</category>`,
        `      <description>${escapeXml(post.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(`${siteName} - Blog`)}</title>`,
    `    <link>${escapeXml(`${siteUrl}/posts`)}</link>`,
    `    <description>${escapeXml(siteDescription)}</description>`,
    '    <language>en</language>',
    `    <managingEditor>${escapeXml(`${authorEmail} (${authorName})`)}</managingEditor>`,
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
};

const buildLlmsTxt = (posts) => {
  const internalPosts = posts.filter((post) => !post.externalUrl);
  const externalPosts = posts.filter((post) => post.externalUrl);

  const lines = [
    `# ${siteName}`,
    '',
    `> ${siteDescription}`,
    '',
    `${siteTitle}. This file indexes the content on ${siteUrl} in a form that is easy for language models to read. Every blog post hosted here is also available as plain markdown at \`/posts/<slug>.md\`.`,
    '',
    '## Pages',
    '',
    `- [Home](${siteUrl}/): Landing page with a short intro and the most recent posts.`,
    `- [About](${siteUrl}/about): Background, current role and the technologies I work with.`,
    `- [Blog](${siteUrl}/posts): Every post, newest first.`,
    '',
    '## Blog posts',
    '',
    ...internalPosts.map(
      (post) =>
        `- [${post.title}](${getPostMarkdownUrl(post)}): ${post.description} Published ${post.postedAt}. HTML version: ${getPostUrl(post)}`
    ),
  ];

  if (externalPosts.length > 0) {
    lines.push(
      '',
      '## Posts published elsewhere',
      '',
      ...externalPosts.map(
        (post) =>
          `- [${post.title}](${post.externalUrl}): ${post.description} Published ${post.postedAt} on ${sourceNames[post.source] ?? sourceNames.personal}.`
      )
    );
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [RSS feed](${siteUrl}/rss.xml): All posts, including the ones published elsewhere.`,
    `- [LinkedIn](${socials.linkedin})`,
    `- [GitHub](${socials.github})`,
    ''
  );

  return lines.join('\n');
};

const buildPostMarkdown = (post) =>
  [
    `# ${post.title}`,
    '',
    `- Author: ${authorName}`,
    `- Published: ${post.postedAt}`,
    `- Canonical URL: ${getPostUrl(post)}`,
    '',
    `${post.description}`,
    '',
    '---',
    '',
    post.content,
    '',
  ].join('\n');

const main = () => {
  const posts = readPosts();
  const internalPosts = posts.filter((post) => !post.externalUrl);

  fs.rmSync(generatedPostsDirectory, { recursive: true, force: true });
  fs.mkdirSync(generatedPostsDirectory, { recursive: true });

  for (const post of internalPosts) {
    fs.writeFileSync(
      path.join(generatedPostsDirectory, `${post.id}.md`),
      buildPostMarkdown(post),
      'utf8'
    );
  }

  fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), buildRss(posts), 'utf8');
  fs.writeFileSync(path.join(publicDirectory, 'llms.txt'), buildLlmsTxt(posts), 'utf8');

  console.log(
    `Generated rss.xml, llms.txt and ${internalPosts.length} markdown posts for ${siteUrl}.`
  );
};

main();

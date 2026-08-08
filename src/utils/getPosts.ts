import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { Post, PostWithHtmlContent } from '@/types/Post';
import { defaultPostSourceKey, PostSourceKey, postSources } from '@/constants/postSources';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { getReadingTimeInMinutes } from './getReadingTimeInMinutes';
import { siteUrl } from '@/constants/site';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

marked.use(gfmHeadingId({ prefix: 'section' }));

marked.use(
  markedHighlight({
    async: true,
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

const toPost = (id: string, matterResult: matter.GrayMatterFile<string>): Post => {
  const { title, description, coverPath, date, source, externalUrl, readTimeInMinutes } =
    matterResult.data;

  const sourceKey: PostSourceKey = source ?? defaultPostSourceKey;

  if (!Object.hasOwn(postSources, sourceKey)) {
    throw new Error(
      `Post "${id}" has unknown source "${source}". Valid sources: ${Object.keys(postSources).join(', ')}.`
    );
  }

  // External posts need read time defined since we cannot dynamically calculate it
  if (externalUrl && !readTimeInMinutes) {
    throw new Error(`External post "${id}" must define "readTimeInMinutes" in its frontmatter.`);
  }

  return {
    id,
    title,
    description,
    coverPath,
    readTimeInMinutes: readTimeInMinutes
      ? String(readTimeInMinutes)
      : getReadingTimeInMinutes(matterResult.content).toString(),
    postedAt: date,
    source: sourceKey,
    ...(externalUrl ? { externalUrl: String(externalUrl) } : {}),
  };
};

export const getPosts = (): Post[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return toPost(id, matterResult);
    });

  // Sort posts by date
  return allPosts.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));
};

export const getPostWithHtmlContent = async (id: string): Promise<PostWithHtmlContent> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const contentWithReplacedBaseUrl = matterResult.content.replaceAll(
    '{{NEXT_PUBLIC_BASE_URL}}',
    siteUrl
  );

  const blogPostWithHTML: PostWithHtmlContent = {
    ...toPost(id, matterResult),
    htmlContent: await marked(contentWithReplacedBaseUrl),
  };

  return blogPostWithHTML;
};

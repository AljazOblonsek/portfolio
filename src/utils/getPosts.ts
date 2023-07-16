import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { Post, PostWithHtmlContent } from '@/types/Post';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { getReadingTimeInMinutes } from './getReadingTimeInMinutes';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

marked.use(gfmHeadingId({ prefix: 'section' }));

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

export const getPosts = (): Post[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName !== '.gitkeep')
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const post: Post = {
        id,
        title: matterResult.data.title,
        description: matterResult.data.description,
        coverPath: matterResult.data.coverPath,
        readTimeInMinutes: getReadingTimeInMinutes(matterResult.content).toString(),
        postedAt: matterResult.data.date,
      };

      // Combine the data with the id
      return post;
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
    process.env.NEXT_PUBLIC_BASE_URL as string
  );

  const blogPostWithHTML: PostWithHtmlContent = {
    id,
    title: matterResult.data.title,
    description: matterResult.data.description,
    coverPath: matterResult.data.coverPath,
    readTimeInMinutes: getReadingTimeInMinutes(matterResult.content).toString(),
    postedAt: matterResult.data.date,
    htmlContent: marked(contentWithReplacedBaseUrl, { mangle: false, headerIds: false }),
  };

  return blogPostWithHTML;
};

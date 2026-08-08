import { PostSourceKey } from '@/constants/postSources';

export type Post = {
  id: string;
  title: string;
  description: string;
  coverPath: string;
  readTimeInMinutes: string;
  postedAt: string;
  source: PostSourceKey;
  externalUrl?: string;
};

export type PostWithHtmlContent = Post & {
  htmlContent: string;
};

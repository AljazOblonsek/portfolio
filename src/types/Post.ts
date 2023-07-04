export type Post = {
  id: string;
  title: string;
  description: string;
  coverPath: string;
  readTimeInMinutes: string;
  postedAt: string;
};

export type PostWithHtmlContent = Post & {
  htmlContent: string;
};

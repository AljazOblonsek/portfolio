import { getPosts } from '@/utils/getPosts';
import PostPreview from '../../components/PostPreview';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/constants/site';
import { getBlogSchema } from '@/utils/getStructuredData';
import { Metadata } from 'next/types';

const title = 'Blog';
const description =
  'Blog posts about the problems and interesting things I encounter in my software engineering journey - TypeScript, React, Next.js, NestJS, testing and AWS.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/posts',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.name} - Blog` }],
    },
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: '/posts',
    title: `${title} | ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
  },
};

const Posts = () => {
  const posts = getPosts();

  return (
    <div className="flex flex-col">
      <JsonLd data={getBlogSchema(posts)} />
      <h1 className="text-2xl font-semibold">Blog</h1>
      <p>
        Here you&apos;ll find blog posts about the problems and interesting things I encounter in my
        software engineering journey.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostPreview key={post.id} post={post} />)
        ) : (
          <span className="text-sm text-gray-500 italic">No posts yet 🤷‍♂️.</span>
        )}
      </div>
    </div>
  );
};

export default Posts;

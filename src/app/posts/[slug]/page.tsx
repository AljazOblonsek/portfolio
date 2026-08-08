import Comments from '@/components/Comments';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/constants/site';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { getPostWithHtmlContent, getPosts } from '@/utils/getPosts';
import { getPostSchema } from '@/utils/getStructuredData';
import { Metadata } from 'next/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getPosts();

  return posts
    .filter((post) => !post.externalUrl)
    .map((post) => ({
      slug: post.id,
    }));
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { slug } = await params;

  const posts = getPosts();
  const post = posts.find((post) => post.id === slug && !post.externalUrl);

  if (!post) {
    return {
      title: 'Blog post not found.',
      robots: { index: false, follow: true },
    };
  }

  const url = `/posts/${post.id}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    alternates: {
      canonical: url,
      // Plain markdown version of this post for llms and other machine readers
      types: {
        'text/markdown': [{ url: `${url}.md`, title: `${post.title} (markdown)` }],
        'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.name} - Blog` }],
      },
    },
    openGraph: {
      type: 'article',
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.postedAt,
      modifiedTime: post.postedAt,
      authors: [siteConfig.author.name],
      images: [{ url: post.coverPath, alt: `${post.title} Cover` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [{ url: post.coverPath, alt: `${post.title} Cover` }],
    },
  };
};

const Post = async ({ params }: PostProps) => {
  const { slug } = await params;

  const posts = getPosts();
  const post = posts.find((post) => post.id === slug && !post.externalUrl);

  if (!post) {
    return notFound();
  }

  const postWithHtmlContent = await getPostWithHtmlContent(post.id);

  return (
    <div>
      <JsonLd data={getPostSchema(post)} />
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">
          <time dateTime={postWithHtmlContent.postedAt}>
            {getFormattedDate(postWithHtmlContent.postedAt)}
          </time>{' '}
          &#x2022; {postWithHtmlContent.readTimeInMinutes} min read
        </div>
        <h1 className="text-3xl font-bold">{postWithHtmlContent.title}</h1>
      </div>
      <Image
        src={post.coverPath}
        alt={`${post.title} Cover`}
        width={1000}
        height={300}
        className="mt-3 mb-6 h-[300px] w-full rounded-md object-cover"
      />
      <article className="mb-6">
        <section
          className="prose"
          style={{ maxWidth: '100vw' }}
          dangerouslySetInnerHTML={{ __html: postWithHtmlContent.htmlContent }}
        />
      </article>
      <Comments post={post} />
    </div>
  );
};

export default Post;

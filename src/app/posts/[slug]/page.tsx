import Comments from '@/components/Comments';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { getPostWithHtmlContent, getPosts } from '@/utils/getPosts';
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

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export const generateMetadata = async ({ params }: PostProps): Promise<Metadata> => {
  const { slug } = await params;

  const posts = getPosts();
  const post = posts.find((post) => post.id === slug);

  if (!post) {
    return {
      metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
      title: 'Blog post not found.',
    };
  }

  return {
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${post.coverPath}`,
          width: 600,
          height: 600,
          alt: `${post.title} Cover`,
        },
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${post.coverPath}`,
          width: 1000,
          height: 300,
          alt: `${post.title} Cover`,
        },
      ],
    },
  };
};

const Post = async ({ params }: PostProps) => {
  const { slug } = await params;

  const posts = getPosts();
  const post = posts.find((post) => post.id === slug);

  if (!post) {
    return notFound();
  }

  const postWithHtmlContent = await getPostWithHtmlContent(post.id);

  return (
    <div>
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">
          {getFormattedDate(postWithHtmlContent.postedAt)} &#x2022;{' '}
          {postWithHtmlContent.readTimeInMinutes} min read
        </div>
        <span className="text-3xl font-bold">{postWithHtmlContent.title}</span>
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

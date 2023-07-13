import Comments from '@/components/Comments';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { getPostWithHtmlContent, getPosts } from '@/utils/getPosts';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PostProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export const generateMetadata = ({ params }: PostProps) => {
  const posts = getPosts();

  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    return {
      title: 'Blog post not found.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${post.coverPath}`,
          width: 1000,
          height: 300,
        },
      ],
    },
  };
};

const Post = async ({ params }: PostProps) => {
  const posts = getPosts();

  const post = posts.find((post) => post.id === params.slug);

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
        className="mb-6 mt-3 h-[300px] w-full rounded-md object-cover"
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

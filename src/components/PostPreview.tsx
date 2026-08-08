import PostBadge from '@/components/PostBadge';
import { postSources } from '@/constants/postSources';
import { Post } from '@/types/Post';
import { getFormattedDate } from '@/utils/getFormattedDate';
import Image from 'next/image';
import Link from 'next/link';

type PostPreviewProps = {
  post: Post;
};

const PostPreview = ({ post }: PostPreviewProps) => (
  <div className="flex flex-col overflow-hidden rounded-md border-2 border-violet-600 md:flex-row md:items-stretch">
    <div className="relative h-[180px] w-full md:h-auto md:w-[240px] md:shrink-0">
      <Image
        src={post.coverPath}
        alt={`${post.title} Cover`}
        width={1000}
        height={1000}
        className="h-full w-full object-cover md:absolute md:inset-0"
      />
      <PostBadge source={post.source} className="absolute top-2 left-2" />
    </div>
    <div className="flex min-w-0 flex-col justify-center px-2 py-4 md:px-3">
      <div className="text-lg leading-snug font-semibold">{post.title}</div>
      <div className="mt-1.5 leading-snug text-gray-600">{post.description}</div>
      <div className="mt-3 text-sm text-gray-500">
        {getFormattedDate(post.postedAt)} &#x2022; {post.readTimeInMinutes} min read
      </div>
      {post.externalUrl ? (
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-fit text-sm font-semibold text-violet-600 hover:underline"
        >
          Read on {postSources[post.source].name.toLowerCase()} &#x2197;
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link
          href={`/posts/${post.id}`}
          className="mt-1 w-fit text-sm font-semibold text-violet-600 hover:underline"
          prefetch={false}
        >
          Read more &#x2192;
        </Link>
      )}
    </div>
  </div>
);

export default PostPreview;

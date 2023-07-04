import { Post } from '@/types/Post';
import { getFormattedDate } from '@/utils/getFormattedDate';
import Image from 'next/image';
import Link from 'next/link';

type PostPreviewProps = {
  post: Post;
};

const PostPreview = ({ post }: PostPreviewProps) => (
  <div className="mt-2 flex flex-col items-center overflow-hidden rounded-md border-2 border-violet-600 md:flex-row">
    <Image
      src={`/portfolio/${post.coverPath}`}
      alt={`${post.title} Cover`}
      width={1000}
      height={1000}
      className="h-full w-full object-cover md:h-[150px] md:w-[150px]"
    />
    <div className="flex flex-col justify-center px-4 py-3 md:py-0">
      <div className="font-semibold">{post.title}</div>
      <div>{post.description}</div>
      <div className="text-sm text-gray-500">
        {getFormattedDate(post.postedAt)} &#x2022; {post.readTimeInMinutes} min read
      </div>
      <Link
        href={`/posts/${post.id}`}
        className="font-semibold text-violet-600 hover:underline"
        prefetch={false}
      >
        Read more &#x2192;
      </Link>
    </div>
  </div>
);

export default PostPreview;

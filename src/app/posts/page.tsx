import { getPosts } from '@/utils/getPosts';
import PostPreview from '../../components/PostPreview';

const Posts = () => {
  const posts = getPosts();

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold">Blog</span>
      <span>
        Here you&apos;ll find blog posts about the problems and interesting things I encounter in my
        software engineering journey.
      </span>
      <div className="mt-5">
        {posts.length > 0 ? (
          posts.map((post) => <PostPreview key={post.id} post={post} />)
        ) : (
          <span className="text-sm italic text-gray-500">No posts yet 🤷‍♂️.</span>
        )}
      </div>
    </div>
  );
};

export default Posts;

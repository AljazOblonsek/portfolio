import { getPosts } from '@/utils/getPosts';
import PostPreview from '../../components/PostPreview';

const Posts = () => {
  const posts = getPosts();

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold">Blog</span>
      <span>
        Unveiling the world of programming through my eyes. Join me on my journey as a full stack
        web developer. Welcome to my programming blog!
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

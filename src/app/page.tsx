import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import PostPreview from '../components/PostPreview';
import { getPosts } from '@/utils/getPosts';
import Image from 'next/image';

const Home = () => {
  const posts = getPosts();

  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <div className="flex flex-col items-center md:flex-row">
        <Image
          height={150}
          width={150}
          className="h-[150px] w-[150px] rounded-full border-2 border-violet-600"
          src="/profile-picture.jpg"
          alt="My photo"
        />
        <div className="mt-3 flex flex-col text-center md:ml-10 md:mt-0 md:text-left">
          <span className="text-2xl font-semibold">
            Hey, I&apos;m{' '}
            <Link href="/about" className="text-violet-600 hover:underline">
              Aljaz
            </Link>{' '}
            👋.
          </span>
          <span className="text-2xl font-semibold ">
            I&apos;m a <span className="text-violet-600">fullstack web developer</span>.
          </span>
          <div className="mt-2 flex justify-center md:justify-start">
            <a
              className="flex hover:text-[#0077b5]"
              href="https://www.linkedin.com/in/aljaz-oblonsek/"
              target="_blank"
            >
              <LinkedinIcon />
              <span className="ml-1 mt-[1.5px]">LinkedIn</span>
            </a>
            <a
              className="ml-3 flex hover:text-[#333]"
              href="https://github.com/AljazOblonsek"
              target="_blank"
            >
              <GithubIcon />
              <span className="ml-1 mt-[1.5px]">Github</span>
            </a>
          </div>
        </div>
      </div>
      {recentPosts.length > 0 && (
        <div className="mt-8">
          <div className="text-xl font-semibold">Recent posts</div>
          {recentPosts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;

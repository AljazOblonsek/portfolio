import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import PostPreview from '../components/PostPreview';
import { getPosts } from '@/utils/getPosts';
import Image from 'next/image';
import { Metadata } from 'next/types';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/constants/site';
import { getHomePageSchema } from '@/utils/getStructuredData';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: `${siteConfig.name} - Blog` }],
      'text/plain': [{ url: '/llms.txt', title: `${siteConfig.name} - llms.txt` }],
    },
  },
};

const Home = () => {
  const posts = getPosts();

  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <JsonLd data={getHomePageSchema()} />
      <div className="flex flex-col items-center md:flex-row">
        <Image
          height={150}
          width={150}
          className="h-[150px] w-[150px] rounded-full border-2 border-violet-600"
          src="/profile-picture.jpg"
          alt="My photo"
        />
        <div className="mt-3 flex flex-col text-center md:mt-0 md:ml-10 md:text-left">
          <h1 className="text-2xl font-semibold">
            Hey, I&apos;m{' '}
            <Link href="/about" className="text-violet-600 hover:underline" prefetch={false}>
              Aljaz
            </Link>{' '}
            👋.
          </h1>
          <p className="text-2xl font-semibold">
            I&apos;m a <span className="text-violet-600">software engineer</span>.
          </p>
          <p className="mt-2 text-gray-600">
            I build cloud apps at Move Work Forward and write about TypeScript, React, Node.js and
            AWS.
          </p>
          <div className="mt-2 flex justify-center md:justify-start">
            <a
              className="flex hover:text-[#0077b5]"
              href="https://www.linkedin.com/in/aljaz-oblonsek/"
              target="_blank"
            >
              <LinkedinIcon />
              <span className="mt-[1.5px] ml-1">LinkedIn</span>
            </a>
            <a
              className="ml-3 flex hover:text-[#333]"
              href="https://github.com/AljazOblonsek"
              target="_blank"
            >
              <GithubIcon />
              <span className="mt-[1.5px] ml-1">Github</span>
            </a>
          </div>
        </div>
      </div>
      {recentPosts.length > 0 && (
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Recent posts</h2>
          {recentPosts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;

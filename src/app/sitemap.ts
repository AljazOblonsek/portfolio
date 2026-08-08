import { siteUrl } from '@/constants/site';
import { getPosts } from '@/utils/getPosts';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => {
  // External posts have no page on this domain, so they are not listed here
  const internalPosts = getPosts().filter((post) => !post.externalUrl);

  const latestPostDate = internalPosts[0]?.postedAt;

  return [
    {
      url: `${siteUrl}/`,
      lastModified: latestPostDate ? new Date(latestPostDate) : new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: latestPostDate ? new Date(latestPostDate) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...internalPosts.map((post) => ({
      url: `${siteUrl}/posts/${post.id}`,
      lastModified: new Date(post.postedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
};

export default sitemap;

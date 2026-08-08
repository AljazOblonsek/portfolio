import { personId, siteConfig, siteUrl, socialProfileUrls, websiteId } from '@/constants/site';
import { postSources } from '@/constants/postSources';
import { Post } from '@/types/Post';

type JsonLdObject = Record<string, unknown>;

const absoluteUrl = (path: string): string =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const getPostUrl = (post: Post): string =>
  post.externalUrl ?? absoluteUrl(`/posts/${post.id}`);

export const getPersonSchema = (): JsonLdObject => ({
  '@type': 'Person',
  '@id': personId,
  name: siteConfig.name,
  url: siteUrl,
  image: absoluteUrl(siteConfig.imagePath),
  jobTitle: siteConfig.jobTitle,
  email: `mailto:${siteConfig.author.email}`,
  sameAs: socialProfileUrls,
  knowsAbout: [
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Vitest',
    'AWS',
    'Atlassian Forge',
    'Atlassian Connect',
    'Web development',
  ],
});

export const getWebSiteSchema = (): JsonLdObject => ({
  '@type': 'WebSite',
  '@id': websiteId,
  url: siteUrl,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: { '@id': personId },
});

export const getHomePageSchema = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@graph': [getPersonSchema(), getWebSiteSchema()],
});

export const getAboutPageSchema = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@graph': [
    getPersonSchema(),
    {
      '@type': 'ProfilePage',
      '@id': absoluteUrl('/about#profilepage'),
      url: absoluteUrl('/about'),
      name: `About ${siteConfig.name}`,
      isPartOf: { '@id': websiteId },
      inLanguage: siteConfig.language,
      mainEntity: { '@id': personId },
    },
  ],
});

const getBlogPostingSchema = (post: Post): JsonLdObject => {
  const url = getPostUrl(post);

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.coverPath),
    datePublished: post.postedAt,
    dateModified: post.postedAt,
    url,
    inLanguage: siteConfig.language,
    timeRequired: `PT${post.readTimeInMinutes}M`,
    author: { '@id': personId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: post.externalUrl
      ? { '@type': 'Organization', name: postSources[post.source].name }
      : { '@id': personId },
  };
};

export const getPostSchema = (post: Post): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@graph': [
    getPersonSchema(),
    getBlogPostingSchema(post),
    {
      '@type': 'BreadcrumbList',
      '@id': `${absoluteUrl(`/posts/${post.id}`)}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/posts') },
        { '@type': 'ListItem', position: 3, name: post.title },
      ],
    },
  ],
});

export const getBlogSchema = (posts: Post[]): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@graph': [
    getPersonSchema(),
    {
      '@type': 'Blog',
      '@id': absoluteUrl('/posts#blog'),
      url: absoluteUrl('/posts'),
      name: `${siteConfig.name} - Blog`,
      description:
        'Blog posts about the problems and interesting things I encounter in my software engineering journey.',
      inLanguage: siteConfig.language,
      isPartOf: { '@id': websiteId },
      author: { '@id': personId },
      blogPost: posts.map(getBlogPostingSchema),
    },
  ],
});

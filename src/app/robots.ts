import { siteUrl } from '@/constants/site';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const aiUserAgents = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'meta-externalagent',
  'cohere-ai',
];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
    {
      userAgent: aiUserAgents,
      allow: '/',
    },
  ],
  sitemap: `${siteUrl}/sitemap.xml`,
  host: siteUrl,
});

export default robots;

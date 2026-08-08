import { siteConfig } from '@/constants/site';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const manifest = (): MetadataRoute.Manifest => ({
  name: siteConfig.title,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#7c3aed',
  icons: [
    {
      src: '/favicon.ico',
      sizes: 'any',
      type: 'image/x-icon',
    },
  ],
});

export default manifest;

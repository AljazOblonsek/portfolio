export const siteUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const siteConfig = {
  url: siteUrl,
  name: 'Aljaz Oblonsek',
  title: 'Aljaz Oblonsek - Software Engineer',
  description:
    'Software engineer writing about TypeScript, React, Next.js, NestJS, testing and AWS. Personal site and blog of Aljaz Oblonsek.',
  jobTitle: 'Software Engineer',
  locale: 'en_US',
  language: 'en',
  imagePath: '/profile-picture.jpg',
  keywords: [
    'Aljaz Oblonsek',
    'software engineer',
    'TypeScript',
    'React',
    'Next.js',
    'NestJS',
    'AWS',
    'Atlassian Forge',
    'web development blog',
  ],
  author: {
    name: 'Aljaz Oblonsek',
    email: 'aljaz.oblonsek@outlook.com',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/in/aljaz-oblonsek/',
    github: 'https://github.com/AljazOblonsek',
  },
} as const;

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export const socialProfileUrls: string[] = [siteConfig.socials.linkedin, siteConfig.socials.github];

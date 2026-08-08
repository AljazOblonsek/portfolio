import { AtlassianIcon, GlobeIcon, MediumIcon, PenIcon } from '@/components/Icons';

type PostSource = {
  name: string;
  color: string;
  icon: () => React.JSX.Element;
};

export const postSources = {
  personal: { name: 'Personal blog', color: '#7c3aed', icon: PenIcon },
  medium: { name: 'Medium', color: '#000000', icon: MediumIcon },
  atlassian: { name: 'Atlassian', color: '#0052cc', icon: AtlassianIcon },
  company: { name: 'Company blog', color: '#4b5563', icon: GlobeIcon },
} satisfies Record<string, PostSource>;

export type PostSourceKey = keyof typeof postSources;

export const defaultPostSourceKey: PostSourceKey = 'personal';

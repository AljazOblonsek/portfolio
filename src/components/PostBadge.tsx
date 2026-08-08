import { PostSourceKey, postSources } from '@/constants/postSources';

type PostBadgeProps = {
  source: PostSourceKey;
  className?: string;
};

const PostBadge = ({ source, className }: PostBadgeProps) => {
  const { name, color, icon: Icon } = postSources[source];

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full border bg-white px-2 py-0.5 text-xs font-semibold shadow-sm ${className ?? ''}`}
      style={{ color, borderColor: color }}
    >
      <Icon />
      {name}
    </span>
  );
};

export default PostBadge;

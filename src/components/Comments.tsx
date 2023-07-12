'use client';

import { DiscussionEmbed } from 'disqus-react';
import { Post } from '@/types/Post';

const Comments = ({ post }: { post: Post }) => {
  const disqusShortname = 'portfolio-oblonsek';
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.id}`,
    identifier: post.id,
    title: post.title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default Comments;

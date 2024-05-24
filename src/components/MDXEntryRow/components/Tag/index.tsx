'use client';

import { MouseEvent } from 'react';
import styles from './tag.module.css';
import { useRouter } from 'next/navigation';

interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    router.push(`/blog/tag/${encodeURIComponent(tag)}`);
  };

  return (
    <button onClick={handleClick} className={styles.tag}>
      {tag}
    </button>
  );
};

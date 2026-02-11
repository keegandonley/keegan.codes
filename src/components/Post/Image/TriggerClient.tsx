'use client';

import imageStyles from './image.module.css';
import va from '@vercel/analytics';

export const TriggerClient = (props: {
  popoverId: string;
  children: React.ReactNode;
  imgUrl: string;
}) => {
  const { popoverId, children, imgUrl } = props;

  const onClick = () => {
    va.track('image:popover:open', { imgUrl });
  };

  return (
    <button
      popoverTarget={popoverId}
      className={imageStyles.trigger}
      tabIndex={-1}
      aria-label="Show full-size image"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

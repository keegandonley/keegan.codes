'use client';

import Image from 'next/image';
import imageStyles from './image.module.css';
import { merge } from '@keegancodes/foundations';
import { BUCKET_URL } from '@/util/const';
import va from '@vercel/analytics';

export const PopoverClient = (props: {
  popoverId: string;
  imgUrl: string;
  alt: string;
  className?: string;
}) => {
  const { popoverId, imgUrl, alt, className } = props;

  const closePopover = () => {
    const popover = document.getElementById(popoverId);
    if (popover) {
      popover.hidePopover();
      va.track('image:popover:close', { imgUrl });
    }
  };

  return (
    <span
      popover="auto"
      id={popoverId}
      className={imageStyles.popover}
      onClick={closePopover}
    >
      <span className={imageStyles.imageExpanded}>
        <Image
          src={`${BUCKET_URL}/${imgUrl}`}
          alt={alt}
          fill
          className={merge(imageStyles.img, className)}
          placeholder="empty"
        />
      </span>
    </span>
  );
};

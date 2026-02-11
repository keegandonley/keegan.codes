'use client';

import Image from 'next/image';
import imageStyles from './image.module.css';
import { merge } from '@keegancodes/foundations';
import { BUCKET_URL } from '@/util/const';

export const PopoverClient = (props: {
  popoverId: string;
  imgUrl: string;
  alt: string;
  className?: string;
  shouldHideShadow?: boolean;
  dataUrl?: string;
}) => {
  const { popoverId, imgUrl, alt, className, shouldHideShadow, dataUrl } =
    props;

  const closePopover = () => {
    const popover = document.getElementById(popoverId);
    if (popover) {
      popover.hidePopover();
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
          style={{
            boxShadow: shouldHideShadow
              ? 'none'
              : '0 0 0.5rem var(--shadow-color)',
          }}
        />
      </span>
    </span>
  );
};

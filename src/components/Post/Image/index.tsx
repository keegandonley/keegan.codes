import { injectVariables, merge } from '@/util/classNames';
import imageStyles from './image.module.css';
import Image from 'next/image';
import { getImageMetadata, parseSource } from '@/util/image';
import { useId } from 'react';
import { PopoverClient } from './PopoverClient';
import { BUCKET_URL } from '@/util/const';

const getAspectRatio = (metadata?: ImageMetadata) => {
  if (!metadata) return 1;

  return metadata.width / metadata.height;
};

// For now this is `any` because I can't figure out how to
// make MDX happy. TODO: fix
export const Img = ({ src, className, alt }: any) => {
  const [imgUrl, flags] = parseSource(src);
  const metadata = getImageMetadata(imgUrl);
  const cssAspectRatio = getAspectRatio(metadata);

  const shouldHideShadow = flags.includes('hideShadow');
  const isTableMode = flags.includes('tableMode');
  const isLimited = flags.includes('limit');

  const popoverId = useId();

  if (metadata) {
    return (
      <span
        className={merge(
          imageStyles.imageParent,
          isTableMode && imageStyles.tableMode,
          isLimited && imageStyles.limited,
        )}
        data-ratio={cssAspectRatio}
        data-flags={flags.join(',')}
        data-width={metadata.width}
        data-height={metadata.height}
        data-file={imgUrl}
        style={injectVariables([['aspect-ratio', String(cssAspectRatio)]])}
      >
        <button
          popoverTarget={popoverId}
          className={imageStyles.trigger}
          tabIndex={-1}
        >
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
            placeholder="blur"
            blurDataURL={metadata.dataUrl}
            // quality={80}
            sizes={`(max-width: 1400px) 100vw, 900px`}
            aria-label={`Show full-size image`}
          />
        </button>
        <PopoverClient
          popoverId={popoverId}
          imgUrl={imgUrl}
          alt={alt}
          className={className}
          shouldHideShadow={shouldHideShadow}
          dataUrl={metadata.dataUrl}
        />
      </span>
    );
  }

  return null;
};

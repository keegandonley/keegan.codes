import { injectVariables, merge } from '@/util/classNames';
import imageStyles from './image.module.css';
import Image from 'next/image';
import { getImageMetadata, parseSource } from '@/util/image';
import { useId } from 'react';
import { PopoverClient } from './PopoverClient';
import { BUCKET_URL } from '@/util/const';
import { TriggerClient } from './TriggerClient';

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
  const shouldHidePopover = flags.includes('hidePopover');
  const isLimited = flags.includes('limit');

  const shouldShowPopover = !shouldHidePopover && !isLimited && !isTableMode;

  const popoverId = useId();

  if (metadata) {
    const imgElement = (
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
      />
    );

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
        {shouldShowPopover ? (
          <TriggerClient popoverId={src} imgUrl={imgUrl}>
            {imgElement}
          </TriggerClient>
        ) : (
          imgElement
        )}
        {shouldShowPopover ? (
          <PopoverClient
            popoverId={src}
            imgUrl={imgUrl}
            alt={alt}
            className={className}
          />
        ) : null}
      </span>
    );
  }

  return null;
};

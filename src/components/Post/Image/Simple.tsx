import simpleStyles from './simple.module.css';
import { merge } from '@/util/classNames';

export const SimpleImg = ({ src, alt, height, width }: any) => {
  return (
    <div className={simpleStyles.parent}>
      {/* We don't want to try to optimize the og image, so just use a normal img tag */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={merge(simpleStyles.img)}
        height={height}
        width={width}
      />
    </div>
  );
};

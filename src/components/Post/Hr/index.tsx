import { Divider } from "@/components/Divider";
<<<<<<< HEAD
import { CSSProperties, ReactElement } from "react";
=======
>>>>>>> main

interface HrProps {
  theme?: string;
  className?: string;
  style?: Record<`--${string}`, string>;
  mdStyle?: CSSProperties;
}

export const Hr = ({ theme, className, style, mdStyle }: HrProps) => {
  return (
    <Divider
      post
      theme={theme}
      className={className}
      style={style}
      mdStyle={mdStyle}
    />
  );
};

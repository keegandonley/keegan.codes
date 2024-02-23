import { Divider } from "@/components/Divider";
import { ReactElement } from "react";

interface HrProps {
  theme?: string;
  className?: string;
  style?: Record<`--${string}`, string>;
}

export const Hr = ({ theme, className, style }: HrProps) => {
  return <Divider post theme={theme} className={className} style={style} />;
};

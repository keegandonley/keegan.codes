import { ReactNode } from "react";

export interface ElementBaseProps {
  children?: ReactNode | ReactNode[] | string | number;
  className?: string;
}

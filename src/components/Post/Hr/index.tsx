import { Divider } from "@/components/Divider";
import { ReactElement } from "react";

interface HrProps {
  theme?: string;
}

export const Hr = ({ theme }: HrProps) => {
  return <Divider post theme={theme} />;
};

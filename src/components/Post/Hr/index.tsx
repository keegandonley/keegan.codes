import { Divider } from "@/components/Divider";

interface HrProps {
  theme?: string;
}

export const Hr = ({ theme }: HrProps) => {
  return <Divider post theme={theme} />;
};

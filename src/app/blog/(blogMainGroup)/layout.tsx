import { Delay } from "@/components/Delay";
import { AnimatedGraph } from "@/components/AnimatedGraph";

export default function BlogLayout({ children }: any) {
  return (
    <>
      {children}
      <Delay>
        <AnimatedGraph />
      </Delay>
    </>
  );
}

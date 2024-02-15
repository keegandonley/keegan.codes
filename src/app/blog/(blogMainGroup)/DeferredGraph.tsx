import { AnimatedGraph } from "@/components/AnimatedGraph";
import { Delay } from "@/components/Delay";

export const DeferredGraph = () => {
  return (
    <Delay>
      <AnimatedGraph />
    </Delay>
  );
};

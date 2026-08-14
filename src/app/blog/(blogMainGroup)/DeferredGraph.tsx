import { AnimatedGraph } from '@/components/AnimatedGraph';
import { Delay } from '@/components/Delay';
import { Suspense } from 'react';

export const DeferredGraph = () => {
  return (
    <Delay>
      <Suspense fallback={null}>
        <AnimatedGraph />
      </Suspense>
    </Delay>
  );
};

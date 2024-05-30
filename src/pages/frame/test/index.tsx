import Image from 'next/image';
import Bender from '../../../images/bender.jpg';
import '@/tw.css';
import { useEffect, useRef } from 'react';

export default function FrameTestPage() {
  useEffect(() => {
    console.log('sending init');
    window.parent.postMessage('keegan_frame_test_init', '*');
  }, []);

  const interval = useRef<any>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      console.log('sending tick');
      window.parent.postMessage(
        {
          type: 'keegan_frame_test_tick',
          payload: {
            time: Date.now(),
            width: window.innerWidth,
            height: window.innerHeight,
          },
        },
        '*',
      );
    }, 2000);

    return () => clearInterval(interval.current);
  });

  return (
    <div className="flex w-full flex-col items-center pt-12">
      <h1 className="text-xl">Doing frame stuff</h1>
      <Image width={300} src={Bender} alt="Bender" />
    </div>
  );
}

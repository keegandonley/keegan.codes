import Image from 'next/image';
import Bender from '../../../images/bender.jpg';
import '@/tw.css';
import { useCallback, useEffect, useRef } from 'react';

export default function FrameTestPage() {
  useEffect(() => {
    console.log('sending init');
    window.parent.postMessage(
      {
        type: 'keegan_frame_test_init',
        payload: {
          time: Date.now(),
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      '*',
    );
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

  const handleMessage = useCallback((ev: any) => {
    console.log('ev', ev);
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="flex w-full flex-col items-center pt-12">
      <h1 className="text-xl">Doing frame stuff</h1>
      <Image width={300} src={Bender} alt="Bender" />
    </div>
  );
}

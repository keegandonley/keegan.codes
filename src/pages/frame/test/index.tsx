import Image from 'next/image';
import Bender from '../../../images/bender.jpg';
import '@/tw.css';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function FrameTestPage() {
  const [acks, setAcks] = useState(0);
  const [ticks, setTicks] = useState(0);

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
      setTicks((t) => t + 1);
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
    if (ev?.data?.message === 'ack') {
      setAcks((a) => a + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="flex w-full flex-col items-center pt-12">
      <h1 className="text-xl">Doing frame stuff</h1>
      <Image width={300} src={Bender} alt="Bender" />
      {`ticks: ${ticks} · acks: ${acks}`}
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { ClientBackButton } from '../ClientBackButton';
import styles from './modal.module.css';
import { merge } from '@/util/classNames';
import { useRouter } from 'next/navigation';

const stopEvent = (e: any) => {
  e.stopPropagation();
};

interface ModalProps {
  children: any;
}

export const Modal = ({ children }: ModalProps) => {
  const [fadedIn, setFadedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('lockScroll');
    setFadedIn(true);
  }, []);

  const handleBack = () => {
    document.body.classList.remove('lockScroll');
    setFadedIn(false);
    setTimeout(router.back, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={merge(styles.wrapper, fadedIn ? styles.fadeIn : '')}
      onClick={handleBack}
    >
      <div
        className={merge(styles.inner, fadedIn ? styles.fadeIn : '')}
        onClick={stopEvent}
      >
        <ClientBackButton className={styles.backButton} onClick={handleBack} />
        {children}
      </div>
    </div>
  );
};

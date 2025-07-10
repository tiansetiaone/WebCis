"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(
  () => import('lottie-react'), 
  { 
    ssr: false,
    loading: () => (
      <div className="w-[150px] h-[150px] bg-gray-100 rounded-lg animate-pulse" />
    )
  }
);

export default function LoadingScreen({ onComplete }) {
  const [show, setShow] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 500);

    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
      <Lottie 
        animationData={require('/public/animations/loading2.json')}
        loop={true}
        style={{ width: 330, height: 330 }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true
        }}
      />
      
      <div className="flex space-x-2 mt-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i === activeDot ? 'bg-blue-500 scale-110' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
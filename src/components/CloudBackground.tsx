import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  animationClass: string;
  delay: string;
  duration: string;
  opacity: number;
  blur: string;
}

export default function CloudBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Curated list of large, elegant, blurry clouds designed for SaaS/Apple-style background depth
  const clouds: Cloud[] = [
    {
      id: 1,
      width: 'w-[500px] md:w-[800px]',
      height: 'h-[250px] md:h-[400px]',
      top: '-5%',
      left: '-10%',
      animationClass: 'animate-cloud-drift-slow',
      delay: '0s',
      duration: '45s',
      opacity: 0.12, // slightly higher on corners
      blur: 'blur-[80px] md:blur-[120px]',
    },
    {
      id: 2,
      width: 'w-[450px] md:w-[700px]',
      height: 'h-[200px] md:h-[350px]',
      top: '15%',
      left: '75%',
      animationClass: 'animate-cloud-drift-medium',
      delay: '-10s',
      duration: '55s',
      opacity: 0.08,
      blur: 'blur-[70px] md:blur-[100px]',
    },
    {
      id: 3,
      width: 'w-[600px] md:w-[900px]',
      height: 'h-[300px] md:h-[450px]',
      top: '55%',
      left: '-15%',
      animationClass: 'animate-cloud-drift-reverse',
      delay: '-5s',
      duration: '70s',
      opacity: 0.06,
      blur: 'blur-[90px] md:blur-[140px]',
    },
    {
      id: 4,
      width: 'w-[500px] md:w-[750px]',
      height: 'h-[250px] md:h-[380px]',
      top: '40%',
      left: '80%',
      animationClass: 'animate-cloud-drift-slow',
      delay: '-20s',
      duration: '60s',
      opacity: 0.07,
      blur: 'blur-[80px] md:blur-[110px]',
    },
    {
      id: 5,
      width: 'w-[400px] md:w-[600px]',
      height: 'h-[200px] md:h-[300px]',
      top: '-10%',
      left: '40%',
      animationClass: 'animate-cloud-drift-medium',
      delay: '-15s',
      duration: '50s',
      opacity: 0.09,
      blur: 'blur-[60px] md:blur-[90px]',
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Background elegant gradient match to brand colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-[#FCFAF6] to-[#FFFFFF] dark:from-[#081829] dark:via-[#0c223a] dark:to-[#040e1a] opacity-90 transition-colors duration-500 -z-20" />

      {/* Subtle Blue/Cyan Glow backdrop matching Navy primary (#0B2D4D) */}
      <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] rounded-full bg-gradient-radial from-[#0B2D4D]/5 to-transparent blur-[160px] dark:from-[#0B2D4D]/10 -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[50vw] h-[50vh] rounded-full bg-gradient-radial from-[#FF6D01]/2 to-transparent blur-[180px] -z-10" />

      {/* Cloud Shapes */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`absolute rounded-full transition-transform ${cloud.animationClass}`}
          style={{
            width: '100%',
            maxWidth: '100%',
            top: cloud.top,
            left: cloud.left,
            animationDelay: cloud.delay,
            animationDuration: cloud.duration,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Main cloud body */}
          <div
            className={`absolute inset-0 rounded-[50%] bg-white dark:bg-sky-950/20 shadow-[0_25px_100px_rgba(11,45,77,0.06)] dark:shadow-[0_25px_100px_rgba(0,0,0,0.3)] ${cloud.width} ${cloud.height} ${cloud.blur}`}
            style={{
              opacity: cloud.opacity,
            }}
          />
          {/* Sub-blob for layered modern depth */}
          <div
            className={`absolute top-1/4 left-1/4 rounded-[50%] bg-[#EDF4FF] dark:bg-sky-900/15 shadow-[inset_0_4px_24px_rgba(255,255,255,0.4)] ${cloud.width} ${cloud.height} ${cloud.blur}`}
            style={{
              opacity: cloud.opacity * 0.8,
              transform: 'scale(0.85) translate(10%, -5%)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

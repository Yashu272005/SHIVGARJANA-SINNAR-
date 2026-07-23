import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  icon?: React.ReactNode;
}

export default function Counter({ end, duration = 2000, label, icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(end);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform"
    >
      {icon && <div className="flex justify-center mb-2 text-orange-300">{icon}</div>}
      <div className="text-4xl md:text-5xl font-bold text-white">{count}+</div>
      <div className="text-sm md:text-base text-orange-100 mt-1">{label}</div>
    </div>
  );
}

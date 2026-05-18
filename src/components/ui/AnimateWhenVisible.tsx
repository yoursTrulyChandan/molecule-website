"use client";

import { useEffect, useRef } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale";

interface Props {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  threshold?: number;
}

export default function AnimateWhenVisible({
  children,
  animation = "fade-up",
  className = "",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal reveal-${animation} ${className}`}>
      {children}
    </div>
  );
}

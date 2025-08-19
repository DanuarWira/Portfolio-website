"use client";

import { useInView } from "react-intersection-observer";

export default function ScrollFadeIn({ children, delay = 0, direction = "up" }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const directionClasses = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
  };

  const initialPosition = directionClasses[direction] || "translate-y-10";

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${initialPosition}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { useState, ReactNode } from "react";

type AnimationType = "fadeIn" | "scaleUp" | "slideUp" | "slideLeft" | "slideRight";

const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
  },
};

const animationTypes = Object.keys(animations) as AnimationType[];

function getRandomAnimation(): AnimationType {
  return animationTypes[Math.floor(Math.random() * animationTypes.length)];
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Force a specific animation instead of randomizing */
  animation?: AnimationType;
  /** How much of the section must be visible before animating (0-1) */
  amount?: number;
  /** Only animate once, or every time it scrolls into view */
  once?: boolean;
}

export default function AnimationSection({
  children,
  className,
  animation,
  amount = 0.2,
  once = true,
}: AnimatedSectionProps) {
  // Picked once on mount so it doesn't re-randomize on re-render
  const [chosen] = useState<AnimationType>(animation ?? getRandomAnimation());

  return (
    <motion.section
      className={`${className} w-full `}
      variants={animations[chosen]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.section>
  );
}
"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
  stagger?: number;
  delay?: number;
}

/**
 * Reusable animated section component
 * Wraps content and animates children on scroll
 * 
 * Usage:
 * <AnimatedSection animationType="fade-up" stagger={0.1}>
 *   <div data-animate>Card 1</div>
 *   <div data-animate>Card 2</div>
 *   <div data-animate>Card 3</div>
 * </AnimatedSection>
 */
const AnimatedSection = ({ 
  children, 
  className = "",
  animationType = "fade-up",
  stagger = 0.1,
  delay = 0,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current!.querySelectorAll("[data-animate]");
      
      if (elements.length === 0) {
        // If no data-animate elements, animate the section itself
        const animation = getAnimationConfig(animationType);
        
        gsap.from(sectionRef.current, {
          ...animation,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        // Animate children with stagger
        const animation = getAnimationConfig(animationType);
        
        gsap.from(elements, {
          ...animation,
          duration: 0.8,
          ease: "power2.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animationType, stagger, delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

// Helper function to get animation configuration
function getAnimationConfig(type: string) {
  switch (type) {
    case "fade-up":
      return { opacity: 0, y: 60 };
    case "fade-in":
      return { opacity: 0 };
    case "slide-left":
      return { opacity: 0, x: 100 };
    case "slide-right":
      return { opacity: 0, x: -100 };
    case "scale":
      return { opacity: 0, scale: 0.8 };
    default:
      return { opacity: 0, y: 60 };
  }
}

export default AnimatedSection;

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic fade-up section:
 * <AnimatedSection>
 *   <div data-animate>Content fades up</div>
 * </AnimatedSection>
 * 
 * 2. Cards with stagger:
 * <AnimatedSection animationType="fade-up" stagger={0.15}>
 *   <Card data-animate>Card 1</Card>
 *   <Card data-animate>Card 2</Card>
 *   <Card data-animate>Card 3</Card>
 * </AnimatedSection>
 * 
 * 3. Slide from left:
 * <AnimatedSection animationType="slide-left">
 *   <div data-animate>Slides in from left</div>
 * </AnimatedSection>
 * 
 * 4. Scale animation with delay:
 * <AnimatedSection animationType="scale" delay={0.3}>
 *   <div data-animate>Scales up after 0.3s</div>
 * </AnimatedSection>
 */
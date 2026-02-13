// src/hooks/useGSAPAnimations.ts
import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins (do this once in a layout or _app file)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FINTECH ANIMATION PRESETS
 * Consistent timing and easing for trustworthy feel
 */
export const FINTECH_PRESETS = {
  // Durations (in seconds)
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    verySlow: 1.2,
  },
  
  // Easings - professional and smooth
  ease: {
    smooth: "power2.out",        // General use
    smoothIn: "power2.in",       // Exit animations
    smoothInOut: "power2.inOut", // Balanced motion
    elastic: "elastic.out(1, 0.5)", // Subtle playfulness
    back: "back.out(1.4)",       // Slight overshoot
  },
  
  // Stagger timing (in seconds)
  stagger: {
    tight: 0.05,
    normal: 0.1,
    relaxed: 0.15,
    spaced: 0.2,
  },
} as const;

/**
 * Hook: Fade + Slide Up animation on scroll
 * Perfect for content blocks, cards, feature sections
 */
export const useFadeUpScroll = (
  triggerRef: RefObject<HTMLElement>,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean;
    stagger?: number;
    y?: number;
  } = {}
) => {
  useEffect(() => {
    if (!triggerRef.current) return;

    const elements = triggerRef.current.querySelectorAll("[data-fade-up]");
    
    const ctx = gsap.context(() => {
      gsap.from(elements, {
        opacity: 0,
        y: options.y || 60,
        duration: FINTECH_PRESETS.duration.normal,
        ease: FINTECH_PRESETS.ease.smooth,
        stagger: options.stagger || FINTECH_PRESETS.stagger.normal,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [triggerRef, options]);
};

/**
 * Hook: Staggered text reveal (word by word or line by line)
 * Perfect for headlines and hero text
 */
export const useTextReveal = (
  textRef: RefObject<HTMLElement>,
  options: {
    splitBy?: "words" | "chars" | "lines";
    stagger?: number;
    delay?: number;
  } = {}
) => {
  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into spans (you can use SplitText plugin or manual approach)
      const words = textRef.current!.innerText.split(" ");
      textRef.current!.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
        .join(" ");

      const spans = textRef.current!.querySelectorAll("span > span");

      gsap.from(spans, {
        opacity: 0,
        y: 40,
        rotateX: -90,
        duration: FINTECH_PRESETS.duration.normal,
        ease: FINTECH_PRESETS.ease.back,
        stagger: options.stagger || FINTECH_PRESETS.stagger.tight,
        delay: options.delay || 0,
      });
    }, textRef);

    return () => ctx.revert();
  }, [textRef, options]);
};

/**
 * Hook: Parallax effect for layered elements
 * Creates depth perception
 */
export const useParallax = (
  containerRef: RefObject<HTMLElement>,
  layers: { selector: string; speed: number }[]
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      layers.forEach(({ selector, speed }) => {
        const elements = containerRef.current!.querySelectorAll(selector);
        
        gsap.to(elements, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            invalidateOnRefresh: true,
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, layers]);
};

/**
 * Hook: Magnetic hover effect for buttons
 * Button follows cursor within bounds
 */
export const useMagneticButton = (buttonRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const strength = 0.3; // Magnetic pull strength

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: FINTECH_PRESETS.duration.fast,
        ease: FINTECH_PRESETS.ease.smooth,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: FINTECH_PRESETS.duration.normal,
        ease: FINTECH_PRESETS.ease.elastic,
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [buttonRef]);
};

/**
 * Hook: Float animation (continuous subtle motion)
 * Perfect for hero images and decorative elements
 */
export const useFloatAnimation = (
  elementRef: RefObject<HTMLElement>,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
  } = {}
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: options.y || -20,
        duration: options.duration || 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: options.delay || 0,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [elementRef, options]);
};

/**
 * Hook: Page transition animation
 * Use in layout or route components
 */
export const usePageTransition = (containerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: FINTECH_PRESETS.duration.normal,
        ease: FINTECH_PRESETS.ease.smooth,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};

/**
 * Utility: Create scroll progress indicator
 */
export const createScrollProgress = (
  containerRef: RefObject<HTMLElement>,
  progressBarRef: RefObject<HTMLElement>
) => {
  if (!containerRef.current || !progressBarRef.current) return;

  ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.to(progressBarRef.current, {
        scaleX: self.progress,
        duration: 0.1,
        ease: "none",
      });
    },
  });
};
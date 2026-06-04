import type { Transition, Variants } from 'framer-motion'

/** Scroll trigger — enter at ~15% visibility, once */
export const defaultViewport = { once: true, amount: 0.15 as const }

export const viewportEarly = { once: true, amount: 0.12 as const }

/** Premium easing */
export const premiumEase = [0.42, 0, 0.58, 1] as const
export const smoothEase = [0.22, 1, 0.36, 1] as const

export const springGentle = { type: 'spring' as const, stiffness: 120, damping: 20, mass: 0.8 }
export const springSnappy = { type: 'spring' as const, stiffness: 400, damping: 30 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: smoothEase },
  },
}

export const fadeUpLight: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: smoothEase },
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: smoothEase },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: premiumEase } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: smoothEase },
  },
}

export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: smoothEase },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
}

export const heroLoadContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

export const heroLoadItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: smoothEase },
  },
}

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase, delay: 0.05 },
  },
}

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.02, transition: springSnappy },
}

export const floatY = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: premiumEase,
}

export const fastTransition: Transition = {
  duration: 0.35,
  ease: premiumEase,
}

export const navTransition: Transition = {
  duration: 0.45,
  ease: smoothEase,
}

/** Slide from left/right — kept for feature-row GSAP-free fallbacks */
export const slideFromLeft = fadeLeft
export const slideFromRight = fadeRight

import anime from 'animejs';

const TIMELINE_EASING = 'easeOutCubic';
const BARS_EASING = 'easeInOutCubic';
export const ANIMATION_IDS = {
  BAR_ANIMATED_RECTANGLE: 'BAR_RECT',
  BAR_Y_VALUE_LABEL: 'Y_VALUE',
  BAR_X_VALUE_LABEL: 'X_VALUE',
};

const getAnimationTarget = (id: string) => `[data-animation-id="${id}"]`;

export function createBarsInAnimationTimeline() {
  const animationTimeline = anime.timeline({
    autoplay: false,
    easing: TIMELINE_EASING,
  });

  // X value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_X_VALUE_LABEL),
    duration: 200,
    opacity: [0, 1],
    scaleX: [0.875, 1],
    scaleY: [0.875, 1],
    translateY: [2, 0],
  });

  // Chart bars animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_ANIMATED_RECTANGLE),
    duration: 800,
    translateY: ['100%', 0],
    delay: (el: any, i: number) => i * 30,
    easing: BARS_EASING,
  });

  // Y value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_Y_VALUE_LABEL),
    duration: 300,
    opacity: [0, 1],
    scaleX: [0.875, 1],
    scaleY: [0.875, 1],
    translateY: [2, 0],
  });

  return animationTimeline;
}

export function createBarsOutAnimationTimeline() {
  const animationTimeline = anime.timeline({
    autoplay: false,
    easing: TIMELINE_EASING,
  });

  // Y value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_Y_VALUE_LABEL),
    duration: 200,
    opacity: [1, 0],
    scaleX: [1, 0.875],
    scaleY: [1, 0.875],
    translateY: [0, 2],
  });

  // Chart bars animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_ANIMATED_RECTANGLE),
    duration: 600,
    translateY: [0, '100%'],
    easing: BARS_EASING,
  });

  // X value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_X_VALUE_LABEL),
    duration: 200,
    opacity: [1, 0],
    scaleX: [1, 0.875],
    scaleY: [1, 0.875],
    translateY: [0, 2],
  });

  return animationTimeline;
}

export function createReverseBarsOutAnimationTimeline() {
  const animationTimeline = anime.timeline({
    autoplay: false,
    easing: TIMELINE_EASING,
  });

  // Y value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_Y_VALUE_LABEL),
    duration: 50,
    opacity: 0,
    scaleX: 0.875,
    scaleY: 0.875,
    translateY: 2,
  });

  // Chart bars animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_ANIMATED_RECTANGLE),
    duration: 450,
    translateY: '100%',
    easing: 'easeInOutCubic',
  });

  // X value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_X_VALUE_LABEL),
    duration: 100,
    opacity: [1, 0],
    scaleX: [1, 0.875],
    scaleY: [1, 0.875],
    translateY: [0, 2],
  });

  return animationTimeline;
}

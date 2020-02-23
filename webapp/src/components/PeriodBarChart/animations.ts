import anime from 'animejs';

const TIMELINE_EASING = 'easeOutCubic';
const BARS_EASING = 'easeInOutCubic';
export const ANIMATION_IDS = {
  BAR_ANIMATED_RECTANGLE: 'BAR_RECT',
  BAR_INFO: 'BAR_INFO',
  BAR_X_VALUE_LABEL: 'X_VALUE',
  NO_WORK_INFO: 'NO_WORK_INFO',
  NO_WORK_INFO_STEM: 'NO_WORK_INFO_STEM',
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
    complete: animateNoWorkInfoIn,
  });

  // Y value labels animation
  animationTimeline.add({
    targets: getAnimationTarget(ANIMATION_IDS.BAR_INFO),
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
    targets: getAnimationTarget(ANIMATION_IDS.BAR_INFO),
    duration: 200,
    opacity: [1, 0],
    scaleX: [1, 0.875],
    scaleY: [1, 0.875],
    translateY: [0, 2],
    complete: animateNoWorkInfoOut,
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
    targets: getAnimationTarget(ANIMATION_IDS.BAR_INFO),
    duration: 50,
    opacity: 0,
    scaleX: 0.875,
    scaleY: 0.875,
    translateY: 2,
    complete: animateNoWorkInfoOut,
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

function animateNoWorkInfoIn() {
  anime({
    targets: getAnimationTarget(ANIMATION_IDS.NO_WORK_INFO),
    duration: 500,
    translateY: [3, 0],
    opacity: 1,
    easing: 'easeInOutCubic',
  });

  anime({
    targets: getAnimationTarget(ANIMATION_IDS.NO_WORK_INFO_STEM),
    duration: 500,
    scaleY: [0, 1],
    easing: 'easeInOutCubic',
  });
}

function animateNoWorkInfoOut() {
  anime({
    targets: getAnimationTarget(ANIMATION_IDS.NO_WORK_INFO),
    duration: 200,
    translateY: [0, 3],
    opacity: 0,
    easing: TIMELINE_EASING,
  });

  anime({
    targets: getAnimationTarget(ANIMATION_IDS.NO_WORK_INFO_STEM),
    duration: 200,
    scaleY: [1, 0],
    easing: TIMELINE_EASING,
  });
}

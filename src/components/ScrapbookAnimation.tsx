"use client";

import { motion, useInView } from "motion/react";
import React, { ReactNode, useRef, useState, useEffect } from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface ScrapbookItemProps {
  children: ReactNode;
  className?: string;
  /** Number of tilt "frames" before settling (2–3 recommended) */
  tiltSteps?: number;
  /** Max tilt angle in degrees for the random range */
  maxAngle?: number;
  /** Final resting rotation in degrees */
  finalRotation?: number;
  /** Total duration of the stop-motion sequence in seconds */
  duration?: number;
  /** Delay before the animation starts */
  delay?: number;
  /** Direction the element travels FROM to reach its original position */
  direction?: Direction;
  /** How far (in px) the element starts from its original position */
  travelDistance?: number;
}

/**
 * Generates a random tilt angle between -max and +max,
 * avoiding the dead-zone near 0 so every frame has visible tilt.
 */
function randomTilt(max: number): number {
  const minAngle = max * 0.35;
  const angle = minAngle + Math.random() * (max - minAngle);
  return Math.random() > 0.5 ? angle : -angle;
}

/**
 * Converts a direction + distance into the initial x/y offset.
 * e.g. direction="top", distance=10 → { x: 0, y: -10 }
 */
function getDirectionOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "top":
      return { x: 0, y: -distance };
    case "bottom":
      return { x: 0, y: distance };
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
  }
}

interface Frames {
  rotateFrames: number[];
  opacityFrames: number[];
  xFrames: number[];
  yFrames: number[];
  times: number[];
}

/**
 * Builds the keyframe arrays for a stop-motion tilt + translate animation.
 * Duplicate values at identical time-points create zero-duration jumps (no tweening).
 */
function buildFrames(
  tiltSteps: number,
  maxAngle: number,
  finalRotation: number,
  direction: Direction,
  travelDistance: number
): Frames {
  const tilts: number[] = [];
  for (let i = 0; i < tiltSteps; i++) {
    tilts.push(randomTilt(maxAngle));
  }

  const offset = getDirectionOffset(direction, travelDistance);

  const totalFrames = tiltSteps + 1;
  const step = 1 / totalFrames;

  const rFrames: number[] = [];
  const oFrames: number[] = [];
  const xFrames: number[] = [];
  const yFrames: number[] = [];
  const tFrames: number[] = [];

  const push = (r: number, o: number, x: number, y: number, t: number) => {
    rFrames.push(r);
    oFrames.push(o);
    xFrames.push(x);
    yFrames.push(y);
    tFrames.push(t);
  };

  // Frame 0: invisible, at offset, first tilt angle
  push(tilts[0], 0, offset.x, offset.y, 0);
  // Same time-point: opacity pops to 1
  push(tilts[0], 1, offset.x, offset.y, 0);

  // Intermediate tilt frames with stepped translation
  for (let i = 1; i < tiltSteps; i++) {
    const t = step * i;
    const prevProgress = (i - 1) / tiltSteps;
    const progress = i / tiltSteps;

    // Hold previous angle + position right up to jump point
    push(tilts[i - 1], 1, offset.x * (1 - prevProgress), offset.y * (1 - prevProgress), t);
    // Instant jump to new angle + new position
    push(tilts[i], 1, offset.x * (1 - progress), offset.y * (1 - progress), t);
  }

  // Final snap
  const tFinal = step * tiltSteps;
  const lastProgress = (tiltSteps - 1) / tiltSteps;

  // Hold last tilt
  push(tilts[tiltSteps - 1], 1, offset.x * (1 - lastProgress), offset.y * (1 - lastProgress), tFinal);
  // Snap to final resting position
  push(finalRotation, 1, 0, 0, tFinal);
  // Hold at final through end
  push(finalRotation, 1, 0, 0, 1);

  return { rotateFrames: rFrames, opacityFrames: oFrames, xFrames, yFrames, times: tFrames };
}

export const ScrapbookItem = ({
  children,
  className = "",
  tiltSteps = 3,
  maxAngle = 18,
  finalRotation = 0,
  duration = 0.5,
  delay = 0,
  direction = "top",
  travelDistance = 30,
}: ScrapbookItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [frames, setFrames] = useState<Frames | null>(null);

  useEffect(() => {
    setFrames(buildFrames(tiltSteps, maxAngle, finalRotation, direction, travelDistance));
  }, [tiltSteps, maxAngle, finalRotation, direction, travelDistance]);

  // Determine if animation should play: frames must be ready AND element in view
  const shouldAnimate = frames !== null && isInView;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity: 0 }}
      animate={
        shouldAnimate
          ? {
              opacity: frames.opacityFrames,
              rotate: frames.rotateFrames,
              x: frames.xFrames,
              y: frames.yFrames,
            }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              duration,
              delay,
              times: frames.times,
              ease: "linear",
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};
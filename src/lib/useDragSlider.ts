"use client";

import { useRef, useState, type MouseEvent, type PointerEvent } from "react";

/** Travel (px) that commits to a page turn once the finger lifts. */
const SWIPE_PX = 40;
/** Travel (px) before the gesture is judged horizontal or vertical. */
const AXIS_PX = 8;

/**
 * Touch dragging for the two reels (the movies strip, the location photos).
 *
 * The track follows the finger and snaps to the next slide on release, which
 * is what "swipable" reads as on a phone. The release-only handler this
 * replaces paged only after the fact, so the strip sat dead still under the
 * finger — and, on the movies reel, a swipe that began over a poster still
 * ended in a tap on its link and navigated away mid-gesture.
 *
 * Mouse pointers are ignored: on desktop the arrows page the reel.
 *
 * The caller owns the index; this owns the live offset. Feed `dragX` into the
 * track's transform and drop its transition while `dragging` — releasing then
 * animates from wherever the finger left it to the slide it landed on.
 */
export function useDragSlider(step: (dir: 1 | -1) => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const axis = useRef<"undecided" | "x">("undecided");
  /** Set once a drag turns horizontal, so the click that a touch-end
   *  synthesises on the link under the finger can be swallowed. */
  const swiped = useRef(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const reset = () => {
    start.current = null;
    axis.current = "undecided";
    setDragX(0);
    setDragging(false);
  };

  const handlers = {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      swiped.current = false;
      if (e.pointerType === "mouse") return;
      start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
      axis.current = "undecided";
    },

    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const from = start.current;
      if (!from || e.pointerId !== from.id) return;
      const dx = e.clientX - from.x;
      const dy = e.clientY - from.y;
      if (axis.current === "undecided") {
        if (Math.abs(dx) < AXIS_PX && Math.abs(dy) < AXIS_PX) return;
        // A vertical gesture belongs to the page. Let go of it and stay out of
        // the way until the next touch — `touch-pan-y` scrolls it from here.
        if (Math.abs(dy) >= Math.abs(dx)) {
          start.current = null;
          return;
        }
        axis.current = "x";
        setDragging(true);
      }
      setDragX(dx);
    },

    onPointerUp: (e: PointerEvent<HTMLElement>) => {
      const from = start.current;
      if (!from || e.pointerId !== from.id) {
        reset();
        return;
      }
      const dx = e.clientX - from.x;
      const horizontal = axis.current === "x";
      reset();
      if (!horizontal) return; // a tap: leave the link under it alone
      swiped.current = true;
      if (Math.abs(dx) >= SWIPE_PX) step(dx < 0 ? 1 : -1);
    },

    onPointerCancel: reset,

    onClickCapture: (e: MouseEvent<HTMLElement>) => {
      if (!swiped.current) return;
      swiped.current = false;
      e.preventDefault();
      e.stopPropagation();
    },
  };

  return { handlers, dragX, dragging };
}

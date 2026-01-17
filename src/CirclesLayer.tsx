import React, { useEffect, useRef } from "react";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import type { CircleData } from "./data";

type OffsetsMap = Map<
  number,
  {
    scale: number;
    scalingOffset: number;
    newIndexOffset: number;
  }
>;

interface CirclesLayerProps {
  floatingIndexRef: React.MutableRefObject<number>;
  selectedIndex: number; // still useful, but NOT for interpolation
  offsetsMap: OffsetsMap;
  sortedCircles: CircleData[];
}

// Linear interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CirclesLayer: React.FC<CirclesLayerProps> = ({
  floatingIndexRef,
  selectedIndex,
  offsetsMap,
  sortedCircles,
}) => {
  const circleRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let raf: number;

    const loop = () => {
      const floatingIndex = floatingIndexRef.current;
      const leftIndex = Math.floor(floatingIndex);
      const rightIndex = Math.min(leftIndex + 1, sortedCircles.length - 1);
      const t = floatingIndex - leftIndex;

      const leftCircle = sortedCircles[leftIndex];
      const rightCircle = sortedCircles[rightIndex];

      const leftParams = offsetsMap.get(leftCircle.id)!;
      const rightParams = offsetsMap.get(rightCircle.id)!;

      const interpolatedScale = lerp(leftParams.scale, rightParams.scale, t);
      const interpolatedScalingOffset = lerp(
        leftParams.scalingOffset,
        rightParams.scalingOffset,
        t
      );

      circleRefs.current.forEach((el, i) => {
        if (!el) return;
        const circle = sortedCircles[i];
        const params = offsetsMap.get(circle.id)!;

        const scalingOffset =
          (params.scalingOffset - interpolatedScalingOffset) /
          interpolatedScale;

        const scaleFactor = params.scale / interpolatedScale;

        // Apply transform **directly on the circle container**
        const circleContainer =
          el.querySelector<HTMLDivElement>(".circle-container");
        if (circleContainer) {
          circleContainer.style.transform = `scale(${Math.min(
            scaleFactor,
            5
          )})`;
        }

        // Apply horizontal offset to the outer wrapper
        // Move the wrapper horizontally only
        el.style.transform = `translateX(calc(${scalingOffset} * var(--circle))) translate(-50%, 0)`;

        // Scale the circle itself (child div)
        const circleDiv = el.firstElementChild as HTMLDivElement;
        if (circleDiv) {
          circleDiv.style.transform = `scale(${scaleFactor})`;
          circleDiv.style.transformOrigin = "bottom center"; // critical for bottom alignment
        }
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [floatingIndexRef, sortedCircles, offsetsMap]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sortedCircles.map((circle, i) => (
        <div
          key={circle.id}
          ref={(el) => {
            circleRefs.current[i] = el!;
          }}
          className="absolute top-[25%] left-1/2"
          style={{
            willChange: "transform",
            transform: "translateX(-50%)",
          }}
        >
          <div className="relative">
            {/* Circle */}
            <div className="origin-bottom w-(--circle) h-(--circle)">
              <Circle circle={circle} isSelected={selectedIndex === i} />
            </div>

            {/* InfoBox */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-80">
              <InfoBox circle={circle} isSelected={selectedIndex === i} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CirclesLayer;

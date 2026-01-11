import React from "react";
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
  selectedIndex: number;
  itemSpacingPx: number;
  offsetsMap: OffsetsMap;
  sortedCircles: CircleData[];
}

const CIRCLE_DIAMETER_REM = 20;

// Linear interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const CirclesLayer: React.FC<CirclesLayerProps> = ({
  selectedIndex,
  itemSpacingPx,
  offsetsMap,
  sortedCircles,
}) => {
  const leftIndex = Math.floor(selectedIndex);
  const rightIndex = Math.min(leftIndex + 1, sortedCircles.length - 1);
  const t = selectedIndex - leftIndex;

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
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sortedCircles.map((circle) => {
        const params = offsetsMap.get(circle.id)!;

        // Offset relative to the interpolated floating selection
        const scalingOffset =
          (params.scalingOffset - interpolatedScalingOffset) /
          interpolatedScale;
        const offsetX = scalingOffset * itemSpacingPx;

        const scaleFactor = params.scale / interpolatedScale;

        // Optional: determine how "selected" this circle is based on distance to floating index
        // We'll use params.newIndexOffset to know where this circle sits in the sorted array
        const selectionFactor =
          1 - Math.min(Math.abs(selectedIndex - params.newIndexOffset), 1);
        const isSelected = selectionFactor > 0.5;

        return (
          <div
            key={circle.id}
            className="absolute"
            style={{
              top: "60%",
              left: "50%",
              transform: `translate(-50%, -100%) translateX(${offsetX}px)`,
              willChange: "transform",
            }}
          >
            <div className="relative">
              {/* Circle */}
              <div
                className="origin-bottom transition-transform duration-500 ease-in-out"
                style={{
                  width: `${CIRCLE_DIAMETER_REM}rem`,
                  height: `${CIRCLE_DIAMETER_REM}rem`,
                  transform: `scale(${Math.min(scaleFactor, 5)})`,
                }}
              >
                <Circle circle={circle} isSelected={isSelected} />
              </div>

              {/* InfoBox */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-80 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `scale(${scaleFactor})`,
                }}
              >
                <InfoBox circle={circle} isSelected={isSelected} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CirclesLayer;

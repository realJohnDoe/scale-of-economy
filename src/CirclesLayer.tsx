import React from "react";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import { circlesData } from "./data";

type OffsetsMap = Map<
  number,
  {
    scale: number;
    scalingOffset: number;
  }
>;

interface CirclesLayerProps {
  selectedId: number;
  itemSpacingPx: number;
  offsetsMap: OffsetsMap;
}

const CIRCLE_DIAMETER_REM = 20;

const CirclesLayer: React.FC<CirclesLayerProps> = ({
  selectedId,
  itemSpacingPx,
  offsetsMap,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {circlesData.map((circle) => {
        const selectedParams = offsetsMap.get(selectedId);
        const transformationParams = offsetsMap.get(circle.id);

        const scalingOffset =
          ((transformationParams?.scalingOffset ?? 1) -
            (selectedParams?.scalingOffset ?? 1)) /
          (selectedParams?.scale ?? 1);

        const offsetX = scalingOffset * itemSpacingPx;

        const scaleFactor =
          (transformationParams?.scale ?? 1) / (selectedParams?.scale ?? 1);

        return (
          <div
            key={circle.id}
            className="absolute"
            style={{
              top: "60%",
              left: "50%",
              transform: `
                translate(-50%, -100%)
                translateX(${offsetX + scalingOffset}px)
              `,
              willChange: "transform",
              pointerEvents: circle.id === selectedId ? "auto" : "none",
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
                <Circle circle={circle} isSelected={circle.id === selectedId} />
              </div>

              {/* InfoBox */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-80 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `scale(${scaleFactor})`,
                }}
              >
                <InfoBox
                  circle={circle}
                  isSelected={circle.id === selectedId}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CirclesLayer;

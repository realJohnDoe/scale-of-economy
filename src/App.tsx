import React from "react";

function App() {
  type Circle = {
    area: number;
    posX: number; // posX is a float on an x-axis, in units of the center circle's radius
  };

  const circlesData: Circle[] = [
    { area: 1, posX: -2.0 },
    { area: 2, posX: 0 },
    { area: 10, posX: 3.5 },
  ];

  // The diameter for a circle with area 1 is 7rem (w-28)
  const baseDiameter = 7;

  // Radius of the center circle (area 2) in rem, which is our unit of measurement
  const centerCircleRadius = (baseDiameter * Math.sqrt(2)) / 2;

  return (
    <div className="relative w-screen h-screen">
      {circlesData.map((circle) => {
        const diameter = baseDiameter * Math.sqrt(circle.area);
        const style = {
          width: `${diameter}rem`,
          height: `${diameter}rem`,
          left: `calc(50% + ${circle.posX * centerCircleRadius}rem)`,
        };

        // Adjust font size based on circle size
        const fontSize = 1.5 * Math.sqrt(circle.area);

        return (
          <div
            key={circle.area}
            style={style}
            className="bg-gray-500 rounded-full flex justify-center items-center text-black font-bold absolute bottom-[10vh] -translate-x-1/2"
          >
            <span style={{ fontSize: `${fontSize}rem`, lineHeight: "1" }}>
              {circle.area}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;

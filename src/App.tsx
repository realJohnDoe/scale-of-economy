// --- Types ---
type Circle = {
  area: number;
  posX: number; // in units of the center circle's radius
};

// --- Constants ---
const circlesData: { area: number }[] = [
  { area: 1 },
  { area: 2 },
  { area: 10 },
];
const fixedDistance = 3; // rem
const anchorArea = 2;

// --- Helper Functions ---
function getRadius(area: number): number {
  const baseDiameter = 7; // rem
  return (baseDiameter * Math.sqrt(area)) / 2;
}

const calculateDeltaX = (area1: number, area2: number): number => {
  const r1 = getRadius(area1);
  const r2 = getRadius(area2);
  const hypotenuse = r1 + fixedDistance + r2;
  const vertical = Math.abs(r1 - r2);
  return Math.sqrt(hypotenuse ** 2 - vertical ** 2);
};

// --- Main Calculation Function ---
function calculatePositions(circles: { area: number }[]): Circle[] {
  const centerCircleRadius = getRadius(anchorArea); // This is our unit

  const sortedByArea = [...circles].sort((a, b) => a.area - b.area);
  const anchorIndex = sortedByArea.findIndex((c) => c.area === anchorArea);

  if (anchorIndex === -1) {
    console.error("Anchor circle not found in data!");
    return [];
  }

  const posXValues: { [area: number]: number } = { [anchorArea]: 0 };
  let currentPosRem = 0;

  // Calculate posX for circles to the right of the anchor
  for (let i = anchorIndex + 1; i < sortedByArea.length; i++) {
    currentPosRem += calculateDeltaX(
      sortedByArea[i - 1].area,
      sortedByArea[i].area
    );
    posXValues[sortedByArea[i].area] = currentPosRem / centerCircleRadius;
  }

  // Calculate posX for circles to the left of the anchor
  currentPosRem = 0;
  for (let i = anchorIndex - 1; i >= 0; i--) {
    currentPosRem -= calculateDeltaX(
      sortedByArea[i].area,
      sortedByArea[i + 1].area
    );
    posXValues[sortedByArea[i].area] = currentPosRem / centerCircleRadius;
  }

  return circles.map((c) => ({
    ...c,
    posX: posXValues[c.area],
  }));
}

// --- The React Component ---
function App() {
  const positionedCircles = calculatePositions(circlesData);
  const centerCircleRadius = getRadius(anchorArea);

  return (
    <div className="relative w-screen h-screen">
      {positionedCircles.map((circle) => {
        const diameter = getRadius(circle.area) * 2;
        const style = {
          width: `${diameter}rem`,
          height: `${diameter}rem`,
          left: `calc(50% + ${circle.posX * centerCircleRadius}rem)`,
        };
        const fontSize = 1.5 * Math.sqrt(circle.area);

        return (
          <div
            key={circle.area}
            style={style}
            className="bg-gray-500 rounded-full flex justify-center items-center text-white font-bold absolute bottom-[10vh] -translate-x-1/2"
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

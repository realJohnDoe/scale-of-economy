import * as React from "react";

type ScrollSpaceProps = {
  numItems: number;
  itemDistance: number; // px
  onIndexChange: (index: number) => void;
  floatingIndexRef: React.MutableRefObject<number>;
  /** Controlled scroll target */
  scrollToIndex?: number;
};

export function ScrollSpace({
  numItems,
  itemDistance,
  onIndexChange,
  scrollToIndex,
  floatingIndexRef,
}: ScrollSpaceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [paddingX, setPaddingX] = React.useState(0);
  const lastEmittedIndexRef = React.useRef<number | null>(null);

  // --- measure container + compute centering padding ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updatePadding = () => {
      const containerWidth = el.clientWidth;
      const padding = (containerWidth - itemDistance) / 2;
      setPaddingX(Math.max(0, padding));
    };

    updatePadding();

    const ro = new ResizeObserver(updatePadding);
    ro.observe(el);

    return () => ro.disconnect();
  }, [itemDistance]);

  // --- programmatic scroll ---
  React.useEffect(() => {
    if (scrollToIndex == null) return;
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({
      left: scrollToIndex * itemDistance,
      behavior: "smooth",
    });
  }, [scrollToIndex, itemDistance]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rawIndex = el.scrollLeft / itemDistance;

      // 🔁 continuous signal (NO React)
      floatingIndexRef.current = rawIndex;

      // 🧠 discrete signal (React-safe)
      const rounded = Math.round(rawIndex);
      if (lastEmittedIndexRef.current !== rounded) {
        lastEmittedIndexRef.current = rounded;
        onIndexChange(rounded);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [itemDistance, onIndexChange, floatingIndexRef]);

  // --- horizontal wheel scrolling ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        w-full h-screen
        overflow-x-scroll overflow-y-hidden
        box-border
        scroll-px-(--padding-x)
        snap-x snap-mandatory
      "
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
    >
      <div className="flex" style={{ minWidth: numItems * itemDistance }}>
        {Array.from({ length: numItems }).map((_, i) => (
          <div
            key={i}
            className="snap-center shrink-0 flex items-center justify-center text-white font-bold rounded-lg"
            style={{
              width: itemDistance,
              height: 200, // give each item a height
            }}
          >
            {/* {i + 1} optional label to see which item is which */}
          </div>
        ))}
      </div>
    </div>
  );
}

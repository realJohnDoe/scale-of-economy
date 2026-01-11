import * as React from "react";

type ScrollSpaceProps = {
  numItems: number;
  itemDistance: number; // px
  onIndexChange?: (index: number) => void;

  /** Controlled scroll target */
  scrollToIndex?: number;
};

export function ScrollSpace({
  numItems,
  itemDistance,
  onIndexChange,
  scrollToIndex,
}: ScrollSpaceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);
  const [paddingX, setPaddingX] = React.useState(0);

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

    isProgrammaticScroll.current = true;

    el.scrollTo({
      left: scrollToIndex * itemDistance,
      behavior: "smooth",
    });

    const id = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 150);

    return () => window.clearTimeout(id);
  }, [scrollToIndex, itemDistance]);

  // --- scroll → index with soft snapping ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      // debounce scroll end
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (!el) return;
        const index = Math.round(el.scrollLeft / itemDistance);

        // Smoothly scroll to center this item
        el.scrollTo({
          left: index * itemDistance,
          behavior: "smooth",
        });

        onIndexChange?.(index);
      }, 100);
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [itemDistance, onIndexChange]);

  // --- horizontal wheel scrolling ---
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
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
            className="shrink-0 flex items-center justify-center text-white font-bold rounded-lg"
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

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "long",
  maximumSignificantDigits: 2,
});

// Currency style would force the short "K"/"M"/"B" suffixes, so prefix "$"
// to the long compact form instead.
export function formatToTwoSignificantDigits(
  num: number,
  isCurrency: boolean = false,
): string {
  return (isCurrency ? "$" : "") + compact.format(num);
}

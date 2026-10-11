const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// swaps english digits for bengali ones and leaves commas and dots alone
export const toBnDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => bnDigits[Number(digit)]);

// ১,৮৫০ টাকা
export const toBnPrice = (taka: number) =>
  toBnDigits(taka.toLocaleString("en-US"));

export const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const unitShort: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// ▲ ২.১% / ▼ ২.৯% / — ০.০%
export const changeArrow = (dir: string) =>
  dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

export const changeLabel = (dir: string, pct: number) =>
  `${changeArrow(dir)} ${toBnDigits(Math.abs(pct).toFixed(1))}%`;

// green when prices rise, red when they fall, gray when flat
export const changeClasses = (dir: string) =>
  dir === "up"
    ? "bg-rise/10 text-rise"
    : dir === "down"
      ? "bg-fall/10 text-fall"
      : "bg-slate-100 text-slate-500";

export const bnDate = (date: Date) =>
  date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

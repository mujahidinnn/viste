export function formatPeriod(period) {
  if (!period || typeof period !== "object") return "";

  const { start_month, end_month, untilNow } = period;

  const format = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    const month = d.toLocaleString("id-ID", { month: "short" });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  const startText = format(start_month);
  const endText = untilNow ? "Sekarang" : format(end_month);

  if (!startText && !endText) return "";
  if (startText && !endText) return startText;
  return `${startText} - ${endText}`;
}

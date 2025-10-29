export function formatPeriod(period) {
  if (!Array.isArray(period) || period.length === 0) return "";
  const [start, end] = period;
  const format = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };
  return `${format(start)}${end ? " – " + format(end) : ""}`;
}

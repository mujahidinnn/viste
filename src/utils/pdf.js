import html2pdf from "html2pdf.js";

export async function exportPDF(ref, filename = "My-CV") {
  const element = ref.current;

  const originalFont = element.style.fontSize;
  element.style.fontSize = "11px";

  const opt = {
    margin: [12, 12, 12, 12],
    filename: `${filename}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  await html2pdf().set(opt).from(element).save();

  element.style.fontSize = originalFont;
}

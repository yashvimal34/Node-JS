import fs from "node:fs/promises";

const inputFile = "NodeJS_Interview_Questions.html";
const outputFile = "NodeJS_Interview_Questions.pdf";

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function htmlToLines(html) {
  const body = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<span[^>]*class="badge"[^>]*>(.*?)<\/span>/gi, " [$1]")
    .replace(/<h1[^>]*>/gi, "\n# ")
    .replace(/<\/h1>/gi, "\n")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<\/h2>/gi, "\n")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<\/h3>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  return decodeHtml(body)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function pdfEscape(text) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function lineStyle(raw) {
  if (raw.startsWith("# ")) return { text: raw.slice(2), size: 24, gap: 12, max: 48 };
  if (raw.startsWith("## ")) return { text: raw.slice(3), size: 15, gap: 10, max: 70 };
  if (raw.startsWith("### ")) return { text: raw.slice(4), size: 12, gap: 7, max: 82 };
  if (raw.startsWith("- ")) return { text: raw.slice(2), size: 10.5, gap: 4, max: 92, bullet: true };
  return { text: raw, size: 10.5, gap: 5, max: 92 };
}

function paginate(lines) {
  const pages = [];
  let page = [];
  let y = 760;

  function newPage() {
    pages.push(page);
    page = [];
    y = 760;
  }

  for (const raw of lines) {
    const style = lineStyle(raw);
    const wrapped = wrapText(style.text, style.max);
    const blockHeight = wrapped.length * (style.size + 3) + style.gap;

    if (y - blockHeight < 50) newPage();

    if (raw.startsWith("## ") && page.length > 0) {
      y -= 6;
      if (y - blockHeight < 50) newPage();
    }

    for (let i = 0; i < wrapped.length; i += 1) {
      page.push({
        text: `${style.bullet && i === 0 ? "- " : style.bullet ? "  " : ""}${wrapped[i]}`,
        x: style.bullet ? 58 : 46,
        y,
        size: style.size,
      });
      y -= style.size + 3;
    }
    y -= style.gap;
  }

  if (page.length) pages.push(page);
  return pages;
}

function buildPdf(pages) {
  const objects = [];

  function addObject(content) {
    objects.push(content);
    return objects.length;
  }

  const fontObj = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageRefs = [];

  for (const pageLines of pages) {
    const stream = pageLines
      .map((line) => `BT /F1 ${line.size} Tf ${line.x} ${line.y} Td (${pdfEscape(line.text)}) Tj ET`)
      .join("\n");
    const contentObj = addObject(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    const pageObj = addObject(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontObj} 0 R >> >> /Contents ${contentObj} 0 R >>`);
    pageRefs.push(pageObj);
  }

  const pagesObj = addObject(`<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`);
  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  for (const ref of pageRefs) {
    objects[ref - 1] = objects[ref - 1].replace("/Parent 0 0 R", `/Parent ${pagesObj} 0 R`);
  }

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const html = await fs.readFile(inputFile, "utf8");
const lines = htmlToLines(html);
const pages = paginate(lines);
const pdf = buildPdf(pages);

await fs.writeFile(outputFile, pdf, "binary");
console.log(`Created ${outputFile} with ${pages.length} pages.`);

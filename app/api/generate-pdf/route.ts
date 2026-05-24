export const runtime = "nodejs";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      paper,
      subject,
      className,
      totalMarks,
      duration,
      schoolName,
      schoolAddress,
    } = body;

    const pdfDoc = await PDFDocument.create();

    let page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800;

    const finalSchoolName = schoolName || "Delhi Public School";

    const schoolNameWidth = font.widthOfTextAtSize(finalSchoolName, 20);

    page.drawText(finalSchoolName, {
      x: (595 - schoolNameWidth) / 2,
      y,
      size: 20,
      font,
    });

    const finalAddress = schoolAddress || "Bokaro Steel City";

    const addressWidth = font.widthOfTextAtSize(finalAddress, 11);

    page.drawText(finalAddress, {
      x: (595 - addressWidth) / 2,
      y: y - 18,
      size: 11,
      font,
    });

    y -= 35;

    page.drawText(`Subject: ${subject}`, {
      x: 240,
      y,
      size: 13,
      font,
    });

    y -= 22;

    page.drawText(`Class: ${className}`, {
      x: 260,
      y,
      size: 12,
      font,
    });

    y -= 45;

    page.drawText(`Time Allowed: ${duration}`, {
      x: 50,
      y,
      size: 11,
      font,
    });

    page.drawText(`Maximum Marks: ${totalMarks}`, {
      x: 390,
      y,
      size: 11,
      font,
    });

    y -= 35;

    page.drawText("All questions are compulsory unless stated otherwise.", {
      x: 50,
      y,
      size: 11,
      font,
    });

    y -= 40;

    page.drawText("Name: _______________________", {
      x: 50,
      y,
      size: 11,
      font,
    });

    y -= 25;

    page.drawText("Roll Number: _________________", {
      x: 50,
      y,
      size: 11,
      font,
    });

    y -= 25;

    page.drawText("Class & Section: ______________", {
      x: 50,
      y,
      size: 11,
      font,
    });

    y -= 40;

    const lines = paper.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();

      const isSection =
        trimmed.includes("SECTION A") ||
        trimmed.includes("SECTION B") ||
        trimmed.includes("SECTION C") ||
        trimmed.includes("ANSWER KEY");

      if (isSection) {
        y -= 22;

        page.drawText(trimmed, {
          x: 220,
          y,
          size: 18,
          font,
        });

        y -= 24;

        continue;
      }

      page.drawText(trimmed, {
        x: 50,
        y,
        size: 11,
        font,
        maxWidth: 500,
        lineHeight: 16,
      });

      y -= Math.max(20, Math.ceil(trimmed.length / 80) * 18);

      if (y < 120) {
        page = pdfDoc.addPage([595, 842]);

        y = 780;
      }
    }
    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": "attachment; filename=question-paper.pdf",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("PDF generation failed", {
      status: 500,
    });
  }
}

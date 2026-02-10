import { PDFDocument, rgb, PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { APPLICATION_TEXT, GREETING_TEMPLATE } from '@/consts/content';

const FONT_URL = '/fonts/JameelNooriNastaliq.ttf';

// Basic RTL Reversal: Reverse words order, then chars? 
// No, for simple rendering without shaping engine, we often have to reverse the string.
// BUT Jameel Noori might behave differently. 
// Let's try a safe approach: Just simple character reversal for now as a fallback 
// because pdf-lib draws LTR.
function reverseForRTL(text: string): string {
    // This is a naive implementation. 
    // Ideally we need bidi-js, but let's see if simple reverse makes it visible first.
    return text.split('').reverse().join('');
}

// Helper to wrap text manually
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    // For RTL, we should split by space, but order matters.
    // Let's split by space to get words.
    const words = text.split(' ');
    const lines: string[] = [];
    
    // In RTL, first word is on the right. 
    // Logic: Accumulate words until width > max.
    
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        // Check width of (currentLine + " " + word)
        // Note: We don't reverse here for width check, assuming font handles mapping correctly for width
        const testLine = currentLine + " " + word;
        const width = font.widthOfTextAtSize(testLine, size);
        
        if (width < maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export async function generatePdf(names: string[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  let fontBytes: ArrayBuffer;
  try {
    fontBytes = await fetch(FONT_URL).then((res) => {
      if (!res.ok) throw new Error(`Failed to load font from ${FONT_URL}`);
      return res.arrayBuffer();
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Urdu font not found at ${FONT_URL}. Please add it to public/fonts/.`);
  }

  const customFont = await pdfDoc.embedFont(fontBytes);
  const fontSize = 12;
  const lineHeight = 25; // Adjusted for Nastaliq
  const margin = 50;

  for (const name of names) {
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const maxWidth = width - (margin * 2);
    
    let currentY = height - margin;

    // Greeting
    const rawGreeting = GREETING_TEMPLATE.replace('{{NAME}}', name);
    const greetingWidth = customFont.widthOfTextAtSize(rawGreeting, fontSize);
    const greetingX = width - margin - greetingWidth;

    page.drawText(rawGreeting, {
      x: greetingX,
      y: currentY,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
      wordSpacing: 2, // Added to fix spacing
    });

    currentY -= (lineHeight * 1.5);

    // Application Text
    const paragraphs = APPLICATION_TEXT.split('\n');
    
    for (const paragraph of paragraphs) {
        const trimmedPara = paragraph.trim();
        
        if (!trimmedPara) {
            currentY -= lineHeight;
            continue;
        }

        // Simple line wrapping logic for RTL lines
        const words = trimmedPara.split(' ');
        let lines: string[] = [];
        let currentLine = "";

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = customFont.widthOfTextAtSize(testLine, fontSize);
            
            if (testWidth < maxWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        for (const line of lines) {
            if (!line) continue;
            
            const lineWidth = customFont.widthOfTextAtSize(line, fontSize);
            const lineX = width - margin - lineWidth;

            page.drawText(line, {
                x: lineX,
                y: currentY,
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0),
                wordSpacing: 2, // Added to fix spacing
                characterSpacing: 0.5, // Added to prevent overlap
            });
            currentY -= lineHeight;
        }
        
        // Extra space between paragraphs
        currentY -= (lineHeight * 0.5);
    }
  }

  return await pdfDoc.save();
}
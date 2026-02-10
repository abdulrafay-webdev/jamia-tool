import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { APPLICATION_TEXT, GREETING_TEMPLATE, FOOTER_DETAILS } from '@/consts/content';
import path from 'path';
import fs from 'fs';

// Common Windows paths for local development fallback
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

function getLocalExecutablePath() {
  for (const p of CHROME_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow more time for PDF generation

export async function POST(req: NextRequest) {
  let browser;
  try {
    const { names } = await req.json();

    if (!names || !Array.isArray(names)) {
      return NextResponse.json({ error: 'Names must be an array' }, { status: 400 });
    }

    // Load font file as base64
    let fontBase64 = '';
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'JameelNooriNastaliq.ttf');
    if (fs.existsSync(fontPath)) {
      const fontBuffer = fs.readFileSync(fontPath);
      fontBase64 = fontBuffer.toString('base64');
    }

    // Determine if we are running locally or on Vercel
    const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL;

    if (isLocal) {
      const executablePath = getLocalExecutablePath();
      if (!executablePath) {
        return NextResponse.json({ error: 'Local browser not found. Please install Chrome/Edge.' }, { status: 500 });
      }
      browser = await puppeteer.launch({
        executablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
        headless: true
      });
    } else {
      // Vercel / Production logic using @sparticuz/chromium-min
      // Point to a hosted tar for chromium to keep function size small
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
        headless: true,
      });
    }

    const page = await browser.newPage();

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ur">
      <head>
        <meta charset="UTF-8">
        <style>
          @font-face {
            font-family: 'JameelNoori';
            src: url(data:font/ttf;base64,${fontBase64});
          }
          body {
            font-family: 'JameelNoori', 'Noto Nastaliq Urdu', serif;
            margin: 0;
            padding: 0;
          }
          .page {
            width: 210mm;
            height: 297mm;
            padding: 50mm 15mm 20mm 15mm;
            box-sizing: border-box;
            page-break-after: always;
            background: white;
            position: relative;
          }
          .content {
            font-size: 12pt;
            line-height: 1.6;
            text-align: justify;
            color: #333;
            margin-bottom: 30pt;
          }
          .greeting-inline {
            display: block;
            margin-bottom: 6pt;
          }
          .text-para {
            margin-bottom: 0;
          }
          .empty-line {
            line-height: 0.5;
          }
          .footer {
            position: absolute;
            bottom: 15mm;
            left: 15mm;
            right: 15mm;
            border-top: 1px solid #ccc;
            padding-top: 10pt;
            display: flex;
            justify-content: space-between;
            font-size: 10pt;
            line-height: 1.4;
            direction: ltr;
            font-family: Arial, Helvetica, sans-serif;
            color: #444;
          }
          .footer-col {
            width: 48%;
          }
          .footer-left {
            text-align: left;
            direction: ltr;
          }
          .footer-right {
            text-align: right;
            direction: ltr;
          }
          .footer-title {
            font-weight: bold;
            color: #000;
            margin-bottom: 2pt;
          }
        </style>
      </head>
      <body>
        ${names.map(name => `
          <div class="page">
            <div class="content">
              <div class="greeting-inline">${GREETING_TEMPLATE.replace('{{NAME}}', name)}</div>
              ${APPLICATION_TEXT.split('\n').map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '<div class="empty-line">&nbsp;</div>';
                return `<div class="text-para">${line}</div>`;
              }).join('')}
            </div>
            
            <div class="footer">
              <div class="footer-col footer-left">
                <div class="footer-title">${FOOTER_DETAILS.left.name}</div>
                <div><strong>Bank:</strong> ${FOOTER_DETAILS.left.bank}</div>
                <div><strong>Account:</strong> ${FOOTER_DETAILS.left.account}</div>
                <div><strong>IBAN:</strong> ${FOOTER_DETAILS.left.iban}</div>
              </div>
              <div class="footer-col footer-right">
                <div class="footer-title">${FOOTER_DETAILS.right.name}</div>
                <div><strong>Bank:</strong> ${FOOTER_DETAILS.right.bank}</div>
                <div><strong>Account:</strong> ${FOOTER_DETAILS.right.account}</div>
                <div><strong>IBAN:</strong> ${FOOTER_DETAILS.right.iban}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="applications.pdf"',
      },
    });

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

# Quickstart: Urdu PDF Generator

## Prerequisites

- Node.js 18+
- npm or pnpm or yarn

## Installation

```bash
npm install
# or
pnpm install
```

## Critical Step: Font Setup

**You must provide the Urdu font file before running the application.**

1. Download **Jameel Noori Nastaliq.ttf** (or a compatible Urdu Unicode font).
2. Rename it to exactly: `JameelNooriNastaliq.ttf`
3. Place it in the `public/fonts/` directory.
   - Path: `public/fonts/JameelNooriNastaliq.ttf`

*Note: The application will show an error if this file is missing.*

## Running Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Adding/Updating the Urdu Font

1. Place your `.ttf` or `.otf` font file in `public/fonts/`.
2. Update the reference in `src/lib/pdf-generator.ts` constant `FONT_URL`.

## Updating Application Text

1. Open `src/consts/content.ts`.
2. Edit the `APPLICATION_TEXT` constant.
3. Save file (Hot reload will reflect changes).

## Building for Production

```bash
npm run build
npm start
```
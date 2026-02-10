"use client";

import { useState } from "react";
import { parseNames } from "@/lib/utils";

// Inline SVGs for professional look without dependencies
const Icons = {
  Translate: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  ArrowDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  ),
  PDF: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 13H8" />
      <path d="M12 13h2" />
      <path d="M10 9v8" />
    </svg>
  ),
  Spinner: () => (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
};

export default function Home() {
  const [urduInput, setUrduInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setError(null);
    const englishNames = parseNames(englishInput);

    if (englishNames.length === 0) {
      return; 
    }

    setIsTranslating(true);
    try {
      const response = await fetch('/api/transliterate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: englishNames }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to transliterate names.');
      }

      const { transliteratedNames } = await response.json();
      
      setUrduInput((prev) => {
        const trimmedPrev = prev.trim();
        const separator = trimmedPrev ? "، " : "";
        const newNames = transliteratedNames.join("، ");
        return trimmedPrev + separator + newNames;
      });

      // Clear English input after successful translation
      setEnglishInput("");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Translation failed.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleGeneratePDF = async () => {
    setError(null);
    setIsGenerating(true);

    try {
      const urduNames = parseNames(urduInput);
      
      if (urduNames.length === 0) {
        throw new Error("Please enter or translate names into the Urdu field first.");
      }

      const pdfRes = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: urduNames }),
      });

      if (!pdfRes.ok) {
        const errorData = await pdfRes.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "applications.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Urdu PDF Generator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Effortlessly translate English names to Urdu and generate professional PDF letterheads in seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-stretch">
              
              {/* English Section (Left) */}
              <div className="flex flex-col h-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                  Step 1: English Names
                </label>
                <div className="relative flex-grow">
                  <textarea
                    id="english-names"
                    className="w-full h-full min-h-[250px] p-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-slate-800 text-lg leading-relaxed placeholder:text-slate-400 text-left"
                    placeholder="Enter names here (e.g., Ali, Ahmed, Usman)..."
                    value={englishInput}
                    onChange={(e) => setEnglishInput(e.target.value)}
                    dir="ltr"
                  />
                  {englishInput && (
                    <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                      {parseNames(englishInput).length} names
                    </div>
                  )}
                </div>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || !englishInput.trim()}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  {isTranslating ? <Icons.Spinner /> : <Icons.Translate />}
                  {isTranslating ? "Translating..." : "Translate to Urdu"}
                </button>
              </div>

              {/* Connector (Center) */}
              <div className="flex items-center justify-center md:py-12">
                <div className="hidden md:flex flex-col items-center justify-center text-slate-300">
                   <Icons.ArrowRight />
                </div>
                <div className="md:hidden flex items-center justify-center text-slate-300 py-2">
                   <Icons.ArrowDown />
                </div>
              </div>

              {/* Urdu Section (Right) */}
              <div className="flex flex-col h-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2 text-right uppercase tracking-wide">
                  Step 2: Urdu Output
                </label>
                <div className="relative flex-grow">
                  <textarea
                    id="urdu-names"
                    className="w-full h-full min-h-[250px] p-4 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none text-right font-serif text-xl leading-relaxed text-slate-800 placeholder:text-slate-400 bg-slate-50/50"
                    placeholder="...یہاں ظاہر ہوں گے"
                    value={urduInput}
                    onChange={(e) => setUrduInput(e.target.value)}
                    dir="rtl"
                  />
                   {urduInput && (
                    <div className="absolute bottom-4 left-4 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                      {parseNames(urduInput).length} names
                    </div>
                  )}
                </div>
                <div className="mt-4 h-[52px] flex items-center justify-end text-sm text-slate-500">
                  {/* Spacer or Secondary Actions can go here if needed later */}
                  <span className="italic">Review names before generating</span>
                </div>
              </div>

            </div>

          </div>

          {/* Action Bar / Footer */}
          <div className="bg-slate-50 border-t border-slate-200 p-6 md:p-8 flex flex-col items-center">
            
            {error && (
              <div className="mb-6 w-full max-w-2xl p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                {error}
              </div>
            )}

            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating || !urduInput.trim()}
              className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg">
                {isGenerating ? <Icons.Spinner /> : <Icons.PDF />}
                {isGenerating ? "Generating Document..." : "Generate Final PDF"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
            <p className="mt-4 text-sm text-slate-400">
              Ready to print on standard letterhead format
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
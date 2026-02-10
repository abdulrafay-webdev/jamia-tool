"use client";

import { useState } from "react";
import { parseNames } from "@/lib/utils";
import { APPLICATION_TEXT } from "@/consts/content";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const names = parseNames(input);
      if (names.length === 0) {
        throw new Error("Please enter at least one name (comma separated).");
      }

      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
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
      setError(err.message || "Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center w-full">
          Urdu PDF Generator
        </h1>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl border border-gray-200">
        
        {/* Preview Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900 text-right" dir="rtl">
          <p className="font-bold text-sm text-blue-700 mb-2">Application Text Preview:</p>
          <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed font-urdu">
            {APPLICATION_TEXT}
          </pre>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-right" htmlFor="names">
            Enter Names (Comma Separated)
          </label>
          <textarea
            id="names"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right font-serif text-lg h-32"
            placeholder="علی, احمد, عثمان"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            dir="rtl"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-100"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </div>
        
        <p className="text-xs text-center text-gray-400 mt-4">
          Note: This version uses Puppeteer for high-quality Nastaliq rendering with full RTL support.
        </p>
      </div>
    </main>
  );
}

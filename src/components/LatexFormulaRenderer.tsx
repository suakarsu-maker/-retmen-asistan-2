import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { Sparkles, Copy, Check, Calculator, BookOpen, ChevronRight, Eye } from 'lucide-react';

interface LatexFormulaRendererProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export const LatexFormulaRenderer: React.FC<LatexFormulaRendererProps> = ({
  latex,
  block = false,
  className = '',
}) => {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (err) {
      return `<span class="text-rose-500 font-mono text-xs">${latex}</span>`;
    }
  }, [latex, block]);

  return (
    <span
      className={`inline-block font-serif ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

// Math Toolbar & Formula Playground Component
export const LatexFormulaPlayground: React.FC = () => {
  const [inputLatex, setInputLatex] = useState(
    '\\int_{a}^{b} f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*) \\Delta x'
  );
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      category: 'Temel & Kesir',
      items: [
        { label: 'Kesir (a/b)', code: '\\frac{a}{b}' },
        { label: 'Karekök', code: '\\sqrt{x^2 + y^2}' },
        { label: 'Kök Derecesi', code: '\\sqrt[n]{x}' },
        { label: 'Üs & Alt Simge', code: 'x_{i}^{2}' },
      ],
    },
    {
      category: 'Analiz & Kalkülüs',
      items: [
        { label: 'İntegral', code: '\\int_{0}^{\\pi} \\sin(x) \\, dx' },
        { label: 'Toplam Sembolü', code: '\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}' },
        { label: 'Limit', code: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
        { label: 'Kısmi Türev', code: '\\frac{\\partial f}{\\partial x}' },
      ],
    },
    {
      category: 'Fizik & Vektör',
      items: [
        { label: 'Newton Yasası', code: '\\vec{F}_{net} = m \\cdot \\vec{a} = \\frac{d\\vec{p}}{dt}' },
        { label: 'Kinetik Enerji', code: 'E_k = \\frac{1}{2} m v^2' },
        { label: 'Elektromanyetizma', code: '\\oint \\vec{B} \\cdot d\\vec{A} = 0' },
        { label: 'Einstein E=mc²', code: 'E = \\gamma m c^2 = \\frac{m c^2}{\\sqrt{1 - \\frac{v^2}{c^2}}}' },
      ],
    },
    {
      category: 'Cebir & Matris',
      items: [
        { label: '2x2 Matris', code: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
        { label: 'Determinant', code: '\\det(A) = ad - bc' },
        { label: 'İkinci Derece Kök', code: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
        { label: 'Binom Katsayısı', code: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}' },
      ],
    },
    {
      category: 'Yunan Harfleri',
      items: [
        { label: 'Alfa/Beta/Gama', code: '\\alpha + \\beta + \\gamma = 180^\\circ' },
        { label: 'Teta/Pi/Omega', code: '\\theta, \\pi, \\Omega, \\lambda, \\Delta' },
      ],
    },
  ];

  const handleInsertSnippet = (snippet: string) => {
    setInputLatex((prev) => (prev ? `${prev} + ${snippet}` : snippet));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">Matematik & Fizik LaTeX Canlı Formül Motoru</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                KaTeX %100 Donanım Hızlandırmalı
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ders föyleri, sınav soruları ve tahta notları için anlık matematiksel formül üretici ve canlı önizleme
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopyalandı' : 'LaTeX Kodunu Kopyala'}</span>
        </button>
      </div>

      {/* Preset Buttons Palette */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Hızlı Formül Paleti (Tek Tıkla Ekle)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {presets.map((cat, cIdx) => (
            <div key={cIdx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
              <div className="text-[11px] font-bold text-slate-700 mb-1.5">{cat.category}</div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, iIdx) => (
                  <button
                    key={iIdx}
                    onClick={() => handleInsertSnippet(item.code)}
                    className="text-[11px] px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-700 text-slate-700 transition font-medium shadow-2xs"
                    title={item.code}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input & Live KaTeX Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>LaTeX Giriş Alanı:</span>
            <span className="text-[11px] font-normal text-slate-400 font-mono">Standart TeX / KaTeX Sözdizimi</span>
          </label>
          <textarea
            value={inputLatex}
            onChange={(e) => setInputLatex(e.target.value)}
            rows={4}
            className="w-full font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-900 text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="LaTeX formülünüzü yazın..."
          />
        </div>

        {/* Live KaTeX Render Output */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Canlı Matematiksel Render (Tahta / Föy Görünümü):</span>
          </div>
          <div className="min-h-[102px] bg-indigo-50/40 border border-indigo-200 rounded-xl p-4 flex items-center justify-center text-center overflow-x-auto">
            {inputLatex.trim() ? (
              <LatexFormulaRenderer latex={inputLatex} block={true} className="text-lg text-slate-900" />
            ) : (
              <span className="text-xs text-slate-400 italic">Formül girildiğinde burada anında işlenecektir</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

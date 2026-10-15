import React, { useState, useMemo } from 'react';
import {
  Activity,
  Sliders,
  Copy,
  Check,
  Search,
  BookOpen,
  Sparkles,
  HelpCircle,
  TrendingUp,
  RotateCcw,
  Maximize2,
  FileText
} from 'lucide-react';
import { LatexFormulaRenderer } from './LatexFormulaRenderer';
import { INITIAL_MATH_FORMULAS } from '../data/mockInitialData';
import { MathFormulaSnippet } from '../types';

export const MathToolsTab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'grapher' | 'formulas' | 'solver'>('grapher');

  // Grapher states (Default: Parabola f(x) = ax^2 + bx + c)
  const [functionType, setFunctionType] = useState<'parabola' | 'linear' | 'trig' | 'cubic'>('parabola');
  const [paramA, setParamA] = useState<number>(1);
  const [paramB, setParamB] = useState<number>(-4);
  const [paramC, setParamC] = useState<number>(3);
  const [paramD, setParamD] = useState<number>(0);

  // Formula search and filter
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Problem solver template state
  const [solverTopic, setSolverTopic] = useState<'parabol' | 'trig' | 'turev'>('parabol');

  // Parabola math calculations
  const parabolaAnalysis = useMemo(() => {
    if (functionType !== 'parabola') return null;
    const a = paramA === 0 ? 0.001 : paramA;
    const b = paramB;
    const c = paramC;

    const r = -b / (2 * a);
    const k = a * r * r + b * r + c;
    const delta = b * b - 4 * a * c;

    let rootsText = '';
    let roots: number[] = [];
    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      roots = [x1, x2].sort((n1, n2) => n1 - n2);
      rootsText = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
    } else if (delta === 0) {
      const x1 = -b / (2 * a);
      roots = [x1];
      rootsText = `Çakışık kök x₁ = x₂ = ${x1.toFixed(2)}`;
    } else {
      rootsText = 'Gerçek kök yok (Δ < 0)';
    }

    const direction = a > 0 ? 'Yukarı Doğru (Minimum)' : 'Aşağı Doğru (Maksimum)';
    const extremumType = a > 0 ? 'En Küçük Değer' : 'En Büyük Değer';

    return {
      r,
      k,
      delta,
      roots,
      rootsText,
      direction,
      extremumType,
      yIntercept: c
    };
  }, [functionType, paramA, paramB, paramC]);

  // SVG Coordinates generator (-10 to +10 range)
  const svgWidth = 560;
  const svgHeight = 380;
  const xMin = -8;
  const xMax = 8;
  const yMin = -8;
  const yMax = 8;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * svgWidth;
  const toSvgY = (y: number) => svgHeight - ((y - yMin) / (yMax - yMin)) * svgHeight;

  // Generate path data
  const curvePoints = useMemo(() => {
    const points: string[] = [];
    const step = 0.1;
    for (let x = xMin; x <= xMax; x += step) {
      let y = 0;
      if (functionType === 'parabola') {
        y = paramA * x * x + paramB * x + paramC;
      } else if (functionType === 'linear') {
        y = paramA * x + paramB;
      } else if (functionType === 'trig') {
        y = paramA * Math.sin((paramB || 1) * x) + paramC;
      } else if (functionType === 'cubic') {
        y = paramA * Math.pow(x, 3) + paramB * Math.pow(x, 2) + paramC * x + paramD;
      }

      // Clamp y within viewable buffer
      if (y >= yMin - 15 && y <= yMax + 15) {
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        points.push(`${points.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
    }
    return points.join(' ');
  }, [functionType, paramA, paramB, paramC, paramD]);

  // Current equation LaTeX
  const currentEquationLatex = useMemo(() => {
    if (functionType === 'parabola') {
      const aStr = paramA === 1 ? '' : paramA === -1 ? '-' : `${paramA}`;
      const bSign = paramB >= 0 ? '+' : '-';
      const bStr = Math.abs(paramB) === 1 ? '' : `${Math.abs(paramB)}`;
      const cSign = paramC >= 0 ? '+' : '-';
      return `f(x) = ${aStr}x^2 ${bSign} ${bStr}x ${cSign} ${Math.abs(paramC)}`;
    } else if (functionType === 'linear') {
      const aStr = paramA === 1 ? '' : `${paramA}`;
      const bSign = paramB >= 0 ? '+' : '-';
      return `f(x) = ${aStr}x ${bSign} ${Math.abs(paramB)}`;
    } else if (functionType === 'trig') {
      return `f(x) = ${paramA}\\sin(${paramB}x) ${paramC >= 0 ? '+' : '-'} ${Math.abs(paramC)}`;
    } else {
      return `f(x) = ${paramA}x^3 + ${paramB}x^2 + ${paramC}x + ${paramD}`;
    }
  }, [functionType, paramA, paramB, paramC, paramD]);

  const handleCopyLatex = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = INITIAL_MATH_FORMULAS.filter((f) => {
    const matchesCategory = selectedCategory === 'Hepsi' || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.latexCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'Hepsi',
    'Fonksiyonlar & Parabol',
    'Trigonometri',
    'Türev & İntegral',
    'Polinom & Çarpanlara Ayırma',
    'Geometri & Üçgenler'
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
              <span>Matematik Laboratuvarı & Formül Motoru</span>
              <span aria-hidden="true">·</span>
              <span>Ders İçi & Birebir Hazırlık</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              İnteraktif Grafik Çizici & LaTeX Kütüphanesi
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Dinamik parametreli fonksiyon grafikleri, kök ve tepe noktası analizi, KaTeX formül arşivi ve adım adım soru çözümleri.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTool('grapher')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTool === 'grapher'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fonksiyon Grafiği
            </button>
            <button
              onClick={() => setActiveTool('formulas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTool === 'formulas'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LaTeX Formül Arşivi
            </button>
            <button
              onClick={() => setActiveTool('solver')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeTool === 'solver'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Adım Adım Problem Çözücü
            </button>
          </div>
        </div>
      </div>

      {/* TOOL 1: FUNCTION GRAPHER */}
      {activeTool === 'grapher' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas: SVG Coordinate Plane */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-900">Kartezyen Koordinat Düzlemi</span>
                </div>
                <div className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md font-mono">
                  <LatexFormulaRenderer latex={currentEquationLatex} />
                </div>
              </div>

              {/* SVG Graphic Plane */}
              <div className="relative bg-slate-950 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-2">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto select-none"
                >
                  <defs>
                    <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
                      <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                    </pattern>
                  </defs>

                  {/* Grid background */}
                  <rect width={svgWidth} height={svgHeight} fill="url(#grid)" />

                  {/* X Axis */}
                  <line
                    x1={0}
                    y1={toSvgY(0)}
                    x2={svgWidth}
                    y2={toSvgY(0)}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  {/* Y Axis */}
                  <line
                    x1={toSvgX(0)}
                    y1={0}
                    x2={toSvgX(0)}
                    y2={svgHeight}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Axis tick labels */}
                  {[-6, -4, -2, 2, 4, 6].map((tick) => (
                    <g key={`x-tick-${tick}`}>
                      <line
                        x1={toSvgX(tick)}
                        y1={toSvgY(0) - 3}
                        x2={toSvgX(tick)}
                        y2={toSvgY(0) + 3}
                        stroke="#64748b"
                        strokeWidth="1"
                      />
                      <text
                        x={toSvgX(tick)}
                        y={toSvgY(0) + 14}
                        fill="#64748b"
                        fontSize="10"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {tick}
                      </text>
                    </g>
                  ))}

                  {[-6, -4, -2, 2, 4, 6].map((tick) => (
                    <g key={`y-tick-${tick}`}>
                      <line
                        x1={toSvgX(0) - 3}
                        y1={toSvgY(tick)}
                        x2={toSvgX(0) + 3}
                        y2={toSvgY(tick)}
                        stroke="#64748b"
                        strokeWidth="1"
                      />
                      <text
                        x={toSvgX(0) - 8}
                        y={toSvgY(tick) + 3}
                        fill="#64748b"
                        fontSize="10"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {tick}
                      </text>
                    </g>
                  ))}

                  {/* The mathematical curve */}
                  {curvePoints && (
                    <path
                      d={curvePoints}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Parabola vertex point */}
                  {functionType === 'parabola' && parabolaAnalysis && (
                    <g>
                      <circle
                        cx={toSvgX(parabolaAnalysis.r)}
                        cy={toSvgY(parabolaAnalysis.k)}
                        r="5"
                        fill="#f43f5e"
                      />
                      <text
                        x={toSvgX(parabolaAnalysis.r) + 8}
                        y={toSvgY(parabolaAnalysis.k) - 6}
                        fill="#f43f5e"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        T({parabolaAnalysis.r.toFixed(1)}, {parabolaAnalysis.k.toFixed(1)})
                      </text>

                      {/* Symmetry axis line */}
                      <line
                        x1={toSvgX(parabolaAnalysis.r)}
                        y1={0}
                        x2={toSvgX(parabolaAnalysis.r)}
                        y2={svgHeight}
                        stroke="#f43f5e"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </g>
                  )}

                  {/* Parabola real roots points */}
                  {functionType === 'parabola' &&
                    parabolaAnalysis?.roots.map((rootVal, idx) => (
                      <g key={`root-${idx}`}>
                        <circle
                          cx={toSvgX(rootVal)}
                          cy={toSvgY(0)}
                          r="4"
                          fill="#10b981"
                        />
                        <text
                          x={toSvgX(rootVal)}
                          y={toSvgY(0) - 8}
                          fill="#10b981"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          x={rootVal.toFixed(1)}
                        </text>
                      </g>
                    ))}
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  Tepe Noktası T(r,k)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Kökler
                </span>
              </div>
              <button
                onClick={() => {
                  setParamA(1);
                  setParamB(-4);
                  setParamC(3);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Controls & Mathematical Properties */}
          <div className="lg:col-span-5 space-y-4">
            {/* Function Type Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <label className="text-xs font-bold text-slate-900 block mb-2">
                Fonksiyon Modeli Seçin:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFunctionType('parabola')}
                  className={`p-2.5 text-xs font-semibold rounded-xl text-left border transition ${
                    functionType === 'parabola'
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">Parabol (2. Derece)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ax² + bx + c</div>
                </button>
                <button
                  onClick={() => setFunctionType('linear')}
                  className={`p-2.5 text-xs font-semibold rounded-xl text-left border transition ${
                    functionType === 'linear'
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">Doğrusal Fonksiyon</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">y = mx + n</div>
                </button>
                <button
                  onClick={() => setFunctionType('trig')}
                  className={`p-2.5 text-xs font-semibold rounded-xl text-left border transition ${
                    functionType === 'trig'
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">Trigonometrik (Sinüs)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">a · sin(bx) + c</div>
                </button>
                <button
                  onClick={() => setFunctionType('cubic')}
                  className={`p-2.5 text-xs font-semibold rounded-xl text-left border transition ${
                    functionType === 'cubic'
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">3. Derece Polinom</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ax³ + bx² + cx + d</div>
                </button>
              </div>

              {/* Parameter Sliders */}
              <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Katsayı a:</span>
                    <span className="font-bold font-mono text-indigo-700">{paramA}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={paramA}
                    onChange={(e) => setParamA(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Katsayı b:</span>
                    <span className="font-bold font-mono text-indigo-700">{paramB}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="1"
                    value={paramB}
                    onChange={(e) => setParamB(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
                    <span>Sabit Terim c:</span>
                    <span className="font-bold font-mono text-indigo-700">{paramC}</span>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="1"
                    value={paramC}
                    onChange={(e) => setParamC(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Live Parabola Analysis Card */}
            {functionType === 'parabola' && parabolaAnalysis && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Matematiksel Analiz & Özellikler
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[11px]">Tepe Noktası T(r,k)</span>
                    <span className="font-bold text-slate-900 font-mono">
                      ({parabolaAnalysis.r.toFixed(2)}, {parabolaAnalysis.k.toFixed(2)})
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[11px]">Simetri Ekseni</span>
                    <span className="font-bold text-slate-900 font-mono">
                      x = {parabolaAnalysis.r.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[11px]">Diskriminant (Δ)</span>
                    <span className="font-bold text-indigo-700 font-mono">
                      Δ = {parabolaAnalysis.delta.toFixed(1)}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[11px]">Kollar & Ekstremum</span>
                    <span className="font-bold text-slate-900">
                      {parabolaAnalysis.direction}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-xl text-xs space-y-1">
                  <div className="text-indigo-950 font-semibold">Kökler (f(x) = 0):</div>
                  <div className="font-mono text-slate-800">{parabolaAnalysis.rootsText}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 2: LATEX FORMULA ARCHIVE */}
      {activeTool === 'formulas' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Formül veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormulas.map((formula) => {
              const isCopied = copiedId === formula.id;
              return (
                <div
                  key={formula.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-indigo-700 tracking-wide uppercase">
                          {formula.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {formula.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleCopyLatex(formula.id, formula.latexCode)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition flex items-center gap-1 ${
                          isCopied
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Kopyalandı!' : 'LaTeX Kopyala'}</span>
                      </button>
                    </div>

                    {/* Formula Render Box */}
                    <div className="my-4 p-4 bg-slate-50 rounded-xl flex items-center justify-center overflow-x-auto">
                      <LatexFormulaRenderer latex={formula.latexCode} block={true} />
                    </div>

                    <p className="text-xs text-slate-600">
                      {formula.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                    <span className="font-medium text-slate-600">Örnek Kullanım: </span>
                    {formula.sampleUse}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOOL 3: STEP-BY-STEP MATH PROBLEM SOLVER */}
      {activeTool === 'solver' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Adım Adım Çözümlü Problem Şablonu
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Özel ders föyleri ve sınavlar için basamaklı matematik çözümleri.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSolverTopic('parabol')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  solverTopic === 'parabol'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Parabol & Ekstremum
              </button>
              <button
                onClick={() => setSolverTopic('trig')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  solverTopic === 'trig'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Trigonometri & Yarım Açı
              </button>
              <button
                onClick={() => setSolverTopic('turev')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  solverTopic === 'turev'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Türev & Teğet Eğimi
              </button>
            </div>
          </div>

          {/* Solver Content */}
          {solverTopic === 'parabol' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <span className="text-xs font-bold text-indigo-700 block mb-1">Örnek AYT Soru Kökü:</span>
                <p className="text-sm font-semibold text-slate-900">
                  <LatexFormulaRenderer latex="f(x) = -x^2 + 4x + k - 3" /> fonksiyonunun en büyük değeri 9 olduğuna göre k kaçtır?
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">1. Adım: Başkatsayı ve Parabolün Yönü</span>
                  <p>
                    <LatexFormulaRenderer latex="a = -1 < 0" /> olduğundan parabolün kolları aşağı doğrudur. Dolayısıyla fonksiyon alabileceği en büyük değeri tepe noktasında alır: <LatexFormulaRenderer latex="T(r, k)" />.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">2. Adım: Tepe Noktasının Apsisi (r) Hesabı</span>
                  <p>
                    <LatexFormulaRenderer latex="r = -\frac{b}{2a} = -\frac{4}{2(-1)} = 2" />. Simetri ekseni <LatexFormulaRenderer latex="x = 2" /> doğrusudur.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">3. Adım: Fonksiyon Değeri ve Denklem Eşitleme</span>
                  <p>
                    En büyük değer <LatexFormulaRenderer latex="f(r) = f(2) = 9" /> dur.
                    <br />
                    <LatexFormulaRenderer latex="f(2) = -(2)^2 + 4(2) + k - 3 = -4 + 8 + k - 3 = k + 1 = 9" />
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950">
                  <span className="font-bold block mb-1">Sonuç & Doğrulama:</span>
                  <p className="font-mono text-sm">
                    k + 1 = 9 =&gt; k = 8 bulunur.
                  </p>
                </div>
              </div>
            </div>
          )}

          {solverTopic === 'trig' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <span className="text-xs font-bold text-indigo-700 block mb-1">Örnek Trigonometri Sorusu:</span>
                <p className="text-sm font-semibold text-slate-900">
                  <LatexFormulaRenderer latex="\sin x + \cos x = \frac{1}{2}" /> olduğuna göre <LatexFormulaRenderer latex="\sin(2x)" /> değeri kaçtır?
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">1. Adım: Eşitliğin Her İki Tarafının Karesini Alma</span>
                  <p>
                    <LatexFormulaRenderer latex="(\sin x + \cos x)^2 = \left(\frac{1}{2}\right)^2 \implies \sin^2 x + 2\sin x \cos x + \cos^2 x = \frac{1}{4}" />
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">2. Adım: Temel Özdeşlik ve Yarım Açı Yerine Koyma</span>
                  <p>
                    <LatexFormulaRenderer latex="\sin^2 x + \cos^2 x = 1" /> ve <LatexFormulaRenderer latex="2\sin x \cos x = \sin(2x)" /> formülleri uygulanır:
                    <br />
                    <LatexFormulaRenderer latex="1 + \sin(2x) = \frac{1}{4}" />
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950">
                  <span className="font-bold block mb-1">Sonuç:</span>
                  <p className="font-mono text-sm">
                    \sin(2x) = 1/4 - 1 = -3/4 bulunur.
                  </p>
                </div>
              </div>
            </div>
          )}

          {solverTopic === 'turev' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <span className="text-xs font-bold text-indigo-700 block mb-1">Örnek Türev & Teğet Sorusu:</span>
                <p className="text-sm font-semibold text-slate-900">
                  <LatexFormulaRenderer latex="f(x) = x^3 - 3x^2 + 5" /> eğrisinin <LatexFormulaRenderer latex="x = 2" /> noktasındaki teğetinin denklemi nedir?
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">1. Adım: Değme Noktası Koordinatını Bulma</span>
                  <p>
                    <LatexFormulaRenderer latex="y_0 = f(2) = (2)^3 - 3(2)^2 + 5 = 8 - 12 + 5 = 1" />. Değme noktası: <LatexFormulaRenderer latex="A(2, 1)" />.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-indigo-900 block mb-1">2. Adım: Teğetin Eğimi (m = f'(x₀))</span>
                  <p>
                    <LatexFormulaRenderer latex="f'(x) = 3x^2 - 6x \implies m = f'(2) = 3(2)^2 - 6(2) = 12 - 12 = 0" />. Eğim <LatexFormulaRenderer latex="m = 0" /> (yatay teğet).
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950">
                  <span className="font-bold block mb-1">Sonuç:</span>
                  <p className="font-mono text-sm">
                    y - 1 = 0 · (x - 2) =&gt; y = 1 doğrusudur.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Code2,
  FileText,
  UserCheck,
  GraduationCap,
  Copy,
  Check,
  Download,
  Printer,
  HardDrive,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  Eye,
  EyeOff,
  Calculator,
  BookOpen,
  Layers,
  Quote
} from 'lucide-react';
import { ScenarioLessonNote } from '../types';
import { generateScenarioNotesAPI } from '../services/api';
import { LatexFormulaRenderer, LatexFormulaPlayground } from './LatexFormulaRenderer';

interface ScenariosLatexTabProps {
  currentScenario: ScenarioLessonNote;
  onUpdateScenario: (scenario: ScenarioLessonNote) => void;
  onOpenPrintModal: (content: any) => void;
}

export const ScenariosLatexTab: React.FC<ScenariosLatexTabProps> = ({
  currentScenario,
  onUpdateScenario,
  onOpenPrintModal,
}) => {
  const [activeView, setActiveView] = useState<'teacher' | 'student' | 'latex' | 'math_engine' | 'literature_engine' | 'drive'>('teacher');
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [showStudentAnswers, setShowStudentAnswers] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quick generator form state
  const [genSubject, setGenSubject] = useState(currentScenario.subject);
  const [genGrade, setGenGrade] = useState(currentScenario.grade);
  const [genTopic, setGenTopic] = useState(currentScenario.topic);
  const [genClass, setGenClass] = useState(currentScenario.targetClass);

  const handleGenerateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const generated = await generateScenarioNotesAPI({
        subject: genSubject,
        grade: genGrade,
        targetClass: genClass,
        topic: genTopic,
        periodTime: '09:20 - 10:00',
      });
      onUpdateScenario(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(currentScenario.latexSource);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleDownloadLatex = () => {
    const element = document.createElement('a');
    const file = new Blob([currentScenario.latexSource], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentScenario.subject}_${currentScenario.topic.replace(/\s+/g, '_')}.tex`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              Ders Senaryoları & İki Nüshalı Ders Notları
            </span>
            <span className="text-xs text-slate-300">LaTeX & Google Drive Senkronu</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Öğretmen Nüshası, Öğrenci Föyü ve Derlenebilir LaTeX Kodu
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Öğretmen için çözüm anahtarlı pedagojik akış senaryosu, öğrenci için boşluk doldurmalı çalışma föyü ve Google Drive'da anında PDF çıktısı.
          </p>
        </div>

        {/* Drive Sync Status Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 shrink-0 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-400 text-slate-950">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Drive Bulut Senkronu</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="text-slate-300 truncate max-w-[180px]">{currentScenario.driveFileName}</div>
            <a
              href={currentScenario.driveFileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 hover:text-amber-200 underline text-[11px] font-semibold flex items-center gap-1 mt-0.5"
            >
              Drive Klasörünü Aç <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Generator Accordion / Quick Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <form onSubmit={handleGenerateNew} className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Ders</label>
            <input
              type="text"
              value={genSubject}
              onChange={(e) => setGenSubject(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="w-28">
            <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Sınıf</label>
            <input
              type="text"
              value={genGrade}
              onChange={(e) => setGenGrade(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="w-24">
            <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Şube</label>
            <input
              type="text"
              value={genClass}
              onChange={(e) => setGenClass(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="flex-2 min-w-[200px]">
            <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">Konu Başlığı</label>
            <input
              type="text"
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Üretiliyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Senaryo & Not Üret</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('teacher')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'teacher'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Öğretmen Nüshası (Senaryo & Çözümler)</span>
          </button>

          <button
            onClick={() => setActiveView('student')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'student'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Öğrenci Nüshası (Çalışma Föyü)</span>
          </button>

          <button
            onClick={() => setActiveView('latex')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'latex'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>LaTeX Kodu (.tex)</span>
          </button>

          <button
            onClick={() => setActiveView('math_engine')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'math_engine'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Matematik & LaTeX Motoru (KaTeX)</span>
          </button>

          <button
            onClick={() => setActiveView('literature_engine')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'literature_engine'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Edebiyat & Sözel Zengin Metin</span>
          </button>

          <button
            onClick={() => setActiveView('drive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'drive'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HardDrive className="w-4 h-4 text-amber-500" />
            <span>Drive Senkron Durumu</span>
          </button>
        </div>

        <button
          onClick={() => onOpenPrintModal(currentScenario)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Bu Nüshayı Yazdır / PDF</span>
        </button>
      </div>

      {/* VIEW 1: TEACHER COPY */}
      {activeView === 'teacher' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                GİZLİ &bull; YALNIZCA ÖĞRETMEN İÇİN
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {currentScenario.teacherCopy.title}
              </h2>
              <div className="text-xs text-slate-500">
                Hedef Sınıf: {currentScenario.targetClass} &bull; Konu: {currentScenario.topic}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500">Ders Süresi: 40 Dakika</span>
            </div>
          </div>

          {/* Timeline of the Lesson Scenario */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Dakika Dakika Ders Senaryosu ve Akış Planı</span>
            </h3>

            <div className="space-y-3">
              {currentScenario.teacherCopy.scenarioTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition"
                >
                  <div className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold shrink-0 mt-0.5">
                    {item.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 mb-0.5">{item.phase}</div>
                    <div className="text-xs text-slate-700 leading-relaxed">{item.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedagogical Cues & Common Misconceptions */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Öğretmen İpuçları & Sık Yapılan Kavram Yanılgıları</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-800 list-disc list-inside">
              {currentScenario.teacherCopy.pedagogicalCues.map((cue, idx) => (
                <li key={idx} className="leading-relaxed">{cue}</li>
              ))}
            </ul>
          </div>

          {/* Master Solutions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Uygulama Soruları ve Eksiksiz Çözüm Anahtarı
            </h4>
            <div className="space-y-3">
              {currentScenario.teacherCopy.masterSolutions.map((sol, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white">
                  <div className="text-xs font-bold text-slate-900 mb-2">{sol.question}</div>
                  <div className="bg-emerald-50 text-emerald-900 border border-emerald-200/60 rounded-lg p-3 text-xs leading-relaxed">
                    <span className="font-bold text-emerald-950">Öğretmen Çözüm Notu: </span>
                    {sol.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: STUDENT COPY */}
      {activeView === 'student' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                ÖĞRENCİ ÇALIŞMA YAPRAĞI (FÖY)
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {currentScenario.studentCopy.title}
              </h2>
              <div className="text-xs text-slate-500">
                {currentScenario.grade} &bull; {currentScenario.subject}: {currentScenario.topic}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStudentAnswers(!showStudentAnswers)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                {showStudentAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showStudentAnswers ? 'Cevapları Gizle' : 'Cevapları Göster'}</span>
              </button>
            </div>
          </div>

          {/* Student Summary */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1">
              Konu Özeti ve Kritik Bilgiler
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentScenario.studentCopy.summary}
            </p>
          </div>

          {/* Fill-in-the-blanks */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Boşluk Doldurma Alıştırmaları (Derste Tamamlanacak)
            </h4>
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {currentScenario.studentCopy.fillInTheBlanks.map((sentence, idx) => (
                <div key={idx} className="text-xs text-slate-800 leading-relaxed font-mono">
                  {sentence}
                </div>
              ))}
            </div>
          </div>

          {/* Concept Map */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Kavram Haritası & Karşılaştırma Tablosu
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentScenario.studentCopy.conceptMap.map((c, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-white">
                  <div className="text-xs font-bold text-indigo-800 mb-1">{c.concept}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{c.features}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Questions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Sınıf İçi Uygulama ve Sentez Soruları
            </h4>
            <div className="space-y-3">
              {currentScenario.studentCopy.practiceQuestions.map((q, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <div className="text-xs font-medium text-slate-800 mb-2">{q}</div>
                  <div className="h-16 border-b-2 border-dashed border-slate-200 flex items-end justify-end pb-1 text-[10px] text-slate-400">
                    Öğrenci Çözüm Alanı
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: LATEX CODE */}
      {activeView === 'latex' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg text-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Derlenebilir LaTeX Kaynak Belgesi (.tex)</h3>
                <p className="text-[11px] text-slate-400">Overleaf, TeXLive veya MikTeX ile doğrudan PDF olarak derlenebilir.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLatex}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLatex ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
              </button>

              <button
                onClick={handleDownloadLatex}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.tex İndir</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed border border-slate-800/80 max-h-[500px]">
            {currentScenario.latexSource}
          </pre>
        </div>
      )}

      {/* VIEW: MATH & PHYSICS LATEX ENGINE */}
      {activeView === 'math_engine' && (
        <div className="space-y-6">
          <LatexFormulaPlayground />

          {/* Standard Curriculum Formulas with Live KaTeX Rendering */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>MEB Matematik & Fizik Sık Kullanılan Formül Kütüphanesi</span>
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                KaTeX %100 Uyumlu
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'İkinci Derece Kökler', latex: 'x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', desc: 'Diskriminant Delta > 0 durumu' },
                { title: 'Trigonometrik Temel', latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1', desc: 'Pisagor trigonometrik birim çember' },
                { title: 'Newton 2. Hareket Yasası', latex: '\\sum \\vec{F} = m \\cdot \\vec{a} = \\frac{d\\vec{p}}{dt}', desc: 'Net kuvvet ve ivme ilişkisi' },
                { title: 'Elektriksel Potansiyel (Coulomb)', latex: 'V = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r}', desc: 'Noktasal yük potansiyeli' },
                { title: 'İdeal Gaz Denklemi', latex: 'P \\cdot V = n \\cdot R \\cdot T', desc: 'Basınç, hacim ve sıcaklık' },
                { title: 'Kalkülüs Temel Teoremi', latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)', desc: 'Türev ile integral bağıntısı' },
              ].map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 hover:bg-slate-50 transition space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-center overflow-x-auto min-h-[48px] flex items-center justify-center">
                    <LatexFormulaRenderer latex={item.latex} block={true} />
                  </div>
                  <div className="text-[11px] text-slate-500 italic">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: LITERATURE & VERBAL RICH TEXT ENGINE */}
      {activeView === 'literature_engine' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Edebiyat & Türkçe Zengin Metin Motoru</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      Tipografik Akıcılık & Metin Tahlili
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Şiir/dörtlük vezin dizimi, söz sanatları tahlili ve paragraf anlama metinleri için optimize edilmiş motor
                  </p>
                </div>
              </div>
            </div>

            {/* Dörtlük & Şiir Tahlil Modülü */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-purple-200 bg-purple-50/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-purple-700" />
                    <span>Dörtlük & Şiir Biçimlendirme Modeli</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    11'li Hece (6+5 Duraklı)
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-2xs font-serif text-sm text-slate-800 text-center leading-relaxed space-y-1">
                  <p>Dost elinden dolu bâde içmişim,</p>
                  <p>Mecnun olup dağlar taşlar aşmışım,</p>
                  <p>Aşkın deryâsında coşup taşmışım,</p>
                  <p className="font-bold text-purple-900">Bana seni gerek seni Yûnus\'um.</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-purple-100">
                    <span className="text-[10px] text-slate-500 block">Kafiye Düzeni</span>
                    <strong className="text-slate-800 font-mono">a - a - a - b (Düz)</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-purple-100">
                    <span className="text-[10px] text-slate-500 block">Kafiye & Redif</span>
                    <strong className="text-slate-800 font-mono">-mişim (Redif), -aş (Tam)</strong>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-purple-100">
                    <span className="text-[10px] text-slate-500 block">Nazım Biçimi</span>
                    <strong className="text-slate-800">İlahi / Koşma</strong>
                  </div>
                </div>
              </div>

              {/* Söz Sanatları Etiketleme Paneli */}
              <div className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Metin İçi Edebi Sanat Analizi (Söz Sanatları)</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 font-bold">Teşbih-i Beliğ (Güzel Benzetme)</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Benzeyen + Benzetilen</span>
                    </div>
                    <p className="text-slate-600 italic">&ldquo;Gözlerin bir içim su, saçların gece kadar siyah.&rdquo;</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 font-bold">Tezat (Zıtlık Sanatı)</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Anlamsal Karşıtlık</span>
                    </div>
                    <p className="text-slate-600 italic">&ldquo;Neden böyle düşman görünürsünüz / Yıllar yılı dost bildiğim aynalar?&rdquo; (Cahit Sıtkı)</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 font-bold">Hüsn-i Tâlil (Güzel Nedene Bağlama)</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Hayali Neden</span>
                    </div>
                    <p className="text-slate-600 italic">&ldquo;Sen gelesin diye ey sevgili, yollara güller döküldü.&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paragraf & Hızlı Okuma Kriterleri */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs space-y-2">
              <span className="font-bold text-indigo-950 uppercase tracking-wider block">
                Paragraf Analizi & Anlatım Teknikleri Kriterleri:
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-700">
                <div className="bg-white p-2 rounded-lg border border-indigo-100">
                  <span className="font-bold text-slate-900 block">Öyküleme</span>
                  Olay, kişi, yer ve zaman unsurlarıyla hareketli akış
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100">
                  <span className="font-bold text-slate-900 block">Betimleme</span>
                  Kelimelerle resim çizme, duyulara hitap eden sıfatlar
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100">
                  <span className="font-bold text-slate-900 block">Açıklama</span>
                  Bilgi verme, nesnel tanım ve örneklemeler
                </div>
                <div className="bg-white p-2 rounded-lg border border-indigo-100">
                  <span className="font-bold text-slate-900 block">Tartışma</span>
                  Okuyucunun fikrini değiştirme, soru-cevap monologları
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: DRIVE SYNC */}
      {activeView === 'drive' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Google Drive Entegrasyon Yönetimi</h3>
              <p className="text-xs text-slate-500">
                Ders başladığında ders programı kartında bu klasör ve PDF bağlantısı otomatik olarak belirir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <div className="text-xs font-bold text-slate-900 mb-2">Buluttaki PDF Dosyası</div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div><span className="font-semibold text-slate-800">Dosya Adı:</span> {currentScenario.driveFileName}</div>
                <div><span className="font-semibold text-slate-800">Boyut:</span> 1.4 MB (İki Nüshalı Baskı)</div>
                <div><span className="font-semibold text-slate-800">Format:</span> PDF + LaTeX Kaynağı</div>
                <div><span className="font-semibold text-slate-800">Yetki:</span> Okul Öğretmenleri ve Öğrenci Grubu</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                <a
                  href={currentScenario.driveFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Drive'da Göster</span>
                </a>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 mb-2">Canlı Ders Saati Eşleşmesi</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Öğretmen paneli, zil saatine göre (örn: Pazartesi 08:30 - 09:10) bu dokümanı otomatik olarak "Şu Anki Ders" butonunda gösterir. Öğretmen tek dokunuşla akıllı tahtaya veya öğrenci tabletlerine yansıtabilir.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  Aktif ve Canlı Senkronize
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

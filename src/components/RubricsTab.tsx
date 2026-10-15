import React, { useState } from 'react';
import {
  CheckSquare,
  Award,
  Eye,
  Sliders,
  CheckCircle2,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Rubric } from '../types';

interface RubricsTabProps {
  rubrics: Rubric[];
  onAddRubric: (rubric: Rubric) => void;
}

export const RubricsTab: React.FC<RubricsTabProps> = ({ rubrics, onAddRubric }) => {
  const [selectedRubricId, setSelectedRubricId] = useState<string>(rubrics[0]?.id || '');
  const [viewMode, setViewMode] = useState<'teacher' | 'student'>('teacher');

  // Interactive Live Scoring State for demoing transparent grading
  const [activeScores, setActiveScores] = useState<Record<string, number>>({
    'c-1': 35, // Mükemmel
    'c-2': 20, // İyi
    'c-3': 16, // İyi
    'c-4': 20  // Mükemmel
  });

  const activeRubric = rubrics.find((r) => r.id === selectedRubricId) || rubrics[0];

  const totalCalculatedScore = Object.values(activeScores).reduce((acc, curr) => acc + curr, 0);

  const handleSelectScore = (criterionId: string, score: number) => {
    setActiveScores((prev) => ({
      ...prev,
      [criterionId]: score,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
              MEB Ölçme ve Değerlendirme Standardı
            </span>
            <span className="text-xs text-slate-300">Şeffaf Kriter Matrisi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Performans Rubrikleri ve Anlık Not Şeffaflığı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Kriterler önceden belirlenir; öğretmen tek tıkla kriter düzeyini seçtiğinde öğrenci portalında anında gerekçeli puanlama olarak görünür.
          </p>
        </div>

        {/* View Toggle (Teacher vs Student Portal) */}
        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/15 flex items-center gap-1 shrink-0">
          <button
            onClick={() => setViewMode('teacher')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'teacher'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Öğretmen Puanlama Modu
          </button>
          <button
            onClick={() => setViewMode('student')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'student'
                ? 'bg-teal-500 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Öğrenci Portalı Görünümü
          </button>
        </div>
      </div>

      {/* Main Rubric Layout */}
      {activeRubric && (
        <div className="space-y-6">
          {/* Header Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  {activeRubric.type} Rubrik
                </span>
                <span className="text-xs text-slate-500">{activeRubric.grade} &bull; {activeRubric.subject}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{activeRubric.title}</h2>
            </div>

            {/* Calculated Score Widget */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4 shrink-0">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  {viewMode === 'teacher' ? 'Hesaplanan Toplam Puan' : 'Öğrencinin Anlık Notu'}
                </div>
                <div className="text-2xl font-black text-indigo-700">
                  {totalCalculatedScore} <span className="text-xs text-slate-400 font-semibold">/ 100</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Harf Notu</div>
                <div className="text-sm font-bold text-slate-800">
                  {totalCalculatedScore >= 90 ? 'A+ (Pekiyi)' : totalCalculatedScore >= 80 ? 'A (İyi)' : 'B (Orta)'}
                </div>
              </div>
            </div>
          </div>

          {/* Banner explaining transparency */}
          {viewMode === 'student' && (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 text-xs text-teal-900 flex items-start gap-3">
              <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Öğrenci Şeffaf Takip Paneli: </span>
                Öğrenci bu ekranda hangi kriterden kaç puan aldığını ve öğretmenin belirlediği başarı seviyesinin detaylı açıklamasını tam şeffaflıkla inceleyebilir.
              </div>
            </div>
          )}

          {/* Rubric Criteria Matrix */}
          <div className="space-y-4">
            {activeRubric.criteria.map((crit) => {
              const selectedScore = activeScores[crit.id] ?? crit.levels[crit.levels.length - 1].score;

              return (
                <div
                  key={crit.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs transition"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                        %
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{crit.name}</h3>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Ağırlık: %{crit.weight} (Max: {crit.levels[crit.levels.length - 1].score}p)
                    </span>
                  </div>

                  {/* 4 Levels Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {crit.levels.map((level) => {
                      const isChosen = selectedScore === level.score;

                      return (
                        <div
                          key={level.score}
                          onClick={() => {
                            if (viewMode === 'teacher') {
                              handleSelectScore(crit.id, level.score);
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-xs transition ${
                            isChosen
                              ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-600/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          } ${viewMode === 'teacher' ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`font-bold ${isChosen ? 'text-indigo-950' : 'text-slate-800'}`}>
                              {level.title}
                            </span>
                            {isChosen && (
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {level.description}
                          </p>
                          <div className="mt-2 text-right">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isChosen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {level.score} Puan
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

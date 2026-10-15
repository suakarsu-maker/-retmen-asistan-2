import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Printer,
  Calendar,
  Layers,
  Copy,
  Check,
  Download,
  BookOpen,
  ArrowRight,
  Clock,
  Lightbulb
} from 'lucide-react';
import { LessonPlan } from '../types';
import { generateLessonPlanAPI } from '../services/api';

interface PlansTabProps {
  plans: LessonPlan[];
  onAddPlan: (plan: LessonPlan) => void;
  onSelectPlanForPrint: (plan: LessonPlan) => void;
  onNavigateToScenarios: (plan: LessonPlan) => void;
}

export const PlansTab: React.FC<PlansTabProps> = ({
  plans,
  onAddPlan,
  onSelectPlanForPrint,
  onNavigateToScenarios,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id || '');
  const [planType, setPlanType] = useState<'daily' | 'annual'>('daily');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State for Generator
  const [subject, setSubject] = useState('Biyoloji');
  const [grade, setGrade] = useState('10. Sınıf');
  const [topic, setTopic] = useState('Mayoz Bölünme ve Genetik Varyasyon');
  const [week, setWeek] = useState('12. Hafta (Kasım)');
  const [hours, setHours] = useState(2);
  const [outcomes, setOutcomes] = useState('10.1.2.1. Mayoz bölünmenin evrelerini açıklar ve krossing-over ile çeşitlilik ilişkisini çözümler.');
  const [extraContext, setExtraContext] = useState('Öğrencilerin bitki hücresi ile hayvan hücresinde sitokinez farkını kavramaları amaçlanmaktadır.');

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const newPlan = await generateLessonPlanAPI({
        type: planType,
        subject,
        grade,
        topic,
        week,
        hours,
        learningOutcomes: outcomes,
        extraContext,
      });
      onAddPlan(newPlan);
      setSelectedPlanId(newPlan.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    if (!activePlan) return;
    const content = `MEB DERS PLANI: ${activePlan.title}
Hafta: ${activePlan.weekNumber}
Kazanımlar:
${activePlan.learningOutcomes.join('\n')}

Yöntem ve Teknikler: ${activePlan.methods.join(', ')}
Materyaller: ${activePlan.materials.join(', ')}

Dersin İşleniş Basamakları:
${activePlan.stages.map((s, i) => `${s.stageName}:\n- Etkinlik: ${s.activity}\n- Öğretmen: ${s.teacherRole}\n- Öğrenci: ${s.studentRole}`).join('\n\n')}

Ödev: ${activePlan.homework}
Pedagojik Not: ${activePlan.pedagogicalNotes}`;

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Türkiye Yüzyılı Maarif Modeli
            </span>
            <span className="text-xs text-slate-300">Yıllık & Günlük Plan Asistanı</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            MEB Müfredatına Tam Uyumlu Yıllık ve Günlük Planlar
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Yapay zeka asistanı, yüklediğiniz ders kitapları ve kazanımlara göre 5E modeline uygun resmi planları saniyeler içinde oluşturur.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlanType('daily')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              planType === 'daily'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            Günlük Ders Planı
          </button>
          <button
            onClick={() => setPlanType('annual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              planType === 'annual'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
          >
            Yıllık Çalışma Planı
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Plan Generator & Plan List */}
        <div className="lg:col-span-5 space-y-6">
          {/* Generator Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Yapay Zeka ile {planType === 'daily' ? 'Günlük Plan' : 'Yıllık Plan'} Oluştur</span>
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                Gemini 3.8
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ders</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="Biyoloji">Biyoloji</option>
                    <option value="Fizik">Fizik</option>
                    <option value="Kimya">Kimya</option>
                    <option value="Matematik">Matematik</option>
                    <option value="Fen Bilimleri">Fen Bilimleri</option>
                    <option value="Türk Dili ve Edebiyatı">Türk Dili ve Edebiyatı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sınıf</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="9. Sınıf">9. Sınıf</option>
                    <option value="10. Sınıf">10. Sınıf</option>
                    <option value="11. Sınıf">11. Sınıf</option>
                    <option value="12. Sınıf">12. Sınıf</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Konu Başlığı</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Örn: Mayoz Bölünme ve Krossing-over"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hafta / Ay</label>
                  <input
                    type="text"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ders Saati</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">MEB Kazanımı</label>
                <textarea
                  rows={2}
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pedagojik Not / Odak</label>
                <input
                  type="text"
                  value={extraContext}
                  onChange={(e) => setExtraContext(e.target.value)}
                  placeholder="Örn: Simülasyonla gösterim, BEP uyarlaması"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>MEB Maarif Formatında Hazırlanıyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Resmi Planı Üret</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Plan History / Library */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Kayıtlı Planlarım ({plans.length})
            </h4>
            <div className="space-y-2">
              {plans.map((p) => {
                const isSelected = p.id === activePlan?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`w-full text-left p-3 rounded-xl border transition ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-indigo-700">{p.weekNumber}</span>
                      <span>{p.grade}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{p.topic}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Preview Card: Comprehensive Plan Viewer */}
        <div className="lg:col-span-7">
          {activePlan ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {activePlan.grade} &bull; {activePlan.subject}
                    </span>
                    <span className="text-xs text-slate-500">{activePlan.weekNumber}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {activePlan.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyText}
                    className="p-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center gap-1.5"
                    title="Plan Metnini Kopyala"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
                  </button>

                  <button
                    onClick={() => onSelectPlanForPrint(activePlan)}
                    className="p-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition flex items-center gap-1.5"
                    title="A4 Yazdır / PDF İndir"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Yazdır / PDF</span>
                  </button>

                  <button
                    onClick={() => onNavigateToScenarios(activePlan)}
                    className="px-3 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>Ders Senaryosuna Geç</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Kazanımlar & Beceriler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Hedef MEB Kazanımları
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    {activePlan.learningOutcomes.map((out, idx) => (
                      <li key={idx}>{out}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                  <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                    Hedeflenen Beceriler & Metotlar
                  </div>
                  <div className="space-y-1 text-xs text-slate-700">
                    <div><span className="font-semibold">Beceriler:</span> {activePlan.targetSkills?.join(', ')}</div>
                    <div><span className="font-semibold">Yöntemler:</span> {activePlan.methods?.join(', ')}</div>
                    <div><span className="font-semibold">Materyaller:</span> {activePlan.materials?.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* 5E / İşleniş Basamakları */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Dersin İşleniş Süreci & 5E Pedagojik Basamakları
                </h4>
                <div className="space-y-3">
                  {activePlan.stages.map((stage, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-3.5 bg-white hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-indigo-900">{stage.stageName}</span>
                        <span className="text-[10px] font-semibold text-slate-400">Adım {idx + 1}</span>
                      </div>
                      <p className="text-xs text-slate-800 mb-2 leading-relaxed">{stage.activity}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-lg p-2 border border-slate-100">
                        <div>
                          <span className="font-semibold text-indigo-700">Öğretmen Rolü: </span>
                          <span className="text-slate-600">{stage.teacherRole}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-sky-700">Öğrenci Rolü: </span>
                          <span className="text-slate-600">{stage.studentRole}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Homework and Pedagogical Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-xs">
                  <div className="font-bold text-amber-900 mb-1">Verilecek Ödev & Takip</div>
                  <p className="text-amber-800">{activePlan.homework}</p>
                </div>
                <div className="bg-sky-50/60 border border-sky-200/60 rounded-xl p-3 text-xs">
                  <div className="font-bold text-sky-900 mb-1">Pedagojik Not & Farklılaştırılmış Öğretim</div>
                  <p className="text-sky-800">{activePlan.pedagogicalNotes}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              Henüz bir plan seçilmedi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

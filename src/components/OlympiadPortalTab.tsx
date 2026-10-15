import React, { useState } from 'react';
import {
  Award,
  Zap,
  Clock,
  Calendar,
  Sparkles,
  BookOpen,
  Code2,
  Users,
  Target,
  ExternalLink,
  Flame,
  CheckCircle2,
  BrainCircuit,
  Calculator,
  Atom,
  HelpCircle
} from 'lucide-react';
import {
  OlympiadLessonTopic,
  OlympiadCalendarEvent,
  OlympiadTeamMember,
  SubjectCognitiveMetric,
  OlympiadBranch
} from '../types';
import { LatexFormulaRenderer, LatexFormulaPlayground } from './LatexFormulaRenderer';

interface OlympiadPortalTabProps {
  topics: OlympiadLessonTopic[];
  events: OlympiadCalendarEvent[];
  teamMembers: OlympiadTeamMember[];
  cognitiveMetrics: SubjectCognitiveMetric[];
  onOpenPrintModal: (content: any) => void;
}

export const OlympiadPortalTab: React.FC<OlympiadPortalTabProps> = ({
  topics,
  events,
  teamMembers,
  cognitiveMetrics,
  onOpenPrintModal,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<OlympiadBranch | 'Hepsi'>('Biyoloji');
  const [activeSubTab, setActiveSubTab] = useState<'topics' | 'events' | 'team' | 'difficulty'>('topics');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [customGenSuccess, setCustomGenSuccess] = useState(false);

  const filteredTopics = topics.filter(
    (t) => selectedBranch === 'Hepsi' || t.branch === selectedBranch
  );

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || filteredTopics[0] || topics[0];

  const handleSimulateAIOlympiadQuestion = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
      setCustomGenSuccess(true);
      setTimeout(() => setCustomGenSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              TÜBİTAK BİDEB 2202 & Uluslararası Bilim Olimpiyatları
            </span>
            <span className="text-xs text-slate-300">İleri Düzey Yetenek Geliştirme Portalı</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Bilim Olimpiyatları Hazırlık & İleri Müfredat Portalı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Öğretmenin branşıyla doğrudan ilişkilendirilmiş Campbell Biyoloji & üniversite düzeyi ders notları, çıkmış TÜBİTAK soruları, kamp takvimi ve başvuru geri sayımları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('difficulty')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tüm Derslerde Eşit Performans & LaTeX</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar & Branch Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('topics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'topics'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Olimpiyat Notları & Soru Bankası</span>
          </button>

          <button
            onClick={() => setActiveSubTab('events')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'events'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Takvim & Başvuru Geri Sayımı ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('team')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'team'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Olimpiyat Takımı Öğrencileri ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('difficulty')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'difficulty'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Tüm Derslerde Eşit Performans & Disiplin Motoru</span>
          </button>
        </div>

        {/* Branch Selector */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Branş:</span>
          {(['Biyoloji', 'Matematik', 'Fizik', 'Kimya', 'Hepsi'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b as any)}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                selectedBranch === b
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {customGenSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Yapay zeka başarıyla Campbell ve Lehninger Biyokimya düzeyinde yeni bir analitik olimpiyat sorusu ve LaTeX ispatlı çözümünü üretti!</span>
        </div>
      )}

      {/* SUBTAB 1: OLYMPIAD LESSON TOPICS & SOLVED QUESTIONS */}
      {activeSubTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Topics List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {selectedBranch} Olimpiyat Müfredat Modülleri
              </h3>
              <button
                onClick={handleSimulateAIOlympiadQuestion}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAI ? 'Soru Üretiliyor...' : 'AI Olimpiyat Sorusu Üret'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredTopics.map((topic) => {
                const isSelected = topic.id === activeTopic?.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                        {topic.branch}
                      </span>
                      <span className="text-slate-500 font-semibold">{topic.difficultyLevel}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">{topic.topicName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{topic.campbellOrAdvancedRef}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Topic Details, Formulas & Solved TÜBİTAK Question */}
          <div className="lg:col-span-7">
            {activeTopic && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                        {activeTopic.difficultyLevel}
                      </span>
                      <span className="text-xs text-slate-500">{activeTopic.campbellOrAdvancedRef}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {activeTopic.topicName}
                    </h2>
                  </div>

                  <button
                    onClick={() => onOpenPrintModal(activeTopic)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
                  >
                    Föyü Yazdır / PDF
                  </button>
                </div>

                {/* Summary Notes */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    İleri Düzey Teori ve Mekanizma:
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {activeTopic.summaryNotes}
                  </p>
                </div>

                {/* LaTeX Formula Display */}
                {activeTopic.latexProofFormula && (
                  <div className="bg-slate-900 rounded-xl p-4 text-amber-300 font-mono text-xs border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">
                      Matematiksel / Termodinamik LaTeX Formülü:
                    </div>
                    <div className="text-sm font-bold text-amber-200 py-1 overflow-x-auto">
                      {activeTopic.latexProofFormula}
                    </div>
                  </div>
                )}

                {/* Solved TÜBİTAK Question */}
                <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      Çıkmış Sınav Sorusu: {activeTopic.solvedPastQuestion.year}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      Olimpiyat Düzeyi
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    "{activeTopic.solvedPastQuestion.questionText}"
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-amber-200/80 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-emerald-900">İspatlı ve Detaylı Çözüm Basamakları:</div>
                    <p className="text-slate-800 leading-relaxed">
                      {activeTopic.solvedPastQuestion.solutionProof}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: CALENDAR & DEADLINE COUNTDOWN */}
      {activeSubTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              TÜBİTAK BİDEB 2202 ve Uluslararası Olimpiyat Takvimi
            </h3>
            <span className="text-xs text-slate-500">2027 Bilim Olimpiyatları Dönemi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {ev.branch}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ev.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{ev.title}</h4>
                  <div className="text-[11px] text-slate-500">{ev.organizer}</div>

                  {/* Countdown Badge */}
                  <div className="my-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-center">
                    <div className="text-[10px] uppercase font-bold text-amber-800">Sınav / Kamp Geri Sayımı</div>
                    <div className="text-2xl font-black text-amber-900">
                      {ev.daysRemaining} <span className="text-xs font-semibold text-slate-500">Gün Kaldı</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div><span className="font-semibold text-slate-800">Son Başvuru:</span> {ev.applicationDeadline}</div>
                    <div><span className="font-semibold text-slate-800">Etkinlik Tarihi:</span> {ev.examOrCampDate}</div>
                    <div><span className="font-semibold text-slate-800">Sınav Yeri:</span> {ev.location}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={ev.officialBidebUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition"
                  >
                    <span>Resmi BİDEB Sayfasına Git</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: TEAM MEMBERS & STUDY PERFORMANCE */}
      {activeSubTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Okul Olimpiyat Takımı Kadrosu & Soru Çözüm İstatistikleri
            </h3>
            <span className="text-xs text-slate-500">Haftalık 10+ Saat Yoğun Kamp Programı</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                      {member.fullName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{member.fullName}</h4>
                      <div className="text-[11px] text-slate-400">{member.className} &bull; No: {member.studentNumber}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {member.targetMedal}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Deneme Sınav Neti</div>
                    <div className="text-lg font-black text-indigo-700">{member.trialExamNet} / 100</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Çözülen Soru Sayısı</div>
                    <div className="text-lg font-black text-emerald-700">{member.solvedQuestionsCount}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Haftalık Çalışma Taahhüdü:</span>
                  <span className="font-bold text-slate-800">{member.weeklyHoursCommitted} Saat / Hafta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: TÜM DERSLERDE EŞİT VE ÜSTÜN PERFORMANS MİMARİSİ */}
      {activeSubTab === 'difficulty' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Disiplinler Arası Tam Entegrasyon & Sıfır Gecikme
              </span>
              <span className="text-xs text-indigo-200">MEB Uyumlu Performans Mimarisi</span>
            </div>
            <h3 className="text-lg font-bold">
              Tüm Derslerde Eşit ve Üstün Performans Motoru (LaTeX, Zengin Metin & İlkokul Çoklu Branş)
            </h3>
            <p className="text-xs text-indigo-100 mt-2 leading-relaxed max-w-3xl">
              Programımızda hiçbir derse yapay &quot;zorluk katsayısı&quot; veya &quot;bilişsel ceza&quot; yüklenmez. Edebiyat ve sözel derslerde ağırlıklı zengin metin, paragraf analizi ve edebi sanatlar kullanılırken; Matematik ve Fizik derslerinde donanım hızlandırmalı KaTeX LaTeX formül motoru devreye girer. Sınıf öğretmenleri için ise günün 6 dersinin tamamını tek tıkla sınıf defterine işleyen çoklu branş motoru sunulur. Böylece tüm derslerde eşit ve maksimum akıcılık sağlanır.
            </p>
          </div>

          {/* Interactive KaTeX Formula Playground */}
          <LatexFormulaPlayground />

          {/* Discipline Profiles Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Ders Bazlı Optimize Edilmiş Özel Motorlar ve Canlı Çıktılar</span>
            </h4>

            {cognitiveMetrics.map((metric) => (
              <div key={metric.subject} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {metric.subject[0]}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{metric.subject}</h4>
                      <div className="text-[11px] text-slate-500">
                        Atanmış Motor: <strong className="text-indigo-700">{metric.engineName || 'Özel Pedagojik Motor'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {metric.performanceOptimization || '%100 Üstün Performans'}
                    </span>
                  </div>
                </div>

                {/* Features & Pedagogical Guidance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Derse Özel Geliştirilen Araçlar:</span>
                    </div>
                    {metric.engineFeatures && metric.engineFeatures.length > 0 ? (
                      <ul className="space-y-1">
                        {metric.engineFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-600">{metric.struggleReason}</p>
                    )}
                  </div>

                  <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 space-y-2">
                    <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Pedagojik Destek ve Çalışma Yaklaşımı:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{metric.pedagogicalAdvice}</p>
                  </div>
                </div>

                {/* Sample Live Output / Formula Rendering */}
                {metric.sampleLatexOrText && (
                  <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 text-xs font-mono">
                    <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center justify-between">
                      <span>Canlı Örnek Çıktı:</span>
                      <span className="text-emerald-400 font-normal">Donanım Hızlandırmalı Render</span>
                    </div>
                    {metric.primaryEngine === 'latex_math' ? (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center text-sm text-indigo-300 overflow-x-auto">
                        <LatexFormulaRenderer latex={metric.sampleLatexOrText} block={true} />
                      </div>
                    ) : (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300 font-sans italic text-xs">
                        &quot;{metric.sampleLatexOrText}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

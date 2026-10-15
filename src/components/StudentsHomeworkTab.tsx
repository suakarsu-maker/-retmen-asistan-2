import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  Award,
  AlertTriangle,
  Search,
  Plus,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Bookmark,
  Flame,
  BarChart3,
  ToggleLeft,
  ToggleRight,
  X,
  Reply,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Student, HomeworkSubmission, StudentSubmittedQuestion } from '../types';
import { evaluateHomeworkAPI } from '../services/api';
import { LatexFormulaRenderer } from './LatexFormulaRenderer';

interface StudentsHomeworkTabProps {
  students: Student[];
  homeworks: HomeworkSubmission[];
  submittedQuestions?: StudentSubmittedQuestion[];
  isQuestionSubmissionEnabled?: boolean;
  onUpdateHomework: (hw: HomeworkSubmission) => void;
  onAddHomeworkSubmission: (hw: HomeworkSubmission) => void;
  onAnswerQuestion?: (questionId: string, answer: string, answerLatex?: string, hint?: string) => void;
  onToggleQuestionDeficiency?: (questionId: string) => void;
  onToggleQuestionSubmissionEnabled?: () => void;
  onNavigateToFormulaCards?: (studentName: string, topicName: string) => void;
}

export const StudentsHomeworkTab: React.FC<StudentsHomeworkTabProps> = ({
  students,
  homeworks,
  submittedQuestions = [],
  isQuestionSubmissionEnabled = true,
  onUpdateHomework,
  onAddHomeworkSubmission,
  onAnswerQuestion,
  onToggleQuestionDeficiency,
  onToggleQuestionSubmissionEnabled,
  onNavigateToFormulaCards,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'submissions' | 'questions_analysis' | 'students'>('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);

  // Question Reply Modal State
  const [replyingQuestion, setReplyingQuestion] = useState<StudentSubmittedQuestion | null>(null);
  const [replyAnswerText, setReplyAnswerText] = useState('');
  const [replyLatexText, setReplyLatexText] = useState('');
  const [replyHintText, setReplyHintText] = useState('');
  const [questionTopicFilter, setQuestionTopicFilter] = useState('Tümü');
  const [questionStatusFilter, setQuestionStatusFilter] = useState<'Tümü' | 'Beklemede' | 'Çözüldü' | 'Eksikler'>('Tümü');

  // New Simulation Submission Modal
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simStudentName, setSimStudentName] = useState('Barış Demir');
  const [simAssignmentTitle, setSimAssignmentTitle] = useState('Mitoz Bölünme Evreleri ve Karyotip Karşılaştırmalı Raporu');
  const [simText, setSimText] = useState('Öğretmenim, mitozda hücre interfaz geçirir. Profazda çekirdek erir, metafazda iğ ipliklerine tutunup ortaya dizilir. Karyotip analizi metafazda yapılır çünkü en net bu evrede görülür. Anafazda kromatitler çekilir. Bitkide ara lamel olur.');

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentNumber.includes(searchQuery) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEvaluateWithAI = async (submission: HomeworkSubmission) => {
    setEvaluatingId(submission.id);
    try {
      const evaluation = await evaluateHomeworkAPI({
        studentName: submission.studentName,
        assignmentTitle: submission.assignmentTitle,
        studentSubmission: submission.submissionText,
        rubricCriteria: [
          'Kavramsal Doğruluk ve Mantık (40p)',
          'Bilimsel Terminoloji ve Dil (30p)',
          'Gerekçelendirme ve Örnek Düzeyi (30p)'
        ]
      });

      const updated: HomeworkSubmission = {
        ...submission,
        ...evaluation,
        status: 'Değerlendirildi',
      };
      onUpdateHomework(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluatingId(null);
    }
  };

  const handleCreateSimulatedSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission: HomeworkSubmission = {
      id: 'sub-' + Date.now(),
      assignmentId: 'hw-gen',
      assignmentTitle: simAssignmentTitle,
      studentId: 'std-custom',
      studentName: simStudentName,
      className: '10-B',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Bugün',
      status: 'Bekliyor',
      submissionText: simText,
    };
    onAddHomeworkSubmission(newSubmission);
    setShowSimulateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
              Online Öğrenci Takibi & Geri Bildirim
            </span>
            <span className="text-xs text-slate-300">Otomatik Yapay Zeka Ödev Kontrolü</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ödev Verme, Anlık Rubrik Notlandırma ve Öğrenciye Dönüt
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Öğrencilerin online teslim ettiği ödevler rubriğe göre otomatik taranır, kriter puanları ayrıştırılır ve hem öğrenciye hem öğretmene şeffaf dönüt sunulur.
          </p>
        </div>

        <button
          onClick={() => setShowSimulateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Öğrenci Ödev Teslimi Simüle Et</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeSubTab === 'submissions'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Gelen Ödevler ({homeworks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('questions_analysis')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeSubTab === 'questions_analysis'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Gelen Öğrenci Soruları & Analiz ({submittedQuestions.length})</span>
          {submittedQuestions.filter((q) => q.status === 'Beklemede').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-black">
              {submittedQuestions.filter((q) => q.status === 'Beklemede').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
            activeSubTab === 'students'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Sınıf Listesi & Devamsızlık ({students.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: SUBMISSIONS & AI EVALUATION */}
      {activeSubTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Öğrencilerden Gelen Dijital Çözümler ve Değerlendirme Havuzu
            </h3>
            <span className="text-xs text-slate-500">
              Rubrik: MEB Standart Performans Rubriği
            </span>
          </div>

          <div className="space-y-4">
            {homeworks.map((hw) => {
              const isGraded = hw.status === 'Değerlendirildi';
              const isLoading = evaluatingId === hw.id;

              return (
                <div
                  key={hw.id}
                  className={`border rounded-2xl p-5 transition bg-white shadow-xs ${
                    isGraded ? 'border-slate-200' : 'border-amber-300 ring-2 ring-amber-400/20'
                  }`}
                >
                  {/* Submission Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {hw.studentName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{hw.studentName}</span>
                          <span className="text-xs font-semibold px-2 py-0.2 rounded-md bg-slate-100 text-slate-700">
                            {hw.className}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">{hw.assignmentTitle} &bull; Teslim: {hw.submittedAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isGraded ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Not: {hw.score} / 100 ({hw.letterGrade})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Değerlendirme Bekliyor
                        </span>
                      )}

                      {!isGraded && (
                        <button
                          onClick={() => handleEvaluateWithAI(hw)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Rubrik Taranıyor...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI ile Otomatik Puanla</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submission Text */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Öğrencinin Çözüm Metni:
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-800 leading-relaxed border border-slate-100">
                      "{hw.submissionText}"
                    </div>
                  </div>

                  {/* If graded: Show Breakdown & Student Message */}
                  {isGraded && (
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      {/* Rubric Criteria Breakdown */}
                      {hw.criteriaScores && hw.criteriaScores.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Rubrik Kriter Puanlama Dökümü:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {hw.criteriaScores.map((c, idx) => (
                              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs">
                                <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                                  <span>{c.criterion}</span>
                                  <span className="text-indigo-600">{c.given}/{c.max}p</span>
                                </div>
                                <div className="text-[11px] text-slate-600">{c.comment}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Feedback & Student Visible Note */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
                          <span className="font-bold text-emerald-950 flex items-center gap-1 mb-1">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            Öğretmen Değerlendirmesi & Güçlü Yönler:
                          </span>
                          <p className="text-emerald-900 leading-relaxed">{hw.feedback}</p>
                        </div>

                        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3">
                          <span className="font-bold text-sky-950 flex items-center gap-1 mb-1">
                            <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                            Öğrenci Ekranında Anlık Görünen Mesaj:
                          </span>
                          <p className="text-sky-900 leading-relaxed">{hw.studentMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB: QUESTIONS & DEFICIENCY ANALYSIS */}
      {activeSubTab === 'questions_analysis' && (
        <div className="space-y-6">
          {/* Header & Question Submission Toggle Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                  Öğrenci Soru Analitiği
                </span>
                <span className="text-xs text-slate-500">
                  {submittedQuestions.length} Toplam Soru Alındı
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Gelen Öğrenci Soruları & Soru Tabanlı Eksik Analizi
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
                Öğrencilerin takıldıkları sorular taranarak soru yoğunluğu yaşanan konular otomatik tespit edilir ve eksik kazanım haritasına bağlanır.
              </p>
            </div>

            {/* Toggle Switch to disable question receiving if teacher desires (Directly addresses prompt) */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl shrink-0">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">
                  {isQuestionSubmissionEnabled ? 'Soru Alımı Açık' : 'Soru Alımı Durduruldu'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isQuestionSubmissionEnabled ? 'Öğrenciler soru iletebiliyor' : 'Sistem yavaşlamasını önlemek için kapalı'}
                </div>
              </div>
              <button
                onClick={onToggleQuestionSubmissionEnabled}
                className={`p-1 rounded-xl transition ${
                  isQuestionSubmissionEnabled ? 'text-emerald-600' : 'text-slate-400'
                }`}
                title={isQuestionSubmissionEnabled ? 'Soru Alımını Geçici Olarak Durdur' : 'Soru Alımını Aç'}
              >
                {isQuestionSubmissionEnabled ? (
                  <ToggleRight className="w-8 h-8" />
                ) : (
                  <ToggleLeft className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>

          {/* Soru Yoğunluk & Eksik Konu Analizi Grafiği */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Konulara Göre Soru Frekansı & Kritik Eksik Haritası
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Öğrenci sorularından otomatik derlenen kazanım yoğunluğu
              </span>
            </div>

            {/* Dynamic Topic Frequency Calculation */}
            {(() => {
              const topicCounts: Record<string, { count: number; studentNames: Set<string>; hasDeficiency: boolean }> = {};
              submittedQuestions.forEach((q) => {
                if (!topicCounts[q.topic]) {
                  topicCounts[q.topic] = { count: 0, studentNames: new Set(), hasDeficiency: false };
                }
                topicCounts[q.topic].count += 1;
                topicCounts[q.topic].studentNames.add(q.studentName);
                if (q.isFlaggedAsDeficiency) {
                  topicCounts[q.topic].hasDeficiency = true;
                }
              });

              const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1].count - a[1].count);

              if (sortedTopics.length === 0) {
                return (
                  <div className="py-6 text-center text-xs text-slate-400">
                    Henüz soru verisi bulunmuyor.
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortedTopics.map(([topic, data]) => {
                    const percentage = Math.round((data.count / (submittedQuestions.length || 1)) * 100);
                    return (
                      <div key={topic} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 truncate max-w-[200px]" title={topic}>{topic}</span>
                          <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {data.count} Soru ({percentage}%)
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${percentage > 35 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                            style={{ width: `${Math.min(100, percentage * 2)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span className="truncate">Soranlar: {Array.from(data.studentNames).join(', ')}</span>
                          {data.hasDeficiency && (
                            <span className="text-rose-600 font-bold shrink-0">⚠️ Eksik</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Filter Bar & Questions List */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['Tümü', 'Beklemede', 'Çözüldü', 'Eksikler'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setQuestionStatusFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      questionStatusFilter === filter
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {filter === 'Eksikler' ? '⚠️ Eksik Olarak İşaretlenenler' : filter}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-500">
                {submittedQuestions.length} sorudan{' '}
                {submittedQuestions.filter((q) => {
                  if (questionStatusFilter === 'Beklemede') return q.status === 'Beklemede';
                  if (questionStatusFilter === 'Çözüldü') return q.status === 'Çözüldü';
                  if (questionStatusFilter === 'Eksikler') return q.isFlaggedAsDeficiency;
                  return true;
                }).length}{' '}
                tanesi listeleniyor
              </span>
            </div>

            {/* Questions Grid */}
            <div className="space-y-4">
              {submittedQuestions
                .filter((q) => {
                  if (questionStatusFilter === 'Beklemede') return q.status === 'Beklemede';
                  if (questionStatusFilter === 'Çözüldü') return q.status === 'Çözüldü';
                  if (questionStatusFilter === 'Eksikler') return q.isFlaggedAsDeficiency;
                  return true;
                })
                .map((q) => {
                  const isAnswered = q.status === 'Çözüldü';
                  return (
                    <div
                      key={q.id}
                      className={`border rounded-2xl p-5 transition bg-white shadow-xs space-y-3 ${
                        q.isFlaggedAsDeficiency
                          ? 'border-rose-300 ring-1 ring-rose-400/20'
                          : isAnswered
                          ? 'border-slate-200'
                          : 'border-amber-300 ring-2 ring-amber-400/20'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {q.studentName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{q.studentName}</span>
                              <span className="text-xs text-slate-500 font-semibold">{q.className}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                {q.topic}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Tarih: {q.submittedAt} &bull; Zorluk: <strong className="text-slate-600">{q.difficulty}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {q.isFlaggedAsDeficiency && (
                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Eksik Kazanım Analizinde</span>
                            </span>
                          )}

                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                            isAnswered
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}>
                            {q.status}
                          </span>
                        </div>
                      </div>

                      {/* Question Text & Latex */}
                      <div className="space-y-2">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {q.questionText}
                        </p>
                        {q.questionLatex && (
                          <div className="py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-center overflow-x-auto text-xs">
                            <LatexFormulaRenderer latex={q.questionLatex} block />
                          </div>
                        )}
                      </div>

                      {/* Teacher's Answer Section (If answered) */}
                      {isAnswered && (
                        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold text-emerald-950">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Öğretmen Çözümü & Açıklaması:</span>
                            </span>
                          </div>
                          <p className="text-emerald-900 leading-relaxed">
                            {q.teacherAnswer}
                          </p>
                          {q.teacherAnswerLatex && (
                            <div className="py-2 px-3 bg-white rounded-lg border border-emerald-200 text-center overflow-x-auto">
                              <LatexFormulaRenderer latex={q.teacherAnswerLatex} block />
                            </div>
                          )}
                          {q.teacherPedagogicalHint && (
                            <div className="flex items-center gap-1.5 text-[11px] text-indigo-800 bg-white/80 p-2 rounded-lg border border-emerald-100">
                              <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span><strong>Püf Noktası:</strong> {q.teacherPedagogicalHint}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Card Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setReplyingQuestion(q);
                              setReplyAnswerText(q.teacherAnswer || '');
                              setReplyLatexText(q.teacherAnswerLatex || '');
                              setReplyHintText(q.teacherPedagogicalHint || '');
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>{isAnswered ? 'Çözümü Güncelle' : 'Soruyu Yanıtla & Çözüm Ekle'}</span>
                          </button>

                          <button
                            onClick={() => onToggleQuestionDeficiency && onToggleQuestionDeficiency(q.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition flex items-center gap-1.5 ${
                              q.isFlaggedAsDeficiency
                                ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{q.isFlaggedAsDeficiency ? 'Eksik Analizinden Kaldır' : 'Öğrenci Eksiklerine Ekle'}</span>
                          </button>
                        </div>

                        {onNavigateToFormulaCards && (
                          <button
                            onClick={() => onNavigateToFormulaCards(q.studentName, q.topic)}
                            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Bu Konunun Formül Kartını Aç</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CLASS ROSTER & ATTENDANCE */}
      {activeSubTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900">
              10-B Sınıfı Öğrenci Künyeleri ve Akademik Durum Tablosu
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Öğrenci veya numara ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Adı Soyadı</th>
                    <th className="px-4 py-3">Sınıf</th>
                    <th className="px-4 py-3">Devamsızlık</th>
                    <th className="px-4 py-3">Performans Ort.</th>
                    <th className="px-4 py-3">BEP Durumu</th>
                    <th className="px-4 py-3">Veli İletişim</th>
                    <th className="px-4 py-3">Öğretmen Notu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-4 py-3 font-mono font-bold text-slate-700">{s.studentNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{s.fullName}</td>
                      <td className="px-4 py-3 text-slate-600">{s.className}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                            s.attendanceDaysMissed > 4
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {s.attendanceDaysMissed} Gün
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                          {s.overallScore} / 100
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {s.bepStatus ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                            BEP Planı Var
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Normal</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{s.parentContact}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{s.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal to simulate online student submission */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Online Öğrenci Ödev Gönderimi Simülasyonu
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Öğrencinin sistem üzerinden sisteme yüklediği yanıtı test etmek için giriniz.
            </p>
            <form onSubmit={handleCreateSimulatedSubmission} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Öğrenci</label>
                <select
                  value={simStudentName}
                  onChange={(e) => setSimStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="Barış Demir">Barış Demir (10-B / No: 205)</option>
                  <option value="Elif Ceren Şahin">Elif Ceren Şahin (10-B / No: 241)</option>
                  <option value="Mert Aksoy">Mert Aksoy (10-B / No: 312)</option>
                  <option value="Selin Doğan">Selin Doğan (10-A / No: 344)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ödev Başlığı</label>
                <input
                  type="text"
                  value={simAssignmentTitle}
                  onChange={(e) => setSimAssignmentTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Öğrencinin Çözüm Cevabı</label>
                <textarea
                  rows={4}
                  required
                  value={simText}
                  onChange={(e) => setSimText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
                >
                  Sisteme Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

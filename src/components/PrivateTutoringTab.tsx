import React, { useState, useMemo } from 'react';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Plus,
  BookOpen,
  Send,
  Phone,
  Target,
  Printer,
  X,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Sliders,
  Filter,
  Copy,
  Check,
  Share2,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ArrowRight,
  Download
} from 'lucide-react';
import {
  PrivateStudent,
  PrivateLessonSession,
  PrivateTopicMastery,
  ExamTarget
} from '../types';
import { LatexFormulaRenderer } from './LatexFormulaRenderer';
import { getTopicSummaryCard, CriticalFormulaCardData } from '../data/topicFormulaDatabase';

interface PrivateTutoringTabProps {
  students: PrivateStudent[];
  sessions: PrivateLessonSession[];
  topics: PrivateTopicMastery[];
  onAddStudent: (student: PrivateStudent) => void;
  onAddSession: (session: PrivateLessonSession) => void;
  onUpdateSessionStatus: (sessionId: string, status: PrivateLessonSession['status'], isPaid?: boolean) => void;
  onUpdateTopicMastery: (topicId: string, status: PrivateTopicMastery['status'], masteryPercent: number, solvedQuestions: number) => void;
}

export const PrivateTutoringTab: React.FC<PrivateTutoringTabProps> = ({
  students,
  sessions,
  topics,
  onAddStudent,
  onAddSession,
  onUpdateSessionStatus,
  onUpdateTopicMastery
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'schedule' | 'mastery' | 'finance' | 'summary_cards'>('students');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  
  // Modals & Card States
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportStudentId, setReportStudentId] = useState<string>(students[0]?.id || '');
  const [selectedCardData, setSelectedCardData] = useState<CriticalFormulaCardData | null>(null);
  const [copiedCardKey, setCopiedCardKey] = useState<string | null>(null);
  const [copiedFormulaLatex, setCopiedFormulaLatex] = useState<string | null>(null);
  const [filterOnlyDeficient, setFilterOnlyDeficient] = useState<boolean>(true);
  const [cardSearchQuery, setCardSearchQuery] = useState<string>('');
  const [cardCategoryFilter, setCardCategoryFilter] = useState<string>('Tümü');
  const [expandedSolutionKeys, setExpandedSolutionKeys] = useState<Record<string, boolean>>({});
  const [isCustomCardModalOpen, setIsCustomCardModalOpen] = useState<boolean>(false);
  const [customCardTopicName, setCustomCardTopicName] = useState<string>('');
  const [customCardCategory, setCustomCardCategory] = useState<'TYT' | 'AYT' | 'LGS' | 'Geometri'>('AYT');
  const [customExtraCards, setCustomExtraCards] = useState<Record<string, CriticalFormulaCardData[]>>({});
  const [isBatchPrintModalOpen, setIsBatchPrintModalOpen] = useState<boolean>(false);

  // Form states - New Student
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('12. Sınıf');
  const [newStudentSchool, setNewStudentSchool] = useState('');
  const [newStudentTarget, setNewStudentTarget] = useState<ExamTarget>('AYT Matematik & Geometri');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('');
  const [newHourlyRate, setNewHourlyRate] = useState('1200');
  const [newPackageHours, setNewPackageHours] = useState('10');
  const [newWeeklySlot, setNewWeeklySlot] = useState('Cumartesi 16:00 - 17:30');
  const [newPedagogicalNotes, setNewPedagogicalNotes] = useState('');

  // Form states - New Session
  const [sessionStudentId, setSessionStudentId] = useState(students[0]?.id || '');
  const [sessionDate, setSessionDate] = useState('2026-10-22');
  const [sessionDay, setSessionDay] = useState('Perşembe');
  const [sessionTime, setSessionTime] = useState('18:00 - 19:30');
  const [sessionDuration, setSessionDuration] = useState('90');
  const [sessionTopics, setSessionTopics] = useState('');
  const [sessionSolvedCount, setSessionSolvedCount] = useState('25');
  const [sessionHomework, setSessionHomework] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionFee, setSessionFee] = useState('1800');

  // Active student for focused views
  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const reportStudent = students.find((s) => s.id === reportStudentId) || students[0];
  
  // Filtered lists
  const studentSessions = sessions.filter((s) => s.studentId === selectedStudentId);
  const studentTopics = topics.filter((t) => t.studentId === selectedStudentId);

  // Deficient topics calculation for active student
  const deficientTopics = studentTopics.filter(
    (t) => t.status === 'Tekrar Edilecek' || t.status === 'Soru Çözülecek' || t.status === 'Başlanmadı' || t.masteryPercent < 85
  );

  // Custom cards for active student
  const currentStudentCustomCards = customExtraCards[selectedStudentId] || [];

  const handleCopyCardText = (card: CriticalFormulaCardData, studentName: string) => {
    const text = `📚 ${card.title} (${card.category})\n` +
      `👤 Öğrenci: ${studentName}\n\n` +
      `📌 Konu Özeti: ${card.summary}\n\n` +
      `⚡ Kritik Formüller:\n` +
      card.criticalFormulas.map((f, i) => `${i + 1}. ${f.name}: ${f.latex} ${f.note ? `(${f.note})` : ''}`).join('\n') +
      `\n\n⚠️ Sık Yapılan Hatalar & Tuzaklar:\n` +
      card.pitfalls.map((p) => `• ${p}`).join('\n') +
      `\n\n📝 Örnek Soru: ${card.sampleQuestion.question}\n` +
      `✅ Sonuç: ${card.sampleQuestion.finalAnswer}`;

    navigator.clipboard.writeText(text);
    setCopiedCardKey(card.topicKey);
    setTimeout(() => setCopiedCardKey(null), 2500);
  };

  const handleCopyFormula = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormulaLatex(latex);
    setTimeout(() => setCopiedFormulaLatex(null), 2000);
  };

  const toggleSolution = (key: string) => {
    setExpandedSolutionKeys((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAssignHomeworkFromCard = (card: CriticalFormulaCardData) => {
    setSessionStudentId(selectedStudentId);
    setSessionTopics(card.title);
    setSessionHomework(`${card.title} - Kritik formül ezberi ve en az ${card.recommendedPracticeCount} pekiştirme sorusu çözümü.`);
    setSessionNotes(`${card.title} konusunda tespit edilen eksikler, kavram yanılgıları ve formül uygulamaları pekiştirilecek.`);
    setIsAddSessionOpen(true);
  };

  const handleBoostMastery = (topicId: string, currentPercent: number) => {
    const newPercent = Math.min(100, currentPercent + 15);
    const newStatus = newPercent >= 85 ? 'Tamamlandı' : 'Soru Çözülecek';
    const topicItem = topics.find((t) => t.id === topicId);
    if (topicItem) {
      onUpdateTopicMastery(topicId, newStatus, newPercent, topicItem.solvedQuestions + 20);
    }
  };

  const handleCreateCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCardTopicName.trim()) return;

    const generated = getTopicSummaryCard(customCardTopicName.trim(), customCardCategory);
    setCustomExtraCards((prev) => ({
      ...prev,
      [selectedStudentId]: [...(prev[selectedStudentId] || []), generated]
    }));

    setIsCustomCardModalOpen(false);
    setCustomCardTopicName('');
  };

  // Financial aggregates
  const totalEarned = sessions.filter((s) => s.isPaid).reduce((acc, s) => acc + s.feeAmount, 0);
  const totalPending = sessions.filter((s) => !s.isPaid).reduce((acc, s) => acc + s.feeAmount, 0);
  const totalTaughtHours = sessions.filter((s) => s.status === 'Tamamlandı').reduce((acc, s) => acc + (s.durationMinutes / 60), 0);
  const totalPlannedHours = sessions.filter((s) => s.status === 'Planlandı').reduce((acc, s) => acc + (s.durationMinutes / 60), 0);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent: PrivateStudent = {
      id: `p-std-${Date.now()}`,
      fullName: newStudentName.trim(),
      grade: newStudentGrade,
      school: newStudentSchool || 'Anadolu Lisesi',
      targetExam: newStudentTarget,
      parentName: newParentName || 'Veli',
      parentPhone: newParentPhone || '05XX XXX XX XX',
      currentTrialNet: 20.0,
      targetTrialNet: 35.0,
      hourlyRate: Number(newHourlyRate) || 1000,
      totalPackageHours: Number(newPackageHours) || 10,
      remainingPackageHours: Number(newPackageHours) || 10,
      completedHours: 0,
      paymentStatus: 'Beklemede',
      weeklyPreferredSlot: newWeeklySlot,
      pedagogicalNotes: newPedagogicalNotes || 'Bireysel öğrenme stili analiz edilecek.',
      avatarBgColor: 'bg-indigo-600'
    };

    onAddStudent(newStudent);
    setSelectedStudentId(newStudent.id);
    setIsAddStudentOpen(false);
    // Reset form
    setNewStudentName('');
    setNewStudentSchool('');
    setNewParentName('');
    setNewParentPhone('');
    setNewPedagogicalNotes('');
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find((s) => s.id === sessionStudentId);
    if (!targetStudent) return;

    const newSession: PrivateLessonSession = {
      id: `ps-${Date.now()}`,
      studentId: targetStudent.id,
      studentName: targetStudent.fullName,
      date: sessionDate,
      day: sessionDay,
      time: sessionTime,
      durationMinutes: Number(sessionDuration) || 90,
      topicsCovered: sessionTopics ? sessionTopics.split(',').map((t) => t.trim()) : ['Matematik Soru Çözümü'],
      solvedQuestionsCount: Number(sessionSolvedCount) || 0,
      homeworkAssigned: sessionHomework || 'Konu kavrama testi (20 soru)',
      homeworkStatus: 'Yeni Atandı',
      teacherNotes: sessionNotes || 'Konu anlatımı ve örnek çözümler tamamlandı.',
      status: 'Planlandı',
      feeAmount: Number(sessionFee) || (targetStudent.hourlyRate * (Number(sessionDuration) / 60)),
      isPaid: false
    };

    onAddSession(newSession);
    setIsAddSessionOpen(false);
    setSessionTopics('');
    setSessionHomework('');
    setSessionNotes('');
  };

  const openReportFor = (studentId: string) => {
    setReportStudentId(studentId);
    setIsReportModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Cockpit Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
              <span>Birebir Öğretmenlik & Koçluk Sistemi</span>
              <span aria-hidden="true">·</span>
              <span>LGS / TYT / AYT & Okul Takviye</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Özel Ders & Birebir Matematik Yönetim Portalı
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Öğrenci hedefleri, seans takvimi, soru & kazanım ustalık takibi, seans ücreti ve profesyonel veli raporları.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddSessionOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Seans Planla</span>
            </button>
            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Öğrenci Ekle</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500">Aktif Özel Ders Öğrencisi</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5 tabular-nums">
              {students.length} <span className="text-xs font-normal text-slate-500">Kayıtlı</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Yapılan / Planlanan Ders</div>
            <div className="text-xl font-bold text-indigo-600 mt-0.5 tabular-nums">
              {totalTaughtHours.toFixed(1)}s <span className="text-xs font-normal text-slate-500">/ +{totalPlannedHours.toFixed(1)}s plan</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Tahsil Edilen Tutar</div>
            <div className="text-xl font-bold text-emerald-600 mt-0.5 tabular-nums">
              ₺{totalEarned.toLocaleString('tr-TR')}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Bekleyen Tahsilat</div>
            <div className="text-xl font-bold text-amber-600 mt-0.5 tabular-nums">
              ₺{totalPending.toLocaleString('tr-TR')}
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl w-full overflow-x-auto border border-slate-200/60 shadow-2xs">
        <button
          onClick={() => setActiveSubTab('students')}
          className={`shrink-0 py-2 px-3.5 text-xs font-semibold rounded-xl transition-all ${
            activeSubTab === 'students'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Öğrenciler & Hedefler ({students.length})
        </button>
        <button
          onClick={() => setActiveSubTab('schedule')}
          className={`shrink-0 py-2 px-3.5 text-xs font-semibold rounded-xl transition-all ${
            activeSubTab === 'schedule'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Birebir Seans Takvimi ({sessions.length})
        </button>
        <button
          onClick={() => setActiveSubTab('mastery')}
          className={`shrink-0 py-2 px-3.5 text-xs font-semibold rounded-xl transition-all ${
            activeSubTab === 'mastery'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Kazanım Ustalık Çizelgesi
        </button>
        <button
          onClick={() => setActiveSubTab('summary_cards')}
          className={`shrink-0 py-2 px-3.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'summary_cards'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 hover:text-indigo-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Eksik Konu & Formül Kartları</span>
          {deficientTopics.length > 0 && (
            <span className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
              activeSubTab === 'summary_cards' ? 'bg-white text-indigo-700' : 'bg-rose-500 text-white'
            }`}>
              {deficientTopics.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('finance')}
          className={`shrink-0 py-2 px-3.5 text-xs font-semibold rounded-xl transition-all ${
            activeSubTab === 'finance'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Finans & Paket Bakiye
        </button>
      </div>

      {/* SUB-TAB 1: STUDENTS & GOALS */}
      {activeSubTab === 'students' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => {
            const netProgress = Math.min(100, Math.round((student.currentTrialNet / student.targetTrialNet) * 100));
            const packageProgress = Math.round((student.completedHours / student.totalPackageHours) * 100);

            return (
              <div
                key={student.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${student.avatarBgColor || 'bg-indigo-600'} text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs`}>
                        {student.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {student.fullName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <span>{student.grade}</span>
                          <span aria-hidden="true">·</span>
                          <span>{student.school}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {student.targetExam}
                    </span>
                  </div>

                  {/* Net Progress & Target */}
                  <div className="mt-4 p-3.5 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-indigo-600" />
                        Net Hedef Takibi
                      </span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {student.currentTrialNet.toFixed(1)} / {student.targetTrialNet.toFixed(1)} Net ({netProgress}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${netProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Package & Contact Metadata */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-600">
                    <div className="p-2.5 bg-slate-50/70 rounded-lg">
                      <span className="text-[11px] text-slate-400 block">Ders Paketi</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {student.completedHours} yapıldı / {student.remainingPackageHours} saat kaldı
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50/70 rounded-lg">
                      <span className="text-[11px] text-slate-400 block">Saatlik Ücret & Durum</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        ₺{student.hourlyRate} / saat · <span className={student.paymentStatus === 'Ödendi' ? 'text-emerald-600' : 'text-amber-600'}>{student.paymentStatus}</span>
                      </span>
                    </div>
                  </div>

                  {/* Pedagogical notes */}
                  <div className="mt-3 text-xs text-slate-600 bg-amber-50/60 border border-amber-200/50 p-2.5 rounded-lg">
                    <span className="font-semibold text-amber-900 block mb-0.5">Öğretmen Notu:</span>
                    {student.pedagogicalNotes}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.weeklyPreferredSlot}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setActiveSubTab('summary_cards');
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition flex items-center gap-1"
                      title="Bu öğrencinin eksik olduğu konular için otomatik formül kartlarını aç"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                      <span>Formül Kartları</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setActiveSubTab('mastery');
                      }}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      Kazanımlar
                    </button>
                    <button
                      onClick={() => openReportFor(student.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Veli Raporu</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 2: SEANCE SCHEDULE */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Öğrenciye Göre Filtrele:</span>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Tüm Özel Ders Öğrencileri ({sessions.length} Seans)</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.fullName} ({s.targetExam})</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsAddSessionOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Seans Ekle</span>
            </button>
          </div>

          <div className="space-y-3">
            {sessions
              .filter((s) => !selectedStudentId || s.studentId === selectedStudentId)
              .map((session) => {
                const isCompleted = session.status === 'Tamamlandı';
                return (
                  <div
                    key={session.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {session.studentName}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">
                          {session.day}, {session.date} ({session.time})
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {session.status}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          session.isPaid
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {session.isPaid ? 'Ödendi' : `₺${session.feeAmount} Bekliyor`}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700">
                        <span className="font-medium text-slate-900">İşlenen Konular: </span>
                        {session.topicsCovered.join(', ')}
                        {session.solvedQuestionsCount > 0 && (
                          <span className="text-slate-500 ml-2">
                            ({session.solvedQuestionsCount} soru çözüldü)
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <div>
                          <span className="font-medium text-slate-700">Ödev: </span>
                          {session.homeworkAssigned}
                        </div>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <div>
                          <span className="font-medium text-slate-700">Öğretmen Değerlendirmesi: </span>
                          {session.teacherNotes}
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      {!isCompleted ? (
                        <button
                          onClick={() => onUpdateSessionStatus(session.id, 'Tamamlandı')}
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Tamamlandı İşaretle</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateSessionStatus(session.id, 'Planlandı')}
                          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          Geri Al
                        </button>
                      )}

                      {!session.isPaid && (
                        <button
                          onClick={() => onUpdateSessionStatus(session.id, session.status, true)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition flex items-center gap-1"
                        >
                          <DollarSign className="w-3.5 h-3.5 text-amber-700" />
                          <span>Ödendi Yap</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TOPIC MASTERY TRACKER */}
      {activeSubTab === 'mastery' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Aktif Öğrenci:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {students.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStudentId(st.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                      selectedStudentId === st.id
                        ? 'bg-white text-indigo-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st.fullName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {selectedStudent?.fullName} için müfredat eksik / tamam durumu ({deficientTopics.length} eksik)
              </span>
              <button
                onClick={() => setActiveSubTab('summary_cards')}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Eksik Konular İçin Formül Kartları ({deficientTopics.length})</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Matematik Konusu</th>
                    <th className="py-3 px-4">Ustalık Seviyesi (%)</th>
                    <th className="py-3 px-4">Çözülen Soru Sayısı</th>
                    <th className="py-3 px-4">Durum</th>
                    <th className="py-3 px-4 text-right">Hızlı Güncelleme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {studentTopics.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Bu öğrenci için henüz konu kaydı girilmedi.
                      </td>
                    </tr>
                  ) : (
                    studentTopics.map((item) => {
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {item.category}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {item.topicName}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-2 rounded-full ${
                                    item.masteryPercent >= 85
                                      ? 'bg-emerald-600'
                                      : item.masteryPercent >= 60
                                      ? 'bg-indigo-600'
                                      : 'bg-amber-600'
                                  }`}
                                  style={{ width: `${item.masteryPercent}%` }}
                                />
                              </div>
                              <span className="font-semibold text-slate-800 tabular-nums">
                                %{item.masteryPercent}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 tabular-nums">
                            <span className="font-semibold text-slate-800">{item.solvedQuestions}</span> / {item.targetQuestions} soru
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                              item.status === 'Tamamlandı'
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.status === 'Tekrar Edilecek'
                                ? 'bg-amber-50 text-amber-800'
                                : item.status === 'Soru Çözülecek'
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() =>
                                  onUpdateTopicMastery(
                                    item.id,
                                    'Tamamlandı',
                                    100,
                                    item.targetQuestions
                                  )
                                }
                                className="px-2 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50 rounded transition"
                              >
                                Tamamla
                              </button>
                              <button
                                onClick={() =>
                                  onUpdateTopicMastery(
                                    item.id,
                                    'Tekrar Edilecek',
                                    Math.max(40, item.masteryPercent - 20),
                                    item.solvedQuestions
                                  )
                                }
                                className="px-2 py-1 text-[11px] font-medium text-amber-700 hover:bg-amber-50 rounded transition"
                              >
                                Tekrar
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FINANCE & PACKAGE BALANCE */}
      {activeSubTab === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Toplam Tahsilat</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2 tabular-nums">
                ₺{totalEarned.toLocaleString('tr-TR')}
              </div>
              <p className="text-xs text-slate-400 mt-1">Ödemesi alınmış tamamlanan ve paket seansları</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Bekleyen Seans Alacağı</span>
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-600 mt-2 tabular-nums">
                ₺{totalPending.toLocaleString('tr-TR')}
              </div>
              <p className="text-xs text-slate-400 mt-1">Yapılmış veya planlanmış henüz ödenmemiş dersler</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Toplam Verilen Seans Saati</span>
                <Clock className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-indigo-600 mt-2 tabular-nums">
                {totalTaughtHours.toFixed(1)} Saat
              </div>
              <p className="text-xs text-slate-400 mt-1">Tamamlanan birebir derslerin net süresi</p>
            </div>
          </div>

          {/* Student Package Ledger Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Öğrenci Bazlı Paket ve Bakiye Özeti
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Öğrenci Adı</th>
                    <th className="py-2.5 px-3">Hedef Sınav</th>
                    <th className="py-2.5 px-3">Saat Ücreti</th>
                    <th className="py-2.5 px-3">Paket Saati</th>
                    <th className="py-2.5 px-3">Yapılan / Kalan Saat</th>
                    <th className="py-2.5 px-3">Ödeme Durumu</th>
                    <th className="py-2.5 px-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-3 font-semibold text-slate-900">{st.fullName}</td>
                      <td className="py-3 px-3">{st.targetExam}</td>
                      <td className="py-3 px-3 tabular-nums font-medium text-slate-900">₺{st.hourlyRate} / saat</td>
                      <td className="py-3 px-3 tabular-nums">{st.totalPackageHours} Saatlik Paket</td>
                      <td className="py-3 px-3 tabular-nums">
                        <span className="font-semibold text-indigo-700">{st.completedHours}s yapıldı</span> / {st.remainingPackageHours}s kaldı
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          st.paymentStatus === 'Ödendi'
                            ? 'bg-emerald-50 text-emerald-700'
                            : st.paymentStatus === 'Kısmi Ödendi'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {st.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => openReportFor(st.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          Rapor Oluştur
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SUMMARY & CRITICAL FORMULA CARDS */}
      {activeSubTab === 'summary_cards' && (
        <div className="space-y-6">
          {/* Module Banner / Cockpit */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-wide uppercase">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Akıllı Kazanım Analizi & LaTeX Formül Kartları</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Eksik Konular İçin Konu Özeti ve Kritik Formül Kartları
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl">
                  Öğrencinin kazanım takip çizelgesindeki eksik veya tekrar gerektiren konuları taranarak otomatik olarak kavramsal özetler, kritik LaTeX matematik formülleri, sınav tuzakları ve adım adım çözümlü örnek sorular hazırlanır.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsCustomCardModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Özel Konu Kartı Ekle</span>
                </button>
                <button
                  onClick={() => setIsBatchPrintModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Tüm Föyü Yazdır / PDF</span>
                </button>
              </div>
            </div>

            {/* Student Selector Row */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Öğrenci:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {students.map((st) => {
                    const stTopics = topics.filter((t) => t.studentId === st.id);
                    const stDeficientCount = stTopics.filter(
                      (t) => t.status === 'Tekrar Edilecek' || t.status === 'Soru Çözülecek' || t.status === 'Başlanmadı' || t.masteryPercent < 85
                    ).length;

                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition flex items-center gap-2 ${
                          selectedStudentId === st.id
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${stDeficientCount > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <span>{st.fullName}</span>
                        {stDeficientCount > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            selectedStudentId === st.id ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {stDeficientCount} Eksik
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterOnlyDeficient(!filterOnlyDeficient)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition border flex items-center gap-1.5 ${
                    filterOnlyDeficient
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{filterOnlyDeficient ? 'Sadece Eksikler Listeleniyor' : 'Tüm Konular Listeleniyor'}</span>
                </button>
              </div>
            </div>

            {/* Category and Search Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
                {['Tümü', 'AYT', 'TYT', 'LGS', 'Geometri'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCardCategoryFilter(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                      cardCategoryFilter === cat
                        ? 'bg-indigo-100 text-indigo-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Konularda ara (ör: trigonometri, türev)..."
                  value={cardSearchQuery}
                  onChange={(e) => setCardSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Student Status Summary Banner */}
          {deficientTopics.length > 0 ? (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-amber-900">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{selectedStudent.fullName} ({selectedStudent.grade} · {selectedStudent.targetExam})</span> için <span className="font-bold underline">{deficientTopics.length} adet</span> eksik / geliştirilmesi gereken konu tespit edildi.
                  <div className="text-amber-800/80 mt-0.5">
                    Aşağıdaki kartlarda MEB kazanım formülleri, ÖSYM sınav tuzakları ve örnek soru çözümleri LaTeX formatında hazırlanmıştır.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {deficientTopics.map((dt) => (
                  <span key={dt.id} className="px-2 py-1 bg-white/90 border border-amber-200 rounded-md font-semibold text-[11px] text-amber-900">
                    {dt.topicName} (%{dt.masteryPercent})
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  <strong>{selectedStudent.fullName}</strong> için kayıtlı tüm konularda ustalık %85 seviyesinin üzerindedir! İsterseniz yukarıdaki filtreden tüm konuları inceleyebilir veya yeni konu kartı üretebilirsiniz.
                </span>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Generate cards from student topics */}
            {(() => {
              const baseTopics = filterOnlyDeficient
                ? (deficientTopics.length > 0 ? deficientTopics : studentTopics)
                : studentTopics;

              const filteredTopics = baseTopics.filter((t) => {
                const matchesCategory = cardCategoryFilter === 'Tümü' || t.category === cardCategoryFilter;
                const matchesSearch = !cardSearchQuery.trim() || t.topicName.toLowerCase().includes(cardSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              });

              // Combine with any custom generated cards for this student
              const customFiltered = currentStudentCustomCards.filter((c) => {
                const matchesCategory = cardCategoryFilter === 'Tümü' || c.category === cardCategoryFilter;
                const matchesSearch = !cardSearchQuery.trim() || c.title.toLowerCase().includes(cardSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
              });

              if (filteredTopics.length === 0 && customFiltered.length === 0) {
                return (
                  <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                    <Sparkles className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700">Seçili kriterlere uygun konu kartı bulunamadı.</p>
                    <p className="text-xs text-slate-400 mt-1">Filtreleri gevşetebilir veya "Özel Konu Kartı Ekle" butonunu kullanarak yeni konu ekleyebilirsiniz.</p>
                  </div>
                );
              }

              return (
                <>
                  {/* Topic-based cards */}
                  {filteredTopics.map((topicItem) => {
                    const cardData = getTopicSummaryCard(topicItem.topicName, topicItem.category as any);
                    const isSolutionOpen = !!expandedSolutionKeys[cardData.topicKey];
                    const isCopied = copiedCardKey === cardData.topicKey;

                    return (
                      <div
                        key={topicItem.id}
                        className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                      >
                        <div>
                          {/* Card Top Header */}
                          <div className="p-5 border-b border-slate-100 bg-linear-to-r from-slate-50/50 via-white to-indigo-50/20">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                                    cardData.category === 'AYT'
                                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                      : cardData.category === 'TYT'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                      : cardData.category === 'LGS'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                                  }`}>
                                    {cardData.category} Matematik
                                  </span>
                                  <span className="text-[11px] font-semibold text-slate-500">
                                    {selectedStudent.fullName}
                                  </span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">
                                  {cardData.title}
                                </h3>
                              </div>

                              {/* Deficiency badge */}
                              <div className="text-right shrink-0">
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg block ${
                                  topicItem.status === 'Tekrar Edilecek'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : topicItem.status === 'Soru Çözülecek'
                                    ? 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                                    : topicItem.status === 'Başlanmadı'
                                    ? 'bg-rose-100 text-rose-900 border border-rose-200'
                                    : 'bg-emerald-100 text-emerald-900'
                                }`}>
                                  {topicItem.status} (%{topicItem.masteryPercent})
                                </span>
                                <span className="text-[10px] text-slate-400 mt-0.5 block tabular-nums">
                                  {topicItem.solvedQuestions} / {topicItem.targetQuestions} soru
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Card Content Sections */}
                          <div className="p-5 space-y-4">
                            {/* 1. Konu Özeti & Kavramsal Yaklaşım */}
                            <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Konu Özeti & Kritik Yaklaşım</span>
                              </div>
                              <p className="leading-relaxed">
                                {cardData.summary}
                              </p>
                            </div>

                            {/* 2. Kritik Formüller & Kurallar (LaTeX KaTeX) */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                                <span className="flex items-center gap-1.5 text-indigo-950">
                                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                  Kritik Formüller & Bağıntılar ({cardData.criticalFormulas.length})
                                </span>
                                <span className="text-[10px] text-slate-400 font-normal">KaTeX İle Render Edildi</span>
                              </div>

                              <div className="space-y-2">
                                {cardData.criticalFormulas.map((f, fIdx) => {
                                  const isFormulaCopied = copiedFormulaLatex === f.latex;
                                  return (
                                    <div
                                      key={fIdx}
                                      className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl space-y-2 hover:border-indigo-200 transition"
                                    >
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold text-slate-800">{f.name}</span>
                                        <button
                                          onClick={() => handleCopyFormula(f.latex)}
                                          className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition"
                                          title="LaTeX Kodunu Kopyala"
                                        >
                                          {isFormulaCopied ? (
                                            <>
                                              <Check className="w-3 h-3 text-emerald-600" />
                                              <span className="text-emerald-700 font-semibold">Kopyalandı!</span>
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="w-3 h-3" />
                                              <span>LaTeX</span>
                                            </>
                                          )}
                                        </button>
                                      </div>

                                      {/* Math Formula Render Box */}
                                      <div className="py-2.5 px-3 bg-white rounded-lg border border-slate-200/70 text-center overflow-x-auto shadow-2xs">
                                        <LatexFormulaRenderer latex={f.latex} block />
                                      </div>

                                      {/* Formula pedagogical note */}
                                      {f.note && (
                                        <div className="flex items-center gap-1.5 text-[11px] text-indigo-800 bg-indigo-50/80 px-2.5 py-1 rounded-md font-medium">
                                          <Lightbulb className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                          <span>{f.note}</span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 3. Sık Yapılan Hatalar & Sınav Tuzakları */}
                            {cardData.pitfalls && cardData.pitfalls.length > 0 && (
                              <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-950 space-y-1.5">
                                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Sık Yapılan Hatalar & ÖSYM / LGS Tuzakları</span>
                                </div>
                                <ul className="space-y-1 pl-4 list-disc text-amber-900/90 leading-relaxed">
                                  {cardData.pitfalls.map((pitfall, pIdx) => (
                                    <li key={pIdx}>{pitfall}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* 4. Tipik Sınav Sorusu & Adım Adım LaTeX Çözümü */}
                            {cardData.sampleQuestion && (
                              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    Tipik Sınav Sorusu & Model Çözüm
                                  </span>
                                  <button
                                    onClick={() => toggleSolution(cardData.topicKey)}
                                    className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                                  >
                                    <span>{isSolutionOpen ? 'Çözümü Gizle' : 'Adım Adım Çözümü İncele'}</span>
                                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                  </button>
                                </div>

                                {/* Question prompt */}
                                <div className="space-y-2">
                                  <p className="text-slate-200 leading-relaxed font-medium">
                                    {cardData.sampleQuestion.question}
                                  </p>
                                  {cardData.sampleQuestion.questionLatex && (
                                    <div className="py-1.5 px-2 bg-slate-800/80 rounded-lg text-center overflow-x-auto text-amber-300">
                                      <LatexFormulaRenderer latex={cardData.sampleQuestion.questionLatex} block />
                                    </div>
                                  )}
                                </div>

                                {/* Expandable solution steps */}
                                {isSolutionOpen && (
                                  <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                                    {cardData.sampleQuestion.solutionSteps.map((step, sIdx) => (
                                      <div key={sIdx} className="bg-slate-800/60 rounded-lg p-2.5 space-y-1">
                                        <div className="font-bold text-cyan-300 text-[11px]">
                                          {step.stepTitle}
                                        </div>
                                        <p className="text-slate-300 text-xs">
                                          {step.stepExplanation}
                                        </p>
                                        {step.stepLatex && (
                                          <div className="py-1 px-2 bg-slate-950/80 rounded text-center overflow-x-auto text-emerald-300 text-xs mt-1">
                                            <LatexFormulaRenderer latex={step.stepLatex} block />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Final Answer pill */}
                                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                                  <span className="text-slate-400">Doğru Cevap:</span>
                                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800/60 px-2.5 py-0.5 rounded-md">
                                    {cardData.sampleQuestion.finalAnswer}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Bottom Actions */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Target className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Önerilen Soru: <strong>{cardData.recommendedPracticeCount}</strong> adet</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopyCardText(cardData, selectedStudent.fullName)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1"
                              title="Kart metnini WhatsApp veya ders notu için kopyala"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Kopyalandı!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Özeti Kopyala</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleAssignHomeworkFromCard(cardData)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-lg transition flex items-center gap-1"
                              title="Bu konuyu seans ödevi olarak kaydet"
                            >
                              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Ödeve Ekle</span>
                            </button>

                            <button
                              onClick={() => handleBoostMastery(topicItem.id, topicItem.masteryPercent)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition flex items-center gap-1"
                              title="Ustalık seviyesini %15 arttır ve soru sayısını güncelle"
                            >
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Ustalık +%15</span>
                            </button>

                            <button
                              onClick={() => setSelectedCardData(cardData)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1"
                              title="Kartı tam sayfa incele / yazdır"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Kartı Yazdır</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Render Custom Extra Cards (if any) */}
                  {customFiltered.map((customCard, cIdx) => (
                    <div
                      key={`custom-${cIdx}`}
                      className="bg-white border-2 border-indigo-200 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        <div className="p-5 border-b border-indigo-100 bg-indigo-50/30 flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white">
                              {customCard.category} · Özel Üretildi
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              {customCard.title}
                            </h3>
                          </div>
                          <span className="text-xs text-indigo-700 font-semibold bg-white px-2.5 py-1 rounded-md border border-indigo-200">
                            Öğretmen Kartı
                          </span>
                        </div>

                        <div className="p-5 space-y-4">
                          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                            {customCard.summary}
                          </p>

                          <div className="space-y-2">
                            {customCard.criticalFormulas.map((f, fIdx) => (
                              <div key={fIdx} className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                                <div className="font-semibold text-xs text-slate-800">{f.name}</div>
                                <div className="py-2 px-3 bg-white rounded-lg text-center overflow-x-auto border border-slate-200">
                                  <LatexFormulaRenderer latex={f.latex} block />
                                </div>
                                {f.note && <div className="text-[11px] text-indigo-700">{f.note}</div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Hedef: {customCard.recommendedPracticeCount} Soru</span>
                        <button
                          onClick={() => handleCopyCardText(customCard, selectedStudent.fullName)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition"
                        >
                          Özeti Kopyala
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* MODAL: PARENT PROGRESS REPORT (A4 Printable) */}
      {isReportModalOpen && reportStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 my-8 border border-slate-200">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg transition no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print trigger bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 no-print">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  Özel Ders Veli Bilgilendirme Raporu
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {reportStudent.fullName} - Akademik Gelişim Karnesi
                </h2>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Raporu Yazdır / PDF İndir</span>
              </button>
            </div>

            {/* Printable Document Body */}
            <div id="printable-area" className="space-y-6 text-slate-800">
              <div className="text-center pb-4 border-b border-slate-300">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Öğretmen Asistanı Pro · Birebir Matematik ve Koçluk
                </div>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  ÖZEL DERS VELİ BİLGİLENDİRME & GELİŞİM RAPORU
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Rapor Tarihi: {new Date().toLocaleDateString('tr-TR')} · Eğitmen: Matematik Öğretmeni
                </p>
              </div>

              {/* Student Overview Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block">Öğrenci:</span>
                  <span className="font-bold text-slate-900">{reportStudent.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Sınıf / Okul:</span>
                  <span className="font-bold text-slate-900">{reportStudent.grade} · {reportStudent.school}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Hedef Sınav:</span>
                  <span className="font-bold text-indigo-700">{reportStudent.targetExam}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Veli İletişim:</span>
                  <span className="font-bold text-slate-900">{reportStudent.parentName} ({reportStudent.parentPhone})</span>
                </div>
              </div>

              {/* Net Goal Progress */}
              <div className="p-4 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-900">Hedeflenen Deneme Net Grafiği:</span>
                  <span className="font-bold text-indigo-700 tabular-nums">
                    Mevcut: {reportStudent.currentTrialNet.toFixed(1)} Net / Hedef: {reportStudent.targetTrialNet.toFixed(1)} Net
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: `${Math.min(100, (reportStudent.currentTrialNet / reportStudent.targetTrialNet) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Recent Sessions */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Son Yapılan Birebir Seanslar & Ödev Durumu
                </h3>
                <div className="space-y-2">
                  {sessions
                    .filter((s) => s.studentId === reportStudent.id)
                    .slice(0, 4)
                    .map((sess) => (
                      <div key={sess.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                          <span>{sess.date} ({sess.day}) - {sess.time}</span>
                          <span className="text-indigo-700">{sess.status}</span>
                        </div>
                        <div className="text-slate-600">
                          <span className="font-medium text-slate-800">İşlenen: </span>
                          {sess.topicsCovered.join(', ')} ({sess.solvedQuestionsCount} soru çözüldü)
                        </div>
                        <div className="text-slate-500">
                          <span className="font-medium text-slate-700">Verilen Ödev: </span>
                          {sess.homeworkAssigned} ({sess.homeworkStatus})
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Teacher's Pedagogical Assessment */}
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-slate-700 space-y-1">
                <div className="font-bold text-indigo-950">Öğretmen Değerlendirmesi & Aileye Tavsiyeler:</div>
                <p className="leading-relaxed">
                  {reportStudent.pedagogicalNotes}
                </p>
                <p className="text-slate-500 mt-2">
                  Öğrencimizle haftalık planlanan saatlerde soru çözümlerimiz ve konsept pekiştirmelerimiz aksatılmadan devam etmektedir. Evdeki çalışma disiplininin sürdürülmesi rica olunur.
                </p>
              </div>

              {/* Signatures */}
              <div className="flex items-center justify-between pt-8 text-xs text-slate-600">
                <div className="text-center">
                  <div className="font-bold text-slate-900">{reportStudent.parentName}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Veli İmzası</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900">Matematik Branş Öğretmeni</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Kaşe & İmza</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <button
              onClick={() => setIsAddStudentOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Yeni Birebir Özel Ders Öğrencisi Kaydı
            </h2>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Öğrenci Adı Soyadı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ayşe Kaya"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Sınıf Seviyesi
                  </label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="8. Sınıf">8. Sınıf (LGS)</option>
                    <option value="9. Sınıf">9. Sınıf</option>
                    <option value="10. Sınıf">10. Sınıf</option>
                    <option value="11. Sınıf">11. Sınıf</option>
                    <option value="12. Sınıf">12. Sınıf (YKS)</option>
                    <option value="Mezun (YKS)">Mezun (YKS)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Hedef Sınav
                  </label>
                  <select
                    value={newStudentTarget}
                    onChange={(e) => setNewStudentTarget(e.target.value as ExamTarget)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="AYT Matematik & Geometri">AYT Matematik & Geometri</option>
                    <option value="TYT Matematik">TYT Matematik</option>
                    <option value="LGS (8. Sınıf)">LGS (8. Sınıf)</option>
                    <option value="Okul Sınavlarına Takviye">Okul Sınavlarına Takviye</option>
                    <option value="Olimpiyat / İleri Düzey">Olimpiyat / İleri Düzey</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Veli Adı Soyadı
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Mehmet Kaya (Baba)"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Veli Telefonu
                  </label>
                  <input
                    type="text"
                    placeholder="05XX XXX XX XX"
                    value={newParentPhone}
                    onChange={(e) => setNewParentPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Saatlik Seans Ücreti (₺)
                  </label>
                  <input
                    type="number"
                    value={newHourlyRate}
                    onChange={(e) => setNewHourlyRate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Paket Ders Saati
                  </label>
                  <input
                    type="number"
                    value={newPackageHours}
                    onChange={(e) => setNewPackageHours(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Haftalık Tercih Edilen Saat Dilimi
                </label>
                <input
                  type="text"
                  placeholder="Örn: Salı 18:00 - 19:30"
                  value={newWeeklySlot}
                  onChange={(e) => setNewWeeklySlot(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Pedagojik Notlar & Başlangıç Hedefi
                </label>
                <textarea
                  rows={2}
                  placeholder="Öğrencinin matematikteki güçlü ve zayıf olduğu konular..."
                  value={newPedagogicalNotes}
                  onChange={(e) => setNewPedagogicalNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
                >
                  Öğrenciyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SESSION */}
      {isAddSessionOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <button
              onClick={() => setIsAddSessionOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Yeni Birebir Seans Planla / Kaydet
            </h2>

            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Özel Ders Öğrencisi *
                </label>
                <select
                  value={sessionStudentId}
                  onChange={(e) => {
                    setSessionStudentId(e.target.value);
                    const st = students.find((s) => s.id === e.target.value);
                    if (st) {
                      setSessionFee(String(st.hourlyRate * 1.5));
                    }
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.targetExam})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Tarih</label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Saat Dilimi</label>
                  <input
                    type="text"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  İşlenecek / İşlenen Konu(lar)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Parabol Tepe Noktası, İkinci Dereceden Eşitsizlikler"
                  value={sessionTopics}
                  onChange={(e) => setSessionTopics(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Çözülen Soru Sayısı
                  </label>
                  <input
                    type="number"
                    value={sessionSolvedCount}
                    onChange={(e) => setSessionSolvedCount(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Seans Ücreti (₺)
                  </label>
                  <input
                    type="number"
                    value={sessionFee}
                    onChange={(e) => setSessionFee(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Atanan Ev Ödevi
                </label>
                <input
                  type="text"
                  placeholder="Örn: Soru Bankası Test 4 ve 5 (Sayfa 64-70)"
                  value={sessionHomework}
                  onChange={(e) => setSessionHomework(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Öğretmen Seans Notu
                </label>
                <textarea
                  rows={2}
                  placeholder="Konu kavrama seviyesi, soru çözme hızı, dikkat edilmesi gerekenler..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSessionOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
                >
                  Seansı Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: SINGLE CARD PRINT / DETAIL MODAL */}
      {selectedCardData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-8 border border-slate-200">
            <button
              onClick={() => setSelectedCardData(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg transition no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print header bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  {selectedCardData.category} Matematik
                </span>
                <span className="text-xs text-slate-500 font-medium">Öğrenci: {selectedStudent.fullName}</span>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Kartı Yazdır / PDF</span>
              </button>
            </div>

            {/* Card Content for display & print */}
            <div className="space-y-4 text-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCardData.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  {selectedCardData.summary}
                </p>
              </div>

              {/* Formulas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Kritik Formüller & Kurallar
                </h4>
                <div className="space-y-2">
                  {selectedCardData.criticalFormulas.map((f, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                      <div className="font-semibold text-xs text-slate-900">{f.name}</div>
                      <div className="py-2 px-3 bg-white rounded-lg text-center overflow-x-auto border border-slate-200/80">
                        <LatexFormulaRenderer latex={f.latex} block />
                      </div>
                      {f.note && (
                        <div className="text-[11px] text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                          📌 {f.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pitfalls */}
              {selectedCardData.pitfalls && selectedCardData.pitfalls.length > 0 && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Sık Yapılan Hatalar & Tuzaklar
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-amber-900/90">
                    {selectedCardData.pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sample Question & Steps */}
              {selectedCardData.sampleQuestion && (
                <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                  <div className="font-bold text-amber-400">Model Sınav Sorusu:</div>
                  <p className="text-slate-200">{selectedCardData.sampleQuestion.question}</p>
                  {selectedCardData.sampleQuestion.questionLatex && (
                    <div className="py-1 text-center text-amber-300">
                      <LatexFormulaRenderer latex={selectedCardData.sampleQuestion.questionLatex} block />
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="font-semibold text-cyan-300 text-[11px]">Adım Adım Çözüm:</div>
                    {selectedCardData.sampleQuestion.solutionSteps.map((st, i) => (
                      <div key={i} className="bg-slate-800/70 p-2 rounded text-[11px] space-y-0.5">
                        <div className="font-bold text-cyan-200">{st.stepTitle}</div>
                        <div className="text-slate-300">{st.stepExplanation}</div>
                        {st.stepLatex && (
                          <div className="text-emerald-300 text-center py-0.5">
                            <LatexFormulaRenderer latex={st.stepLatex} block />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="font-bold text-emerald-400 pt-1">
                      Sonuç: {selectedCardData.sampleQuestion.finalAnswer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BATCH PRINT FULL STUDENT FORMULA BOOKLET */}
      {isBatchPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 my-8 border border-slate-200">
            <button
              onClick={() => setIsBatchPrintModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg transition no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print trigger bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 no-print">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                  Öğretmen Asistanı Pro · Birebir Özel Ders Portalı
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedStudent.fullName} - Kişiselleştirilmiş Eksik Konu & Kritik Formül Föyü
                </h2>
              </div>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Föyü Yazdır / PDF İndir</span>
              </button>
            </div>

            {/* Printable Document Body */}
            <div id="printable-area" className="space-y-6 text-slate-800">
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-widest">
                  ÖĞRETMEN ASİSTANI PRO · MATEMATİK VE ÖZEL DERS PORTALI
                </div>
                <h1 className="text-2xl font-black text-slate-900 mt-1 uppercase">
                  KİŞİSELLEŞTİRİLMİŞ EKSİK KONU & KRİTİK FORMÜL FÖYÜ
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Öğrenci: <strong>{selectedStudent.fullName}</strong> ({selectedStudent.grade} · {selectedStudent.school}) · Hedef: <strong>{selectedStudent.targetExam}</strong> · Tarih: {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>

              {/* Cards Iteration */}
              <div className="space-y-6">
                {(filterOnlyDeficient && deficientTopics.length > 0 ? deficientTopics : studentTopics).map((item, idx) => {
                  const card = getTopicSummaryCard(item.topicName, item.category as any);
                  return (
                    <div key={idx} className="p-5 border border-slate-300 rounded-2xl bg-white space-y-3 break-inside-avoid">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                            {card.category}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">
                            {idx + 1}. {card.title}
                          </h3>
                        </div>
                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Durum: {item.status} (%{item.masteryPercent} Ustalık)
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                        {card.summary}
                      </p>

                      {/* Formulas in printable grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {card.criticalFormulas.map((f, fIdx) => (
                          <div key={fIdx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                            <div className="font-bold text-slate-900 text-[11px]">{f.name}</div>
                            <div className="py-2 px-2 bg-white rounded text-center overflow-x-auto border border-slate-200">
                              <LatexFormulaRenderer latex={f.latex} block />
                            </div>
                            {f.note && <div className="text-[10px] text-indigo-700">📌 {f.note}</div>}
                          </div>
                        ))}
                      </div>

                      {/* Pitfalls */}
                      {card.pitfalls && card.pitfalls.length > 0 && (
                        <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs">
                          <span className="font-bold text-amber-900 block mb-1">⚠️ Sık Yapılan Hatalar:</span>
                          <ul className="list-disc pl-4 text-amber-950 space-y-0.5">
                            {card.pitfalls.map((pit, pIdx) => (
                              <li key={pIdx}>{pit}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Sample Question */}
                      {card.sampleQuestion && (
                        <div className="p-3 bg-slate-100 rounded-xl text-xs space-y-1">
                          <span className="font-bold text-slate-900">📝 Örnek Çözümlü Soru: </span>
                          <span className="text-slate-700">{card.sampleQuestion.question}</span>
                          <div className="font-bold text-emerald-800 pt-1">
                            Cevap: {card.sampleQuestion.finalAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>Matematik Branş & Özel Ders Eğitmeni</div>
                <div>Öğretmen Asistanı Pro &bull; Kişisel Çalışma Föyü</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOM TOPIC CARD GENERATOR */}
      {isCustomCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl p-6 border border-slate-200">
            <button
              onClick={() => setIsCustomCardModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Otomatik Kart Motoru</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Özel Konu Formül Kartı Oluştur
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Öğrencinin ihtiyacına göre herhangi bir matematik konusu girerek KaTeX LaTeX destekli formül kartı oluşturabilirsiniz.
            </p>

            <form onSubmit={handleCreateCustomCard} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Matematik Konusu Adı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Logaritma, Diziler, Olasılık, Eğim, Analitik Geometri..."
                  value={customCardTopicName}
                  onChange={(e) => setCustomCardTopicName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Sınav / Müfredat Kategorisi
                </label>
                <select
                  value={customCardCategory}
                  onChange={(e) => setCustomCardCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="AYT">AYT (11-12. Sınıf & YKS)</option>
                  <option value="TYT">TYT (9-10. Sınıf & Temel Matematik)</option>
                  <option value="LGS">LGS (8. Sınıf Matematik)</option>
                  <option value="Geometri">Geometri (Üçgen, Daire, Analitik)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomCardModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kartı Otomatik Üret</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

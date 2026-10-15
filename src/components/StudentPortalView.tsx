import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  Download,
  HardDrive,
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Flame,
  ClipboardList,
  CheckSquare,
  X,
  Radio,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Calculator,
  Lightbulb,
  Bookmark,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Student,
  HomeworkSubmission,
  ScenarioLessonNote,
  SchoolProject,
  OlympiadTeamMember,
  SchoolDataForm,
  FormResponseSubmission,
  FormResponseAnswer,
  StudentSubmittedQuestion,
  StudentQuestionDifficulty
} from '../types';
import { LatexFormulaRenderer } from './LatexFormulaRenderer';

interface StudentPortalViewProps {
  currentStudent: Student;
  homeworks: HomeworkSubmission[];
  currentScenario: ScenarioLessonNote;
  projects: SchoolProject[];
  olympiadMember?: OlympiadTeamMember;
  forms?: SchoolDataForm[];
  responses?: FormResponseSubmission[];
  submittedQuestions?: StudentSubmittedQuestion[];
  isQuestionSubmissionEnabled?: boolean;
  onSubmitHomework: (hw: HomeworkSubmission) => void;
  onSubmitFormResponse?: (res: FormResponseSubmission) => void;
  onSubmitQuestion?: (question: {
    topic: string;
    subject: string;
    questionText: string;
    questionLatex?: string;
    difficulty: StudentQuestionDifficulty;
  }) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  currentStudent,
  homeworks,
  currentScenario,
  projects,
  olympiadMember,
  forms = [],
  responses = [],
  submittedQuestions = [],
  isQuestionSubmissionEnabled = true,
  onSubmitHomework,
  onSubmitFormResponse,
  onSubmitQuestion,
}) => {
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState(false);

  // Student Question Asking State
  const [questionText, setQuestionText] = useState('');
  const [questionTopic, setQuestionTopic] = useState('İkinci Dereceden Denklemler & Parabol');
  const [questionSubject, setQuestionSubject] = useState('Matematik');
  const [questionLatex, setQuestionLatex] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState<StudentQuestionDifficulty>('Orta');
  const [isQuestionSubmitting, setIsQuestionSubmitting] = useState(false);
  const [questionSuccessAlert, setQuestionSuccessAlert] = useState(false);
  const [questionFilter, setQuestionFilter] = useState<'Tümü' | 'Beklemede' | 'Çözüldü'>('Tümü');
  const [showFormulaHelper, setShowFormulaHelper] = useState(false);

  // Form filling modal state
  const [activeFillingForm, setActiveFillingForm] = useState<SchoolDataForm | null>(null);
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({});
  const [formSubmittedNotice, setFormSubmittedNotice] = useState<string | null>(null);

  // Student's specific homeworks
  const studentHomeworks = homeworks.filter(
    (h) => h.studentName.toLowerCase().includes(currentStudent.fullName.toLowerCase()) || h.studentId === currentStudent.id
  );

  const gradedHomeworks = studentHomeworks.filter((h) => h.status === 'Değerlendirildi');
  const pendingHomeworks = studentHomeworks.filter((h) => h.status === 'Bekliyor');

  const studentProjects = projects.filter((p) =>
    p.studentTeam.some((st) => st.name.toLowerCase().includes(currentStudent.fullName.toLowerCase()))
  );

  // Student's relevant forms (instant in-class + student audience)
  const studentForms = forms.filter(
    (f) => (f.audience === 'student' || f.audience === 'both') && f.isActive
  );

  const instantInClassForm = studentForms.find((f) => f.isInstantInClass);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newSubmission: HomeworkSubmission = {
        id: 'sub-' + Date.now(),
        assignmentId: 'hw-active',
        assignmentTitle: 'Mayoz Bölünme & Krossing-over Karşılaştırma Raporu',
        studentId: currentStudent.id,
        studentName: currentStudent.fullName,
        className: currentStudent.className,
        submittedAt: 'Bugün ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Bekliyor',
        submissionText,
      };
      onSubmitHomework(newSubmission);
      setIsSubmitting(false);
      setSubmissionText('');
      setSubmittedAlert(true);
      setTimeout(() => setSubmittedAlert(false), 4000);
    }, 600);
  };

  const handleOpenFormModal = (form: SchoolDataForm) => {
    setActiveFillingForm(form);
    // Preload defaults
    const initial: Record<string, any> = {};
    form.questions.forEach((q) => {
      if (q.type === 'rating') initial[q.id] = 5;
      else if (q.type === 'single_choice' && q.options && q.options.length > 0) initial[q.id] = q.options[0];
      else if (q.type === 'consent_checkbox') initial[q.id] = true;
      else initial[q.id] = '';
    });
    setFormAnswers(initial);
  };

  const handleSendFormResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFillingForm) return;

    const formattedAnswers: FormResponseAnswer[] = activeFillingForm.questions.map((q) => ({
      questionId: q.id,
      questionTitle: q.title,
      value: formAnswers[q.id] ?? (q.type === 'rating' ? 5 : '')
    }));

    const newResponse: FormResponseSubmission = {
      id: 'resp-' + Date.now(),
      formId: activeFillingForm.id,
      formTitle: activeFillingForm.title,
      submittedBy: currentStudent.fullName,
      role: 'student',
      studentNumber: currentStudent.studentNumber,
      studentName: currentStudent.fullName,
      className: currentStudent.className,
      submittedAt: 'Bugün ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      answers: formattedAnswers,
      isVerified: true
    };

    if (onSubmitFormResponse) {
      onSubmitFormResponse(newResponse);
    }

    setFormSubmittedNotice(`"${activeFillingForm.title}" yanıtınız başarıyla öğretmen sistemine iletildi.`);
    setActiveFillingForm(null);
    setTimeout(() => setFormSubmittedNotice(null), 4000);
  };

  const isFormAlreadyAnswered = (formId: string) => {
    return responses.some(
      (r) => r.formId === formId && (r.studentNumber === currentStudent.studentNumber || r.submittedBy.includes(currentStudent.fullName))
    );
  };

  // Student Questions Filtering
  const myQuestions = submittedQuestions.filter(
    (q) => q.studentId === currentStudent.id || q.studentName.toLowerCase().includes(currentStudent.fullName.toLowerCase())
  );

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    if (!isQuestionSubmissionEnabled) return;

    setIsQuestionSubmitting(true);
    if (onSubmitQuestion) {
      onSubmitQuestion({
        subject: questionSubject,
        topic: questionTopic,
        questionText: questionText.trim(),
        questionLatex: questionLatex.trim() || undefined,
        difficulty: questionDifficulty
      });
    }

    setIsQuestionSubmitting(false);
    setQuestionText('');
    setQuestionLatex('');
    setQuestionSuccessAlert(true);
    setTimeout(() => setQuestionSuccessAlert(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner (No direct back-to-teacher button; strictly isolated) */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center font-bold text-xl shadow-inner">
            {currentStudent.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
                ÖĞRENCİ PORTALI
              </span>
              <span className="text-xs text-sky-200">No: {currentStudent.studentNumber} &bull; Sınıf: {currentStudent.className}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Hoş Geldin, {currentStudent.fullName}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Atatürk Anadolu Lisesi &bull; Fen Bilimleri Portalı &bull; Güvenli Öğrenci Oturumu
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-center">
            <div className="text-[10px] uppercase font-semibold text-sky-200">Performans Ortalamam</div>
            <div className="text-lg font-bold text-amber-300">{currentStudent.overallScore} / 100</div>
          </div>

          {/* Secure Student Session Tag (Strict role separation) */}
          <div className="bg-sky-500/20 border border-sky-400/30 rounded-xl px-3 py-2 text-xs text-sky-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Öğrenci Girişi Aktif</span>
          </div>
        </div>
      </div>

      {submittedAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Ödeviniz başarıyla sisteme iletildi! Öğretmeninizin değerlendirmesi tamamlandığında burada anında notunuz ve dönütünüz görünecektir.</span>
        </div>
      )}

      {formSubmittedNotice && (
        <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{formSubmittedNotice}</span>
        </div>
      )}

      {/* Sınıf İçi Anlık Oylama / Exit Ticket Highlight Box */}
      {instantInClassForm && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ⚡ SINIFTA CANLI ANKET & ÇIKIŞ BİLETİ
                </span>
                <span className="text-xs font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                  KOD: {instantInClassForm.instantCode}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {instantInClassForm.title}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {instantInClassForm.description}
              </p>
            </div>
          </div>

          <div>
            {isFormAlreadyAnswered(instantInClassForm.id) ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Yanıtınız Alındı ✓</span>
              </span>
            ) : (
              <button
                onClick={() => handleOpenFormModal(instantInClassForm)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md transition shadow-amber-200 animate-bounce hover:animate-none"
              >
                <Send className="w-4 h-4" />
                <span>Hemen Doldur & Gönder</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Soru Gönderim Başarı Bildirimi */}
      {questionSuccessAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Sorunuz sıfır gecikmeyle öğretmeninize iletildi! Öğretmeniniz çözdüğünde aşağıdaki listede adım adım açıklaması ve formülleri görünecektir.</span>
        </div>
      )}

      {/* MODÜL: ÖĞRETMENE SORU SOR & TAKILDIĞIN KAZANIMI İLET */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Öğretmene Soru Sor & Çözüm Takip (KaTeX & Matematik Destekli)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 uppercase">
                  Sıfır Gecikme
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Takıldığınız matematik formülleri, soru adımları veya konu eksiklerinizi iletin; öğretmen analitiğine anında işlensin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 border ${
                isQuestionSubmissionEnabled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isQuestionSubmissionEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span>{isQuestionSubmissionEnabled ? 'Soru Kabulü Açık' : 'Soru Alımı Kapalı'}</span>
            </span>
          </div>
        </div>

        {/* If question receiving is temporarily disabled to prevent slowdown */}
        {!isQuestionSubmissionEnabled ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Öğretmeniniz Soru Alımını Geçici Olarak Durdurdu</div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Sistem hızını ve odaklanmayı korumak amacıyla soru kabulü şu anda kapalıdır. Daha önce sorduğunuz soruları ve öğretmeninizin yanıtladığı çözümleri aşağıdaki listeden inceleyebilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          /* Question Submission Form */
          <form onSubmit={handleSendQuestion} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ders</label>
                <select
                  value={questionSubject}
                  onChange={(e) => setQuestionSubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="Matematik">Matematik</option>
                  <option value="Geometri">Geometri</option>
                  <option value="Fizik">Fizik</option>
                  <option value="Kimya">Kimya</option>
                  <option value="Biyoloji">Biyoloji</option>
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konu / Kazanım</label>
                <select
                  value={questionTopic}
                  onChange={(e) => setQuestionTopic(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="İkinci Dereceden Denklemler & Parabol">İkinci Dereceden Denklemler & Parabol</option>
                  <option value="Trigonometri (Tüm Konular)">Trigonometri (Tüm Konular)</option>
                  <option value="Türev ve Uygulamaları">Türev ve Uygulamaları</option>
                  <option value="Kareköklü İfadeler">Kareköklü İfadeler</option>
                  <option value="Fonksiyonlar & Grafikler">Fonksiyonlar & Grafikler</option>
                  <option value="Geometri & Üçgenler (Öklid/Pisagor)">Geometri & Üçgenler (Öklid/Pisagor)</option>
                  <option value="Polinom & Çarpanlara Ayırma">Polinom & Çarpanlara Ayırma</option>
                  <option value="Limit & Süreklilik">Limit & Süreklilik</option>
                  <option value="Logaritma & Diziler">Logaritma & Diziler</option>
                  <option value="Üslü Sayılar & Köklü Sayılar">Üslü Sayılar & Köklü Sayılar</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zorluk Seviyesi</label>
                <select
                  value={questionDifficulty}
                  onChange={(e) => setQuestionDifficulty(e.target.value as StudentQuestionDifficulty)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="Temel">Temel Düzey</option>
                  <option value="Orta">Orta Düzey</option>
                  <option value="İleri Düzey">İleri Düzey (AYT / Derece)</option>
                  <option value="ÖSYM / LGS Çıkmış">ÖSYM / LGS Çıkmış Soru</option>
                </select>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Sorunuz veya Takıldığınız Nokta: <span className="text-rose-600">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Öğretmen analitik paneline doğrudan iletilir
                </span>
              </div>
              <textarea
                rows={3}
                required
                placeholder="Örn: Bu parabol denkleminde r = -b/(2a) yapınca kökleri bulabiliyorum ama tepe noktasının simetri ekseniyle k değerini neden karıştırıyorum?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Quick Templates */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-semibold">Hızlı Şablonlar:</span>
              <button
                type="button"
                onClick={() => setQuestionText('Hocam, çözüm adımında kökleri sadeleştirirken kök kaybı yaşıyorum. Doğru sadeleştirme adımı nedir?')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
              >
                + Kök sadeleştirme takılması
              </button>
              <button
                type="button"
                onClick={() => setQuestionText('Formülün nereden çıktığını ve geometrik ispat mantığını anlayamadım.')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
              >
                + Formül mantığı & ispatı
              </button>
              <button
                type="button"
                onClick={() => setQuestionText('Soruda verilen aralıkta işaret tablosunu kurarken çift katlı kökü nasıl belirlemeliyim?')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
              >
                + İşaret tablosu & çift katlı kök
              </button>
            </div>

            {/* LaTeX Formula (Optional) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Matematik LaTeX Kodu (Opsiyonel):</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowFormulaHelper(!showFormulaHelper)}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {showFormulaHelper ? 'Şablonları Gizle' : 'Matematik Sembolleri Göster'}
                </button>
              </div>

              <input
                type="text"
                placeholder="Örn: f(x) = 2x^2 - 8x + 5 \implies r = -b/(2a)"
                value={questionLatex}
                onChange={(e) => setQuestionLatex(e.target.value)}
                className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />

              {showFormulaHelper && (
                <div className="flex flex-wrap gap-1.5 p-2 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px]">
                  <span className="text-indigo-900 font-bold self-center">Hazır Kodlar:</span>
                  {[
                    { label: 'f(x) = ax² + bx + c', code: 'f(x) = ax^2 + bx + c' },
                    { label: 'sin²x + cos²x = 1', code: '\\sin^2(x) + \\cos^2(x) = 1' },
                    { label: 'r = -b/(2a)', code: 'r = -\\frac{b}{2a}' },
                    { label: '√a² + b²', code: '\\sqrt{a^2 + b^2}' },
                    { label: 'lim x→0', code: '\\lim_{x \\to 0} \\frac{f(x)}{g(x)}' },
                    { label: '∫ f(x)dx', code: '\\int f(x) \\, dx' }
                  ].map((s, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setQuestionLatex(s.code)}
                      className="px-2 py-0.5 bg-white hover:bg-indigo-100 text-indigo-700 font-mono rounded border border-indigo-200 transition"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Real-time KaTeX preview */}
              {questionLatex.trim() && (
                <div className="mt-2 p-3 bg-white rounded-xl border border-indigo-200 shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    KaTeX Canlı Önizleme:
                  </div>
                  <div className="text-center py-1">
                    <LatexFormulaRenderer latex={questionLatex} block />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
              <span className="text-[11px] text-slate-500">
                Öğrenci: <strong>{currentStudent.fullName}</strong> ({currentStudent.className})
              </span>
              <button
                type="submit"
                disabled={isQuestionSubmitting || !questionText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs transition"
              >
                {isQuestionSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>İletiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Soruyu Öğretmene Gönder</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Student Questions History & Solution Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sorduğum Sorular ve Çözümlerim ({myQuestions.length})</span>
            </h4>

            {/* Status Filter */}
            <div className="flex items-center gap-1 text-[11px]">
              {(['Tümü', 'Beklemede', 'Çözüldü'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setQuestionFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    questionFilter === filter
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* List of Questions */}
          {myQuestions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
              Henüz soru iletmediniz. Takıldığınız konuları yukarıdaki formdan hemen öğretmeninize sorabilirsiniz.
            </div>
          ) : (
            <div className="space-y-3">
              {myQuestions
                .filter((q) => {
                  if (questionFilter === 'Beklemede') return q.status !== 'Çözüldü';
                  if (questionFilter === 'Çözüldü') return q.status === 'Çözüldü';
                  return true;
                })
                .map((q) => {
                  const isAnswered = q.status === 'Çözüldü';
                  return (
                    <div
                      key={q.id}
                      className={`border rounded-2xl p-4 transition space-y-3 bg-white shadow-2xs ${
                        q.isFlaggedAsDeficiency
                          ? 'border-rose-300 ring-1 ring-rose-300/30'
                          : isAnswered
                          ? 'border-emerald-200'
                          : 'border-slate-200'
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                            {q.subject} &bull; {q.topic}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {q.submittedAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {q.isFlaggedAsDeficiency && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                              <span>Eksik Kazanım Olarak İşaretlendi</span>
                            </span>
                          )}

                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                              isAnswered
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : q.status === 'İnceleniyor'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            {isAnswered ? '✓ Çözüldü' : q.status === 'İnceleniyor' ? '🔍 İnceleniyor' : '⏳ Öğretmen Bekleniyor'}
                          </span>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="space-y-1.5 text-xs">
                        <div className="font-semibold text-slate-800 leading-relaxed">
                          {q.questionText}
                        </div>
                        {q.questionLatex && (
                          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center overflow-x-auto">
                            <LatexFormulaRenderer latex={q.questionLatex} block />
                          </div>
                        )}
                      </div>

                      {/* Teacher's Solution (When answered) */}
                      {isAnswered && (
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold text-emerald-950">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Öğretmeninizin Çözümü:</span>
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
                            <div className="flex items-center gap-1.5 text-[11px] text-indigo-900 bg-white/80 p-2 rounded-lg border border-emerald-100">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span><strong>Püf Noktası:</strong> {q.teacherPedagogicalHint}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Doldurulacak Öğrenci Bilgi Toplama Formları & Anketler */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Bilgi Toplama Formlarım & Anketler (Kulüp, Olimpiyat, DYK)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {studentForms.length} Aktif Form Bulunuyor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentForms.map((sf) => {
            const answered = isFormAlreadyAnswered(sf.id);
            return (
              <div
                key={sf.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 uppercase">
                      {sf.category}
                    </span>
                    {answered && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        İletildi
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{sf.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sf.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {sf.isInstantInClass ? '⚡ Anlık' : `Son: ${sf.deadline || 'Süresiz'}`}
                  </span>
                  <button
                    onClick={() => handleOpenFormModal(sf)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                      answered
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-2xs'
                    }`}
                  >
                    {answered ? 'Yanıtı Güncelle' : 'Formu Doldur'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Homeworks, Handouts & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Handouts & Homework Submission */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Class Handout / Drive Document */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Bugünkü Dersin Öğrenci Föyü & Drive Notları</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Derse Hazır
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-900">{currentScenario.studentCopy.title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  Konu: {currentScenario.topic} &bull; Boşluk doldurmalı çalışma föyü
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentScenario.driveFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition shrink-0"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Drive'dan İndir / Aç</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-sky-50/50 p-3 rounded-xl border border-sky-100">
              <span className="font-semibold text-sky-950">Özet: </span>
              {currentScenario.studentCopy.summary}
            </div>
          </div>

          {/* Online Homework Submission Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-600" />
                <span>Aktif Ödev Teslim Paneli</span>
              </h3>
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                Son Teslim: Yarın 23:59
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">
                Mayoz Bölünme & Krossing-over Karşılaştırma Raporu
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Mitoz ile Mayoz I/II arasındaki kromozom sayısı değişimlerini ve krossing-overın kalıtsal çeşitliliğe etkisini en az 3 maddeyle açıklayınız.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ödev Yanıtınız veya Rapor Metniniz:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ödev cevabınızı, deney gözlemlerinizi veya çözümlerinizi buraya yazınız..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-400">
                  Teslim edilen ödevler MEB Maarif Modeli rubriğiyle otomatik kontrol edilir.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !submissionText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 rounded-xl shadow-xs transition"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Ödevi Öğretmene Gönder</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Graded Homeworks & Projects & Olympiad */}
        <div className="lg:col-span-5 space-y-6">
          {/* Graded Homeworks & Rubric Feedback */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Değerlendirilen Ödevlerim & Öğretmen Dönütleri</span>
            </h3>

            {gradedHomeworks.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                Henüz değerlendirilmiş ödev bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {gradedHomeworks.map((hw) => (
                  <div key={hw.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{hw.assignmentTitle}</span>
                      <span className="font-black text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-lg">
                        {hw.score} / 100
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-800">Öğretmen Dönütü: </span>
                      {hw.feedback}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>Teslim: {hw.submittedAt}</span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Rubrikle Onaylandı
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Olympiad Participation Card */}
          {olympiadMember && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  TÜBİTAK BİDEB 2202 TAKIMI
                </span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-lg">
                  {olympiadMember.targetMedal}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {olympiadMember.branch} Bilim Olimpiyatı Hazırlık Grubu
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Deneme Neti: <strong>{olympiadMember.trialExamNet} / 100</strong> &bull; Çözülen Soru: <strong>{olympiadMember.solvedQuestionsCount}</strong>
                </p>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-amber-950">Haftalık Laboratuvar & Kamp Yükü:</div>
                <div className="text-[11px] text-slate-600">
                  Haftalık {olympiadMember.weeklyHoursCommitted} saat Campbell ve geçmiş IBO olimpiyat soruları analizi yapılmaktadır.
                </div>
              </div>
            </div>
          )}

          {/* Student's Projects & Clubs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Görev Aldığım Projeler</span>
            </h3>

            {studentProjects.length === 0 ? (
              <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
                Aktif olarak dahil olduğunuz bir TÜBİTAK veya TEKNOFEST projesi bulunmuyor.
              </p>
            ) : (
              <div className="space-y-2.5">
                {studentProjects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl bg-purple-50/50 border border-purple-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">{proj.title}</span>
                      <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-full">
                        {proj.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-purple-800">
                      Danışman: {proj.advisorTeacher} &bull; Aşama: {proj.currentStage}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Öğrencinin Formu Doldurması ve Göndermesi */}
      {activeFillingForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase">
                    {activeFillingForm.category}
                  </span>
                  {activeFillingForm.isInstantInClass && (
                    <span className="text-[10px] font-mono font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md">
                      KOD: {activeFillingForm.instantCode}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-slate-900">{activeFillingForm.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{activeFillingForm.description}</p>
              </div>
              <button
                onClick={() => setActiveFillingForm(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendFormResponse} className="space-y-5">
              {activeFillingForm.questions.map((q, idx) => (
                <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                  <label className="block text-xs font-bold text-slate-900">
                    {idx + 1}. {q.title} {q.required && <span className="text-rose-600">*</span>}
                  </label>

                  {/* Rating 1 to 5 */}
                  {q.type === 'rating' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{q.minLabel || '1 - Çok Az'}</span>
                        <span>{q.maxLabel || '5 - Çok İyi'}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            type="button"
                            key={val}
                            onClick={() => setFormAnswers({ ...formAnswers, [q.id]: val })}
                            className={`py-2 rounded-xl text-xs font-bold transition ${
                              formAnswers[q.id] === val
                                ? 'bg-teal-600 text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {val} ★
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Single Choice Options */}
                  {q.type === 'single_choice' && q.options && (
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            formAnswers[q.id] === opt
                              ? 'bg-teal-50 border-teal-300 text-teal-950 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`radio-${q.id}`}
                            checked={formAnswers[q.id] === opt}
                            onChange={() => setFormAnswers({ ...formAnswers, [q.id]: opt })}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Open Ended Text */}
                  {q.type === 'text' && (
                    <textarea
                      rows={3}
                      placeholder="Cevabınızı veya öğretmene iletmek istediğiniz notu yazınız..."
                      value={formAnswers[q.id] || ''}
                      onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  )}

                  {/* Consent Checkbox */}
                  {q.type === 'consent_checkbox' && (
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={formAnswers[q.id] || false}
                        onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.checked })}
                        className="w-4 h-4 text-teal-600 rounded-sm"
                      />
                      <span>Yukarıdaki bilgileri eksiksiz ve doğru olarak beyan ettiğimi onaylıyorum.</span>
                    </label>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-400">
                  Öğrenci: {currentStudent.fullName} ({currentStudent.className})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveFillingForm(null)}
                    className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Yanıtı Öğretmene İlet</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  CalendarPlus,
  MessageSquare,
  ShieldAlert,
  Phone,
  FileText,
  AlertCircle,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  HeartPulse,
  Bus,
  ShieldCheck,
  Send,
  X,
  FileCheck
} from 'lucide-react';
import {
  Student,
  HomeworkSubmission,
  ParentAppointment,
  SubjectCognitiveMetric,
  SchoolDataForm,
  FormResponseSubmission,
  FormResponseAnswer,
  StudentSubmittedQuestion
} from '../types';
import { HelpCircle } from 'lucide-react';

interface ParentPortalViewProps {
  currentStudent: Student;
  homeworks: HomeworkSubmission[];
  appointments: ParentAppointment[];
  cognitiveMetrics?: SubjectCognitiveMetric[];
  forms?: SchoolDataForm[];
  responses?: FormResponseSubmission[];
  submittedQuestions?: StudentSubmittedQuestion[];
  onAddAppointment: (appointment: ParentAppointment) => void;
  onSubmitFormResponse?: (res: FormResponseSubmission) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  currentStudent,
  homeworks,
  appointments,
  cognitiveMetrics = [],
  forms = [],
  responses = [],
  submittedQuestions = [],
  onAddAppointment,
  onSubmitFormResponse,
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCognitiveGuide, setShowCognitiveGuide] = useState(true);
  const [parentName, setParentName] = useState('Mehmet Yılmaz (Velisi)');
  const [appointmentTopic, setAppointmentTopic] = useState('YKS hazırlık süreci ve biyoloji proje ödevi dengesi');
  const [selectedDate, setSelectedDate] = useState('2026-10-24 (Cuma)');
  const [selectedTime, setSelectedTime] = useState('10:10 - 10:50 (Veli Görüşme Saati)');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Parent form modal state
  const [activeFillingForm, setActiveFillingForm] = useState<SchoolDataForm | null>(null);
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({});
  const [formSubmittedNotice, setFormSubmittedNotice] = useState<string | null>(null);

  const studentHomeworks = homeworks.filter(
    (h) => h.studentName.toLowerCase().includes(currentStudent.fullName.toLowerCase()) || h.studentId === currentStudent.id
  );

  const myStudentQuestions = submittedQuestions.filter(
    (q) => q.studentId === currentStudent.id || q.studentName.toLowerCase().includes(currentStudent.fullName.toLowerCase())
  );

  // Relevant parent forms
  const parentForms = forms.filter(
    (f) => (f.audience === 'parent' || f.audience === 'both') && f.isActive
  );

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: ParentAppointment = {
      id: 'app-' + Date.now(),
      parentName,
      studentName: currentStudent.fullName,
      studentNumber: currentStudent.studentNumber,
      className: currentStudent.className,
      requestedDate: selectedDate,
      requestedTime: selectedTime,
      topic: appointmentTopic,
      status: 'Onaylandı',
      teacherNotes: 'Randevu sisteme işlendi. Görüşme Biyoloji / Rehberlik zümre odasında yapılacaktır.'
    };
    onAddAppointment(newApp);
    setShowBookingModal(false);
    setRequestSuccess(true);
    setTimeout(() => setRequestSuccess(false), 4000);
  };

  const handleOpenFormModal = (form: SchoolDataForm) => {
    setActiveFillingForm(form);
    const initial: Record<string, any> = {};
    form.questions.forEach((q) => {
      if (q.type === 'single_choice' && q.options && q.options.length > 0) initial[q.id] = q.options[0];
      else if (q.type === 'consent_checkbox') initial[q.id] = true;
      else if (q.type === 'rating') initial[q.id] = 5;
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
      value: formAnswers[q.id] ?? (q.type === 'consent_checkbox' ? true : '')
    }));

    const newResponse: FormResponseSubmission = {
      id: 'resp-' + Date.now(),
      formId: activeFillingForm.id,
      formTitle: activeFillingForm.title,
      submittedBy: parentName,
      role: 'parent',
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

    setFormSubmittedNotice(`"${activeFillingForm.title}" veli onay ve bilgi belgeniz başarıyla okul sistemine kaydedildi.`);
    setActiveFillingForm(null);
    setTimeout(() => setFormSubmittedNotice(null), 4000);
  };

  const isFormAlreadyAnswered = (formId: string) => {
    return responses.some(
      (r) => r.formId === formId && (r.studentNumber === currentStudent.studentNumber || r.submittedBy.includes('Velisi') || r.role === 'parent')
    );
  };

  return (
    <div className="space-y-6">
      {/* Parent Welcome Banner (No direct back-to-teacher button; strictly isolated) */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              MEB VELİ BİLGİLENDİRME & RANDEVU SİSTEMİ
            </span>
            <span className="text-xs text-slate-300">Öğrenci: {currentStudent.fullName} ({currentStudent.className})</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Sayın Veli, Hoş Geldiniz
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Çocuğunuzun ders içi katılımı, şeffaf rubrik performans notları, devamsızlık durumu,
            okul dışı gezi onay belgeleri ve sağlık bildirim formları bu portaldan takip edilir.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowBookingModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-xs transition"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Öğretmenden Randevu Al</span>
          </button>

          {/* Secure Parent Session Badge (Strict role separation) */}
          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-2 text-xs text-emerald-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Veli Oturumu: {parentName}</span>
          </div>
        </div>
      </div>

      {requestSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Görüşme randevusu başarıyla oluşturuldu! Öğretmenin onay notu ve görüşme saati aşağıda listelenmektedir.</span>
        </div>
      )}

      {formSubmittedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 text-xs flex items-center gap-2 animate-in fade-in">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{formSubmittedNotice}</span>
        </div>
      )}

      {/* KPI Cards: Academic Score, Attendance, Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Akademik Performans Notu
          </div>
          <div className="text-2xl font-black text-indigo-700">
            {currentStudent.overallScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ödev, laboratuvar ve ders içi katılım ortalaması.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Toplam Devamsızlık
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currentStudent.attendanceDaysMissed} <span className="text-xs text-slate-400 font-normal">Gün</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Devamsızlık sınırı içinde (Güvenli).</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            İletişim & Rehberlik Durumu
          </div>
          <div className="text-sm font-bold text-slate-800 truncate">
            {currentStudent.bepStatus ? 'BEP Planı Uygulanıyor' : 'Genel Müfredat'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 truncate">{currentStudent.notes}</p>
        </div>
      </div>

      {/* Okul Bilgi Toplama Formları & Veli İzin Belgeleri Bölümü */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Okul Bilgi Toplama Formları & Veli İzin Belgeleri
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {parentForms.length} Adet Veli Formu Mevcut
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {parentForms.map((pf) => {
            const answered = isFormAlreadyAnswered(pf.id);
            return (
              <div
                key={pf.id}
                className={`rounded-2xl p-4 border flex flex-col justify-between space-y-3 transition ${
                  answered
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                      {pf.category === 'health_safety' ? 'Sağlık & Acil' : pf.category === 'field_trip_permission' ? 'Gezi İzni' : pf.category === 'contact_transport' ? 'Ulaşım/Servis' : 'Rehberlik'}
                    </span>
                    {answered && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Onaylandı
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{pf.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pf.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Son Gün: {pf.deadline || 'Süresiz'}</span>
                  <button
                    onClick={() => handleOpenFormModal(pf)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                      answered
                        ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                    }`}
                  >
                    {answered ? 'Bilgileri Güncelle' : 'Doldur & Onayla'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Homeworks & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Homeworks and Rubric Scores */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Öğrencinin Ödevleri ve MEB Rubrik Notları</span>
              </h3>
              <span className="text-xs text-slate-500">
                {studentHomeworks.length} Ödev Bulundu
              </span>
            </div>

            <div className="space-y-3">
              {studentHomeworks.map((hw) => (
                <div key={hw.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{hw.assignmentTitle}</span>
                      <div className="text-[11px] text-slate-500">Teslim: {hw.submittedAt}</div>
                    </div>
                    {hw.score !== undefined ? (
                      <span className="text-sm font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                        {hw.score} / 100
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Değerlendirme Bekliyor
                      </span>
                    )}
                  </div>

                  {hw.feedback && (
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 space-y-1">
                      <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Öğretmen Değerlendirme Özeti & Rubrik Dönütü:</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-relaxed">
                        &ldquo;{hw.feedback}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 bg-slate-100/70 p-2 rounded truncate">
                    <span className="font-semibold text-slate-700">Öğrenci Yanıtı: </span>
                    {hw.submissionText}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Öğrencinin Öğretmene Sorduğu Sorular & Çözüm Durumu (Veliye Şeffaf İlerleme) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Öğrencinin Öğretmene Sorduğu Sorular & Eksik Kazanım Durumu</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {myStudentQuestions.length} Soru Kaydı
              </span>
            </div>

            {myStudentQuestions.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                Öğrencinizin henüz ilettiği bir soru kaydı bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {myStudentQuestions.map((q) => {
                  const isAnswered = q.status === 'Çözüldü';
                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-2.5 transition ${
                        q.isFlaggedAsDeficiency
                          ? 'bg-rose-50/40 border-rose-200 ring-1 ring-rose-200/50'
                          : isAnswered
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{q.topic}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            isAnswered
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {isAnswered ? '✓ Öğretmen Çözdü' : '⏳ Öğretmen İncelemesinde'}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                        <span className="font-semibold text-slate-900">Öğrencinin Takıldığı Nokta: </span>
                        {q.questionText}
                      </div>

                      {/* If teacher responded */}
                      {isAnswered && q.teacherAnswer && (
                        <div className="text-[11px] text-emerald-950 bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-200 leading-relaxed">
                          <span className="font-bold text-emerald-900 flex items-center gap-1 mb-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Öğretmen Açıklaması:
                          </span>
                          <p>{q.teacherAnswer}</p>
                          {q.teacherPedagogicalHint && (
                            <p className="mt-1 text-indigo-900 font-medium">
                              💡 <strong>Veliye / Öğrenciye Not:</strong> {q.teacherPedagogicalHint}
                            </p>
                          )}
                        </div>
                      )}

                      {q.isFlaggedAsDeficiency && (
                        <div className="text-[10px] font-bold text-rose-700 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Bu kazanım eksik olarak tespit edilmiştir; evde pekiştirilmesi tavsiye edilir.</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Parent Appointments & Teacher Meeting Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Görüşme Randevuları</span>
              </h3>
              <button
                onClick={() => setShowBookingModal(true)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                + Yeni Randevu
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <div className="font-bold text-slate-900">Öğretmen Resmi Görüşme Saati:</div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Her Cuma 10:10 - 10:50 (3. Ders Saati)</span>
              </div>
            </div>

            <div className="space-y-3">
              {appointments.map((app) => (
                <div key={app.id} className="border border-slate-200 rounded-xl p-3.5 bg-white text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{app.requestedDate}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {app.status}
                    </span>
                  </div>
                  <div className="text-slate-600 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{app.requestedTime}</span>
                  </div>
                  <div className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="font-semibold text-slate-900">Görüşme Konusu: </span>
                    {app.topic}
                  </div>
                  {app.teacherNotes && (
                    <div className="text-[11px] text-indigo-700">
                      <span className="font-semibold">Öğretmen Yanıtı: </span>
                      {app.teacherNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* MODAL 1: Öğretmenden Randevu Alma */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">Öğretmen Görüşme Randevusu Al</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleBook} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Veli Adı Soyadı</label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tercih Edilen Randevu Tarihi</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="2026-10-24 (Cuma)">24 Ekim 2026 (Cuma - Veli Görüşme Günü)</option>
                  <option value="2026-10-31 (Cuma)">31 Ekim 2026 (Cuma - Veli Görüşme Günü)</option>
                  <option value="2026-11-07 (Cuma)">07 Kasım 2026 (Cuma - Veli Görüşme Günü)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Saat Dilimi</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="10:10 - 10:50 (3. Ders Saati)">10:10 - 10:50 (3. Ders Saati)</option>
                  <option value="12:00 - 12:40 (Öğle Arası)">12:00 - 12:40 (Öğle Arası)</option>
                  <option value="15:30 - 16:10 (Ders Çıkışı)">15:30 - 16:10 (Ders Çıkışı)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Görüşmek İstediğiniz Temel Konu</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Görüşme konusunu ve öğrenciniz hakkındaki notlarınızı belirtiniz..."
                  value={appointmentTopic}
                  onChange={(e) => setAppointmentTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold"
                >
                  Randevu Talebini Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Veli Formu Doldurma ve Dijital Onay Modalı */}
      {activeFillingForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  MEB RESMİ VELİ FORMU
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{activeFillingForm.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{activeFillingForm.description}</p>
              </div>
              <button
                onClick={() => setActiveFillingForm(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendFormResponse} className="space-y-4">
              {activeFillingForm.questions.map((q, idx) => (
                <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <label className="block text-xs font-bold text-slate-900">
                    {idx + 1}. {q.title} {q.required && <span className="text-rose-600">*</span>}
                  </label>

                  {/* Single Choice Radio */}
                  {q.type === 'single_choice' && q.options && (
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            formAnswers[q.id] === opt
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`parent-radio-${q.id}`}
                            checked={formAnswers[q.id] === opt}
                            onChange={() => setFormAnswers({ ...formAnswers, [q.id]: opt })}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Text Input */}
                  {q.type === 'text' && (
                    <textarea
                      rows={2}
                      placeholder="Gerekli bilgiyi veya açıklamanızı yazınız..."
                      value={formAnswers[q.id] || ''}
                      onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  )}

                  {/* Rating */}
                  {q.type === 'rating' && (
                    <div className="grid grid-cols-5 gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setFormAnswers({ ...formAnswers, [q.id]: val })}
                          className={`py-2 rounded-xl text-xs font-bold transition ${
                            formAnswers[q.id] === val
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Consent Checkbox */}
                  {q.type === 'consent_checkbox' && (
                    <label className="flex items-center gap-2.5 text-xs text-slate-800 cursor-pointer pt-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={formAnswers[q.id] || false}
                        onChange={(e) => setFormAnswers({ ...formAnswers, [q.id]: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded-sm"
                      />
                      <span className="font-medium">
                        MEB mevzuatı uyarınca verdiğim bilgilerin doğruluğunu ve gezi/etkinlik katılım iznini dijital olarak onaylıyorum.
                      </span>
                    </label>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-400">
                  Veli: {parentName} &bull; Öğrenci: {currentStudent.fullName}
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
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Formu Onayla & Okula İlet</span>
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

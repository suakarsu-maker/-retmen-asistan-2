import React, { useState } from 'react';
import {
  ClipboardList,
  Sparkles,
  Search,
  Plus,
  Play,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Share2,
  Copy,
  ChevronRight,
  BarChart3,
  Flame,
  Radio,
  FileCheck,
  QrCode,
  AlertTriangle,
  X,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Bus,
  HeartPulse,
  Award,
  GraduationCap
} from 'lucide-react';
import {
  SchoolDataForm,
  FormResponseSubmission,
  FormCategory,
  FormAudience,
  FormQuestion,
  FormQuestionType
} from '../types';

interface FormsDataCollectionTabProps {
  forms: SchoolDataForm[];
  responses: FormResponseSubmission[];
  onAddForm: (newForm: SchoolDataForm) => void;
  onToggleFormActive: (formId: string) => void;
}

export const FormsDataCollectionTab: React.FC<FormsDataCollectionTabProps> = ({
  forms,
  responses,
  onAddForm,
  onToggleFormActive,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  
  // Modals
  const [inspectingForm, setInspectingForm] = useState<SchoolDataForm | null>(null);
  const [livePresentationForm, setLivePresentationForm] = useState<SchoolDataForm | null>(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [copiedCodeAlert, setCopiedCodeAlert] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // New Form Wizard State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<FormCategory>('in_class_instant');
  const [newAudience, setNewAudience] = useState<FormAudience>('student');
  const [newIsInstant, setNewIsInstant] = useState(true);
  const [newInstantCode, setNewInstantCode] = useState('FEN-' + Math.floor(10 + Math.random() * 90));
  const [newDeadline, setNewDeadline] = useState('28 Ekim 2026');
  const [newTargetClasses, setNewTargetClasses] = useState<string[]>(['10-A']);
  const [newQuestions, setNewQuestions] = useState<FormQuestion[]>([
    {
      id: 'q-custom-1',
      title: 'Bugünkü ders konusunu anlama düzeyiniz:',
      type: 'rating',
      required: true,
      minLabel: '1 - Yetersiz',
      maxLabel: '5 - Mükemmel'
    },
    {
      id: 'q-custom-2',
      title: 'En çok zorlandığınız alt konu veya kavram nedir?',
      type: 'text',
      required: false
    }
  ]);

  // Statistics
  const totalForms = forms.length;
  const instantFormsCount = forms.filter((f) => f.isInstantInClass).length;
  const totalResponsesCount = forms.reduce((acc, f) => acc + f.responseCount, 0);
  const totalTargetCount = forms.reduce((acc, f) => acc + f.totalTargetCount, 0);
  const averageParticipationRate = totalTargetCount > 0 ? Math.round((totalResponsesCount / totalTargetCount) * 100) : 0;

  // Filtered Forms
  const filteredForms = forms.filter((f) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'instant'
        ? f.isInstantInClass
        : selectedCategory === 'student'
        ? f.audience === 'student' || f.audience === 'both'
        : selectedCategory === 'parent'
        ? f.audience === 'parent' || f.audience === 'both'
        : f.category === selectedCategory;

    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.instantCode && f.instantCode.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass =
      selectedClassFilter === 'all'
        ? true
        : f.targetClasses.includes(selectedClassFilter);

    return matchesCategory && matchesSearch && matchesClass;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeAlert(code);
    setTimeout(() => setCopiedCodeAlert(null), 3000);
  };

  const handleExportData = (formTitle: string) => {
    setExportNotice(`"${formTitle}" formunun tüm veli/öğrenci yanıt dökümü ve MEB formatındaki analiz raporu Excel/PDF olarak hazırlandı.`);
    setTimeout(() => setExportNotice(null), 4500);
  };

  const handleCreateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: SchoolDataForm = {
      id: 'form-' + Date.now(),
      title: newTitle,
      description: newDescription || 'Öğretmen tarafından oluşturulan dijital bilgi toplama formu.',
      category: newCategory,
      audience: newAudience,
      isInstantInClass: newIsInstant,
      instantCode: newIsInstant ? newInstantCode : undefined,
      deadline: !newIsInstant ? newDeadline : undefined,
      createdAt: 'Şimdi',
      isActive: true,
      targetClasses: newTargetClasses.length > 0 ? newTargetClasses : ['10-A'],
      questions: newQuestions,
      responseCount: 0,
      totalTargetCount: 28
    };

    onAddForm(created);
    setIsCreatingForm(false);
    setNewTitle('');
    setNewDescription('');
    setInspectingForm(created);
  };

  const addQuestionField = (type: FormQuestionType) => {
    const qId = 'q-' + Date.now();
    let qTitle = 'Yeni Soru';
    let options: string[] | undefined = undefined;

    if (type === 'rating') {
      qTitle = 'Anlama ve memnuniyet düzeyinizi 1-5 arasında değerlendiriniz:';
    } else if (type === 'single_choice') {
      qTitle = 'Aşağıdaki seçeneklerden birini işaretleyiniz:';
      options = ['1. Seçenek', '2. Seçenek', '3. Seçenek'];
    } else if (type === 'consent_checkbox') {
      qTitle = 'Yukarıdaki bilgilendirmeyi okudum ve onaylıyorum.';
    } else {
      qTitle = 'Görüş veya açıklamanızı yazınız:';
    }

    setNewQuestions([
      ...newQuestions,
      {
        id: qId,
        title: qTitle,
        type,
        required: true,
        options,
        minLabel: type === 'rating' ? '1 - Düşük' : undefined,
        maxLabel: type === 'rating' ? '5 - Yüksek' : undefined
      }
    ]);
  };

  const removeQuestionField = (id: string) => {
    setNewQuestions(newQuestions.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
              MEB BİLGİ TOPLAMA VE FORM YÖNETİM MERKEZİ
            </span>
            <span className="text-xs text-teal-200">Sınıf İçi Anlık &bull; Geniş Süreli Katılım</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Öğrenci & Veli Bilgi Toplama ve Canlı Anketler
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Ders içi anlık çıkış biletleri (Exit Ticket), hızlı kavram oylamaları, sağlık ve acil durum formları,
            gezi izin belgeleri, sosyal kulüp ve olimpiyat takım başvurularının tek merkezden anlık takibi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              const activeInstant = forms.find((f) => f.isInstantInClass && f.isActive) || forms[0];
              setLivePresentationForm(activeInstant);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-xs transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Canlı Akıllı Tahta Modu (PIN)</span>
          </button>

          <button
            onClick={() => setIsCreatingForm(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-teal-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Form / Anket Oluştur</span>
          </button>
        </div>
      </div>

      {copiedCodeAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Katılım Kodu <strong>{copiedCodeAlert}</strong> panoya kopyalandı! Öğrenciler akıllı tahtadan veya cihazlarından doğrudan giriş yapabilir.</span>
          </div>
        </div>
      )}

      {exportNotice && (
        <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-xl p-3 text-xs flex items-center gap-2 animate-in fade-in">
          <FileCheck className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Toplam Aktif Form</span>
            <ClipboardList className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalForms}</div>
          <p className="text-[11px] text-teal-600 font-medium mt-1">Öğrenci & Veli tüm başlıklar dahil</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Sınıf İçi Anlık Oturum</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{instantFormsCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Canlı Exit Ticket & Quiz modülleri</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Toplanan Toplam Yanıt</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600">{totalResponsesCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Sistemde kayıtlı dijital geri bildirim</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Ortalama Katılım Oranı</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">%{averageParticipationRate}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Yüksek veli ve öğrenci erişimi</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Form başlığı, kod veya anahtar kelime ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium">Hedef Sınıf:</span>
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Tüm Sınıflar</option>
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-teal-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tümü ({forms.length})
          </button>
          <button
            onClick={() => setSelectedCategory('instant')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'instant'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>⚡ Sınıf İçi Anlık ({forms.filter((f) => f.isInstantInClass).length})</span>
          </button>
          <button
            onClick={() => setSelectedCategory('student')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'student'
                ? 'bg-sky-700 text-white font-bold'
                : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>🎒 Öğrenci Geniş Süreli</span>
          </button>
          <button
            onClick={() => setSelectedCategory('parent')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'parent'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>👨‍👩‍👧 Veli Bilgi Toplama</span>
          </button>
          <button
            onClick={() => setSelectedCategory('health_safety')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'health_safety'
                ? 'bg-rose-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            <span>Sağlık & Alerji</span>
          </button>
          <button
            onClick={() => setSelectedCategory('field_trip_permission')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'field_trip_permission'
                ? 'bg-purple-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bus className="w-3.5 h-3.5 text-purple-500" />
            <span>Gezi & İzin</span>
          </button>
          <button
            onClick={() => setSelectedCategory('social_club')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'social_club'
                ? 'bg-indigo-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Kulüp & Yetenek</span>
          </button>
          <button
            onClick={() => setSelectedCategory('olympiad_application')}
            className={`px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 ${
              selectedCategory === 'olympiad_application'
                ? 'bg-orange-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Olimpiyat Başvuru</span>
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForms.map((form) => {
          const rate = form.totalTargetCount > 0 ? Math.round((form.responseCount / form.totalTargetCount) * 100) : 0;
          return (
            <div
              key={form.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between transition hover:shadow-md ${
                form.isInstantInClass ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                {/* Header row: Audience & Instant Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {form.isInstantInClass ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md animate-pulse">
                        <Flame className="w-3 h-3 fill-white" />
                        ANLIK SINIF İÇİ
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        Geniş Süreli Form
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        form.audience === 'student'
                          ? 'bg-sky-100 text-sky-800'
                          : form.audience === 'parent'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {form.audience === 'student' ? '🎒 Öğrenci' : form.audience === 'parent' ? '👨‍👩‍👧 Veli' : '🎒👨‍👩‍👧 Öğrenci & Veli'}
                    </span>
                  </div>

                  {form.instantCode ? (
                    <button
                      onClick={() => handleCopyCode(form.instantCode!)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md hover:bg-slate-800 transition"
                      title="Katılım kodunu kopyala"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{form.instantCode}</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-medium">
                      Son Gün: {form.deadline || 'Süresiz'}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{form.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {form.description}
                  </p>
                </div>

                {/* Target Classes & Questions Count */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                    Sınıflar: {form.targetClasses.join(', ')}
                  </span>
                  <span>&bull;</span>
                  <span>{form.questions.length} Soru</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Yanıt Durumu:</span>
                    <span className="font-bold text-slate-900">
                      {form.responseCount} / {form.totalTargetCount} (%{rate})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rate >= 80 ? 'bg-emerald-500' : rate >= 50 ? 'bg-teal-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setInspectingForm(form)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl transition"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Yanıtları Analiz Et</span>
                </button>

                {form.isInstantInClass && (
                  <button
                    onClick={() => setLivePresentationForm(form)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition"
                    title="Akıllı tahtada canlı başlat"
                  >
                    <Play className="w-3.5 h-3.5 fill-amber-900" />
                    <span>Tahta</span>
                  </button>
                )}

                <button
                  onClick={() => onToggleFormActive(form.id)}
                  className={`px-2.5 py-2 text-xs font-semibold rounded-xl border transition ${
                    form.isActive
                      ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                  title={form.isActive ? 'Formu yanıtlara kapat' : 'Formu yayına al'}
                >
                  {form.isActive ? 'Yayında' : 'Kapalı'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Canlı Sınıf İçi Oylama / Akıllı Tahta Sunum Modu */}
      {livePresentationForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-inner">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      CANLI AKILLI TAHTA MODU
                    </span>
                    <span className="text-xs text-slate-400">Hedef: {livePresentationForm.targetClasses.join(', ')}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-0.5">{livePresentationForm.title}</h2>
                </div>
              </div>
              <button
                onClick={() => setLivePresentationForm(null)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big PIN & QR Code Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/80 rounded-2xl p-6">
              <div className="md:col-span-8 space-y-3">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Öğrenci Katılım Yönergesi:
                </div>
                <div className="text-sm text-slate-200">
                  Öğrenciler telefonlarından, tabletlerinden veya laboratuvar bilgisayarlarından Öğrenci Portalını açarak aşağıdaki PIN kodunu girebilir:
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="bg-slate-950 border-2 border-amber-400 text-amber-300 font-mono font-black text-3xl sm:text-4xl px-6 py-3 rounded-2xl shadow-lg tracking-widest flex items-center gap-3">
                    <span>{livePresentationForm.instantCode || 'FEN-10A'}</span>
                    <button
                      onClick={() => handleCopyCode(livePresentationForm.instantCode || 'FEN-10A')}
                      className="text-xs text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg transition"
                      title="Kodu kopyala"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 leading-snug">
                    <div>Bağlantı: <span className="text-teal-300 font-mono font-semibold">portal.okul.meb.gov.tr</span></div>
                    <div className="text-emerald-400 font-medium mt-1 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Canlı Yanıt Dinleniyor...
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <QrCode className="w-28 h-28 text-white p-1" />
                <div className="text-[10px] text-slate-400 text-center mt-2">
                  Akıllı telefon kamerasıyla okutarak anında yanıtlayın
                </div>
              </div>
            </div>

            {/* Live Incoming Responses & Real-Time Chart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Anlık Yanıt Dağılımı ({livePresentationForm.responseCount} / {livePresentationForm.totalTargetCount} Öğrenci Gönderdi)</span>
                </span>
                <span className="text-emerald-400">Katılım: %{Math.round((livePresentationForm.responseCount / livePresentationForm.totalTargetCount) * 100)}</span>
              </div>

              {/* Sample Question Visualization */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="text-sm font-bold text-amber-200">
                  Soru 1: {livePresentationForm.questions[0]?.title}
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">5 Yıldız - Çok İyi Anladım</span>
                    <span className="font-bold text-emerald-400">14 Öğrenci (%54)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '54%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-300">4 Yıldız - İyi Anladım</span>
                    <span className="font-bold text-teal-400">8 Öğrenci (%31)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '31%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-300">3 Yıldız - Kısmen / Tereddütlü</span>
                    <span className="font-bold text-amber-400">4 Öğrenci (%15)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Oturumu sonlandırdığınızda sonuçlar otomatik olarak ders analizi raporunuza eklenecektir.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleExportData(livePresentationForm.title);
                    setLivePresentationForm(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
                >
                  Sonuçları Kaydet & Kapat
                </button>
                <button
                  onClick={() => setLivePresentationForm(null)}
                  className="px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition"
                >
                  Tahta Modundan Çık
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Form Yanıt Analizi & Katılımcı Dökümü Modal */}
      {inspectingForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase">
                    {inspectingForm.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Hedef: {inspectingForm.targetClasses.join(', ')} &bull; {inspectingForm.audience === 'student' ? 'Öğrenci' : inspectingForm.audience === 'parent' ? 'Veli' : 'Öğrenci & Veli'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{inspectingForm.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{inspectingForm.description}</p>
              </div>
              <button
                onClick={() => setInspectingForm(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Gelen Yanıt</div>
                <div className="text-xl font-black text-indigo-700">
                  {inspectingForm.responseCount} <span className="text-xs text-slate-400 font-normal">/ {inspectingForm.totalTargetCount}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Katılım Oranı</div>
                <div className="text-xl font-black text-emerald-600">
                  %{Math.round((inspectingForm.responseCount / inspectingForm.totalTargetCount) * 100)}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Yayın Durumu</div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {inspectingForm.isActive ? '🟢 Aktif / Yanıt Alıyor' : '🔴 Kapanmış'}
                </div>
              </div>
            </div>

            {/* Questions Detailed Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-600" />
                <span>Soru Bazlı Yanıt ve Tercih Analizi</span>
              </h3>

              {inspectingForm.questions.map((q, idx) => (
                <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900">
                      Soru {idx + 1}: {q.title}
                    </div>
                    <span className="text-[10px] font-medium bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
                      {q.type === 'rating' ? 'Puanlama (1-5)' : q.type === 'single_choice' ? 'Çoktan Seçmeli' : q.type === 'consent_checkbox' ? 'Onay Kutusu' : 'Açık Uçlu Metin'}
                    </span>
                  </div>

                  {/* Render Visual Representation by Question Type */}
                  {q.type === 'rating' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Ortalama Puan: <strong>4.4 / 5.0</strong></span>
                        <span className="text-emerald-700 font-bold">Yüksek Kavrama Düzeyi</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                  )}

                  {q.type === 'single_choice' && q.options && (
                    <div className="space-y-2 pt-1 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const mockShare = oIdx === 0 ? 55 : oIdx === 1 ? 30 : 15;
                        return (
                          <div key={oIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-700">
                              <span className="truncate">{opt}</span>
                              <span className="font-bold text-slate-900">%{mockShare}</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${mockShare}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <div className="space-y-2 pt-1 text-xs">
                      <div className="text-[11px] text-slate-500 font-medium">Örnek Öğrenci / Veli Yanıtları:</div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3 text-slate-700 text-xs italic">
                        &ldquo;Hocam krossing-over kiazma noktalarını şematik olarak anladım fakat genler arasındaki uzaklık sentimorgan cinsinden sınavda soru olarak gelir mi?&rdquo; &ndash; Ahmet Yılmaz (10-A)
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3 text-slate-700 text-xs italic">
                        &ldquo;Homolog kromozom ayrılması ile kromatit ayrılması arasındaki farkı pekiştirmek için ek bir animasyon çok iyi olur.&rdquo; &ndash; Zeynep Kaya (10-A)
                      </div>
                    </div>
                  )}

                  {q.type === 'consent_checkbox' && (
                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Formu dolduran velilerin <strong>%100&apos;ü</strong> dijital onay ve teyit kutusunu işaretlemiştir.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer with Export Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Tüm veriler MEB KVKK ilkelerine ve okul idaresi arşivleme standartlarına uygundur.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportData(inspectingForm.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Excel / CSV Dışa Aktar</span>
                </button>
                <button
                  onClick={() => setInspectingForm(null)}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Yeni Form Oluşturma Sihirbazı */}
      {isCreatingForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Yeni Bilgi Toplama Formu Oluştur</h2>
                <p className="text-xs text-slate-500 mt-0.5">Sınıf içi anlık oylama veya veli/öğrenci anket formu tanımlayın</p>
              </div>
              <button
                onClick={() => setIsCreatingForm(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Form Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 10-A Hücre Bölünmeleri Ders Sonu Çıkış Bileti (Exit Ticket)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Açıklama / Yönerge</label>
                <textarea
                  rows={2}
                  placeholder="Öğrencilere veya velilere gösterilecek açıklayıcı metin..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hedef Kitle</label>
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value as FormAudience)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="student">🎒 Sadece Öğrenci</option>
                    <option value="parent">👨‍👩‍👧 Sadece Veli</option>
                    <option value="both">🎒👨‍👩‍👧 Öğrenci ve Veli Ortak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as FormCategory)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="in_class_instant">⚡ Sınıf İçi Anlık</option>
                    <option value="health_safety">🏥 Sağlık & Acil Durum</option>
                    <option value="field_trip_permission">🚌 Gezi & İzin</option>
                    <option value="social_club">🏆 Kulüp & Yetenek</option>
                    <option value="olympiad_application">🔬 Bilim Olimpiyatı</option>
                    <option value="dyk_tutoring">📚 DYK & Etüt</option>
                    <option value="guidance_bep">🧭 Rehberlik & BEP</option>
                    <option value="contact_transport">🚐 Servis & İletişim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Form Türü</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="instantCheck"
                      checked={newIsInstant}
                      onChange={(e) => setNewIsInstant(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded-sm"
                    />
                    <label htmlFor="instantCheck" className="text-xs font-medium text-slate-700">
                      Sınıf İçi Anlık (PIN ile Canlı)
                    </label>
                  </div>
                </div>
              </div>

              {newIsInstant ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="text-xs text-amber-800">
                    <span className="font-bold">Otomatik Canlı Sınıf Kodu: </span>
                    Akıllı tahtada bu kod yansıtılacaktır.
                  </div>
                  <input
                    type="text"
                    value={newInstantCode}
                    onChange={(e) => setNewInstantCode(e.target.value)}
                    className="font-mono font-bold text-xs px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 w-28 text-center"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Son Yanıtlama Tarihi</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              {/* Dynamic Questions Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">Form Soruları ({newQuestions.length})</label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400 text-[11px]">Soru Ekle:</span>
                    <button
                      type="button"
                      onClick={() => addQuestionField('rating')}
                      className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-md font-medium text-[11px]"
                    >
                      + Puanlama (1-5)
                    </button>
                    <button
                      type="button"
                      onClick={() => addQuestionField('single_choice')}
                      className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-md font-medium text-[11px]"
                    >
                      + Çoktan Seçmeli
                    </button>
                    <button
                      type="button"
                      onClick={() => addQuestionField('text')}
                      className="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-md font-medium text-[11px]"
                    >
                      + Açık Uçlu
                    </button>
                    <button
                      type="button"
                      onClick={() => addQuestionField('consent_checkbox')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md font-medium text-[11px]"
                    >
                      + Onay Kutusu
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {newQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-500">Soru {idx + 1} ({q.type})</span>
                        <button
                          type="button"
                          onClick={() => removeQuestionField(q.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                        >
                          Kaldır
                        </button>
                      </div>
                      <input
                        type="text"
                        value={q.title}
                        onChange={(e) => {
                          const updated = newQuestions.map((item) =>
                            item.id === q.id ? { ...item, title: e.target.value } : item
                          );
                          setNewQuestions(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCreatingForm(false)}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs transition"
                >
                  Formu Yayınla & Sınıfa Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

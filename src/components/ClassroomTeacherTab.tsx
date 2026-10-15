import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  Printer,
  FileSpreadsheet,
  Download,
  Share2,
  UserCheck,
  Search,
  Plus,
  Heart,
  Smile,
  AlertCircle,
  Award,
  Calendar,
  Utensils,
  Scissors,
  Check,
  Copy,
  ChevronRight,
  ListTodo
} from 'lucide-react';
import { PrimaryGradeLevel, PrimaryDailyLessonPeriod, PrimaryObservationCard } from '../types';

interface ClassroomTeacherTabProps {
  onOpenPrintModal?: (content: any) => void;
}

export const ClassroomTeacherTab: React.FC<ClassroomTeacherTabProps> = ({ onOpenPrintModal }) => {
  // Sınıf seviyesi seçimi (1, 2, 3, 4. Sınıf)
  const [selectedGrade, setSelectedGrade] = useState<PrimaryGradeLevel>('3. Sınıf');
  const [selectedBranch, setSelectedBranch] = useState<'3-B' | '1-A' | '2-A' | '4-B'>('3-B');
  const [activeSubTab, setActiveSubTab] = useState<
    'gunluk_akis' | 'okuma_yazma' | 'carpim_tablosu' | 'karne_gozlem' | 'beslenme_malzeme'
  >('gunluk_akis');

  // Günlük ders akışı (Sınıf defteri kazanımları)
  const [dailyPeriods, setDailyPeriods] = useState<PrimaryDailyLessonPeriod[]>([
    {
      periodNumber: 1,
      timeRange: '08:45 - 09:25',
      subject: 'Türkçe',
      topic: 'Okuduğunu Anlama & Noktalama İşaretleri',
      kazanimCode: 'T.3.3.4',
      kazanimText: 'Okuduğu metindeki ana fikir ve yardımcı fikirleri belirler, nokta ve virgül kullanımını analiz eder.',
      activityDescription: '"Ormanın Dostları" metni sessiz ve sesli okundu, metinle ilgili 5 soru cevaplandı.',
      materialsNeeded: 'Türkçe Ders Kitabı s.45-48, Çalışma Defteri',
      isLogFilled: true,
    },
    {
      periodNumber: 2,
      timeRange: '09:40 - 10:20',
      subject: 'Türkçe',
      topic: 'Görselden Hareketle Hikaye Yazma',
      kazanimCode: 'T.3.4.2',
      kazanimText: 'Görsellerden yararlanarak olay akışına uygun kısa kurgusal metin yazar.',
      activityDescription: '4 kare karikatür görseli incelenerek giriş, gelişme ve sonuç paragrafları oluşturuldu.',
      materialsNeeded: 'Çizgili Yazı Defteri',
      isLogFilled: true,
    },
    {
      periodNumber: 3,
      timeRange: '10:35 - 11:15',
      subject: 'Matematik',
      topic: 'Üç Basamaklı Sayılarda Eldeli Toplama & Çarpım Tablosu',
      kazanimCode: 'M.3.1.2.2',
      kazanimText: 'En çok üç basamaklı sayılarla eldeli toplama işlemini yapar ve zihinden tahmin eder.',
      activityDescription: 'Basamak tablosu çizildi, 6\'lar çarpım tablosu ritmik sayma ile pekiştirildi.',
      materialsNeeded: 'Matematik Defteri, Sayma Çubukları',
      isLogFilled: true,
    },
    {
      periodNumber: 4,
      timeRange: '11:30 - 12:10',
      subject: 'Hayat Bilgisi',
      topic: 'Okulumuzun Krokisi ve Güvenli Alanlar',
      kazanimCode: 'HB.3.1.3',
      kazanimText: 'Okulunun ve sınıfının krokisini çizer; acil toplanma alanlarını gösterir.',
      activityDescription: 'Okul bahçesinde kuşbakışı gözlem yapıldı, yön levhaları krokide işaretlendi.',
      materialsNeeded: 'Kareli Kağıt, Cetvel, Renkli Kalemler',
      isLogFilled: true,
    },
    {
      periodNumber: 5,
      timeRange: '13:00 - 13:40',
      subject: 'Görsel Sanatlar',
      topic: 'Doğal Malzemelerle Sonbahar Kolajı',
      kazanimCode: 'G.3.2.1',
      kazanimText: 'Farklı malzemeleri bir araya getirerek özgün iki boyutlu kolaj tasarlar.',
      activityDescription: 'Kurutulmuş ağaç yaprakları fon kartonu üzerine yapıştırılarak doğa silüeti yapıldı.',
      materialsNeeded: 'Fon Kartonu, Sıvı Yapıştırıcı, Kurumuş Yapraklar',
      isLogFilled: false,
    },
    {
      periodNumber: 6,
      timeRange: '13:55 - 14:35',
      subject: 'Oyun ve Fiziki Etkinlikler',
      topic: 'Geleneksel Çocuk Oyunları: Mendil Kapmaca',
      kazanimCode: 'OF.3.1.5',
      kazanimText: 'Geleneksel çocuk oyunlarını kurallarına uygun şekilde oynar, iş birliği ve fair-play sergiler.',
      activityDescription: 'Sınıf iki takıma ayrıldı, refleks ve hız çalışması mendil kapmaca ile uygulandı.',
      materialsNeeded: 'Oyun Mendili, Düdük',
      isLogFilled: false,
    },
  ]);

  // 1. Sınıf Ses Temelli Okuma Grupları
  const phonicsGroups = [
    { group: 1, letters: 'E - L - A - K - İ - N', status: 'Tamamlandı', successRate: 100, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { group: 2, letters: 'O - M - U - T - Ü - Y', status: 'Tamamlandı', successRate: 96, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { group: 3, letters: 'Ö - R - I - D - S - B', status: 'Aktif Ses: "D"', successRate: 78, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { group: 4, letters: 'Z - Ç - G - Ş - C - P', status: 'Sırada (Kasım 2. Hafta)', successRate: 0, color: 'bg-slate-50 text-slate-600 border-slate-200' },
    { group: 5, letters: 'H - V - Ğ - F - J', status: 'Sırada (Aralık)', successRate: 0, color: 'bg-slate-50 text-slate-600 border-slate-200' },
  ];

  // 2-4. Sınıf Akıcı Okuma (DOKS: Dakikada Okunan Kelime Sayısı) Kayıtları
  const [fluencyRecords, setFluencyRecords] = useState([
    { id: 'fl-1', studentName: 'Ahmet Yılmaz', studentNumber: '104', wpm: 88, accuracy: 96, comprehension: 90, level: 'Akıcı Okuyucu', books: 12 },
    { id: 'fl-2', studentName: 'Zeynep Kaya', studentNumber: '112', wpm: 104, accuracy: 98, comprehension: 95, level: 'İleri Düzey', books: 18 },
    { id: 'fl-3', studentName: 'Can Öztürk', studentNumber: '118', wpm: 64, accuracy: 88, comprehension: 75, level: 'Gelişmekte', books: 6 },
    { id: 'fl-4', studentName: 'Elif Şahin', studentNumber: '125', wpm: 92, accuracy: 97, comprehension: 88, level: 'Akıcı Okuyucu', books: 14 },
    { id: 'fl-5', studentName: 'Burak Demir', studentNumber: '130', wpm: 52, accuracy: 82, comprehension: 70, level: 'Heceleyerek', books: 4 },
  ]);

  // Çarpım Tablosu Yetkinlik Durumu (1'den 10'a)
  const [multiplicationSkills, setMultiplicationSkills] = useState([
    { num: 1, title: '1\'ler Çarpanı', mastered: 24, total: 24, status: 'Tamamlandı' },
    { num: 2, title: '2\'şer Ritmik & Çarpım', mastered: 24, total: 24, status: 'Tamamlandı' },
    { num: 3, title: '3\'er Ritmik & Çarpım', mastered: 23, total: 24, status: 'Tamamlandı' },
    { num: 4, title: '4\'er Ritmik & Çarpım', mastered: 21, total: 24, status: 'Tamamlandı' },
    { num: 5, title: '5\'er Ritmik & Çarpım', mastered: 24, total: 24, status: 'Tamamlandı' },
    { num: 6, title: '6\'lar Çarpım Tablosu', mastered: 18, total: 24, status: 'Devam Ediyor' },
    { num: 7, title: '7\'ler Çarpım Tablosu', mastered: 14, total: 24, status: 'Devam Ediyor' },
    { num: 8, title: '8\'ler Çarpım Tablosu', mastered: 11, total: 24, status: 'Sırada' },
    { num: 9, title: '9\'lar Parmak Kuralı & Çarpım', mastered: 9, total: 24, status: 'Sırada' },
    { num: 10, title: '10\'ar Kolay Çarpım', mastered: 24, total: 24, status: 'Tamamlandı' },
  ]);

  // MEB Karne Gözlem Kartları (İlkokul Karne Görüşü)
  const [observationCards, setObservationCards] = useState<PrimaryObservationCard[]>([
    {
      id: 'obs-1',
      studentName: 'Ahmet Yılmaz',
      studentNumber: '104',
      category: 'Ders İçi İlgi',
      evaluation: 'Çok İyi' as const,
      notes: 'Matematik ve Hayat Bilgisi derslerinde parmak kaldırarak derse aktif katılıyor. Sorumluluk bilinci yüksek.',
      reportCardOpinion: 'Ders içi gayreti, arkadaşlarına olan saygılı tutumu ve okuma sevgisiyle örnek bir öğrencimizdir. Tebrik ederim.',
    },
    {
      id: 'obs-2',
      studentName: 'Can Öztürk',
      studentNumber: '118',
      category: 'Sorumluluk ve Öz Bakım',
      evaluation: 'Geliştirilmeli' as const,
      notes: 'Kitap ve beslenme çantasını hazırlamada veli desteğine ihtiyaç duyuyor. Sesli okumada heceleme devam ediyor.',
      reportCardOpinion: 'Çalışkan ve güler yüzlü bir öğrencimiz. Günlük 20 dakika sesli kitap okuma ve ders araçlarını kendisi hazırlama alışkanlığıyla başarısı katlanacaktır.',
    },
    {
      id: 'obs-3',
      studentName: 'Zeynep Kaya',
      studentNumber: '112',
      category: 'Sosyal Uyum & Liderlik',
      evaluation: 'Çok İyi' as const,
      notes: 'Grup çalışmalarında paylaşımcı, sınıf kitaplığının düzenlenmesinde nöbetçi olarak çok titiz.',
      reportCardOpinion: 'Üstün okuma-anlama yeteneği, problem çözme becerisi ve sınıf içindeki olgun tavırlarıyla gurur kaynağımızdır.',
    },
  ]);

  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopyOpinion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleToggleLogFilled = (periodNumber: number) => {
    setDailyPeriods((prev) =>
      prev.map((p) => (p.periodNumber === periodNumber ? { ...p, isLogFilled: !p.isLogFilled } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Sınıf Öğretmenliği Başlık & Şube Kontrol Barı */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">MEB Sınıf Öğretmenliği Entegre Portalı</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  İlkokul 1-4. Sınıf Modülü
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Tek sınıfta Türkçe, Matematik, Hayat Bilgisi, Fen ve Görsel Sanatların tek elden yönetimi, okuma-yazma takibi ve sınıf defteri
              </p>
            </div>
          </div>

          {/* Sınıf & Şube Seçici */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              {(['1-A', '2-A', '3-B', '4-B'] as const).map((branch) => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    if (branch.startsWith('1')) setSelectedGrade('1. Sınıf');
                    else if (branch.startsWith('2')) setSelectedGrade('2. Sınıf');
                    else if (branch.startsWith('3')) setSelectedGrade('3. Sınıf');
                    else setSelectedGrade('4. Sınıf');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    selectedBranch === branch
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {branch} ({branch.startsWith('1') ? '1. Sınıf' : branch.startsWith('2') ? '2. Sınıf' : branch.startsWith('3') ? '3. Sınıf' : '4. Sınıf'})
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (onOpenPrintModal) {
                  onOpenPrintModal({
                    title: `${selectedBranch} Günlük Sınıf Defteri ve Haftalık Kazanım Çizelgesi`,
                    periods: dailyPeriods,
                  });
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Sınıf Defteri Yazdır</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Mevcut Şube</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{selectedBranch} ({selectedGrade})</div>
            <div className="text-[11px] text-emerald-600 font-medium">24 Öğrenci (13 Kız, 11 Erkek)</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Günün Dersleri</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">6 Ders Tam Entegre</div>
            <div className="text-[11px] text-indigo-600 font-medium">4 Ders Deftere İşlendi</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Akıcı Okuma Ort.</span>
            <div className="text-base font-bold text-emerald-700 mt-0.5">82 Kelime / Dk</div>
            <div className="text-[11px] text-slate-500 font-medium">MEB Normu: 70-90 Kelime</div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Çarpım Tablosu</span>
            <div className="text-base font-bold text-purple-700 mt-0.5">%84 Tamamlanma</div>
            <div className="text-[11px] text-purple-600 font-medium">6 ve 7\'ler Aktif Alıştırma</div>
          </div>
        </div>

        {/* Alt Modül Sekmeleri */}
        <div className="flex flex-wrap items-center gap-2 mt-5 border-t border-slate-100 pt-4">
          <button
            onClick={() => setActiveSubTab('gunluk_akis')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'gunluk_akis'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Günlük Akış & Sınıf Defteri (6 Ders)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('okuma_yazma')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'okuma_yazma'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Okuma-Yazma & Akıcı Okuma (DOKS)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('carpim_tablosu')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'carpim_tablosu'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Çarpım Tablosu & Dört İşlem Radarı</span>
          </button>

          <button
            onClick={() => setActiveSubTab('karne_gozlem')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'karne_gozlem'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Karne Gözlem & e-Okul Görüş Üretici</span>
          </button>

          <button
            onClick={() => setActiveSubTab('beslenme_malzeme')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'beslenme_malzeme'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Beslenme & Yarınki Malzemeler</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: GÜNLÜK AKIŞ & SINIF DEFTERİ */}
      {activeSubTab === 'gunluk_akis' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Bugünün Sınıf Defteri & Entegre 6 Ders Kazanım Listesi</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {selectedBranch} - Çarşamba Akışı
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sınıf öğretmenleri tek ekranda günün tüm derslerinin kazanımlarını takip eder ve deftere tek tıkla işler.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDailyPeriods((prev) => prev.map((p) => ({ ...p, isLogFilled: true })));
                  }}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tümünü Deftere İşle</span>
                </button>
              </div>
            </div>

            {/* List of 6 Periods */}
            <div className="space-y-3">
              {dailyPeriods.map((period) => (
                <div
                  key={period.periodNumber}
                  className={`border rounded-xl p-4 transition ${
                    period.isLogFilled
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">
                        {period.periodNumber}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{period.subject}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {period.timeRange}
                          </span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {period.kazanimCode}
                          </span>
                          {period.isLogFilled ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Deftere İşlendi
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Bekliyor
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-slate-800 mt-1.5">{period.topic}</div>
                        <div className="text-xs text-slate-600 mt-0.5 italic">{period.kazanimText}</div>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700">İşlenen Etkinlik: </span>
                            <span className="text-slate-600">{period.activityDescription}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">Kullanılan Araç: </span>
                            <span className="text-slate-600">{period.materialsNeeded}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleLogFilled(period.periodNumber)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                        period.isLogFilled
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                      }`}
                    >
                      {period.isLogFilled ? 'İşlendi (Geri Al)' : 'Deftere İşle'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: OKUMA YAZMA & DOKS */}
      {activeSubTab === 'okuma_yazma' && (
        <div className="space-y-6">
          {/* 1. Sınıf Ses Temelli Okuma Grupları Takip Tablosu */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>1. Sınıf Ses Temelli Okuma-Yazma Grupları Takibi (MEB Sıralaması)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ses hissetme, okuma, heceleme ve metin oluşturma evreleri
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                1. Sınıf Odaklı
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {phonicsGroups.map((pg) => (
                <div key={pg.group} className={`border rounded-xl p-3.5 ${pg.color}`}>
                  <div className="text-xs font-bold uppercase tracking-wider">{pg.group}. Ses Grubu</div>
                  <div className="text-sm font-black my-1 tracking-wider">{pg.letters}</div>
                  <div className="text-xs font-semibold">{pg.status}</div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${pg.successRate}%` }}></div>
                  </div>
                  <div className="text-[10px] text-right font-bold mt-1">Başarı: %{pg.successRate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2., 3., 4. Sınıf Akıcı Okuma ve DOKS (Dakikada Okunan Kelime Sayısı) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>{selectedGrade} Akıcı Okuma & DOKS (Dakikada Okunan Kelime Sayısı) ve Kitaplık</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Öğrencilerin sesli okuma hızı, anlama oranı ve bu dönem okuduğu kitap sayıları
                </p>
              </div>

              <div className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                MEB İlkokul 3. Sınıf Hedefi: 70 - 90 Kelime / Dk
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Öğrenci Adı Soyadı</th>
                    <th className="py-2.5 px-3 text-center">Kelime / Dk (DOKS)</th>
                    <th className="py-2.5 px-3 text-center">Hatasızlık</th>
                    <th className="py-2.5 px-3 text-center">Okuduğunu Anlama</th>
                    <th className="py-2.5 px-3 text-center">Okuma Seviyesi</th>
                    <th className="py-2.5 px-3 text-center">Okunan Kitap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fluencyRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{rec.studentNumber}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">{rec.studentName}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          rec.wpm >= 90 ? 'bg-emerald-100 text-emerald-800' :
                          rec.wpm >= 70 ? 'bg-indigo-100 text-indigo-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {rec.wpm} kelime
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-semibold text-slate-700">%{rec.accuracy}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-slate-700">{rec.comprehension} / 100</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {rec.level}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-indigo-600">
                        {rec.books} Kitap 📚
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ÇARPIM TABLOSU & DÖRT İŞLEM */}
      {activeSubTab === 'carpim_tablosu' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                <span>Çarpım Tablosu ve Temel Aritmetik Yetkinlik Radarı</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                2., 3. ve 4. sınıf çarpım tablosu yetkinlikleri ve ritmik sayma takibi
              </p>
            </div>
            <div className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
              Sınıf Genel Başarısı: %84
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {multiplicationSkills.map((skill) => (
              <div
                key={skill.num}
                className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 hover:bg-slate-50 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-indigo-700">{skill.num}x</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    skill.status === 'Tamamlandı' ? 'bg-emerald-100 text-emerald-800' :
                    skill.status === 'Devam Ediyor' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {skill.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">{skill.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {skill.mastered} / {skill.total} Öğrenci
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{ width: `${(skill.mastered / skill.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Dört İşlem Pedagojik İpuçları */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>İlkokul Sınıf Öğretmeni Dört İşlem Metotları:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-700">
              <div className="bg-white p-2.5 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-900 block mb-0.5">9\'lar Parmak Kuralı</span>
                Eller masaya konur, çarpılan sayı parmağı bükülür. Soldaki parmaklar onlar basamağını, sağdakiler birler basamağını verir.
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-900 block mb-0.5">Onluk Bozarak Çıkarma</span>
                Öğrenciye soyut kural yerine onluk bloklar (lego veya sayma çubuğu) verilmeli, &quot;Komşudan 1 onluk borç alma&quot; somutlaştırılmalıdır.
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-900 block mb-0.5">Bölme & Eşit Paylaştırma</span>
                Bölme işlemine önce &quot;ardışık çıkarma&quot; olarak başlanmalı (ör. 12 elmayı 3\'er 3\'er paylaştırma), ardından bölme sembolüne geçilmelidir.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: KARNE GÖZLEM & E-OKUL GÖRÜŞ ÜRETİCİ */}
      {activeSubTab === 'karne_gozlem' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>MEB İlkokul Karne Gözlem & e-Okul Öğretmen Görüşü Modülü</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                MEB Yönetmeliğine uygun: Geliştirilmeli / İyi / Çok İyi değerlendirmeleri ve e-Okul formatında karne görüşleri
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {observationCards.map((card) => (
              <div key={card.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:bg-slate-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{card.studentName}</span>
                      <span className="font-mono text-xs text-slate-500">(No: {card.studentNumber})</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {card.category}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        card.evaluation === 'Çok İyi' ? 'bg-emerald-100 text-emerald-800' :
                        card.evaluation === 'İyi' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {card.evaluation}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-2">
                      <span className="font-bold text-slate-700">Öğretmen Gözlem Notu: </span>
                      {card.notes}
                    </div>

                    <div className="mt-2.5 p-3 rounded-lg bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-950">
                      <span className="font-bold text-indigo-900 block mb-0.5">e-Okul Uyumlu Karne Görüşü:</span>
                      &quot;{card.reportCardOpinion}&quot;
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyOpinion(card.reportCardOpinion, card.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 shrink-0 transition shadow-2xs"
                  >
                    {copiedIndex === card.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === card.id ? 'Kopyalandı' : 'e-Okul İçin Kopyala'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: BESLENME & YARINKİ MALZEMELER */}
      {activeSubTab === 'beslenme_malzeme' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>İlkokul Beslenme Dostu Menü & Yarın İçin Gerekli Araç-Gereçler</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sınıf velilerine WhatsApp ve MEB Veli Bilgilendirme için anlık hazır bülten
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Beslenme Menüsü */}
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-700" />
                <span>Haftalık Sağlıklı Beslenme Listesi</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-100">
                  <span className="font-bold text-slate-900">Pazartesi:</span>
                  <span>Haşlanmış Yumurta, Peynir, Zeytin, Tam Buğday Ekmeği</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-100">
                  <span className="font-bold text-slate-900">Salı:</span>
                  <span>Ev Yapımı Kek / Poğaça, Ayran, Mevsim Meyvesi</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-100 bg-emerald-100/50">
                  <span className="font-bold text-emerald-900">Çarşamba (Bugün):</span>
                  <span className="font-semibold text-emerald-950">Tost, Süt, Ceviz veya Çiğ Fındık</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-100">
                  <span className="font-bold text-slate-900">Perşembe:</span>
                  <span>Kuru Yemiş Tabağı, Kuru Kayısı / İncir, Süt</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-100">
                  <span className="font-bold text-slate-900">Cuma:</span>
                  <span>Sebzeli Börek veya Krep, Taze Sıkılmış Meyve Suyu</span>
                </li>
              </ul>
            </div>

            {/* Yarınki Malzemeler */}
            <div className="border border-amber-200 bg-amber-50/40 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-700" />
                <span>Yarın (Perşembe) Getirilecek Araç-Gereçler</span>
              </h4>
              <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs space-y-2">
                <div className="font-bold text-slate-900">Görsel Sanatlar & Serbest Etkinlikler İçin:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Küt uçlu makas (öğrenci güvenliği için)</li>
                  <li>Sıvı veya stick yapıştırıcı</li>
                  <li>1 paket renkli el işi kağıdı</li>
                  <li>Resim defteri (büyük boy)</li>
                </ul>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Veli İletişim Notu Hazır</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'Değerli 3-B Velilerimiz, yarın Görsel Sanatlar dersimiz için öğrencilerimizin çantasında küt uçlu makas, yapıştırıcı ve el işi kağıdı bulunmasını rica ederiz.'
                      );
                      alert('Veli mesajı panoya kopyalandı!');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Metni Kopyala
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

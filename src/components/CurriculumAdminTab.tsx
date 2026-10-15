import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck,
  Plus,
  ShieldCheck,
  BookMarked,
  Trash2,
  FileText,
  Layers,
  Sparkles,
  Info,
  Award,
  Users,
  Calendar,
  Clock,
  Flag,
  CheckCircle2
} from 'lucide-react';
import { CurriculumItem, AdministrativeDuty, SchoolCommission, CelebrationEvent } from '../types';

interface CurriculumAdminTabProps {
  curriculum: CurriculumItem[];
  duties: AdministrativeDuty[];
  commissions: SchoolCommission[];
  celebrations: CelebrationEvent[];
  onAddCurriculum: (item: CurriculumItem) => void;
  onAddDuty: (duty: AdministrativeDuty) => void;
  onDeleteDuty: (dutyId: string) => void;
  onNavigateToPlans: () => void;
}

export const CurriculumAdminTab: React.FC<CurriculumAdminTabProps> = ({
  curriculum,
  duties,
  commissions,
  celebrations,
  onAddCurriculum,
  onAddDuty,
  onDeleteDuty,
  onNavigateToPlans,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'curriculum' | 'duties' | 'commissions' | 'celebrations'>('curriculum');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // New Duty Form
  const [showDutyModal, setShowDutyModal] = useState(false);
  const [newDutyTitle, setNewDutyTitle] = useState('');
  const [newDutyCategory, setNewDutyCategory] = useState<AdministrativeDuty['category']>('Nöbet');
  const [newDutyDetail, setNewDutyDetail] = useState('');
  const [newDutyDay, setNewDutyDay] = useState('Salı');
  const [newDutyRegulation, setNewDutyRegulation] = useState('MEB Ortaöğretim Kurumları Yönetmeliği');

  const handleSimulatedUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const fileName = files[0].name;

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccessMessage(`"${fileName}" başarıyla yüklendi ve MEB kazanım indeksine eklendi!`);
      const newItem: CurriculumItem = {
        id: 'curr-' + Date.now(),
        grade: '10. Sınıf',
        subject: 'Biyoloji & Fen',
        term: '1. Dönem',
        unit: 'Yeni Yüklenen Müfredat Ünitesi: ' + fileName.replace(/\.[^/.]+$/, ''),
        outcomes: [
          'Yüklenen ders kitabındaki temel kavram ve kazanımlar taranarak sisteme işlendi.',
          'Ders senaryoları ve günlük planlar için veri tabanına hazırlandı.'
        ],
        recommendedHours: 12,
        uploadedBookName: fileName,
        uploadedBookSize: (files[0].size / (1024 * 1024)).toFixed(1) + ' MB'
      };
      onAddCurriculum(newItem);
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }, 1200);
  };

  const handleCreateDuty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDutyTitle.trim()) return;

    const duty: AdministrativeDuty = {
      id: 'duty-' + Date.now(),
      title: newDutyTitle,
      category: newDutyCategory,
      detail: newDutyDetail || 'Okul idaresi tarafından tebliğ edilen resmi idari görev.',
      scheduleDay: newDutyDay,
      relevantRegulation: newDutyRegulation
    };
    onAddDuty(duty);
    setNewDutyTitle('');
    setNewDutyDetail('');
    setShowDutyModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Selector Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('curriculum')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Müfredat & Kitaplar ({curriculum.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('duties')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'duties'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Nöbet & Şube ({duties.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('commissions')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'commissions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Okul İçi Komisyonlar ({commissions.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('celebrations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'celebrations'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Flag className="w-4 h-4" />
            <span>Belirli Gün & Haftalar ({celebrations.length})</span>
          </button>
        </div>

        <button
          onClick={onNavigateToPlans}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bu Verilerle Plan Üret &rarr;</span>
        </button>
      </div>

      {uploadSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* SUBTAB 1: CURRICULUM & TEXTBOOKS */}
      {activeSubTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl p-6 sm:p-8 text-center transition bg-gradient-to-b from-indigo-50/20 to-white">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.epub"
              onChange={(e) => handleSimulatedUpload(e.target.files)}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UploadCloud className="w-7 h-7" />
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isUploading ? 'Müfredat & Kitap Dosyası Taranıyor...' : 'MEB Ders Kitabı veya Müfredat Belgesi Yükle'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mt-1">
                PDF, Word (.docx) formatındaki MEB ders kitaplarını sürükleyip bırakın veya seçin. Sistem ünite ve kazanımları otomatik parse ederek yıllık ve günlük planlara hazır hale getirir.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition">
                <FileText className="w-3.5 h-3.5" />
                Dosya Seç (PDF / Word)
              </span>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Yüklü MEB Müfredatları ve Ders Kitapları</span>
              </h3>
              <span className="text-xs text-slate-400">
                Türkiye Yüzyılı Maarif Modeli İndeksi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.grade} &bull; {item.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.term}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.unit}</h4>

                    <div className="space-y-1 mb-3">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        MEB Kazanımları:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        {item.outcomes.slice(0, 3).map((out, idx) => (
                          <li key={idx} className="line-clamp-1">{out}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Önerilen Süre: {item.recommendedHours} Saat</span>
                    {item.uploadedBookName && (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 border border-emerald-200/50">
                        <FileCheck className="w-3 h-3" />
                        {item.uploadedBookName}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ADMINISTRATIVE DUTIES (NÖBET & ŞUBE) */}
      {activeSubTab === 'duties' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Öğretmenin Temel İdari Görevleri & Yasal Dayanakları</h3>
              <p className="text-xs text-slate-500">
                Nöbet günleri, zümre koordinatörlüğü ve kurul üyelikleri plan oluştururken otomatik dikkate alınır.
              </p>
            </div>
            <button
              onClick={() => setShowDutyModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni İdari Görev Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {duties.map((duty) => (
              <div
                key={duty.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {duty.category}
                    </span>
                    <button
                      onClick={() => onDeleteDuty(duty.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition"
                      title="Görevi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{duty.title}</h4>
                  <p className="text-xs text-slate-600 mb-3">{duty.detail}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-[11px] text-indigo-700 font-medium">
                    <Info className="w-3 h-3" />
                    <span>{duty.relevantRegulation}</span>
                  </div>
                  {duty.scheduleDay && (
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {duty.scheduleDay}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: SCHOOL COMMISSIONS (OKUL İÇİ KOMİSYONLAR) */}
      {activeSubTab === 'commissions' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Okul İçi Resmi Komisyon ve Kurul Görevleri
            </h3>
            <p className="text-xs text-slate-500">
              Satın alma, muayene kabul, yazı inceleme, kantin denetim ve okul gelişim yönetim ekibi (OGYE) görevlendirmeleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commissions.map((comm) => (
              <div key={comm.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                    Rolünüz: {comm.role}
                  </span>
                  <span className="text-[11px] text-slate-500">{comm.meetingFrequency}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{comm.name}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">{comm.term}</div>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Komisyon Sorumlulukları:
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    {comm.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Son Toplantı: {comm.lastMeetingDate}</span>
                  <span className="text-[11px] text-indigo-700 font-semibold">{comm.officialRegulation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: CELEBRATIONS & SPECIFIC DAYS (BELİRLİ GÜN VE HAFTALAR) */}
      {activeSubTab === 'celebrations' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Belirli Gün ve Haftalar & Kutlama Organizasyonları
            </h3>
            <p className="text-xs text-slate-500">
              29 Ekim, 10 Kasım, 24 Kasım gibi resmi anma ve bayram program akışları, görevli öğretmenler, şiirler ve konuşma metinleri.
            </p>
          </div>

          <div className="space-y-4">
            {celebrations.map((cel) => (
              <div key={cel.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        {cel.date}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {cel.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{cel.title}</h4>
                  </div>

                  <div className="text-right text-xs">
                    <div className="font-semibold text-slate-800">{cel.coordinatorTeacher}</div>
                    <div className="text-slate-400 text-[11px]">{cel.districtApprovalNumber}</div>
                  </div>
                </div>

                {/* Program Flow */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Tören Akış Planı:
                  </div>
                  <div className="space-y-1.5">
                    {cel.programFlow.map((flow, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-rose-700 w-14 shrink-0">{flow.time}</span>
                        <span className="flex-1 text-slate-800">{flow.activity}</span>
                        <span className="text-[11px] font-semibold text-slate-500 shrink-0">Sorumlu: {flow.inCharge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speeches & Poems */}
                <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100 flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-rose-950">Hazırlanan Şiir & Konuşma Metinleri:</span>
                  {cel.speechesAndPoems.map((sp, i) => (
                    <span key={i} className="bg-white border border-rose-200 px-2 py-0.5 rounded text-rose-800 font-medium">
                      {sp.title} ({sp.studentOrTeacher})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal to add duty */}
      {showDutyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Yeni İdari Görev Tanımla</h3>
            <form onSubmit={handleCreateDuty} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Görev Başlığı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 29 Ekim Tören Komitesi, Salı Nöbeti..."
                  value={newDutyTitle}
                  onChange={(e) => setNewDutyTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newDutyCategory}
                    onChange={(e) => setNewDutyCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="Nöbet">Nöbet</option>
                    <option value="Şube Rehberliği">Şube Rehberliği</option>
                    <option value="Zümre Başkanlığı">Zümre Başkanlığı</option>
                    <option value="Kurul / Komisyon">Kurul / Komisyon</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Günü (Varsa)</label>
                  <select
                    value={newDutyDay}
                    onChange={(e) => setNewDutyDay(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="Pazartesi">Pazartesi</option>
                    <option value="Salı">Salı</option>
                    <option value="Çarşamba">Çarşamba</option>
                    <option value="Perşembe">Perşembe</option>
                    <option value="Cuma">Cuma</option>
                    <option value="Tüm Hafta">Tüm Hafta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Görev Detayı ve Sorumluluklar</label>
                <textarea
                  rows={2}
                  placeholder="Örn: 2. kat koridor güvenliği, zil aralarında sınıfların havalandırılması..."
                  value={newDutyDetail}
                  onChange={(e) => setNewDutyDetail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Yasal Dayanak / Yönetmelik</label>
                <input
                  type="text"
                  value={newDutyRegulation}
                  onChange={(e) => setNewDutyRegulation(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDutyModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
                >
                  Görevi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

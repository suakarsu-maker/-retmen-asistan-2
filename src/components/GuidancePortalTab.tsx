import React, { useState } from 'react';
import {
  Compass,
  Users,
  FileText,
  Plus,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Printer,
  Heart,
  Search
} from 'lucide-react';
import { GuidanceRecord } from '../types';

interface GuidancePortalTabProps {
  records: GuidanceRecord[];
  onAddRecord: (record: GuidanceRecord) => void;
  onOpenPrintModal: (content: any) => void;
}

export const GuidancePortalTab: React.FC<GuidancePortalTabProps> = ({
  records,
  onAddRecord,
  onOpenPrintModal,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('Hepsi');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [className, setClassName] = useState('10-B');
  const [category, setCategory] = useState<GuidanceRecord['category']>('Öğrenci Görüşmesi');
  const [summary, setSummary] = useState('');
  const [actionPlan, setActionPlan] = useState('');

  const filteredRecords = records.filter(
    (r) => filterCategory === 'Hepsi' || r.category === filterCategory
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newRecord: GuidanceRecord = {
      id: 'g-' + Date.now(),
      studentName,
      studentNumber: studentNumber || '101',
      className,
      category,
      date: new Date().toISOString().split('T')[0],
      summary,
      actionPlan,
      status: 'Açık',
    };
    onAddRecord(newRecord);
    setStudentName('');
    setStudentNumber('');
    setSummary('');
    setActionPlan('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              Şube Rehber Öğretmenliği & RAM Koordinasyonu
            </span>
            <span className="text-xs text-slate-300">10-B Sınıfı Rehberlik Portalı</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Öğrenci Tanıma, BEP Takibi & Veli Görüşme Defteri
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Bireyselleştirilmiş Eğitim Programı (BEP) uyarlamaları, veli mülakat tutanakları ve rehberlik servisine yönlendirme kayıtları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenPrintModal({ title: '10-B Sınıfı Rehberlik Dosyası', records })}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700" />
            <span>Rehberlik Raporunu Yazdır</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Kayıt / Tutanak Ekle</span>
          </button>
        </div>
      </div>

      {/* Filter and Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['Hepsi', 'BEP Takibi', 'Veli Görüşmesi', 'Öğrenci Görüşmesi', 'RAM Yönlendirme'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Toplam <span className="font-bold text-slate-900">{filteredRecords.length}</span> Rehberlik Kaydı
        </div>
      </div>

      {/* Records Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((r) => {
          const isBEP = r.category === 'BEP Takibi';
          return (
            <div
              key={r.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between transition ${
                isBEP ? 'border-amber-300 ring-1 ring-amber-300/30' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      isBEP
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : r.category === 'Veli Görüşmesi'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {r.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{r.date}</span>
                </div>

                <div className="mb-2">
                  <h3 className="text-sm font-bold text-slate-900">{r.studentName}</h3>
                  <div className="text-[11px] text-slate-500">
                    Öğrenci No: {r.studentNumber} &bull; Sınıf: {r.className}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900">Gözlem / Görüşme Özeti: </span>
                    {r.summary}
                  </div>

                  <div className="text-xs text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/50">
                    <span className="font-bold text-emerald-950">Eylem Planı / Uyarlama: </span>
                    {r.actionPlan}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Durum:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    r.status === 'Tamamlandı'
                      ? 'bg-emerald-100 text-emerald-800'
                      : r.status === 'Takipte'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Yeni Rehberlik Kaydı Oluştur</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Öğrenci Adı Soyadı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Barış Demir"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Öğrenci No</label>
                  <input
                    type="text"
                    placeholder="Örn: 205"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="Öğrenci Görüşmesi">Öğrenci Görüşmesi</option>
                  <option value="Veli Görüşmesi">Veli Görüşmesi</option>
                  <option value="BEP Takibi">BEP Takibi & Sınav Uyarlaması</option>
                  <option value="RAM Yönlendirme">RAM Yönlendirme & Rapor</option>
                  <option value="Disiplin / Uyum">Disiplin / Uyum Takibi</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Görüşme & Durum Özeti</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Gözlenen durum, öğrenci veya veli beyanı..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eylem Planı / Alınan Önlem</label>
                <textarea
                  rows={2}
                  placeholder="Sınavda uygulanacak tedbir, haftalık takip vb..."
                  value={actionPlan}
                  onChange={(e) => setActionPlan(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

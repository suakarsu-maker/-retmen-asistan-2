import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  KeyRound,
  X,
  Clock,
  Sparkles,
  QrCode,
  Share2
} from 'lucide-react';

interface PortalAccessControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentPortalActive: boolean;
  parentPortalActive: boolean;
  onToggleStudentPortal: (active: boolean) => void;
  onToggleParentPortal: (active: boolean) => void;
}

export const PortalAccessControlModal: React.FC<PortalAccessControlModalProps> = ({
  isOpen,
  onClose,
  studentPortalActive,
  parentPortalActive,
  onToggleStudentPortal,
  onToggleParentPortal,
}) => {
  const [accessCode, setAccessCode] = useState('MEB-2026-ONAY');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedClass, setSelectedClass] = useState<'Tümü' | '10-A' | '10-B' | '3-B'>('Tümü');

  if (!isOpen) return null;

  const handleCopyAccess = () => {
    navigator.clipboard.writeText(
      `Öğretmeniniz portala erişiminizi onayladı. Giriş Kodunuz: ${accessCode} | https://meb-portal.edu.tr/giris`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Öğrenci & Veli Portal Erişim Yetkilendirmesi</h2>
              <p className="text-xs text-slate-300">
                Girişler yalnızca sizin onayınız ile aktifleşir; öğrenci/velide rol geçişi bulunmaz.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Main Switches */}
          <div className="space-y-3">
            {/* Student Portal Switch */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  studentPortalActive ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-500'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">🎒 Öğrenci Portalı Girişi</h3>
                    {studentPortalActive ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Onaylandı & Aktif
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Kilitli (Öğretmen Onayı Bekleniyor)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Öğrenciler ödevlerini, ders föylerini ve sınıf içi anlık formları doldurabilir.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleStudentPortal(!studentPortalActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  studentPortalActive ? 'bg-sky-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={studentPortalActive}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    studentPortalActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Parent Portal Switch */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  parentPortalActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">👨‍👩‍👧 Veli Bilgilendirme Portalı Girişi</h3>
                    {parentPortalActive ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Onaylandı & Aktif
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Kilitli (Öğretmen Onayı Bekleniyor)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Veliler okul izin belgelerini, sağlık anketlerini ve karne gelişim gözlemlerini görüntüler.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleParentPortal(!parentPortalActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  parentPortalActive ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={parentPortalActive}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    parentPortalActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sınıf Bazlı İzin Kapsamı */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Yetkilendirilen Sınıf & Şube Grubu:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['Tümü', '10-A', '10-B', '3-B'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedClass === c
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c === 'Tümü' ? 'Tüm Sınıflar (Yetkili)' : `${c} Şubesi`}
                </button>
              ))}
            </div>
          </div>

          {/* Paylaşılabilir Güvenli Giriş Anahtarı */}
          <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-indigo-600" />
                <span>Öğretmen Onaylı Erişim Kodu & Bağlantısı</span>
              </span>
              <span className="text-[11px] font-mono text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                Dinamik Doğrulama
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={accessCode}
                className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-indigo-900"
              />
              <button
                onClick={handleCopyAccess}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shrink-0 shadow-xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Kopyalandı' : 'Veliye/Öğrenciye İlet'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600">
              Bu kod sadece siz erişim iznini açık tuttuğunuz sürece geçerlidir. İzni kapattığınız anda tüm öğrenci ve veli oturumları anında sonlanır.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition shadow-xs"
          >
            Tamam / Değişiklikleri Uygula
          </button>
        </div>
      </div>
    </div>
  );
};

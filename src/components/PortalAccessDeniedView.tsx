import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, RefreshCw, Sparkles, School } from 'lucide-react';

interface PortalAccessDeniedViewProps {
  portalType: 'student' | 'parent';
  onReturnToTeacher?: () => void;
  onActivateByTeacher?: () => void;
}

export const PortalAccessDeniedView: React.FC<PortalAccessDeniedViewProps> = ({
  portalType,
  onReturnToTeacher,
  onActivateByTeacher,
}) => {
  const title = portalType === 'student' ? 'Öğrenci Portalı Girişi' : 'Veli Bilgilendirme Portalı Girişi';

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <School className="w-3.5 h-3.5" />
            <span>MEB Güvenli Portal Protokolü</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{title} Kilitli</h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Bu portala erişim <strong>ders öğretmeninizin onayı ile aktive edilmektedir</strong>. Şu anda öğretmeniniz tarafından henüz erişim izni verilmemiş veya oturumlar geçici olarak durdurulmuştur.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5 text-left">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            <span>Bilgilendirme:</span>
          </div>
          <p>
            • Öğretmeniniz sınıf içi formları veya izin belgelerini paylaştığında portal otomatik olarak aktifleşecektir.
          </p>
          <p>
            • Öğrenci ve veli arayüzünde güvenlik gereği herhangi bir rol geçiş yetkisi bulunmamaktadır.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onActivateByTeacher && (
            <button
              onClick={onActivateByTeacher}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Öğretmen Olarak İzin Ver & Aktive Et</span>
            </button>
          )}

          {onReturnToTeacher && (
            <button
              onClick={onReturnToTeacher}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Öğretmen Paneline Dön</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

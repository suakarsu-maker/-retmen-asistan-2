import React, { useState } from 'react';
import {
  GraduationCap,
  School,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { UserRole, TeacherType } from '../types';

export type ExtendedRoleOption =
  | 'branch_math'       // Lise / Ortaokul Matematik Branş Öğretmeni
  | 'private_tutor'     // Özel Ders & Birebir Koç
  | 'classroom_teacher' // İlkokul Sınıf Öğretmeni
  | 'student'           // Öğrenci
  | 'parent';           // Veli

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  currentTeacherType: TeacherType;
  onSelectRoleProfile: (role: UserRole, teacherType: TeacherType, targetTab?: string) => void;
}

interface RoleCardConfig {
  id: ExtendedRoleOption;
  title: string;
  badge: string;
  badgeColor: string;
  iconBg: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  mapsTo: {
    role: UserRole;
    teacherType: TeacherType;
    defaultTab: string;
  };
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentTeacherType,
  onSelectRoleProfile,
}) => {
  const [allowMultiRole, setAllowMultiRole] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<ExtendedRoleOption>(
    currentRole === 'student'
      ? 'student'
      : currentRole === 'parent'
      ? 'parent'
      : currentTeacherType === 'classroom'
      ? 'classroom_teacher'
      : 'branch_math'
  );
  const [rememberChoice, setRememberChoice] = useState(true);

  if (!isOpen) return null;

  const roleConfigs: RoleCardConfig[] = [
    {
      id: 'branch_math',
      title: 'Matematik Branş Öğretmeni',
      badge: 'Lise & Ortaokul (MEB)',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      iconBg: 'bg-indigo-600',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      description: 'Ders programı, MEB yıllık/günlük planlar, KaTeX LaTeX ders notları, Drive entegrasyonu ve e-Okul rubrik değerlendirmesi.',
      features: ['Haftalık 24 saat ders planı', 'LaTeX sınav ve ders notları', 'Rubrik & ödev takip sistemi'],
      mapsTo: { role: 'teacher', teacherType: 'branch', defaultTab: 'schedule' }
    },
    {
      id: 'private_tutor',
      title: 'Özel Ders Eğitmeni & Birebir Koç',
      badge: 'LGS / YKS / TYT-AYT',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      iconBg: 'bg-rose-600',
      icon: <Sparkles className="w-5 h-5 text-white" />,
      description: 'Birebir öğrenci portföyü, seans takvimi, paket ücret bakiye takibi ve eksik konular için otomatik LaTeX formül kartları.',
      features: ['Otomatik formül & konu özeti kartları', 'Öğrenci eksik kazanım analizi', 'Yazdırılabilir veli gelişim raporu'],
      mapsTo: { role: 'teacher', teacherType: 'branch', defaultTab: 'private_tutoring' }
    },
    {
      id: 'classroom_teacher',
      title: 'İlkokul Sınıf Öğretmeni',
      badge: '1 - 4. Sınıf Çoklu Branş',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-600',
      icon: <School className="w-5 h-5 text-white" />,
      description: 'Günün 6 dersinin tamamını tek tıkla sınıf defterine işleme, e-Okul karne gelişim görüşleri ve okuma hızı (DOKS) takibi.',
      features: ['Tek tıkla 6 derslik defter doldurma', 'Ritmik sayma & çarpım tablosu', 'Gelişim & karne görüş bankası'],
      mapsTo: { role: 'teacher', teacherType: 'classroom', defaultTab: 'classroom_teacher' }
    },
    {
      id: 'student',
      title: 'Öğrenci Portalı',
      badge: 'Ödev & Soru İletişimi',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      iconBg: 'bg-sky-600',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      description: 'Ödev teslimi, ders notları, öğretmene anlık soru gönderme ve eksik olunan konuların analizi.',
      features: ['Öğretmene anlık soru & formül iletme', 'Ödev teslimi & rubrik geri bildirimleri', 'Sınıf içi anlık bilgi formları'],
      mapsTo: { role: 'student', teacherType: 'branch', defaultTab: 'student_portal' }
    },
    {
      id: 'parent',
      title: 'Veli Bilgilendirme Portalı',
      badge: 'Akademik Takip & İzinler',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-600',
      icon: <Users className="w-5 h-5 text-white" />,
      description: 'Öğrencinin akademik gelişim karnesi, resmi veli görüşme randevuları ve okul izin/onay belgeleri.',
      features: ['Haftalık veli görüşme randevusu', 'Öğrenci net ve devamsızlık takibi', 'Dijital veli izin ve sağlık formları'],
      mapsTo: { role: 'parent', teacherType: 'branch', defaultTab: 'parent_portal' }
    }
  ];

  const handleConfirm = () => {
    const config = roleConfigs.find((r) => r.id === selectedProfile) || roleConfigs[0];
    if (rememberChoice) {
      try {
        localStorage.setItem('ogretmen_asistani_preferred_role', selectedProfile);
      } catch (err) {
        // Safe fallback if storage disabled
      }
    }
    onSelectRoleProfile(config.mapsTo.role, config.mapsTo.teacherType, config.mapsTo.defaultTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 my-6 border border-slate-200 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Giriş & Rol Yönetimi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Öğretmen Asistanı Pro'ya Hoş Geldiniz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Lütfen giriş yapmak istediğiniz rolü seçiniz. İstediğiniz zaman üst menüden rolünüzü değiştirebilirsiniz.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Toggle */}
        <div className="pt-4 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-700">
            Kullanmak istediğiniz profili işaretleyiniz:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Üst çubuktan hızlı geçiş yetkisi:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {allowMultiRole ? '✓ Çoklu Rol Aktif' : 'Tek Rol'}
            </span>
          </div>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-3">
          {roleConfigs.map((cfg) => {
            const isSelected = selectedProfile === cfg.id;

            return (
              <div
                key={cfg.id}
                onClick={() => setSelectedProfile(cfg.id)}
                className={`relative rounded-2xl p-4 border-2 cursor-pointer transition-all flex flex-col justify-between text-left ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm shadow-indigo-100 scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                {/* Radio selection check */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${cfg.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {cfg.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md border mt-0.5 inline-block ${cfg.badgeColor}`}>
                        {cfg.badge}
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                  {cfg.description}
                </p>

                {/* Feature bullets */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  {cfg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer & Confirm Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Bu cihazda rol tercihimi hatırla (İstediğiniz zaman değiştirebilirsiniz)</span>
          </label>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Vazgeç
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <span>Seçili Rol ile Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  CalendarDays,
  BookOpen,
  FileText,
  Code2,
  Users,
  CheckSquare,
  Scale,
  Award,
  Compass,
  Cpu,
  Rocket,
  Bell,
  Flame,
  ClipboardList,
  GraduationCap,
  X,
  UserCheck,
  Calculator,
  HardDrive,
  Cloud
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  pendingHomeworkCount: number;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
  onOpenDriveManager?: () => void;
  isDriveConnected?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingHomeworkCount,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
  onOpenDriveManager,
  isDriveConnected = false,
}) => {
  const navItems = [
    {
      id: 'private_tutoring',
      label: 'Özel Ders & Koçluk Portalı',
      subtitle: 'Birebir seans, paket bakiye, veli raporu',
      icon: UserCheck,
      badge: 'Birebir',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      highlight: true
    },
    {
      id: 'math_tools',
      label: 'Matematik Laboratuvarı & Grafik',
      subtitle: 'İnteraktif grafik, KaTeX formül arşivi',
      icon: Calculator,
      badge: 'Grafik & KaTeX',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      highlight: true
    },
    {
      id: 'schedule',
      label: 'Ders Programı & Canlı Takip',
      subtitle: 'Haftalık dersler ve Drive entegrasyonu',
      icon: CalendarDays,
      badge: 'Canlı',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'classroom_teacher',
      label: 'Sınıf Öğretmenliği Portalı',
      subtitle: 'İlkokul 1-4, okuma-yazma, defter',
      icon: GraduationCap,
      badge: 'İlkokul 1-4',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      highlight: true
    },
    {
      id: 'curriculum',
      label: 'Müfredat & İdari Görevler',
      subtitle: 'Kitap yükleme, nöbet, kurul tanımları',
      icon: BookOpen,
    },
    {
      id: 'plans',
      label: 'Yıllık ve Günlük Planlar',
      subtitle: 'MEB Maarif Modeli AI planlayıcı',
      icon: FileText,
      badge: 'AI',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'scenarios',
      label: 'Ders Notları & LaTeX / PDF',
      subtitle: 'Öğretmen / Öğrenci nüshası & Drive',
      icon: Code2,
    },
    {
      id: 'students',
      label: 'Öğrenci & Otomatik Ödev',
      subtitle: 'Online kontrol, devamsızlık ve dönüt',
      icon: Users,
      badge: pendingHomeworkCount > 0 ? `${pendingHomeworkCount} bekleyen` : undefined,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'rubrics',
      label: 'Ölçme & Rubrik Portalı',
      subtitle: 'Öğretmen ve öğrenci şeffaf matrisi',
      icon: CheckSquare,
    },
    {
      id: 'mevzuat',
      label: 'MEB Mevzuat Danışmanı',
      subtitle: 'Nöbet, ek ders, yönetmelik asistanı',
      icon: Scale,
    },
    {
      id: 'clubs',
      label: 'Sosyal Kulüp Portalı',
      subtitle: 'Tutanaklar, toplum hizmeti, üyeler',
      icon: Award,
    },
    {
      id: 'guidance',
      label: 'Rehberlik Portalı',
      subtitle: 'BEP takibi, veli görüşmeleri, formlar',
      icon: Compass,
    },
    {
      id: 'projects',
      label: 'Projeler Platformu',
      subtitle: 'TÜBİTAK, TEKNOFEST, Erasmus+',
      icon: Rocket,
      badge: '3 Proje',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'dyk_inservice',
      label: 'DYK, Egzersiz & Hizmet İçi',
      subtitle: 'Kurs, satranç, ÖBA hatırlatıcıları',
      icon: Bell,
      badge: 'Aktif',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'olimpiyat',
      label: 'Bilim Olimpiyatları Portalı',
      subtitle: 'TÜBİTAK BİDEB 2202, kamp ve notlar',
      icon: Flame,
      badge: 'BİDEB',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      highlight: true
    },
    {
      id: 'forms_data_collection',
      label: 'Bilgi Toplama & Formlar',
      subtitle: 'Sınıf içi anlık & geniş süreli anketler',
      icon: ClipboardList,
      badge: 'Anlık/Geniş',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      highlight: true
    },
    {
      id: 'architecture',
      label: 'Sistem Mimarisi & AI Analizi',
      subtitle: 'Talebiniz çok mu zor / aşırı mı?',
      icon: Cpu,
    },
    {
      id: 'system_test',
      label: 'Sistem Test Laboratuvarı',
      subtitle: '10 Modül Canlı Entegrasyon Testi',
      icon: CheckSquare,
      badge: 'Test Et',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      highlight: true
    }
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const navList = (
    <>
      <div className="mb-3 px-3 py-2 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl shadow-xs">
        <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
          Öğretmen Kokpiti
        </div>
        <div className="text-xs text-slate-300 mt-0.5">
          Tüm MEB idari ve pedagojik süreçleri tek ekranda.
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-indigo-50/80 text-indigo-950 font-semibold shadow-2xs border border-indigo-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${item.highlight && !isActive ? 'ring-1 ring-amber-400/40 bg-amber-50/30' : ''}`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : item.highlight
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600 group-hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs truncate ${isActive ? 'font-bold text-indigo-950' : 'font-medium'}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}

        {/* Google Drive Bulut Entegrasyon Kartı */}
        {onOpenDriveManager && (
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenDriveManager();
                if (onCloseMobileDrawer) onCloseMobileDrawer();
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 hover:border-amber-300 text-left transition shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs group-hover:scale-105 transition">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Google Drive</span>
                    {isDriveConnected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Bağlı" />
                    )}
                  </div>
                  <div className="text-[10px] text-amber-800 font-medium">
                    {isDriveConnected ? 'Bulut Senkronize' : 'Drive\'a Taşı & Yedekle'}
                  </div>
                </div>
              </div>
              <Cloud className="w-4 h-4 text-amber-600 group-hover:text-amber-800 transition" />
            </button>
          </div>
        )}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on tablet and mobile) */}
      <aside className="hidden lg:block w-72 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-3 shrink-0">
        {navList}
      </aside>

      {/* Mobile & Tablet Drawer Sheet (Off-canvas) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileDrawer}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Menü & Tüm Modüller</span>
              <button
                onClick={onCloseMobileDrawer}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navList}
          </div>
        </div>
      )}
    </>
  );
};

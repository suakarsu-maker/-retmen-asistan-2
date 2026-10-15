import React from 'react';
import {
  CalendarDays,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  Menu,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { TeacherType } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenMobileDrawer: () => void;
  onOpenPortalAuthModal: () => void;
  teacherType: TeacherType;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMobileDrawer,
  onOpenPortalAuthModal,
  teacherType,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex justify-around items-center lg:hidden shadow-lg safe-bottom">
      {/* 1. Schedule */}
      <button
        onClick={() => onSelectTab('schedule')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-2 py-1 transition-colors ${
          activeTab === 'schedule'
            ? 'text-indigo-600 font-bold bg-indigo-50/80'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <CalendarDays className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Program</span>
      </button>

      {/* 2. Özel Ders & Koçluk */}
      <button
        onClick={() => onSelectTab('private_tutoring')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-2 py-1 transition-colors ${
          activeTab === 'private_tutoring'
            ? 'text-emerald-700 font-bold bg-emerald-50/80'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <UserCheck className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Özel Ders</span>
      </button>

      {/* 3. Forms & Data Collection */}
      <button
        onClick={() => onSelectTab('forms_data_collection')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-2 py-1 transition-colors ${
          activeTab === 'forms_data_collection'
            ? 'text-teal-700 font-bold bg-teal-50/80'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <ClipboardList className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Formlar</span>
      </button>

      {/* 4. Portal Access Controls */}
      <button
        onClick={onOpenPortalAuthModal}
        className="flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-2 py-1 text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ShieldCheck className="w-5 h-5 mb-0.5 text-emerald-600" />
        <span className="text-[10px] leading-tight">İzinler</span>
      </button>

      {/* 5. All Tabs Menu Drawer Button */}
      <button
        onClick={onOpenMobileDrawer}
        className="flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-2 py-1 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <Menu className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Menü</span>
      </button>
    </nav>
  );
};

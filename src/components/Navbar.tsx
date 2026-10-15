import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  HardDrive,
  Printer,
  Sparkles,
  School,
  ExternalLink,
  Bell,
  Lock,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  X,
  Menu,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { SchedulePeriod, UserRole, TeacherType } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  teacherType?: TeacherType;
  onSelectTeacherType?: (type: TeacherType) => void;
  activePeriod?: SchedulePeriod | null;
  onOpenDriveModal: (period: SchedulePeriod) => void;
  onOpenPrintModal: () => void;
  onNavigateToTab: (tabId: string) => void;
  onToggleMobileDrawer?: () => void;
  onOpenPortalAuthModal?: () => void;
  studentPortalActive?: boolean;
  parentPortalActive?: boolean;
  isTeacherPreviewing?: boolean;
  onExitPreview?: () => void;
  onOpenRoleModal?: () => void;
  onOpenDriveManager?: () => void;
  isDriveConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  teacherType = 'classroom',
  onSelectTeacherType,
  activePeriod,
  onOpenDriveModal,
  onOpenPrintModal,
  onNavigateToTab,
  onToggleMobileDrawer,
  onOpenPortalAuthModal,
  studentPortalActive = true,
  parentPortalActive = true,
  isTeacherPreviewing = false,
  onExitPreview,
  onOpenRoleModal,
  onOpenDriveManager,
  isDriveConnected = false,
}) => {

  return (
    <>
      {/* Teacher Impersonation Preview Banner (Shown only when teacher is testing student/parent views) */}
      {currentRole !== 'teacher' && isTeacherPreviewing && (
        <div className="bg-indigo-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-indigo-800 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-bold text-amber-300">Öğretmen Önizleme Modu:</span>
            <span className="text-slate-200">
              Şu anda <strong>{currentRole === 'student' ? 'Öğrenci Portalı' : 'Veli Bilgilendirme Portalı'}</strong> arayüzünü test ediyorsunuz. Öğrenci/velilerde rol değiştirme menüsü bulunmaz.
            </span>
          </div>
          {onExitPreview && (
            <button
              onClick={onExitPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Öğretmen Paneline Dön</span>
            </button>
          )}
        </div>
      )}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Left: Brand & Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Drawer Trigger (Only shown on teacher mobile/tablet) */}
              {currentRole === 'teacher' && onToggleMobileDrawer && (
                <button
                  onClick={onToggleMobileDrawer}
                  className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition min-w-[42px] min-h-[42px] flex items-center justify-center border border-slate-200/80"
                  title="Menüyü Aç"
                  aria-label="Menüyü Aç"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {/* Logo & School Title */}
              <div
                className="flex items-center space-x-2.5 cursor-pointer"
                onClick={() => {
                  if (currentRole === 'teacher') onNavigateToTab('schedule');
                }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">Öğretmen Asistanı</span>
                    <span className="hidden sm:inline text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full px-2 py-0.5 uppercase tracking-wide">
                      MEB 2026+
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1 truncate max-w-[170px] sm:max-w-none">
                    <School className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>
                      {teacherType === 'classroom'
                        ? 'Mustafa Kemal İlkokulu • 3-B Sınıfı'
                        : 'Atatürk Anadolu Lisesi • Matematik & Özel Ders'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Active Lesson Ticker (Large screens) */}
            <div className="hidden xl:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div className="text-xs">
                  <span className="text-slate-400 font-medium">Aktif Ders: </span>
                  {teacherType === 'classroom' ? (
                    <span className="font-bold text-slate-800">
                      3-B &bull; 3. Ders: Matematik (Eldeli Toplama)
                    </span>
                  ) : activePeriod ? (
                    <span className="font-bold text-slate-800">
                      {activePeriod.period}. Ders ({activePeriod.className} - {activePeriod.subject})
                    </span>
                  ) : (
                    <span className="font-medium text-slate-700">10-A Matematik (08:30 - 09:10)</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (activePeriod) {
                    onOpenDriveModal(activePeriod);
                  } else {
                    onNavigateToTab('scenarios');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm transition-all duration-200"
                title="Google Drive Notları"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Drive Notları</span>
              </button>
            </div>

            {/* Right Controls: Role & Teacher Type & Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* TEACHER ONLY: Teacher Type Switcher + Role Switcher + Portal Auth */}
              {currentRole === 'teacher' ? (
                <>
                  {/* Portal Access Control Button */}
                  {onOpenPortalAuthModal && (
                    <button
                      onClick={onOpenPortalAuthModal}
                      className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 transition shadow-2xs"
                      title="Öğrenci & Veli Portalı Giriş İzinlerini Yönet"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>İzinler</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          studentPortalActive && parentPortalActive ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                    </button>
                  )}

                  {/* Teacher Type Toggle (Classroom vs Branch) */}
                  {onSelectTeacherType && (
                    <div className="hidden md:flex items-center bg-purple-50 p-1 rounded-xl border border-purple-200 text-xs">
                      <button
                        onClick={() => {
                          onSelectTeacherType('classroom');
                          onNavigateToTab('classroom_teacher');
                        }}
                        className={`px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                          teacherType === 'classroom'
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'text-purple-900 hover:bg-purple-100'
                        }`}
                        title="İlkokul Sınıf Öğretmeni (1-4)"
                      >
                        <span>🏫 Sınıf</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectTeacherType('branch');
                          onNavigateToTab('schedule');
                        }}
                        className={`px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                          teacherType === 'branch'
                            ? 'bg-indigo-700 text-white shadow-xs'
                            : 'text-indigo-900 hover:bg-purple-100'
                        }`}
                        title="Ortaokul / Lise Branş Öğretmeni"
                      >
                        <span>📐 Branş</span>
                      </button>
                    </div>
                  )}

                  {/* Role Switcher */}
                  <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => onSelectRole('teacher')}
                      className="px-2 sm:px-2.5 py-1 rounded-lg font-bold bg-white text-indigo-900 shadow-xs transition"
                    >
                      🎓 Öğretmen
                    </button>
                    <button
                      onClick={() => onSelectRole('student')}
                      className="px-2 sm:px-2.5 py-1 rounded-lg font-bold text-slate-600 hover:text-slate-900 transition"
                      title="Öğrenci Görünümüne Geç"
                    >
                      🎒 Öğrenci
                    </button>
                    <button
                      onClick={() => onSelectRole('parent')}
                      className="px-2 sm:px-2.5 py-1 rounded-lg font-bold text-slate-600 hover:text-slate-900 transition"
                      title="Veli Görünümüne Geç"
                    >
                      👨‍👩‍👧 Veli
                    </button>
                  </div>

                  {/* Role Selection Modal Trigger (Girişte ve Her An Rol Yönetimi) */}
                  {onOpenRoleModal && (
                    <button
                      onClick={onOpenRoleModal}
                      className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200 transition shadow-2xs"
                      title="Giriş Rolü ve Profil Seçim Ekranını Aç"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Rol Seçimi</span>
                    </button>
                  )}
                </>
              ) : (
                /* STUDENT / PARENT VIEW: WITH QUICK ROLE SWITCH BUTTON */
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs shadow-2xs ${
                      currentRole === 'student' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {currentRole === 'student' ? '🎒 Öğrenci Portalı' : '👨‍👩‍👧 Veli Portalı'}
                  </span>

                  {/* Quick Role Switcher Button for Student / Parent */}
                  {onOpenRoleModal && (
                    <button
                      onClick={onOpenRoleModal}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-indigo-700 hover:bg-slate-50 border border-slate-200 shadow-2xs transition"
                      title="Farklı bir role geçiş yap veya rol seç"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="hidden sm:inline">Rol Değiştir</span>
                    </button>
                  )}

                  {/* If teacher is testing this view, show exit button */}
                  {isTeacherPreviewing && onExitPreview && (
                    <button
                      onClick={onExitPreview}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Öğretmen Paneline Dön</span>
                      <span className="sm:hidden">Çık</span>
                    </button>
                  )}
                </div>
              )}

              {/* Google Drive Bulut Taşıma ve Senkronizasyon Butonu */}
              {onOpenDriveManager && (
                <button
                  onClick={onOpenDriveManager}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border shadow-2xs transition cursor-pointer ${
                    isDriveConnected
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  title="Google Drive'a Taşı, Yedekle ve Senkronize Et"
                >
                  <HardDrive className={`w-3.5 h-3.5 ${isDriveConnected ? 'text-emerald-600' : 'text-amber-600'}`} />
                  <span className="hidden sm:inline">Drive'a Taşı</span>
                  {isDriveConnected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Google Drive Bağlantısı Aktif" />
                  )}
                </button>
              )}

              {/* Quick Print Button */}
              {currentRole === 'teacher' && (
                <button
                  onClick={onOpenPrintModal}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition"
                  title="Ders planını veya notunu yazdır"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden md:inline">Yazdır</span>
                </button>
              )}

              {/* User Avatar */}
              <div className="flex items-center gap-1.5 pl-1">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-indigo-600/20 shrink-0">
                  {currentRole === 'teacher' ? 'SA' : currentRole === 'student' ? 'AY' : 'MY'}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentRole === 'teacher' ? 'Su Akarsu' : currentRole === 'student' ? 'Ahmet Yılmaz' : 'Mehmet Yılmaz'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {currentRole === 'teacher'
                      ? (teacherType === 'classroom' ? 'Sınıf Öğretmeni' : 'Biyoloji Başöğretmeni')
                      : currentRole === 'student'
                      ? '10-A Öğrencisi'
                      : 'Öğrenci Velisi'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};


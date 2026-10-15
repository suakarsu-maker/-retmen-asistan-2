import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  HardDrive,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  BookOpen,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { DaySchedule, SchedulePeriod } from '../types';

interface ScheduleTabProps {
  schedule: DaySchedule[];
  activeDay: string;
  onSelectDay: (day: string) => void;
  onOpenDriveModal: (period: SchedulePeriod) => void;
  onGenerateNotesForPeriod: (period: SchedulePeriod) => void;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({
  schedule,
  activeDay,
  onSelectDay,
  onOpenDriveModal,
  onGenerateNotesForPeriod,
}) => {
  const currentDayData = schedule.find((d) => d.day === activeDay) || schedule[0];
  const [selectedPeriod, setSelectedPeriod] = useState<SchedulePeriod | null>(null);

  // Simulated active period: Period 1 on Pazartesi / Salı
  const isPeriodActive = (periodNum: number, day: string) => {
    return day === 'Pazartesi' && periodNum === 1;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Live Status */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Calendar className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Sistem Canlı &bull; 2026-2027 Eğitim Öğretim Yılı
              </span>
              <span className="text-xs text-indigo-200">Haftalık 24 Saat Ders Yükü</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Haftalık Ders Programı & Canlı Ders Notu Senkronizasyonu
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 mt-1 max-w-2xl">
              İlgili ders saati geldiğinde Google Drive üzerindeki güncel öğrenci ve öğretmen nüshaları ekranda otomatik olarak belirecektir.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 shrink-0">
            <div className="text-[11px] text-indigo-200 uppercase font-semibold">Simüle Edilen Anlık Zaman</div>
            <div className="text-lg font-bold flex items-center gap-2 text-white">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>08:42 &bull; Pazartesi 1. Ders</span>
            </div>
            <div className="text-[11px] text-emerald-300 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              10-A Biyoloji Drive Notları Yayında
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector Bar & Duty Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {schedule.map((d) => {
              const isSelected = d.day === activeDay;
              const hasDuty = !!d.dutyLocation;
              return (
                <button
                  key={d.day}
                  onClick={() => onSelectDay(d.day)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{d.day}</span>
                  {hasDuty && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Nöbet
                    </span>
                  )}
                  <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    ({d.periods.length} saat)
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-indigo-600" />
            <span>Zümre: Fen Bilimleri / Biyoloji</span>
          </div>
        </div>

        {/* Nöbet Bildirimi (Varsa) */}
        {currentDayData.dutyLocation && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold">Günün İdari Görevi / Nöbetçi Öğretmen: </span>
              {currentDayData.dutyLocation}. MEB Ortaöğretim Yönetmeliği Madde 91 uyarınca ilk dersten 30 dakika önce (08:00) nöbet yerinde bulunulmalı ve nöbet defteri imzalanmalıdır.
            </div>
          </div>
        )}
      </div>

      {/* Periods Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDayData.periods.map((period) => {
          const activeNow = isPeriodActive(period.period, currentDayData.day);

          return (
            <div
              key={period.period}
              className={`rounded-2xl border transition-all duration-200 bg-white p-4 flex flex-col justify-between ${
                activeNow
                  ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      activeNow ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {period.period}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {period.timeRange}
                    </span>
                  </div>

                  {activeNow && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 animate-pulse">
                      Şu Anki Ders
                    </span>
                  )}
                </div>

                {/* Class & Subject */}
                <div className="mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{period.subject}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      {period.className}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{period.classroom}</span>
                  </div>
                </div>

                {/* Topic */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">İşlenecek Konu</div>
                  <div className="text-xs font-medium text-slate-800 line-clamp-2 mt-0.5">
                    {period.topic}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {/* Drive Notu Linki - Vurgulu & İstendiği gibi ekranda beliren link */}
                <button
                  onClick={() => onOpenDriveModal(period)}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    activeNow
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs animate-bounce hover:animate-none'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/60'
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Dersin Drive Notları & PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onGenerateNotesForPeriod(period)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>AI Senaryo & LaTeX</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  Bell,
  BellOff,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Plus,
  ExternalLink
} from 'lucide-react';
import { DYKCourse, ExerciseActivity, InServiceTraining } from '../types';

interface DYKExerciseInServiceTabProps {
  dykCourses: DYKCourse[];
  exercises: ExerciseActivity[];
  inServiceTrainings: InServiceTraining[];
  onToggleReminder: (trainingId: string) => void;
  onAddTraining: (training: InServiceTraining) => void;
}

export const DYKExerciseInServiceTab: React.FC<DYKExerciseInServiceTabProps> = ({
  dykCourses,
  exercises,
  inServiceTrainings,
  onToggleReminder,
  onAddTraining,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'dyk' | 'exercise' | 'inservice'>('dyk');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              MEB Kurslar, Egzersizler ve Mesleki Gelişim
            </span>
            <span className="text-xs text-slate-300">ÖBA & MEBBİS Entegrasyonu</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            DYK Kursları, Egzersizler ve Hizmet İçi Eğitim Takibi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Destekleme ve Yetiştirme Kursları (DYK), ders dışı satranç/olimpiyat egzersizleri ve yaklaşan hizmet içi seminerler için akıllı hatırlatıcılar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-center">
            <div className="text-[10px] uppercase font-semibold text-amber-200">Haftalık İlave Ders Yükü</div>
            <div className="text-base font-bold text-white">4 Saat DYK + 6 Saat Egzersiz</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('dyk')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'dyk'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>DYK Kursları ({dykCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('exercise')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'exercise'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Ders Dışı Egzersizler ({exercises.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inservice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'inservice'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Hizmet İçi Eğitim & Hatırlatıcılar ({inServiceTrainings.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: DYK COURSES */}
      {activeSubTab === 'dyk' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              e-Kurs Modülü & Destekleme Yetiştirme Kursu Takibi
            </h3>
            <span className="text-xs text-slate-500">2026-2027 1. Dönem DYK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dykCourses.map((c) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {c.grade} &bull; Haftalık {c.weeklyHours} Saat
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{c.classroom}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{c.courseName}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.scheduleTime}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Bu Haftaki Müfredat / Soru Çözüm Konusu:
                  </div>
                  <div className="font-semibold text-slate-800">{c.syllabusTopicThisWeek}</div>
                </div>

                {/* Score Progress */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-500 text-[11px]">Kayıtlı Öğrenci:</div>
                    <div className="font-bold text-slate-900">{c.studentCount} Öğrenci</div>
                  </div>

                  <div className="text-right">
                    <div className="text-slate-500 text-[11px]">Ort. AYT Deneme Neti:</div>
                    <div className="font-bold text-emerald-700 flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{c.averagePracticeExamScore} / 13 Net</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: EXERCISES */}
      {activeSubTab === 'exercise' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ders Dışı Etüt & Egzersiz Çalışmaları</h3>
              <p className="text-xs text-slate-500">MEB Yönetmeliğine göre öğretmen haftada en fazla 6 saat egzersiz açabilir.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              Kaymakamlık Onaylı
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((ex) => (
              <div key={ex.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                    Haftalık {ex.weeklyHours} Saat Egzersiz
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {ex.approvalStatus}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{ex.name}</h4>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ex.days}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <span className="text-slate-500">Hedef Turnuva / Yarışma: </span>
                  <span className="font-bold text-slate-900">{ex.upcomingTournament}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Aktif Lisanslı Öğrenci:</span>
                  <span className="font-bold text-slate-900">{ex.studentsCount} Öğrenci</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: INSERVICE TRAINING & REMINDERS */}
      {activeSubTab === 'inservice' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                MEB & ÖBA Hizmet İçi Eğitim Süreçleri ve Akıllı Hatırlatıcılar
              </h3>
              <p className="text-xs text-slate-500">Seminerlerin başvuru tarihleri, katılım süreleri ve sertifikaları otomatik takip edilir.</p>
            </div>
          </div>

          <div className="space-y-3">
            {inServiceTrainings.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Faaliyet No: {t.courseCode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {t.organizer}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.status === 'Sertifika Alındı'
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'Başvuru Açık'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{t.title}</h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <span>Süre: {t.durationHours} Saat</span>
                    <span>&bull;</span>
                    <span>Tarih: {t.startDate} - {t.endDate}</span>
                    <span>&bull;</span>
                    <span className="font-semibold text-rose-600">Son Başvuru: {t.applicationDeadline}</span>
                  </div>

                  {t.reminderNote && (
                    <div className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/50 mt-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{t.reminderNote}</span>
                    </div>
                  )}
                </div>

                {/* Reminder Toggle Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleReminder(t.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                      t.isReminderSet
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {t.isReminderSet ? (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Hatırlatıcı Açık</span>
                      </>
                    ) : (
                      <>
                        <BellOff className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hatırlatıcı Kur</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

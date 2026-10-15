import React, { useState } from 'react';
import {
  Award,
  Users,
  Calendar,
  FileText,
  Plus,
  CheckCircle,
  HeartHandshake,
  Printer,
  Sparkles
} from 'lucide-react';
import { SocialClub } from '../types';

interface ClubPortalTabProps {
  clubs: SocialClub[];
  onAddClubMeeting: (clubId: string, meeting: { date: string; topic: string; decisions: string[] }) => void;
  onOpenPrintModal: (content: any) => void;
}

export const ClubPortalTab: React.FC<ClubPortalTabProps> = ({
  clubs,
  onAddClubMeeting,
  onOpenPrintModal,
}) => {
  const [selectedClubId, setSelectedClubId] = useState<string>(clubs[0]?.id || '');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDate, setMeetingDate] = useState('2026-10-20');
  const [decision1, setDecision1] = useState('');
  const [decision2, setDecision2] = useState('');

  const activeClub = clubs.find((c) => c.id === selectedClubId) || clubs[0];

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTopic.trim()) return;

    const decisions = [decision1, decision2].filter((d) => d.trim().length > 0);
    onAddClubMeeting(activeClub.id, {
      date: meetingDate,
      topic: meetingTopic,
      decisions: decisions.length > 0 ? decisions : ['Toplantı gündem maddeleri oy birliğiyle kabul edildi.'],
    });
    setMeetingTopic('');
    setDecision1('');
    setDecision2('');
    setShowMeetingModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30">
              MEB Sosyal Etkinlikler Yönetmeliği
            </span>
            <span className="text-xs text-slate-300">Öğrenci Kulüpleri & Toplum Hizmeti</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Sosyal Kulüp Yönetim Portalı & Karar Defteri
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Kulüp tüzüğü, öğrenci yönetim kurulu, toplantı tutanakları, toplum hizmeti etkinlikleri ve e-Okul sosyal etkinlik modülü entegrasyonu.
          </p>
        </div>

        <button
          onClick={() => onOpenPrintModal(activeClub)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition shrink-0"
        >
          <Printer className="w-4 h-4 text-purple-700" />
          <span>Kulüp Karar Dosyasını Yazdır</span>
        </button>
      </div>

      {activeClub && (
        <div className="space-y-6">
          {/* Club Info & Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Club Overview Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                  DANIŞMAN ÖĞRETMENLİK
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">{activeClub.name}</h2>
                <div className="text-xs text-slate-500 mt-0.5">{activeClub.teacherAdvisor}</div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Kayıtlı Üye Sayısı:</span>
                    <span className="font-bold text-slate-900">{activeClub.memberCount} Öğrenci</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Toplantı Günü:</span>
                    <span className="font-bold text-purple-700">Her Çarşamba 3. Ders</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Yaklaşan Faaliyet:</span>
                    <span className="font-bold text-slate-900 text-right truncate max-w-[140px]">
                      TÜBİTAK Ön Eleme
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowMeetingModal(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Yeni Toplantı Tutanağı Ekle</span>
                </button>
              </div>
            </div>

            {/* Student Executive Committee */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Öğrenci Yönetim & Denetleme Kurulu</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Kulüp Başkanı</div>
                    <div className="font-bold text-slate-900">{activeClub.studentPresident}</div>
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Seçildi</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Başkan Yardımcısı</div>
                    <div className="font-bold text-slate-900">{activeClub.studentVicePresident}</div>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">Seçildi</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Sayman / Yazman</div>
                    <div className="font-bold text-slate-900">{activeClub.studentTreasurer}</div>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">Seçildi</span>
                </div>
              </div>
            </div>

            {/* Annual Objectives */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Yıllık Hedefler & Faaliyetler</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeClub.annualGoals.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-purple-50/50 p-2 rounded-lg border border-purple-100">
                    <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meeting Minutes (Toplantı Tutanakları) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Kulüp Karar Defteri & Toplantı Tutanakları</span>
              </h3>
              <span className="text-xs text-slate-500">Resmi MEB Formatı</span>
            </div>

            <div className="space-y-3">
              {activeClub.meetings.map((m, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-950">{m.topic}</span>
                    <span className="text-xs text-slate-500 font-medium">{m.date}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Alınan Kararlar:
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                      {m.decisions.map((dec, i) => (
                        <li key={i}>{dec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Service (Toplum Hizmeti) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>Toplum Hizmeti Çalışmaları</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeClub.communityService.map((cs, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-rose-50/30 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{cs.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Hedef Kitle: {cs.targetGroup}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-700">{cs.date}</span>
                    <div className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded mt-1">
                      {cs.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Yeni Kulüp Toplantı Tutanağı</h3>
            <form onSubmit={handleSaveMeeting} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Toplantı Konusu / Gündem</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 29 Ekim Cumhuriyet Bayramı Kulüp Panosu Hazırlığı"
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Toplantı Tarihi</label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">1. Alınan Karar</label>
                <input
                  type="text"
                  placeholder="Örn: Kulüp panosu görselleri seçildi ve onaylandı."
                  value={decision1}
                  onChange={(e) => setDecision1(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">2. Alınan Karar</label>
                <input
                  type="text"
                  placeholder="Örn: Görev dağılımı yapıldı."
                  value={decision2}
                  onChange={(e) => setDecision2(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMeetingModal(false)}
                  className="px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition"
                >
                  Karar Defterine Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { LessonPlan, ScenarioLessonNote } from '../types';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: LessonPlan | null;
  scenario?: ScenarioLessonNote | null;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  plan,
  scenario,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="no-print flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Yazdırma & PDF Önizleme Modu (A4 Standart Formatı)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-8 overflow-y-auto space-y-6" id="printable-area">
          {/* Official MEB Document Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700">
              T.C. MİLLÎ EĞİTİM BAKANLIĞI
            </h4>
            <h2 className="text-base font-bold text-slate-950 mt-1">
              ATATÜRK ANADOLU LİSESİ &bull; FEN BİLİMLERİ ZÜMRESİ
            </h2>
            <div className="text-xs text-slate-600 mt-0.5">
              2026-2027 Eğitim Öğretim Yılı &bull; Ders Planı ve Notları
            </div>
          </div>

          {/* If Scenario exists */}
          {scenario && (
            <div className="space-y-4">
              <div className="flex justify-between text-xs border-b border-slate-200 pb-2">
                <div><strong>Ders:</strong> {scenario.subject} ({scenario.grade})</div>
                <div><strong>Konu:</strong> {scenario.topic}</div>
                <div><strong>Hedef Şube:</strong> {scenario.targetClass}</div>
              </div>

              {/* Teacher Scenario Timeline */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
                  Ders Senaryosu (Öğretmen Nüshası)
                </h3>
                <div className="space-y-2">
                  {scenario.teacherCopy.scenarioTimeline.map((item, idx) => (
                    <div key={idx} className="text-xs flex gap-3">
                      <span className="font-bold text-slate-900 w-20 shrink-0">{item.time}:</span>
                      <span className="text-slate-700"><strong className="text-slate-900">{item.phase} - </strong>{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Copy */}
              <div className="pt-4 border-t border-slate-300">
                <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
                  Öğrenci Çalışma Föyü Özeti ve Soruları
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed mb-3">
                  {scenario.studentCopy.summary}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs font-bold text-slate-900">Alıştırmalar:</div>
                  {scenario.studentCopy.fillInTheBlanks.map((b, i) => (
                    <div key={i} className="text-xs font-mono text-slate-800">{b}</div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900">Uygulama Soruları:</div>
                  {scenario.studentCopy.practiceQuestions.map((q, i) => (
                    <div key={i} className="text-xs border border-slate-200 p-3 rounded">
                      <div className="font-medium text-slate-900 mb-6">{q}</div>
                      <div className="text-[10px] text-slate-400 text-right">Öğrenci Cevap Alanı</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* If Plan exists */}
          {plan && !scenario && (
            <div className="space-y-4">
              <div className="flex justify-between text-xs border-b border-slate-200 pb-2">
                <div><strong>Ders:</strong> {plan.subject} ({plan.grade})</div>
                <div><strong>Hafta:</strong> {plan.weekNumber}</div>
                <div><strong>Konu:</strong> {plan.topic}</div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Kazanımlar</h3>
                <ul className="text-xs list-disc list-inside text-slate-700 space-y-1">
                  {plan.learningOutcomes.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">5E Ders İşleniş Adımları</h3>
                <div className="space-y-2">
                  {plan.stages.map((s, idx) => (
                    <div key={idx} className="text-xs border border-slate-200 p-2.5 rounded">
                      <div className="font-bold text-slate-900 mb-0.5">{s.stageName}</div>
                      <p className="text-slate-700">{s.activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Signature Footer */}
          <div className="pt-8 border-t border-slate-300 flex justify-between text-xs text-center">
            <div>
              <div className="font-bold">Su Akarsu</div>
              <div className="text-slate-500">Biyoloji Öğretmeni</div>
            </div>
            <div>
              <div className="font-bold">Fen Bilimleri Zümre Başkanı</div>
              <div className="text-slate-500">İmza / Mühür</div>
            </div>
            <div>
              <div className="font-bold">Okul Müdürü</div>
              <div className="text-slate-500">Onay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

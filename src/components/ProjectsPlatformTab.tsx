import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Users,
  Calendar,
  CheckCircle2,
  Plus,
  FileText,
  DollarSign,
  TrendingUp,
  Download,
  Award
} from 'lucide-react';
import { SchoolProject } from '../types';

interface ProjectsPlatformTabProps {
  projects: SchoolProject[];
  onAddProject: (project: SchoolProject) => void;
  onOpenPrintModal: (content: any) => void;
}

export const ProjectsPlatformTab: React.FC<ProjectsPlatformTabProps> = ({
  projects,
  onAddProject,
  onOpenPrintModal,
}) => {
  const [selectedType, setSelectedType] = useState<string>('Hepsi');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState<SchoolProject['type']>('TÜBİTAK 2204-A');
  const [summary, setSummary] = useState('');
  const [student1, setStudent1] = useState('');
  const [student2, setStudent2] = useState('');
  const [deadline, setDeadline] = useState('2027-01-15');
  const [budget, setBudget] = useState('5.000 TL');

  const filteredProjects = projects.filter(
    (p) => selectedType === 'Hepsi' || p.type.includes(selectedType)
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim()) return;

    const team = [
      { name: student1 || 'Zeynep Kaya', class: '10-B', role: 'Araştırmacı' },
      ...(student2 ? [{ name: student2, class: '10-B', role: 'Veri Analisti' }] : [])
    ];

    const newProject: SchoolProject = {
      id: 'proj-' + Date.now(),
      title: projectTitle,
      type: projectType,
      advisorTeacher: 'Danışman: Su Akarsu',
      studentTeam: team,
      summary: summary || 'Proje araştırma özeti ve MEB bilimsel metodolojisi.',
      currentStage: 'Literatür Taraması',
      deadline,
      budgetAllocated: budget,
      progressPercent: 35
    };

    onAddProject(newProject);
    setProjectTitle('');
    setSummary('');
    setStudent1('');
    setStudent2('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-400/20 text-violet-300 border border-violet-400/30">
              Bilimsel Araştırma & İnovasyon Masası
            </span>
            <span className="text-xs text-slate-300">TÜBİTAK, TEKNOFEST & Uluslararası Projeler</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Okul Projeleri Yönetim ve Yarışma Portalı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            TÜBİTAK 2204 Lise Öğrencileri Araştırma Projeleri, TEKNOFEST teknoloji takımları ve Erasmus+ okul ortaklıklarının aşama takibi ve başvuru dosyaları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenPrintModal({ title: 'TÜBİTAK ve TEKNOFEST Proje Başvuru Dosyaları', projects })}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-violet-700" />
            <span>Proje Dosyalarını Al</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Proje Başlat</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['Hepsi', 'TÜBİTAK', 'TEKNOFEST', 'Erasmus'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedType === t
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t} Projeleri
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Toplam <span className="font-bold text-slate-900">{filteredProjects.length}</span> Aktif Proje Yürütülüyor
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-800 border border-violet-200">
                  {p.type}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {p.currentStage}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{p.title}</h3>

              <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                {p.summary}
              </p>

              {/* Student Team */}
              <div className="space-y-1 mb-3 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Görevli Öğrenci Takımı:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.studentTeam.map((st, i) => (
                    <span key={i} className="text-[11px] bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 text-slate-700 font-medium">
                      {st.name} ({st.class})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Progress & Deadline */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>Tamamlanma Oranı</span>
                <span className="font-bold text-violet-700">%{p.progressPercent}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${p.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{p.deadline}</span>
                </div>
                {p.budgetAllocated && (
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {p.budgetAllocated}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">Yeni Bilimsel Proje Başlat</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proje Başlığı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Alg Tabanlı Biyofiltre ile Gri Su Arıtımı"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Yarışma / Proje Türü</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                  >
                    <option value="TÜBİTAK 2204-A">TÜBİTAK 2204-A Lise</option>
                    <option value="TÜBİTAK 2204-B">TÜBİTAK 2204-B Ortaokul</option>
                    <option value="TEKNOFEST">TEKNOFEST</option>
                    <option value="Erasmus+ KA1/KA2">Erasmus+ KA1/KA2</option>
                    <option value="eTwinning">eTwinning</option>
                    <option value="Kalkınma Ajansı">Kalkınma Ajansı</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Son Başvuru Tarihi</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">1. Görevli Öğrenci</label>
                  <input
                    type="text"
                    placeholder="Örn: Zeynep Kaya (10-B)"
                    value={student1}
                    onChange={(e) => setStudent1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">2. Görevli Öğrenci (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Örn: Ahmet Yılmaz (10-B)"
                    value={student2}
                    onChange={(e) => setStudent2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proje Özeti & Hipotez</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Projenin amacı, bilimsel hipotezi ve beklenen çıktıları..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-xs transition"
                >
                  Projeyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

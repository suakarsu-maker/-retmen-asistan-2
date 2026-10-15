import React, { useState } from 'react';
import {
  Scale,
  Search,
  BookOpen,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { MevzuatQueryResponse } from '../types';
import { askMevzuatAPI } from '../services/api';

export const MevzuatTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Nöbet Görevi');
  const [isSearching, setIsSearching] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const [searchResult, setSearchResult] = useState<MevzuatQueryResponse>({
    question: 'Öğretmenin nöbet görevi, süresi ve muafiyet durumları nelerdir?',
    legalBasis: [
      {
        regulation: 'MEB Ortaöğretim Kurumları Yönetmeliği',
        article: 'Madde 91 (Öğretmenlerin Nöbet Görevi)',
        summary: 'Nöbet ilk dersten 30 dk önce başlar, son ders bitiminden 30 dk sonra biter. İkili öğretimde 15 dakikaya indirilebilir.'
      },
      {
        regulation: 'Öğretmenlik Meslek Kanunu & MEB Nöbet Yönergesi',
        article: 'Madde 91/2 ve 91/3',
        summary: 'Hamile öğretmenlere gebeliğin 24. haftasından itibaren ve doğumdan sonraki 2 yıl boyunca istememesi halinde nöbet görevi verilemez.'
      }
    ],
    clearAnswer: `MEB mevzuatına göre öğretmenler haftada bir günden fazla nöbet tutmakla zorunlu tutulamaz; ancak öğretmen yetersizliği olan durumlarda okul müdürünün teklifi ve milli eğitim onayı ile ikinci nöbet verilebilir ve ek ders ücreti ödenir. 
Ayrıca 24 haftalık gebe öğretmenler ile doğum sonrası analık iznini tamamlayıp göreve başlayan öğretmenler, talep etmeleri halinde iki yıl boyunca nöbetten tamamen muaftır. Engelli çocuğu olan öğretmenlere de nöbet günü seçiminde öncelik tanınır.`,
    actionSteps: [
      'Nöbet gününüzde mazeretiniz varsa nöbet çizelgesi hazırlanmadan önce idareye bildiriniz.',
      'Muafiyet hakkınız doğduysa (gebelik, doğum sonrası analık süresi veya sağlık kurulu raporu) ekteki dilekçe ile okul müdürlüğüne başvurunuz.',
      'Nöbet esnasında meydana gelen herhangi bir vukuat anında tutanak düzenleyip nöbet defterine kaydediniz.'
    ],
    officialDocumentTemplates: `T.C. ...... ANADOLU LİSESİ MÜDÜRLÜĞÜNE\\n\\nOkulunuzda ...... öğretmeni olarak görev yapmaktayım. MEB Ortaöğretim Kurumları Yönetmeliğinin 91. maddesi uyarınca, ekte sunduğum resmi belgeler doğrultusunda haftalık nöbet görevinden muaf tutulmam hususunda gereğini saygılarımla arz ederim.`
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const res = await askMevzuatAPI(query, category);
      setSearchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickQuestion = async (q: string, cat: string) => {
    setQuery(q);
    setCategory(cat);
    setIsSearching(true);
    try {
      const res = await askMevzuatAPI(q, cat);
      setSearchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(searchResult.officialDocumentTemplates.replace(/\\n/g, '\n'));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              MEB Mevzuat & Hukuki Rehber
            </span>
            <span className="text-xs text-slate-300">Yönetmelik ve İdari Görev Tarayıcısı</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            MEB Mevzuat Taraması & Resmi Hak / Görev Asistanı
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Öğretmenin nöbeti, ek ders hesabı, kurul görevleri, izin hakları ve sınav süreçlerine dair mevzuatı tarar, ilgili maddeleri ve dilekçe şablonlarını sunar.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 shrink-0 flex items-center gap-3">
          <Scale className="w-8 h-8 text-amber-300" />
          <div className="text-xs">
            <div className="font-bold text-white">Yürürlükteki Mevzuat İndeksi</div>
            <div className="text-slate-300 text-[11px]">7354 Sayılı ÖMK & MEB Yönetmelikleri</div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-48 shrink-0">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Mevzuat Kategorisi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="Nöbet Görevi">Nöbet Görevi & Muafiyet</option>
                <option value="Ek Ders & Ücretler">Ek Ders & Maaş Karşılığı</option>
                <option value="Sınav & Ölçme">Ortak Yazılı Sınavlar</option>
                <option value="İzin & Rapor">İzin, Mazeret ve Raporlar</option>
                <option value="Zümre & Kurullar">Zümre ve Kurul Görevleri</option>
                <option value="Disiplin & Ceza">Disiplin ve İnceleme</option>
                <option value="Sosyal Kulüpler">Sosyal Kulüp & Gezi İzinleri</option>
              </select>
            </div>

            <div className="flex-1 w-full">
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Mevzuat Sorunuz veya İdari Durumunuz
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Örn: Haftalık nöbette kaçıncı dakikada görev yerinde olmalıyım? İkinci nöbet zorunlu mu?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-3 pr-28 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-1.5 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                >
                  {isSearching ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>Mevzuatta Ara</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            <span className="text-slate-400 font-medium">Hızlı Sorular:</span>
            <button
              type="button"
              onClick={() => handleQuickQuestion('Doğum sonrası öğretmen kaç yıl nöbetten muaftır?', 'Nöbet Görevi')}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Doğum Sonrası Nöbet Muafiyeti
            </button>
            <button
              type="button"
              onClick={() => handleQuickQuestion('Haftalık kaç saate kadar ek ders ücreti ödenebilir?', 'Ek Ders & Ücretler')}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Maksimum Ek Ders Sınırı
            </button>
            <button
              type="button"
              onClick={() => handleQuickQuestion('Ortak yazılı sınava itiraz süresi kaç gündür?', 'Sınav & Ölçme')}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Sınav İtiraz Süresi
            </button>
            <button
              type="button"
              onClick={() => handleQuickQuestion('Sosyal etkinlikler kapsamında il dışı gezi onayı nasıl alınır?', 'Sosyal Kulüpler')}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              İl Dışı Gezi Onay Şartları
            </button>
          </div>
        </form>
      </div>

      {/* Result Card */}
      {searchResult && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              MEB HUKUKİ İNCELEME SONUCU
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {searchResult.question}
            </h2>
          </div>

          {/* Legal Basis Badges */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Yasal Dayanak & İlgili Yönetmelik Maddeleri</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResult.legalBasis.map((basis, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
                  <div className="font-bold text-indigo-900 mb-1">{basis.regulation}</div>
                  <div className="font-semibold text-slate-800 mb-1">{basis.article}</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{basis.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Executive Answer */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2">
              Öğretmen İçin Pratik & Yasal Açıklama
            </h4>
            <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
              {searchResult.clearAnswer}
            </p>
          </div>

          {/* Action Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              İzlenmesi Gereken Resmi İşlem Adımları
            </h4>
            <div className="space-y-2">
              {searchResult.actionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Document Template */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                Resmi Dilekçe / Tutanak Taslağı
              </span>
              <button
                onClick={handleCopyTemplate}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg transition"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Kopyalandı' : 'Dilekçeyi Kopyala'}</span>
              </button>
            </div>
            <pre className="font-mono text-xs text-slate-800 whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200">
              {searchResult.officialDocumentTemplates.replace(/\\n/g, '\n')}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

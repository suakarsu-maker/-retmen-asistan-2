import React from 'react';
import {
  Cpu,
  CheckCircle,
  HelpCircle,
  Zap,
  Server,
  Code2,
  HardDrive,
  Scale,
  Sparkles,
  BookOpen,
  Users
} from 'lucide-react';

export const ArchitectureFaqTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Answer Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Mühendislik & Pedagoji Analizi
          </span>
          <span className="text-xs text-indigo-200">Sorunuzun Doğrudan Cevabı</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          "Çok komplike ve aşırı derecede yapay zeka kullanması gereken bir sistem mi istiyorum?"
        </h1>
        <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-3xl leading-relaxed">
          <strong className="text-emerald-400 font-bold">Kısa ve net cevap: Hayır!</strong> İstediğiniz sistem ne imkansızdır ne de aşırı derecede karmaşıktır. Aksine bu vizyon, modern üretken yapay zeka (LLM) ile modern web yazılım mimarisinin dünyadaki <strong className="text-white underline decoration-indigo-400">en ideal buluşma noktasıdır (Sweet Spot)</strong>.
        </p>
      </div>

      {/* Why it works: Hybrid Architecture Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: What AI does */}
        <div className="bg-white border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Yapay Zekanın (Gemini) Rolü</h3>
              <p className="text-[11px] text-slate-500">Semantik, Yaratıcı & Pedagojik Üretim</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/60">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Yıllık & Günlük Plan: </strong>
                MEB kazanımını ve ders kitabını okuyup 5E modeline göre giriş, keşif ve değerlendirme adımlarını kurgulamak.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/60">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Çift Nüsha & LaTeX Üretimi: </strong>
                Öğretmen için çözüm anahtarları ve yaygın kavram yanılgılarını; öğrenci için boşluk doldurmalı föyü ve derlenebilir LaTeX kodunu üretmek.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/60">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Açık Uçlu Ödev Analizi: </strong>
                Öğrencinin serbest metin veya vaka çözümünü okuyup rubrik kriterlerine göre puanlamak ve yapıcı geri bildirim hazırlamak.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100/60">
              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Mevzuat Taraması & Danışmanlık: </strong>
                Öğretmenin sorusunu (Örn: nöbet muafiyeti, ek ders sınırı) yürürlükteki MEB yönetmelik maddeleriyle eşleştirip dilekçe taslağı çıkarmak.
              </div>
            </li>
          </ul>
        </div>

        {/* Right: What Traditional Software does */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Klasik Yazılımın (Sistemin) Rolü</h3>
              <p className="text-[11px] text-slate-500">Deterministik, Hızlı & Güvenli Mantık</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Ders Saati & Drive Tetikleyicisi: </strong>
                Zil çaldığında (örneğin Pazartesi 08:30) saat kontrolü yaparak ekranın üstünde ilgili dersin Google Drive linkini otomatik göstermek.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Rubrik Hesaplaması & Şeffaf Görüntüleme: </strong>
                Kriter puanlarını toplamak, ağırlıkları çarpmak ve bunu hem öğretmenin hem de öğrencinin ekranına anında yansıtmak.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Kayıt ve Tutanak Defteri: </strong>
                Sosyal kulüp toplantı tutanaklarını, BEP takiplerini ve veli görüşme kartlarını düzenli veri tabanında saklamak ve PDF yazdırmak.
              </div>
            </li>

            <li className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Sıfır Hata & Düşük Maliyet: </strong>
                Gereksiz yere her işlemde yapay zeka çağırmak yerine sadece metin anlama ve üretme gerektiren adımlarda yapay zeka kullanmak.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Visual System Architecture Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span>Öğretmen Asistanı Pro: Uçtan Uca Sistem Mimarisi</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900">1. Girdi Katmanı</div>
              <p className="text-[11px] text-slate-500 mt-1">Ders programı, MEB ders kitapları, idari görevler (Nöbet, Kulüp, Şube).</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-bold text-indigo-950">2. Gemini 3.8 Flash Motoru</div>
              <p className="text-[11px] text-indigo-800 mt-1">5E Yıllık/Günlük plan, LaTeX dizimi, MEB mevzuat taraması, otomatik ödev analizi.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mx-auto mb-2">
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="font-bold text-amber-950">3. Drive & Canlı Zil Senkronu</div>
              <p className="text-[11px] text-amber-800 mt-1">Ders saatinde ilgili klasörün otomatik ekranda belirmesi, PDF / LaTeX çıktıları.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-bold text-emerald-950">4. Çift Taraflı Şeffaf Portal</div>
              <p className="text-[11px] text-emerald-800 mt-1">Öğretmen paneli ve öğrenci portalında anlık rubrik, BEP takibi ve kulüp defteri.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Impact Summary */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-3">
        <h4 className="text-sm font-bold text-amber-300">
          Öğretmenin Hayatında Ne Değişir? (Zaman Tasarrufu Hesabı)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-emerald-400">~6-8 Saat</div>
            <div className="font-semibold text-white mt-1">Haftalık Evrak Tasarrufu</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Yıllık plan, günlük plan ve zümre tutanakları için harcanan zaman sıfıra yaklaşır.</p>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-sky-400">%100 MEB Uyumlu</div>
            <div className="font-semibold text-white mt-1">Mevzuat Güvencesi</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Nöbet muafiyeti, ek ders hesabı ve resmi dilekçeler yürürlükteki kanuna tam dayandırılır.</p>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-purple-400">Şeffaf Pedagoji</div>
            <div className="font-semibold text-white mt-1">Öğrenci & Veli Güveni</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Rubrik puanı ve dönüt anında öğrencinin önünde olur; itirazlar yerini gelişime bırakır.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

# Öğretmen Asistası Pro: Matematik & Özel Ders Portalı Mimarisi

Öğretmen Asistanı Pro uygulamasını bütünüyle **Matematik Branşı** (MEB Ortaokul LGS, Lise TYT/AYT, Olimpiyat) ve profesyonel **Birebir Özel Ders / Koçluk Yönetimi** ihtiyaçlarına göre dönüştüren kapsamlı uygulama ve mimari planı.

---

## Kullanıcı İncelemesi & Kritik Kararlar

> [!IMPORTANT]
> Uygulama hem okul içi MEB matematik öğretmenliğini (ders programı, maarif modeli planları, yazılı senaryoları, zümre ve rubrikler) hem de bağımsız/kurumsal **Birebir Özel Ders Yönetimini** (öğrenci takip kartları, seans takvimi, saat ücreti ve paket bakiyesi, özel soru föyleri, veli gelişim karnesi) kusursuz bir uyumla destekleyecek şekilde genişletilecektir.

- **Onaylanan Odak**: Matematik dersi (LGS, 9-12. sınıf TYT & AYT müfredatı) ve birebir özel ders çalışma modeli.
- **Entegre Edilecek Temel Araçlar**: KaTeX destekli zengin matematik formül & sembol kütüphanesi, interaktif fonksiyon/grafik çizici (parabol, trigonometri, doğrusal fonksiyonlar), adım adım problem çözüm motoru.
- **Özel Ders Modülü Kapsamı**: Birebir seans randevu takvimi, öğrenci kazanım eksik/tamam takip matrisi, seans ücreti & paket ders bakiye takipçisi, 1-tıkla yazdırılabilir veli bilgilendirme föyü ve soru havuzu.

---

## 1. Genel Bakış & Temel Konsept

- **Ne Sağlar**:
  1. **Matematik Öğretmenliği Kokpiti**: Okul içi MEB ders programı, MEB Türkiye Yüzyılı Maarif Modeli matematik kazanımları (Mantık, Kümeler, Fonksiyonlar, Parabol, Trigonometri, Limit-Türev-İntegral, Geometri), KaTeX formüllü ders notları ve yazılı sınav senaryoları.
  2. **Birebir Özel Ders Portalı (Private Tutoring Hub)**:
     - Özel ders öğrencileri için birebir seans takvimi ve randevu yönetimi.
     - Öğrenci bazında hedef belirleme (örn. "AYT Matematik 35+ Net", "LGS %1 Dilim") ve deneme net grafiği.
     - Kazanım ustalık takip tablosu (Öğrenildi, Tekrar Edilecek, Soru Çözülecek).
     - Paket ders ve finansal bakiye yönetimi (Ders başı ücret, 10'luk paket takibi, ödenen/kalan seanslar).
     - Özel ders çalışma kağıdı / soru föyü hazırlayıcı (LaTeX destekli formüller ve çözümlü örnekler).
     - Veliye anlık WhatsApp/PDF formatında paylaşılabilecek **Özel Ders İlerleme & Gelişim Raporu**.
  3. **İnteraktif Matematik Laboratuvarı**:
     - Parametreleri değiştirilebilir grafik çizici ($f(x) = ax^2 + bx + c$, $\sin(x)$, vb.).
     - Hızlı formül & sembol kopyalama paleti (LaTeX çıktıları ile ders notuna aktarma).

- **Hedef Kitle**: MEB okullarında matematik öğretmenliği yapan, aynı zamanda veya bağımsız olarak öğrencilere birebir özel ders veren matematik eğitmenleri ve koçları.

---

## 2. Kullanıcı Deneyimi & Görsel Tasarım

### Ana Kullanıcı Akışları
1. **Özel Ders Öğrencisi Ekleme & Planlama**:
   - Eğitmen "Özel Ders Portalı" sekmesine tıklar.
   - Yeni öğrenci kartı oluşturur (Hedef sınıf, sınav türü, saatlik ücret veya paket bilgisi).
   - Haftalık seans takvimine saat dilimi atar (örn: Salı 18:00 - 19:30).
2. **Kazanım Takibi & Seans Notu Kaydı**:
   - Seans bitiminde işlenen konuyu (örn. *İkinci Dereceden Denklemler & Diskriminant*) işaretler, çözülen soru adedini ve ev ödevini girer.
   - Sistem öğrencinin genel konudaki ustalık yüzdesini ve kalan seans bakiyesini anında günceller.
3. **Veli Bilgilendirme Raporu Oluşturma & Yazdırma**:
   - "Veli Raporu Üret" butonuna tıklandığında, son 4 seansın özeti, ödev durumu, deneme net artışı ve öğretmenin pedagojik notunu içeren profesyonel A4 rapor kartı oluşturulur.
4. **Matematik Ders Notu & Formül Üretimi**:
   - Ders notları sekmesinde KaTeX ile anında render edilen $LaTeX$ formülleri, çözümlü soru basamakları ve öğretmen/öğrenci çalışma föyleri tek tıkla incelenir.

### Görsel Kimlik & Tasarım İlkeleri
- **Renk Paleti**: Matematiksel netlik ve akademik disiplin hissi veren derin lacivert (`#0F172A`), zengin indigo (`#4338CA`), saf beyaz (`#FFFFFF`) ve hafif soğuk gri zemin (`#F8FAFC`). Vurgular için sakin zümrüt yeşili (`#059669`) ve altın sarısı (`#D97706`).
- **Tipografi**: Başlık ve arayüzde modern `Plus Jakarta Sans`, matematiksel ifadeler ve formüllerde KaTeX TeX fontları, kod ve sayısal tablolarda `JetBrains Mono` (`tabular-nums`).
- **Tasarım Disiplini**: Sıfır-hap (zero-pill) kuralı; etiketler sade tipografik ayraçlarla (`·`) sunulur. Kartlar gereksiz iç içe çerçevelerden arındırılmış, ferah 16px/24px padding ve zarif 1px sınırlar ile yapılandırılmıştır.

---

## 3. Temel Ürün Kararları & Tercihler

1. **Özel Ders Modülünün Konumu**:
   - *Seçilen Yaklaşım*: Kenar çubuğuna (Sidebar) doğrudan erişilebilir birinci sınıf bir modül olarak **"Özel Ders & Koçluk Portalı"** (`private_tutoring`) eklenmesi. Ayrıca üst gezinme çubuğunda Okul / Özel Ders hızlı geçiş veya doğrudan filtreleme yapabilme olanağı.
   - *Neden*: Öğretmenin okul programı ile özel derslerini birbirine karıştırmadan, ancak aynı platform üzerinden bütünleşik yönetmesini sağlar.

2. **Matematik Veri Tabanı ve Müfredat Uyumu**:
   - *Seçilen Yaklaşım*: `mockInitialData.ts` içerisindeki tüm ders programını, yıllık planları, yazılı senaryolarını, DYK kurslarını ve ödevleri Biyoloji yerine Lise & LGS Matematik konularına (Fonksiyonlar, Trigonometri, Parabol, Polinomlar, Türev, Çarpanlara Ayırma, Üçgenler) dönüştürmek.
   - *Neden*: Sistemin ilk açılışından itibaren gerçek bir matematik öğretmeninin elindeki gerçek ders programı gibi hissettirmesi.

3. **İnteraktif Grafik & Formül Çizici**:
   - *Seçilen Yaklaşım*: Canvas/SVG tabanlı yerel, hafif, bağımlılık gerektirmeyen matematik grafik motoru ve KaTeX destekli formül kütüphanesi.
   - *Neden*: Harici ağır iframe'lere ihtiyaç duymadan çevrimdışı ve anlık çalışan etkileşimli bir öğrenme ve föy hazırlama deneyimi sunar.

---

## 4. Teknik Mimari & Veri Modeli

### Sistem & Bileşen Mimarisi

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ÖĞRETMEN ASİSTANI PRO                           │
│                   (Matematik & Özel Ders Portalı)                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴──────────────────────────────┐
    ▼                                                              ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       MEB OKUL DERSLERİ MODÜLÜ       │  │    ÖZEL DERS PORTALI (1-1)   │
│  - Matematik Ders Programı (9-12)    │  │  - Birebir Seans Takvimi     │
│  - LGS & YKS Maarif Modeli Planlar   │  │  - Öğrenci Hedef & Net Takibi│
│  - LaTeX Yazılı Sınav Senaryoları    │  │  - Seans Ücret & Paket Hesabı│
│  - MEB DYK Matematik & Olimpiyat     │  │  - Veli Gelişim Raporu       │
└──────────────────┬───────────────────┘  └──────────────┬───────────────┘
                   │                                     │
                   └─────────────────┬───────────────────┘
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      MATEMATİK ÇEKİRDEK ARAÇLARI                       │
│  - KaTeX LaTeX Formül Motoru & Kütüphanesi                             │
│  - İnteraktif Fonksiyon & Grafik Çizici (SVG/Canvas)                   │
│  - Özel Soru Havuzu & Formüllü Çalışma Kağıdı Üretici                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Yeni Veri Yapıları (TypeScript)
- `PrivateStudent`: Birebir özel ders öğrencisi (ad, sınıf, okul, hedef net/hedef okul, veli iletişim, ders başı ücret, kalan seans bakiyesi, toplam alınan ders saati).
- `PrivateLessonSession`: Özel ders seans kaydı (tarih, saat, süre, konu, işlenen soru sayısı, seans notu, ödev, ücret durumu `Ödendi | Beklemede`).
- `PrivateTopicMastery`: Konu bazlı ustalık matrisi (Konu adı, kategori `TYT | AYT | LGS`, anlama seviyesi `%`, çözülen soru adedi, durum).
- `MathFormulaSnippet`: Sık kullanılan LaTeX matematik formülleri (kategori, başlık, latex ifadesi, açıklama).

### Gerçekleştirilecek Dosya Değişiklikleri
1. `src/types/index.ts`: Özel ders öğrencisi, seans kaydı, paket bakiye ve matematik formül tiplerinin eklenmesi.
2. `src/data/mockInitialData.ts`:
   - Varsayılan ders programını, planları ve ödevleri Matematik müfredatına adapte etmek (TYT/AYT & LGS).
   - Gerçekçi özel ders öğrencileri, seans geçmişi, finansal kayıtlar ve konu ustalık verileri eklemek.
3. `src/components/PrivateTutoringTab.tsx`: Birebir özel ders takvimi, öğrenci kartları, seans tamamlama, ücret kaydı ve veli raporlama kartını barındıran tam fonksiyonel yeni sekme.
4. `src/components/MathToolsTab.tsx` / `src/components/LatexFormulaRenderer.tsx`: İnteraktif fonksiyon grafik çizici ve aranabilir LaTeX formül paneli.
5. `src/components/Sidebar.tsx` & `src/App.tsx`: Yeni sekmelerin navigasyona dahil edilmesi, aktif sekme yönlendirmeleri ve state bağlama.
6. `index.html` & `metadata.json`: Uygulama başlığı ve açıklamasının Matematik & Özel Ders odağını yansıtacak biçimde güncellenmesi.

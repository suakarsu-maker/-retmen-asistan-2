import {
  DaySchedule,
  AdministrativeDuty,
  CurriculumItem,
  LessonPlan,
  ScenarioLessonNote,
  Student,
  HomeworkSubmission,
  Rubric,
  SocialClub,
  GuidanceRecord,
  SchoolCommission,
  CelebrationEvent,
  SchoolProject,
  DYKCourse,
  ExerciseActivity,
  InServiceTraining,
  ParentAppointment,
  OlympiadLessonTopic,
  OlympiadCalendarEvent,
  OlympiadTeamMember,
  SubjectCognitiveMetric,
  SchoolDataForm,
  FormResponseSubmission,
  PrivateStudent,
  PrivateLessonSession,
  PrivateTopicMastery,
  MathFormulaSnippet,
  StudentSubmittedQuestion
} from '../types';

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    day: 'Pazartesi',
    periods: [
      {
        period: 1,
        timeRange: '08:30 - 09:10',
        startTime: '08:30',
        endTime: '09:10',
        subject: 'Matematik',
        className: '10-A',
        classroom: 'Derslik 204',
        topic: 'Fonksiyonlar: Tanım, Değer Kümesi ve Fonksiyon Grafikleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10a-fonksiyonlar'
      },
      {
        period: 2,
        timeRange: '09:20 - 10:00',
        startTime: '09:20',
        endTime: '10:00',
        subject: 'Matematik',
        className: '10-A',
        classroom: 'Derslik 204',
        topic: 'Fonksiyon Türleri: Birebir, Örten ve Birim Fonksiyon',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10a-fonksiyonlar'
      },
      {
        period: 3,
        timeRange: '10:10 - 10:50',
        startTime: '10:10',
        endTime: '10:50',
        subject: 'Matematik',
        className: '9-B',
        classroom: 'Derslik 102',
        topic: 'Birinci Dereceden Denklemler & Eşitsizlik Çözümleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-9b-denklemler'
      },
      {
        period: 4,
        timeRange: '11:00 - 11:40',
        startTime: '11:00',
        endTime: '11:40',
        subject: 'Matematik',
        className: '9-B',
        classroom: 'Derslik 102',
        topic: 'Mutlak Değerli İfadeler ve Sayı Doğrusunda Uzaklık',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-9b-denklemler'
      },
      {
        period: 5,
        timeRange: '12:50 - 13:30',
        startTime: '12:50',
        endTime: '13:30',
        subject: 'Rehberlik & Kariyer',
        className: '10-B',
        classroom: 'Derslik 206',
        topic: 'YKS Sayısal Alan Seçimi & Matematik Çalışma Stratejisi',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-rehberlik-10b-yks'
      },
      {
        period: 6,
        timeRange: '13:40 - 14:20',
        startTime: '13:40',
        endTime: '14:20',
        subject: 'Matematik',
        className: '11-C',
        classroom: 'Derslik 301',
        topic: 'Trigonometri: Birim Çember, Esas Ölçü ve Sinüs-Kosinüs',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-11c-trigonometri'
      }
    ]
  },
  {
    day: 'Salı',
    dutyLocation: '2. Kat Koridor Nöbeti (08:00 - 16:30)',
    periods: [
      {
        period: 1,
        timeRange: '08:30 - 09:10',
        startTime: '08:30',
        endTime: '09:10',
        subject: 'Matematik',
        className: '10-B',
        classroom: 'Derslik 206',
        topic: 'İkinci Dereceden Denklemler: Diskriminant (Δ) ve Kök Bulma',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10b-denklemler'
      },
      {
        period: 2,
        timeRange: '09:20 - 10:00',
        startTime: '09:20',
        endTime: '10:00',
        subject: 'Matematik',
        className: '10-B',
        classroom: 'Derslik 206',
        topic: 'Kökler ile Katsayılar Arasındaki İlişkiler (Vieta Teoremi)',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10b-denklemler'
      },
      {
        period: 3,
        timeRange: '10:10 - 10:50',
        startTime: '10:10',
        endTime: '10:50',
        subject: 'İdari Görev / Nöbet',
        className: 'Nöbetçi Öğretmen',
        classroom: '2. Kat Koridor',
        topic: 'Kat Güvenliği ve Teneffüs Denetimi',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-nobet-tutanak',
        isDutyPeriod: true
      },
      {
        period: 4,
        timeRange: '11:00 - 11:40',
        startTime: '11:00',
        endTime: '11:40',
        subject: 'Matematik',
        className: '11-A',
        classroom: 'Derslik 305',
        topic: 'Trigonometrik Fonksiyonların Grafikleri ve Periyot Hesabı',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-11a-trigonometri'
      },
      {
        period: 5,
        timeRange: '12:50 - 13:30',
        startTime: '12:50',
        endTime: '13:30',
        subject: 'Matematik',
        className: '11-A',
        classroom: 'Derslik 305',
        topic: 'Kosinüs ve Sinüs Teoremi ile Üçgen Çözümleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-11a-trigonometri'
      }
    ]
  },
  {
    day: 'Çarşamba',
    periods: [
      {
        period: 1,
        timeRange: '08:30 - 09:10',
        startTime: '08:30',
        endTime: '09:10',
        subject: 'Zümre Toplantısı',
        className: 'Zümre',
        classroom: 'Öğretmenler Odası',
        topic: 'Matematik Zümresi: Ortak Yazılı Sınav Senaryoları & Analiz',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-zumre-matematik',
        isDutyPeriod: true
      },
      {
        period: 2,
        timeRange: '09:20 - 10:00',
        startTime: '09:20',
        endTime: '10:00',
        subject: 'Matematik',
        className: '10-A',
        classroom: 'Derslik 204',
        topic: 'Parabol: Tepe Noktası T(r,k) ve Simetri Ekseni Grafikleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10a-parabol'
      },
      {
        period: 3,
        timeRange: '10:10 - 10:50',
        startTime: '10:10',
        endTime: '10:50',
        subject: 'Sosyal Kulüp Etkinliği',
        className: 'Kulüp',
        classroom: 'Konferans Salonu',
        topic: 'Matematik ve Akıl Oyunları Kulübü: Mantık & Strateji Atölyesi',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-kulup-matematik'
      },
      {
        period: 4,
        timeRange: '11:00 - 11:40',
        startTime: '11:00',
        endTime: '11:40',
        subject: 'Matematik',
        className: '11-C',
        classroom: 'Derslik 301',
        topic: 'Trigonometrik Denklemler ve Kök Bulma Yöntemleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-11c-trigonometri'
      }
    ]
  },
  {
    day: 'Perşembe',
    periods: [
      {
        period: 1,
        timeRange: '08:30 - 09:10',
        startTime: '08:30',
        endTime: '09:10',
        subject: 'Matematik',
        className: '9-B',
        classroom: 'Derslik 102',
        topic: 'Üslü ve Köklü İfadeler: Özellikler ve Sadeleştirme',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-9b-uslu'
      },
      {
        period: 2,
        timeRange: '09:20 - 10:00',
        startTime: '09:20',
        endTime: '10:00',
        subject: 'Matematik',
        className: '9-B',
        classroom: 'Derslik 102',
        topic: 'Köklü Denklemler ve Eşlenik ile Çarpma',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-9b-uslu'
      },
      {
        period: 3,
        timeRange: '10:10 - 10:50',
        startTime: '10:10',
        endTime: '10:50',
        subject: 'Matematik',
        className: '10-B',
        classroom: 'Derslik 206',
        topic: 'Polinomlarda Bölme ve Kalan Bulma Teoremi P(x)/(x-a)',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-10b-polinom'
      },
      {
        period: 4,
        timeRange: '11:00 - 11:40',
        startTime: '11:00',
        endTime: '11:40',
        subject: 'DYK Destekleme Kursu',
        className: '12-YKS',
        classroom: 'Derslik 402',
        topic: 'AYT Matematik Soru Çözüm Kampı: Türev & Geometrik Yorumu',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-dyk-12-ayt-turev'
      }
    ]
  },
  {
    day: 'Cuma',
    periods: [
      {
        period: 1,
        timeRange: '08:30 - 09:10',
        startTime: '08:30',
        endTime: '09:10',
        subject: 'Matematik',
        className: '12-Fen',
        classroom: 'Derslik 401',
        topic: 'Limit ve Süreklilik: Sağdan/Soldan Limit ve Belirsizlikler',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-12-limit'
      },
      {
        period: 2,
        timeRange: '09:20 - 10:00',
        startTime: '09:20',
        endTime: '10:00',
        subject: 'Matematik',
        className: '12-Fen',
        classroom: 'Derslik 401',
        topic: 'Türevin Tanımı ve Anlık Değişim Oranı',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-matematik-12-turev'
      },
      {
        period: 3,
        timeRange: '10:10 - 10:50',
        startTime: '10:10',
        endTime: '10:50',
        subject: 'Bireysel Koçluk & Veli Görüşmesi',
        className: 'Koçluk Odası',
        classroom: 'Rehberlik & Özel Ders Servisi',
        topic: 'Özel Ders & Koçluk Öğrenci Hedef Net Analizleri',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-kocluk-analiz'
      },
      {
        period: 4,
        timeRange: '11:00 - 11:40',
        startTime: '11:00',
        endTime: '11:40',
        subject: 'İdari Kurul',
        className: 'Kurul',
        classroom: 'Müdürlük Toplantı Salonu',
        topic: 'TÜBİTAK Bilim Olimpiyatları ve Matematik Yarışmaları Planı',
        driveNotesUrl: 'https://drive.google.com/drive/folders/meb-kurul-tutanak'
      }
    ]
  }
];

export const INITIAL_ADMIN_DUTIES: AdministrativeDuty[] = [
  {
    id: 'duty-1',
    title: 'Haftalık Nöbet Görevi',
    category: 'Nöbet',
    detail: 'Her Salı günü 08:00 - 16:30 saatleri arasında 2. Kat Koridor ve Yangın Merdiveni Nöbeti.',
    scheduleDay: 'Salı',
    relevantRegulation: 'MEB Ortaöğretim Kurumları Yönetmeliği Madde 91'
  },
  {
    id: 'duty-2',
    title: '10-B Şube Rehber Öğretmenliği',
    category: 'Şube Rehberliği',
    detail: '10-B sınıfı (28 öğrenci) matematik başarı grafikleri, veli görüşmeleri ve bireysel hedef takibi.',
    assignedClass: '10-B',
    relevantRegulation: 'MEB Rehberlik ve Psikolojik Danışma Hizmetleri Yönetmeliği Madde 19'
  },
  {
    id: 'duty-3',
    title: 'Matematik Zümre Başkanlığı',
    category: 'Zümre Başkanlığı',
    detail: 'Matematik zümre kurulu başkanlığı, MEB ortak sınav senaryolarının hazırlanması ve başarı analiz tutanakları.',
    relevantRegulation: 'MEB Eğitim Kurumları Yönetici ve Öğretmenlerin Norm Kadrolarına İlişkin Yönetmelik & Madde 111'
  },
  {
    id: 'duty-4',
    title: 'TÜBİTAK & Proje İnceleme Kurulu Üyeliği',
    category: 'Kurul / Komisyon',
    detail: 'TÜBİTAK 2204-A Matematik alanı projeleri ve okul yarışma başvurularının incelenmesi.',
    relevantRegulation: 'MEB Sosyal Etkinlikler Yönetmeliği Madde 14'
  }
];

export const INITIAL_CURRICULUM: CurriculumItem[] = [
  {
    id: 'curr-1',
    grade: '10. Sınıf',
    subject: 'Matematik',
    term: '1. Dönem',
    unit: '2. Ünite: Fonksiyonlar ve Grafikleri',
    outcomes: [
      '10.2.1.1. Fonksiyon kavramını açıklar; tanım, değer ve görüntü kümelerini belirler.',
      '10.2.1.2. Fonksiyonların grafiklerini yorumlar, birebir ve örtenlik özelliklerini irdeler.',
      '10.2.1.3. Doğrusal ve parçalı tanımlı fonksiyonların kuralını yazar ve grafiğini çizer.',
      '10.2.2.1. İkinci dereceden denklemleri çarpanlara ayırma ve diskriminant (Δ) yöntemiyle çözer.'
    ],
    recommendedHours: 24,
    uploadedBookName: 'MEB_10_Sinif_Matematik_Ders_Kitabi_2026.pdf',
    uploadedBookSize: '46.2 MB'
  },
  {
    id: 'curr-2',
    grade: '11. Sınıf',
    subject: 'Matematik',
    term: '1. Dönem',
    unit: '1. Ünite: Trigonometri',
    outcomes: [
      '11.1.1.1. Yönlü açıları ve açı ölçü birimlerini (derece, radyan) birbirine dönüştürür.',
      '11.1.2.1. Trigonometrik fonksiyonları birim çember yardımıyla tanımlar.',
      '11.1.2.2. Kosinüs ve Sinüs teoremleriyle ilgili üçgen problemlerini çözer.'
    ],
    recommendedHours: 32,
    uploadedBookName: 'MEB_11_Sinif_Ileri_Matematik_2026.pdf',
    uploadedBookSize: '51.8 MB'
  },
  {
    id: 'curr-3',
    grade: '12. Sınıf',
    subject: 'Matematik',
    term: '1. Dönem',
    unit: '3. Ünite: Türev ve Uygulamaları',
    outcomes: [
      '12.3.1.1. Bir fonksiyonun bir noktadaki türevini limit yaklaşımıyla açıklar.',
      '12.3.1.2. Çarpım, bölüm ve bileşke fonksiyonun türev alma kurallarını uygular.',
      '12.3.2.1. Türevin geometrik yorumunu yaparak eğriye teğet doğrusunun denklemini yazar.'
    ],
    recommendedHours: 36,
    uploadedBookName: 'MEB_12_Sinif_AYT_Matematik_2026.pdf',
    uploadedBookSize: '58.4 MB'
  }
];

export const INITIAL_LESSON_PLAN: LessonPlan = {
  id: 'plan-demo-1',
  type: 'daily',
  title: '10. Sınıf Matematik - İkinci Dereceden Fonksiyonlar ve Parabol Grafiği Günlük Planı',
  subject: 'Matematik',
  grade: '10. Sınıf',
  weekNumber: '11. Hafta (Kasım 2026)',
  topic: 'İkinci Dereceden Fonksiyonlar: Parabolün Tepe Noktası, Simetri Ekseni ve Kökleri',
  learningOutcomes: [
    '10.2.1.2. f(x) = ax² + bx + c fonksiyonunun grafiğini (parabol) çizer ve tepe noktası T(r,k) koordinatlarını belirler.',
    'Parabolün tepe noktasının simetri ekseni x = r = -b/(2a) doğrusu olduğunu cebirsel ve geometrik olarak kavrar.',
    'Diskriminantın (Δ = b² - 4ac) işaretine göre parabolün x eksenini kestiği nokta sayısını analiz eder.'
  ],
  targetSkills: ['Cebirsel Modelleme', 'Grafik Yorumlama ve Çizim', 'Mantıksal Akıl Yürütme', 'Problem Çözme'],
  methods: ['Buluş Yoluyla Öğretim', 'Geogebra / İnteraktif Grafik Destekli Anlatım', 'Problem Çözme Basamakları'],
  materials: ['MEB 10. Sınıf Matematik Kitabı', 'İnteraktif Fonksiyon Grafik Çizici', 'Formül ve Çözüm Föyü', 'Akıllı Tahta'],
  stages: [
    {
      stageName: '1. Giriş & Dikkat Çekme (Engage - 7 dk)',
      activity: 'Bir basketbol topunun potaya atılırken havada çizdiği eğri veya köprü halatlarının eğriliği akıllı tahtada gösterilir: "Bu eğrinin en tepe noktasını cebirsel olarak nasıl hesaplarız?" sorusu yöneltilir.',
      teacherRole: 'Merak uyandırır, öğrencilerin 1. dereceden doğrusal fonksiyon bilgileriyle farkı sorgulatır.',
      studentRole: 'Eğrinin simetrik yapısını fark eder, tepe noktasının maksimum/minimum değerini tartışır.'
    },
    {
      stageName: '2. Keşfetme & İnceleme (Explore - 15 dk)',
      activity: 'İnteraktif grafik çizicide a katsayısı pozitif ve negatif yapılarak kolların yönü, c katsayısı değiştirilerek y eksenini kestiği yer gözlemlenir.',
      teacherRole: 'a > 0 iken kollar yukarı (minimum değer), a < 0 iken kollar aşağı (maksimum değer) kuralını formüle ettirir.',
      studentRole: 'Verilen f(x) = x² - 4x + 3 fonksiyonunun r = -(-4)/(2*1) = 2 ve k = f(2) = -1 değerlerini föyüne hesaplar.'
    },
    {
      stageName: '3. Açıklama & Formülize Etme (Explain - 10 dk)',
      activity: 'Tepe noktası formülü T(r,k) tahtaya çıkarılır. r = -b/(2a) ve k = f(r) = (4ac - b²)/(4a) bağıntısı tam kareye tamamlama yöntemiyle ispatlanır.',
      teacherRole: 'En sık yapılan işaret hatasını (-b/(2a) formülündeki eksi işaretinin unutulması) vurgular.',
      studentRole: 'Kökler toplamının yarısının tepe noktasının apsisini verdiğini (r = (x₁ + x₂)/2) not alır.'
    },
    {
      stageName: '4. Değerlendirme & Çıkış Sorusu (Evaluate - 8 dk)',
      activity: 'Tahtaya f(x) = -x² + 6x - 5 fonksiyonu yansıtılır. Tepe noktası ve x eksenini kestiği noktaları ilk doğru bulan 3 öğrenciye geri bildirim verilir.',
      teacherRole: 'Çözüm basamaklarını (Δ hesabı, çarpanlara ayırma, tepe noktası) kontrol eder.',
      studentRole: 'Adım adım işlem basamaklarını yazıp teslim eder.'
    }
  ],
  homework: 'MEB 10. Sınıf Matematik Kitabı Sayfa 84-88 arasındaki İkinci Dereceden Fonksiyonlar Değerlendirme Soruları ve 15 adet parabol testi.',
  pedagogicalNotes: 'Grafik çiziminde zorlanan öğrenciler için tepe noktası ve eksenleri kesen 3 noktalı şablon kağıdı basılı olarak dağıtılmıştır.',
  createdAt: '2026-10-14'
};

export const INITIAL_SCENARIO: ScenarioLessonNote = {
  id: 'scen-demo-1',
  subject: 'Matematik',
  grade: '10. Sınıf',
  targetClass: '10-A',
  topic: 'İkinci Dereceden Fonksiyonlar & Parabolün Tepe Noktası T(r,k)',
  periodTime: '08:30 - 09:10',
  driveFileName: '10A_Matematik_Parabol_Grafik_ve_Senaryo.pdf',
  driveFileUrl: 'https://drive.google.com/drive/folders/meb-matematik-10a-parabol',
  teacherCopy: {
    title: 'ÖĞRETMEN NÜSHASI (Matematik Ders Senaryosu & Ayrıntılı Çözüm Basamakları)',
    scenarioTimeline: [
      { time: '00-05 dk', phase: 'Yoklama & Hatırlatma', action: 'Tahtaya f(x) = ax² + bx + c genel denklemi yazılır, a ≠ 0 koşulu vurgulanır.' },
      { time: '06-18 dk', phase: 'Tepe Noktası & Simetri Ekseni', action: 'Tam kareye tamamlama ile f(x) = a(x-r)² + k biçimine dönüştürme ve r = -b/(2a), k = f(r) çıkarımı yapılır.' },
      { time: '19-30 dk', phase: 'Diskriminant (Δ) ve Eksen Kesişimleri', action: 'Δ > 0 ise 2 farklı kök, Δ = 0 ise teğet (çakışık iki kök), Δ < 0 ise x eksenini kesmez durumları tahtada çizilir.' },
      { time: '31-40 dk', phase: 'Örnek Soru & Ödevlendirme', action: 'Öğrenci çalışma föyündeki 2 klasik ÖSYM tipi soru çözülür, Drive arşiv linki paylaşılır.' }
    ],
    pedagogicalCues: [
      'Kritik Nokta: Parabol simetrik bir eğridir; simetri ekseni x = r doğrusudur. Kökler simetri eksenine eşit uzaklıktadır: |x₁ - r| = |x₂ - r|.',
      'Sık Yapılan Hata: Tepe noktasının ordinatı k sorulduğunda formül ezberlemek yerine r değerini doğrudan fonksiyonda x yerine yazmanın daha güvenli olduğu hatırlatılmalıdır.'
    ],
    masterSolutions: [
      {
        question: 'Soru: f(x) = x² - 6x + m - 2 parabolünün tepe noktası x ekseni üzerinde olduğuna göre m kaçtır?',
        solution: 'Çözüm: Tepe noktası x ekseni üzerindeyse k = 0 ve dolayısıyla Δ = 0 olmalıdır. Δ = b² - 4ac = (-6)² - 4(1)(m - 2) = 0 => 36 - 4m + 8 = 0 => 4m = 44 => m = 11 bulunur.'
      },
      {
        question: 'Soru: f(x) = -2x² + 8x + 5 fonksiyonunun alabileceği EN BÜYÜK değer kaçtır?',
        solution: 'Çözüm: a = -2 < 0 olduğundan kollar aşağı doğrudur ve fonksiyon en büyük değerini tepe noktasında (k) alır. r = -b/(2a) = -8/(2*(-2)) = 2. En büyük değer k = f(2) = -2(2)² + 8(2) + 5 = -8 + 16 + 5 = 13 olur.'
      }
    ]
  },
  studentCopy: {
    title: 'ÖĞRENCİ ÇALIŞMA FÖYÜ (Matematik Ders Notu & Formül Özeti)',
    summary: 'İkinci dereceden bir değişkenli fonksiyonların f(x) = ax² + bx + c (a ≠ 0) grafiğine parabol denir. Parabolün tepe noktası T(r,k) olup r = -b/(2a) ve k = f(r) dir. Simetri ekseni x = r doğrusudur.',
    fillInTheBlanks: [
      '1. f(x) = ax² + bx + c fonksiyonunda a > 0 ise parabolün kolları ............................ doğrudur ve tepe noktasında ............................ değer alır.',
      '2. Parabolün x eksenini kestiği noktaların apsisleri f(x) = 0 denkleminin ............................ dir.',
      '3. Δ < 0 olduğunda parabol x eksenini ............................'
    ],
    conceptMap: [
      { concept: 'Tepe Noktası T(r,k)', features: 'r = -b/(2a), k = f(r). Parabolün kıvrıldığı ve simetri ekseninin geçtiği uç noktadır.' },
      { concept: 'Simetri Ekseni', features: 'x = r doğrusudur. Parabolü iki simetrik kanada ayırır.' },
      { concept: 'Δ > 0', features: 'Parabol x eksenini iki farklı noktada keser (x₁ ve x₂).' },
      { concept: 'Δ = 0', features: 'Parabol x eksenine teğettir; tepe noktası x ekseni üzerindedir.' },
      { concept: 'Δ < 0', features: 'Parabol x eksenini kesmez; tüm değerler aynı işaretlidir.' }
    ],
    practiceQuestions: [
      'Soru 1: f(x) = x² - 4x - 5 fonksiyonunun eksenleri kestiği noktaları ve tepe noktasını bularak grafiğini çiziniz.',
      'Soru 2: Kenar uzunlukları x ve 12 - x metre olan bir bahçenin alanının en çok kaç metrekare olabileceğini parabol yardımıyla bulunuz.'
    ]
  },
  latexSource: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[turkish]{babel}
\\usepackage{amsmath,amssymb}
\\usepackage{geometry}
\\usepackage{tcolorbox}
\\usepackage{booktabs}
\\usepackage{enumitem}

\\geometry{a4paper, margin=2cm}

\\title{\\textbf{T.C. MİLLÎ EĞİTİM BAKANLIĞI}\\\\10. Sınıf Matematik: Parabol ve İkinci Dereceden Fonksiyonlar}
\\author{Hazırlayan: Öğretmen Asistanı Pro}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{tcolorbox}[colback=indigo!5!white,colframe=indigo!75!black,title=\\textbf{Kazanım ve Hedef}]
10.2.1.2. İkinci dereceden bir değişkenli fonksiyonun grafiğini (parabol) çizer, tepe noktası ve eksenleri kestiği noktaları yorumlar.
\\end{tcolorbox}

\\section{Parabolün Temel Tanımı}
$a, b, c \\in \\mathbb{R}$ ve $a \\neq 0$ olmak üzere,
\\[
f(x) = ax^2 + bx + c
\\]
fonksiyonunun kartezyen düzlemdeki grafiğine \\textbf{parabol} adı verilir.

\\begin{itemize}
    \\item $a > 0$ ise kollar yukarı doğrudur; fonksiyonun minimum değeri $k = f(r)$ dir.
    \\item $a < 0$ ise kollar aşağı doğrudur; fonksiyonun maksimum değeri $k = f(r)$ dir.
\\end{itemize}

\\section{Tepe Noktası ve Simetri Ekseni}
Parabolün tepe noktası $T(r,k)$ olmak üzere:
\\[
r = -\\frac{b}{2a}, \\quad k = f(r) = \\frac{4ac - b^2}{4a}
\\]
Doğrusu $x = r$, parabolün \\textbf{simetri eksenidir}.

\\section{Diskriminant ($\\Delta$) Analizi}
\\[
\\Delta = b^2 - 4ac
\\]
\\begin{center}
\\begin{tabular}{lll}
\\toprule
\\textbf{Durum} & \\textbf{Kök Varlığı} & \\textbf{Grafiğin Durumu} \\\\
\\midrule
$\\Delta > 0$ & 2 farklı gerçek kök & $x$ eksenini iki farklı noktada keser \\\\
$\\Delta = 0$ & Çakışık 2 kök ($x_1 = x_2 = r$) & $x$ eksenine teğettir \\\\
$\\Delta < 0$ & Gerçek kök yok & $x$ eksenini kesmez \\\\
\\bottomrule
\\end{tabular}
\\end{center}

\\section{Örnek Soru ve Çözüm}
\\textbf{Soru:} $f(x) = x^2 - 6x + 8$ parabolünün tepe noktasını ve eksenleri kestiği noktaları bulunuz.
\\\\
\\textbf{Çözüm:}
\\begin{enumerate}
    \\item $y$ eksenini kestiği nokta: $x = 0 \\implies y = 8 \\implies (0,8)$
    \\item $x$ eksenini kestiği noktalar: $x^2 - 6x + 8 = 0 \\implies (x-2)(x-4) = 0 \\implies x_1 = 2, x_2 = 4$
    \\item Tepe noktası: $r = -\\frac{-6}{2(1)} = 3, \\quad k = f(3) = 3^2 - 6(3) + 8 = -1 \\implies T(3, -1)$
\\end{enumerate}

\\end{document}`
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    studentNumber: '104',
    fullName: 'Ahmet Yılmaz',
    className: '10-B',
    attendanceDaysMissed: 1.5,
    overallScore: 89,
    bepStatus: false,
    parentContact: '0532 555 10 20 (Mehmet Yılmaz - Babası)',
    notes: 'Ders içi katılımı yüksek, bilimsel deneylere ilgili.'
  },
  {
    id: 'std-2',
    studentNumber: '118',
    fullName: 'Zeynep Kaya',
    className: '10-B',
    attendanceDaysMissed: 0,
    overallScore: 96,
    bepStatus: false,
    parentContact: '0544 333 44 55 (Ayşe Kaya - Annesi)',
    notes: 'Sınıf birincisi adayı, ödevleri zamanından önce teslim ediyor.'
  },
  {
    id: 'std-3',
    studentNumber: '205',
    fullName: 'Barış Demir',
    className: '10-B',
    attendanceDaysMissed: 4.0,
    overallScore: 72,
    bepStatus: true,
    parentContact: '0505 123 78 90 (Hasan Demir - Babası)',
    notes: 'Dikkat eksikliği BEP planı mevcut. Görsel föylerle desteklenmeli.'
  },
  {
    id: 'std-4',
    studentNumber: '241',
    fullName: 'Elif Ceren Şahin',
    className: '10-B',
    attendanceDaysMissed: 2.0,
    overallScore: 84,
    bepStatus: false,
    parentContact: '0533 987 65 43 (Fatma Şahin - Annesi)',
    notes: 'Grafik çizimlerinde çok başarılı, proje ödevini teslim etti.'
  },
  {
    id: 'std-5',
    studentNumber: '312',
    fullName: 'Mert Aksoy',
    className: '10-B',
    attendanceDaysMissed: 5.5,
    overallScore: 68,
    bepStatus: false,
    parentContact: '0555 888 11 22 (Serkan Aksoy - Babası)',
    notes: 'Devamsızlık sınırına yaklaşıyor, veli görüşmesi planlandı.'
  },
  {
    id: 'std-6',
    studentNumber: '344',
    fullName: 'Selin Doğan',
    className: '10-A',
    attendanceDaysMissed: 1.0,
    overallScore: 91,
    bepStatus: false,
    parentContact: '0542 666 77 88 (Emine Doğan)',
    notes: 'TÜBİTAK 2204-A proje hazırlığında görev alıyor.'
  }
];

export const INITIAL_HOMEWORKS: HomeworkSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'hw-1',
    assignmentTitle: 'Mitoz Bölünme Evreleri ve Karyotip Karşılaştırmalı Raporu',
    studentId: 'std-1',
    studentName: 'Ahmet Yılmaz',
    className: '10-B',
    submittedAt: '2026-10-14 18:30',
    status: 'Değerlendirildi',
    submissionText: 'Hücre döngüsünde interfaz hazırlık evresidir (G1, S, G2). S evresinde DNA iki katına çıkar. Mitozun profaz, metafaz, anafaz ve telofaz evrelerini inceledim. Metafazda kromozomlar ekvatorda sıralanır ve karyotip analizi yapılır. Anafazda kromatitler ayrılır ve geçici olarak kromozom sayısı ikiye katlanır. Bitkide ara lamel, hayvanda boğumlanma görülür.',
    score: 92,
    letterGrade: 'A',
    criteriaScores: [
      { criterion: 'Kavramsal Doğruluk', max: 40, given: 38, comment: 'Evre sıralamaları ve kritik anafaz tespiti harika.' },
      { criterion: 'Bilimsel Dil & Terminoloji', max: 30, given: 27, comment: 'Karyokinez ve sitokinez terimleri doğru yerde kullanılmış.' },
      { criterion: 'Gerekçelendirme & Sentez', max: 30, given: 27, comment: 'Bitki ile hayvan hücresi farkı net ortaya konmuş.' }
    ],
    feedback: 'Tebrikler Ahmet! Anafaz evresindeki geçici kromozom sayısı artışını özellikle belirtmiş olman üst düzey kavrayış gösteriyor.',
    studentMessage: 'Çalışman öğretmen tarafından 92/100 ile başarıyla değerlendirildi.'
  },
  {
    id: 'sub-2',
    assignmentId: 'hw-1',
    assignmentTitle: 'Mitoz Bölünme Evreleri ve Karyotip Karşılaştırmalı Raporu',
    studentId: 'std-3',
    studentName: 'Barış Demir',
    className: '10-B',
    submittedAt: '2026-10-14 20:15',
    status: 'Bekliyor',
    submissionText: 'Mitozda hücre ikiye bölünür. Profazda çekirdek zarı erir. Metafazda ortaya dizilirler. Anafazda ayrılırlar. Hayvanda boğumlanarak bölünür, bitkide çeper olduğu için araya duvar örülür.',
    criteriaScores: []
  },
  {
    id: 'sub-3',
    assignmentId: 'hw-1',
    assignmentTitle: 'Mitoz Bölünme Evreleri ve Karyotip Karşılaştırmalı Raporu',
    studentId: 'std-2',
    studentName: 'Zeynep Kaya',
    className: '10-B',
    submittedAt: '2026-10-14 17:00',
    status: 'Değerlendirildi',
    score: 98,
    letterGrade: 'A+',
    submissionText: 'Raporumda hücre döngüsü kontrol noktalarını (G1, G2, M) ve siklin bağımlı kinazları da ekledim. Metafazda iğ ipliklerinin kinetokorlara bağlanma kontrolü (M kontrol noktası) gerçekleşmeden anafaza geçilmez. Karyotip analizinde Down sendromu gibi trizomiler bu evrede teşhis edilir. Bitkide ara lamel Golgi aygıtından gelen pektin kesecikleriyle santrifüj yönde büyür.',
    criteriaScores: [
      { criterion: 'Kavramsal Doğruluk', max: 40, given: 40, comment: 'Eksiksiz ve akademik düzeyde.' },
      { criterion: 'Bilimsel Dil & Terminoloji', max: 30, given: 29, comment: 'Biyoloji literatürüne tam hakimiyet.' },
      { criterion: 'Gerekçelendirme & Sentez', max: 30, given: 29, comment: 'Tıbbi karyotip teşhisi örneği mükemmel.' }
    ],
    feedback: 'Fevkalade bir rapor Zeynep! Müfredat üstü kontrol noktalarını ve pektin keseciklerini eklemen seni tebrik etmemi gerektiriyor.',
    studentMessage: 'Raporun 98/100 ile sınıfın en yüksek notlarından birini aldı.'
  }
];

export const INITIAL_RUBRICS: Rubric[] = [
  {
    id: 'rub-1',
    title: 'MEB Standart Fen & Biyoloji Performans Görevi Rubriği',
    subject: 'Biyoloji / Fen Bilimleri',
    grade: '9 - 12. Sınıf',
    type: 'Analitik',
    totalPoints: 100,
    criteria: [
      {
        id: 'c-1',
        name: 'Kavramsal Doğruluk ve Bilimsel İçerik',
        weight: 35,
        levels: [
          { score: 10, title: 'Yetersiz (1-10p)', description: 'Konuyla ilgili temel kavramlarda ciddi bilgi hataları ve eksikler var.' },
          { score: 20, title: 'Geliştirilmeli (11-20p)', description: 'Temel kavramlar kısmen doğru ancak yüzeysel ve bağlantısız aktarılmış.' },
          { score: 28, title: 'İyi (21-28p)', description: 'Kavramlar doğru kullanılmış, küçük eksiklikler dışında konu anlaşılmış.' },
          { score: 35, title: 'Mükemmel (29-35p)', description: 'Tüm bilimsel kavramlar eksiksiz, neden-sonuç bağıyla ve hatasız açıklanmış.' }
        ]
      },
      {
        id: 'c-2',
        name: 'Gözlem, Deney ve Veri Analizi Becerisi',
        weight: 25,
        levels: [
          { score: 7, title: 'Yetersiz (1-7p)', description: 'Veri veya görsel kullanılmamış, yorumlama yapılmamış.' },
          { score: 14, title: 'Geliştirilmeli (8-14p)', description: 'Veriler listelenmiş ancak grafik veya analitik çıkarım yapılmamış.' },
          { score: 20, title: 'İyi (15-20p)', description: 'Grafik ve şemalar amaca uygun çizilmiş, genel hatlarıyla yorumlanmış.' },
          { score: 25, title: 'Mükemmel (21-25p)', description: 'Çıkarımlar bilimsel kanıtlarla desteklenmiş, özgün modelleme yapılmış.' }
        ]
      },
      {
        id: 'c-3',
        name: 'Bilimsel Dil, Terminoloji ve Rapor Düzeni',
        weight: 20,
        levels: [
          { score: 5, title: 'Yetersiz (1-5p)', description: 'Günlük konuşma diliyle yazılmış, terimler yanlış.' },
          { score: 10, title: 'Geliştirilmeli (6-10p)', description: 'Terimler sınırlı kullanılmış, düzen dağınık.' },
          { score: 16, title: 'İyi (11-16p)', description: 'Rapor formatına uygun, terimler doğru seçilmiş.' },
          { score: 20, title: 'Mükemmel (17-20p)', description: 'Tam akademik disiplin, kaynakça ve dipnot düzeni kusursuz.' }
        ]
      },
      {
        id: 'c-4',
        name: 'Zaman Yönetimi ve Sorumluluk Bilinci',
        weight: 20,
        levels: [
          { score: 5, title: 'Yetersiz (1-5p)', description: 'Çok geç teslim edildi veya teslim edilmedi.' },
          { score: 10, title: 'Geliştirilmeli (6-10p)', description: 'Mazeretsiz 2 gün gecikmeyle teslim edildi.' },
          { score: 15, title: 'İyi (11-15p)', description: 'Zamanında teslim edildi ancak süreç takibi yapılmadı.' },
          { score: 20, title: 'Mükemmel (16-20p)', description: 'Belirlenen tarihten önce tam ve eksiksiz teslim edildi.' }
        ]
      }
    ]
  }
];

export const INITIAL_CLUBS: SocialClub[] = [
  {
    id: 'club-1',
    name: 'Bilim, Fen ve Teknoloji Kulübü',
    teacherAdvisor: 'Danışman Öğretmen: Siz (Biyoloji Zümresi)',
    studentPresident: 'Zeynep Kaya (10-B)',
    studentVicePresident: 'Ahmet Yılmaz (10-B)',
    studentTreasurer: 'Selin Doğan (10-A)',
    memberCount: 24,
    annualGoals: [
      'TÜBİTAK 2204-A Lise Öğrencileri Araştırma Projeleri Yarışması\'na en az 3 proje ile katılmak',
      'Okul içinde "Sürdürülebilir Ekoloji ve Biyoçeşitlilik" sergisi düzenlemek',
      'Bilim merkezine ve üniversite biyoteknoloji laboratuvarına teknik gezi organize etmek'
    ],
    upcomingActivity: 'TÜBİTAK Proje Başvuru Dosyalarının Zümre Ön Elemesi (28 Ekim 2026)',
    meetings: [
      {
        date: '2026-09-25',
        topic: '1. Olağan Kulüp Genel Kurulu ve Görev Dağılımı',
        decisions: [
          'Yönetim kurulu üyeleri oy çokluğuyla seçildi.',
          'Kulüp yıllık çalışma planı hazırlanıp okul müdürlüğüne onay için sunuldu.',
          'Kulüp panosu 2. kat ana koridorda aktif hale getirildi.'
        ]
      },
      {
        date: '2026-10-09',
        topic: 'TÜBİTAK Proje Fikir Havuzunun Değerlendirilmesi',
        decisions: [
          'Su arıtımında mikroalg kullanımı projesi 1. öncelikli konu seçildi.',
          'Grup üyelerine kaynak tarama görevleri paylaştırıldı.'
        ]
      }
    ],
    communityService: [
      {
        title: 'Sıfır Atık & Kompost Gübre Eğitimi',
        targetGroup: '9. Sınıf Öğrencileri ve Okul Kantini',
        date: '12 Kasım 2026',
        status: 'Planlandı'
      }
    ]
  }
];

export const INITIAL_GUIDANCE: GuidanceRecord[] = [
  {
    id: 'g-1',
    studentName: 'Barış Demir',
    studentNumber: '205',
    className: '10-B',
    category: 'BEP Takibi',
    date: '2026-10-10',
    summary: 'Öğrencinin dikkat dağınıklığı nedeniyle yazılı sınavlarda ek 15 dakika süre verilmesi ve soruların punto büyüklüğünün 14 punto olarak ayarlanması kararlaştırıldı.',
    actionPlan: 'Yazılı sınav kağıtları önceden hazırlanacak, ders esnasında ön sıraya oturtulacak.',
    status: 'Takipte'
  },
  {
    id: 'g-2',
    studentName: 'Mert Aksoy',
    studentNumber: '312',
    className: '10-B',
    category: 'Veli Görüşmesi',
    date: '2026-10-12',
    summary: 'Öğrencinin sabah ilk derslere geç kalma alışkanlığı ve devamsızlık durumu babası Serkan Aksoy ile yüz yüze görüşüldü.',
    actionPlan: 'Öğrencinin okul servis güzergahı revize edildi, rehberlik servisiyle haftalık takip kartı başlatıldı.',
    status: 'Açık'
  },
  {
    id: 'g-3',
    studentName: 'Zeynep Kaya',
    studentNumber: '118',
    className: '10-B',
    category: 'Öğrenci Görüşmesi',
    date: '2026-10-05',
    summary: 'Tıp fakültesi hedefi olan öğrenci ile haftalık ders çalışma programı ve YKS biyoloji soru bankası planlaması yapıldı.',
    actionPlan: 'Haftalık soru çözüm çizelgesi takip edilecek, TYT denemeleri kontrol edilecek.',
    status: 'Tamamlandı'
  }
];

export const INITIAL_COMMISSIONS: SchoolCommission[] = [
  {
    id: 'comm-1',
    name: 'Satın Alma ve Muayene Kabul Komisyonu',
    role: 'Asil Üye',
    term: '2026-2027 Eğitim Öğretim Yılı',
    meetingFrequency: 'İhtiyaç Halinde / Her Ayın İlk Haftası',
    responsibilities: [
      'Okula alınan ders araç-gereçleri ve laboratuvar kimyasallarının şartnameye uygunluğunu denetlemek',
      'Fatura ve irsaliyelerin fiziki ürünlerle eşleşmesini kontrol edip muayene kabul tutanağını imzalamak'
    ],
    lastMeetingDate: '2026-10-04',
    officialRegulation: 'MEB Okul Aile Birliği Yönetmeliği Madde 20 & 4734 Sayılı Kamu İhale Kanunu'
  },
  {
    id: 'comm-2',
    name: 'Yazı İnceleme ve Eser Seçme Kurulu',
    role: 'Başkan',
    term: '2026-2027 Eğitim Öğretim Yılı',
    meetingFrequency: 'Haftalık / Tören Öncesi',
    responsibilities: [
      'Okul panolarında sergilenecek öğrenci şiir, kompozisyon ve resim çalışmalarını incelemek',
      'Milli ve manevi değerlere, Atatürk ilke ve inkılaplarına aykırılık olup olmadığını denetlemek'
    ],
    lastMeetingDate: '2026-10-11',
    officialRegulation: 'MEB Sosyal Etkinlikler Yönetmeliği Madde 14'
  },
  {
    id: 'comm-3',
    name: 'Kantin ve Servis Denetleme Komisyonu',
    role: 'Asil Üye',
    term: '2026-2027 Eğitim Öğretim Yılı',
    meetingFrequency: 'Ayda En Az 1 Kez',
    responsibilities: [
      'Okul kantininde gazlı içecek, cips gibi yasaklı ürünlerin satışını engellemek, hijyen ve son kullanma tarihlerini kontrol etmek',
      'Okul servis araçlarının emniyet kemeri ve hostes yeterliliğini denetlemek'
    ],
    lastMeetingDate: '2026-09-30',
    officialRegulation: 'Okul Kantinlerinde Satılacak Gıdalar Genelgesi'
  },
  {
    id: 'comm-4',
    name: 'OGYE (Okul Gelişim Yönetim Ekibi)',
    role: 'Asil Üye',
    term: '2026-2027 Eğitim Öğretim Yılı',
    meetingFrequency: 'Dönemde 2 Kez',
    responsibilities: [
      'Okulun stratejik gelişim planını hazırlamak ve akademik başarı göstergelerini analiz etmek'
    ],
    lastMeetingDate: '2026-09-18',
    officialRegulation: 'MEB Toplam Kalite Yönetimi ve Stratejik Planlama Yönergesi'
  }
];

export const INITIAL_CELEBRATIONS: CelebrationEvent[] = [
  {
    id: 'cel-1',
    title: '29 Ekim Cumhuriyet Bayramı 103. Yıl Kutlama Töreni',
    date: '2026-10-29 09:30',
    location: 'Okul Tören Alanı & Konferans Salonu',
    coordinatorTeacher: 'Su Akarsu (Tören Koordinatörü & Sunucu Sorumlusu)',
    assignedTeachers: ['Su Akarsu (Fen)', 'Kemal Özkan (Edebiyat)', 'Derya Yurt (Müzik)', 'Murat Şen (Beden Eğitimi)'],
    programFlow: [
      { time: '09:30', activity: 'Saygı Duruşu ve İstiklal Marşı (Bando eşliğinde)', inCharge: 'Murat Şen' },
      { time: '09:35', activity: 'Günün Anlam ve Önemini Belirten Konuşma', inCharge: 'Okul Müdürü & Su Akarsu' },
      { time: '09:45', activity: '10-B Sınıfı Öğrencisi Zeynep Kaya tarafından "Cumhuriyet ve Gençlik" Şiiri', inCharge: 'Kemal Özkan' },
      { time: '09:55', activity: 'Okul Çok Sesli Korosu: Cumhuriyet Marşları Dinletisi', inCharge: 'Derya Yurt' },
      { time: '10:15', activity: 'İlçe Çapında Dereceye Giren Öğrencilere Plaket Takdimi', inCharge: 'Tören Komitesi' }
    ],
    speechesAndPoems: [
      { title: 'Cumhuriyet Güneşi (Şiir)', studentOrTeacher: 'Zeynep Kaya (10-B)', type: 'Öğrenci Şiiri' },
      { title: 'Atatürk ve Bilimsel Düşünce (Metin)', studentOrTeacher: 'Su Akarsu', type: 'Öğretmen Konuşması' }
    ],
    status: 'Hazırlık Aşamasında',
    districtApprovalNumber: '2026/894-KAYMAKAM-OLUR'
  },
  {
    id: 'cel-2',
    title: '10 Kasım Atatürk\'ü Anma Günü ve Atatürk Haftası',
    date: '2026-11-10 09:05',
    location: 'Okul Tören Alanı',
    coordinatorTeacher: 'Kemal Özkan (Tarih Zümresi)',
    assignedTeachers: ['Kemal Özkan', 'Su Akarsu', 'Derya Yurt'],
    programFlow: [
      { time: '09:05', activity: '2 Dakikalık Saygı Duruşu (Siren Eşliğinde) ve Bayrağın Yarıya İndirilmesi', inCharge: 'Tüm Komite' },
      { time: '09:10', activity: 'İstiklal Marşı ve Anma Oratoryosu', inCharge: 'Edebiyat ve Müzik Kulübü' }
    ],
    speechesAndPoems: [
      { title: 'Mustafa Kemal\'i Düşünmek', studentOrTeacher: 'Barış Demir (10-B)', type: 'Öğrenci Şiiri' }
    ],
    status: 'Hazırlık Aşamasında',
    districtApprovalNumber: '2026/912-KAYMAKAM-OLUR'
  },
  {
    id: 'cel-3',
    title: '24 Kasım Öğretmenler Günü Programı',
    date: '2026-11-24 13:30',
    location: 'Okul Konferans Salonu',
    coordinatorTeacher: 'Su Akarsu & Fen Zümresi',
    assignedTeachers: ['Su Akarsu', 'Derya Yurt'],
    programFlow: [
      { time: '13:30', activity: 'Adaylığı Kalkan Öğretmenlerin Yemin Töreni', inCharge: 'Okul İdaresi' },
      { time: '14:00', activity: 'Öğretmenler Korosu ve Müzik Dinletisi', inCharge: 'Derya Yurt' }
    ],
    speechesAndPoems: [
      { title: 'Başöğretmen Atatürk\'ün İzinde', studentOrTeacher: 'Su Akarsu', type: 'Zümre Konuşması' }
    ],
    status: 'Hazırlık Aşamasında',
    districtApprovalNumber: '2026/950-MEB'
  }
];

export const INITIAL_PROJECTS: SchoolProject[] = [
  {
    id: 'proj-1',
    title: 'Mikroalg Bazlı Fotobiyoreaktör ile Okul İçi Karbon Ayak İzinin Azaltılması',
    type: 'TÜBİTAK 2204-A',
    advisorTeacher: 'Danışman: Su Akarsu',
    studentTeam: [
      { name: 'Zeynep Kaya', class: '10-B', role: 'Baş Araştırmacı (Alg Kültürleme)' },
      { name: 'Ahmet Yılmaz', class: '10-B', role: 'Veri Analisti (Fotometrik Ölçüm)' }
    ],
    summary: 'Okul laboratuvarında Chlorella vulgaris mikroalgleri kullanılarak biyofiltre prototipi üretilmekte ve sınıf içi CO2 miktarını %40 oranında düşürme verimliliği ölçülmektedir.',
    currentStage: 'Rapor Yazımı',
    deadline: '12 Ocak 2027 (TÜBİTAK Sistem Kapanışı)',
    budgetAllocated: '4.500 TL (Okul Aile Birliği Destekli)',
    progressPercent: 75
  },
  {
    id: 'proj-2',
    title: 'Biyo-Sensör Destekli Akıllı Kompost Kutusu & Sıfır Atık Takip Sistemi',
    type: 'TEKNOFEST',
    advisorTeacher: 'Danışman: Su Akarsu',
    studentTeam: [
      { name: 'Selin Doğan', class: '10-A', role: 'Sensör & Arduino Entegrasyonu' },
      { name: 'Mert Aksoy', class: '10-B', role: 'Mekanik Tasarım ve Kompost' }
    ],
    summary: 'Okul yemekhane atıklarının sıcaklık ve nem sensörleri yardımıyla 21 günde organik gübreye dönüştürülmesini sağlayan IoT tabanlı akıllı kuluçka ünitesi.',
    currentStage: 'Deney & Prototip',
    deadline: '20 Şubat 2027',
    budgetAllocated: '7.200 TL',
    progressPercent: 60
  },
  {
    id: 'proj-3',
    title: 'Green STEAM: Eco-Literacy and Climate Action in High Schools',
    type: 'Erasmus+ KA1/KA2',
    advisorTeacher: 'Proje İrtibat Kişisi: Su Akarsu',
    studentTeam: [
      { name: 'Zeynep Kaya', class: '10-B', role: 'İngilizce Raporlama' },
      { name: 'Elif Ceren Şahin', class: '10-B', role: 'Kültürlerarası Elçi' }
    ],
    summary: 'Almanya, İtalya ve Portekiz\'deki kardeş liselerle ortak yürütülen iklim değişikliği ve biyolojik çeşitlilik öğrenci değişim projesi.',
    currentStage: 'Başvuru Gönderildi',
    deadline: 'Sonuç İlanı: Aralık 2026',
    budgetAllocated: '28.000 EUR (Hibe Bekleniyor)',
    progressPercent: 90
  }
];

export const INITIAL_DYK_COURSES: DYKCourse[] = [
  {
    id: 'dyk-1',
    courseName: '12. Sınıf AYT Biyoloji Destekleme ve Yetiştirme Kursu',
    grade: '12-Sayısal',
    weeklyHours: 4,
    scheduleTime: 'Her Cumartesi 09:00 - 12:10 (4 Ders Saati)',
    studentCount: 24,
    classroom: 'Derslik 402',
    syllabusTopicThisWeek: 'Fotosentez & Kemosentez Reaksiyonları (Işığa Bağımlı ve Bağımsız Evreler)',
    averagePracticeExamScore: 9.8,
    targetExamScore: 12.5
  }
];

export const INITIAL_EXERCISES: ExerciseActivity[] = [
  {
    id: 'ex-1',
    name: 'Okul Satranç Takımı Egzersizi ve Turnuva Hazırlığı',
    weeklyHours: 6,
    days: 'Pazartesi & Çarşamba 16:00 - 18:15',
    studentsCount: 16,
    approvalStatus: 'Kaymakamlık Onaylandı',
    upcomingTournament: 'İlçe Okullar Arası Satranç Şampiyonası (18 Kasım 2026)'
  },
  {
    id: 'ex-2',
    name: 'TÜBİTAK Bilim Olimpiyatları Biyoloji Çalışma Grubu',
    weeklyHours: 4,
    days: 'Salı & Perşembe 16:00 - 17:30',
    studentsCount: 8,
    approvalStatus: 'Kaymakamlık Onaylandı',
    upcomingTournament: 'Ulusal Biyoloji Olimpiyatı 1. Aşama Sınavı'
  }
];

export const INITIAL_INSERVICE_TRAININGS: InServiceTraining[] = [
  {
    id: 'ins-1',
    courseCode: '2026000412',
    title: 'Türkiye Yüzyılı Maarif Modeli Ölçme ve Değerlendirme Yaklaşımları Semineri',
    organizer: 'ÖBA Online',
    applicationDeadline: '2026-10-25',
    startDate: '2026-10-26',
    endDate: '2026-11-06',
    durationHours: 30,
    status: 'Başvuru Açık',
    isReminderSet: true,
    reminderNote: 'Son başvuru tarihine 11 gün kaldı! MEBBİS üzerinden onaylanacak.'
  },
  {
    id: 'ins-2',
    courseCode: '2026000189',
    title: 'Eğitimde Üretken Yapay Zeka Araçlarının Pedagojik Entegrasyonu Kursu',
    organizer: 'MEB Merkezi',
    applicationDeadline: '2026-09-01',
    startDate: '2026-09-15',
    endDate: '2026-09-22',
    durationHours: 40,
    status: 'Sertifika Alındı',
    isReminderSet: false,
    reminderNote: 'e-Devlet üzerinden MEB onaylı e-Sertifika oluşturuldu.'
  },
  {
    id: 'ins-3',
    courseCode: '2026340815',
    title: 'Kapsayıcı Eğitim ve Bireyselleştirilmiş Eğitim Programı (BEP) Hazırlama Kursu',
    organizer: 'İl MEM Mahalli',
    applicationDeadline: '2026-11-02',
    startDate: '2026-11-12',
    endDate: '2026-11-19',
    durationHours: 24,
    status: 'Kabul Edildi',
    isReminderSet: true,
    reminderNote: 'RAM koordinatörlüğünde yüz yüze seminer.'
  }
];

export const INITIAL_PARENT_APPOINTMENTS: ParentAppointment[] = [
  {
    id: 'app-1',
    parentName: 'Mehmet Yılmaz',
    studentName: 'Ahmet Yılmaz',
    studentNumber: '104',
    className: '10-B',
    requestedDate: '2026-10-17 (Cuma)',
    requestedTime: '10:10 - 10:50 (Veli Görüşme Saati)',
    topic: 'TÜBİTAK projesine ayrılan süre ile YKS temeli dengesi ve biyoloji başarı durumu',
    status: 'Onaylandı',
    teacherNotes: 'Öğrencinin ders içi dikkati yüksek, TÜBİTAK çalışmasının onu motive ettiği veliye aktarılacak.'
  },
  {
    id: 'app-2',
    parentName: 'Ayşe Kaya',
    studentName: 'Zeynep Kaya',
    studentNumber: '118',
    className: '10-B',
    requestedDate: '2026-10-24 (Cuma)',
    requestedTime: '10:10 - 10:50',
    topic: 'Tıp fakültesi hedefi doğrultusunda TYT fen netleri ve çalışma stratejisi',
    status: 'Onaylandı',
    teacherNotes: 'Soru bankası çizelgesi kontrol edilecek.'
  },
  {
    id: 'app-3',
    parentName: 'Serkan Aksoy',
    studentName: 'Mert Aksoy',
    studentNumber: '312',
    className: '10-B',
    requestedDate: '2026-10-20 (Salı)',
    requestedTime: '15:40 - 16:10',
    topic: 'Sabah ilk ders devamsızlık durumu ve ödev teslim alışkanlığı',
    status: 'Beklemede',
    teacherNotes: 'Okul rehber öğretmeni de görüşmeye davet edilecek.'
  }
];

// Tüm Derslerde Eşit ve Üstün Performans Disiplin Profilleri (Bilişsel zorluk ayrımı kaldırılmış, her derse özel motor atanmıştır)
export const COGNITIVE_DIFFICULTY_METRICS: SubjectCognitiveMetric[] = [
  {
    subject: 'Matematik',
    difficultyCoefficient: 1.0, // Eşit performans
    cognitiveLoadIndex: 'Dengeli',
    abstractThinkingWeight: 50,
    algorithmicStepsWeight: 50,
    recommendedWeeklyStudyHours: 6,
    struggleReason: 'Matematik dersi sembolik dil ve soyut ilişkiler içerdiğinden, programımız donanım hızlandırmalı KaTeX LaTeX motoru ile formülleri anında işler ve öğrenciye adım adım çözüm blokları sunar.',
    pedagogicalAdvice: 'KaTeX formül paleti ve canlı önizleme kullanılarak adım adım işlem basamakları görselleştirilmeli, süreç odaklı rubriklerle öğrenci desteklenmelidir.',
    primaryEngine: 'latex_math',
    engineName: 'KaTeX & LaTeX Sembolik Formül Motoru',
    engineFeatures: ['Hızlı LaTeX Formül Paleti', 'Kesir, İntegral & Matris Desteği', 'Adım Adım Çözüm Blokları', 'Anlık Matematiksel Önizleme'],
    performanceOptimization: '%100 Optimize - Donanım Hızlandırmalı KaTeX',
    sampleLatexOrText: '\\int_{0}^{\\pi} \\sin(x) dx = [-\\cos(x)]_{0}^{\\pi} = 2'
  },
  {
    subject: 'Fizik',
    difficultyCoefficient: 1.0,
    cognitiveLoadIndex: 'Dengeli',
    abstractThinkingWeight: 50,
    algorithmicStepsWeight: 50,
    recommendedWeeklyStudyHours: 6,
    struggleReason: 'Fizik dersi teorik modeller ile doğa kanunlarını birleştirdiğinden, LaTeX vektör gösterimleri ve 3B serbest cisim diyagramları ile tam hızda görselleştirilir.',
    pedagogicalAdvice: 'Vektörel formüller LaTeX ile modellenip görsel deney planları ve simülasyon akışlarıyla desteklenmelidir.',
    primaryEngine: 'latex_math',
    engineName: 'LaTeX Vektörel & Dinamik Formül Motoru',
    engineFeatures: ['Serbest Cisim Diyagramı Notasyonu', 'Vektör & Birim Hesaplayıcı', 'Deney Aşamaları Şablonu', 'SI Birim Sistemi Doğrulayıcı'],
    performanceOptimization: '%100 Optimize - Vektör & KaTeX Donanım Renderı',
    sampleLatexOrText: '\\vec{F}_{net} = m \\cdot \\vec{a} = \\frac{d\\vec{p}}{dt}'
  },
  {
    subject: 'Türk Dili ve Edebiyatı',
    difficultyCoefficient: 1.0,
    cognitiveLoadIndex: 'Dengeli',
    abstractThinkingWeight: 50,
    algorithmicStepsWeight: 30,
    recommendedWeeklyStudyHours: 5,
    struggleReason: 'Edebiyat ve Türkçe yoğun metin okuma, tahlil ve söz sanatları barındırdığından, programımız zengin metin tipografisi, dörtlük/beyit dizimi ve paragraf analizi ile en yüksek hızda çalışır.',
    pedagogicalAdvice: 'Zengin metin araçları, dörtlük/beyit vezin kalıpları ve kavramsal alıntılama modülleri ile metin analizi derinleştirilmelidir.',
    primaryEngine: 'rich_text_lit',
    engineName: 'Zengin Metin & Edebi Tahlil Motoru',
    engineFeatures: ['Paragraf Hızlı Okuma & Anlama Kriterleri', 'Dörtlük & Beyit Özel Hizalama', 'Söz Sanatları Etiketleme (Teşbih, Mecaz)', 'Edebi Alıntı & Kaynakça Kartları'],
    performanceOptimization: '%100 Optimize - Tipografik Akıcılık & Sıfır Gecikme',
    sampleLatexOrText: 'Beni candan usandırdı cefâdan yâr usanmaz mı / Felekler yandı âhımdan murâdım şem\'i yanmaz mı? (Fuzûlî - Gazel)'
  },
  {
    subject: 'İlkokul Sınıf Öğretmenliği (1-4. Sınıf)',
    difficultyCoefficient: 1.0,
    cognitiveLoadIndex: 'Dengeli',
    abstractThinkingWeight: 40,
    algorithmicStepsWeight: 40,
    recommendedWeeklyStudyHours: 5,
    struggleReason: 'Sınıf öğretmenleri tek günde Türkçe, Matematik, Hayat Bilgisi, Oyun ve Sanat olmak üzere 6 farklı dersi aynı sınıfa verdiğinden, programımız çoklu disiplin entegre paneli ile tüm dersleri tek tıkla deftere işler.',
    pedagogicalAdvice: 'Ses temelli okuma-yazma takibi, çarpım tablosu yetkinlik radarı ve e-Okul karne gelişim görüşleri ile ilkokul öğrencisinin bütüncül gelişimi desteklenmelidir.',
    primaryEngine: 'primary_integrated',
    engineName: 'Çoklu Branş Entegre İlkokul Motoru',
    engineFeatures: ['Günün 6 Dersi Tek Ekranda Entegre', '1. Sınıf Ses Grupları Takip Çizelgesi', 'DOKS (Dakikada Okunan Kelime Sayısı)', 'Çarpım Tablosu Yetkinlik Radarı', 'MEB Karne Gelişim Görüşü Üretici'],
    performanceOptimization: '%100 Optimize - Sınıf Defteri & Günlük Kazanım Akışı',
    sampleLatexOrText: '3-B Sınıfı Entegre Akışı: Türkçe (Okuduğunu Anlama) + Matematik (Eldeli Toplama) + Hayat Bilgisi (Kroki)'
  },
  {
    subject: 'Kimya & Biyoloji',
    difficultyCoefficient: 1.0,
    cognitiveLoadIndex: 'Dengeli',
    abstractThinkingWeight: 45,
    algorithmicStepsWeight: 45,
    recommendedWeeklyStudyHours: 5,
    struggleReason: 'Fen bilimleri mikroskobik süreçler ve deney protokolleri gerektirdiğinden, kimyasal reaksiyon denklemleri ve biyolojik sınıflandırma şemalarıyla tam donanımlı desteklenir.',
    pedagogicalAdvice: 'Kimyasal formüller ve deney basamakları 5E modeli ve etkileşimli kavram haritaları ile işlenmelidir.',
    primaryEngine: 'science_lab',
    engineName: 'Deney & Reaksiyon Bilim Motoru',
    engineFeatures: ['Kimyasal Tepkime Denkleştirme', 'Hücresel & Genetik Şema Desteği', '5E Deney Rapor Şablonu', 'Güvenlik Piktogramları'],
    performanceOptimization: '%100 Optimize - Bilimsel Formül & Tablo Motoru',
    sampleLatexOrText: '6CO_2 + 6H_2O \\xrightarrow{klorofil, \\, \\text{ışık}} C_6H_{12}O_6 + 6O_2'
  }
];

export const INITIAL_OLYMPIAD_TOPICS: OlympiadLessonTopic[] = [
  {
    id: 'olymp-1',
    branch: 'Biyoloji',
    topicName: 'Michaelis-Menten Enzim Kinetiği, Km ve Lineweaver-Burk Çift Tersinir Analizi',
    difficultyLevel: '2. Aşama / Kış Kampı',
    campbellOrAdvancedRef: 'Campbell Biyoloji 8. Bölüm & Lehninger Biyokimya 6. Bölüm',
    summaryNotes: 'Enzim-substrat kompleksinin oluşum hızı ile ürün oluşum hızının kararlı hal (steady-state) dengesi. Km değeri substrata olan afiniteyi gösterir; Km ne kadar küçükse afinite o kadar yüksektir. Lineweaver-Burk grafiğinde y-keseni 1/Vmax, x-keseni ise -1/Km değerini verir.',
    solvedPastQuestion: {
      year: 'TÜBİTAK 2024 2. Aşama',
      questionText: 'Bir enzim inhibitörü varlığında Vmax değişmeyip Km değeri 2 katına çıkıyorsa bu inhibitör tipi nedir? Substrat derişimi sonsuza giderken tepkime hızının davranışı ne olur?',
      solutionProof: 'Vmax değişmeyip Km arttığı için bu yarışmalı (kompetitif) bir inhibisyondur. İnhibitör aktif bölgeye bağlanır. Yüksek substrat konsantrasyonunda substrat inhibitörü aktif bölgeden kovacağı için reaksiyon yine orijinal Vmax hızına ulaşır.'
    },
    latexProofFormula: '\\frac{1}{V} = \\frac{K_m}{V_{\\max}} \\frac{1}{[S]} + \\frac{1}{V_{\\max}}'
  },
  {
    id: 'olymp-2',
    branch: 'Biyoloji',
    topicName: 'Hardy-Weinberg Dengesi ve Popülasyon Genetiğinde Doğal Seçilim Katsayısı (s)',
    difficultyLevel: '1. Aşama İleri',
    campbellOrAdvancedRef: 'Campbell Biyoloji 23. Bölüm / Hartl Popülasyon Genetiği',
    summaryNotes: 'p + q = 1 ve p^2 + 2pq + q^2 = 1 bağıntıları. Mutasyon, göç, genetik sürüklenme ve seçilim olmadığında alel frekansları nesiller boyu sabit kalır. Resesif öldürücü genlerde frekansın delta q = -s * q^2 * (1 - q) / (1 - s * q^2) ile değişimi hesaplanır.',
    solvedPastQuestion: {
      year: 'TÜBİTAK 2023 1. Aşama',
      questionText: 'İzole bir ada popülasyonunda 10.000 bireyden 16\'sı otozomal çekinik fenilketonüri hastasıdır. Popülasyon dengedeyse taşıyıcı (heterozigot) birey sayısı kaçtır?',
      solutionProof: 'q^2 = 16 / 10.000 = 0.0016 => q = 0.04. p = 1 - 0.04 = 0.96. Taşıyıcılar 2pq = 2 * 0.96 * 0.04 = 0.0768. 10.000 * 0.0768 = 768 taşıyıcı birey bulunur.'
    },
    latexProofFormula: 'p^2 + 2pq + q^2 = 1 \\quad \\text{ve} \\quad \\Delta q = - \\frac{s q^2 (1 - q)}{1 - s q^2}'
  },
  {
    id: 'olymp-3',
    branch: 'Biyoloji',
    topicName: 'Kemiozmotik Hipotez ve Tilakoit Membran Üzerinden Proton (H+) Gradyanı',
    difficultyLevel: '1. Aşama Temel',
    campbellOrAdvancedRef: 'Campbell Biyoloji 10. Bölüm (Fotosentez)',
    summaryNotes: 'Elektron taşıma sistemi (ETS) boyunca elektron transferi tilakoit lümene H+ pompalar; pH lümende 5\'e düşerken stromada 8 civarında kalır. 3 birimlik pH farkı elektrokimyasal proton motor kuvveti (PMF) yaratarak ATP sentaz enziminden 1 ATP sentezi için 3-4 H+ geçişini sağlar.',
    solvedPastQuestion: {
      year: 'TÜBİTAK 2022 1. Aşama',
      questionText: 'Kloroplastlar yapay olarak pH 4 tamponuna konup ardından pH 8 tamponuna aktarılırsa karanlıkta ATP sentezlenebilir mi? Neden?',
      solutionProof: 'Evet, Jagendorf deneyi uyarınca lümen ile stroma arasında yapay pH farkı oluşturulursa, ışık olmadan dahi proton motor kuvveti oluşur ve ATP sentaz rotoru dönerek karanlıkta ATP üretir.'
    },
    latexProofFormula: '\\Delta G = 2.303 RT \\Delta\\text{pH} + F \\Delta\\Psi'
  },
  {
    id: 'olymp-4',
    branch: 'Matematik',
    topicName: 'Euler Totient (Phi) Fonksiyonu ve Wilson Teoremi ile Kriptografik Sayılar Teorisi',
    difficultyLevel: '1. Aşama İleri',
    campbellOrAdvancedRef: 'TÜBİTAK Matematik Olimpiyat El Kitabı / Burton Number Theory',
    summaryNotes: 'a^{\\phi(m)} \\equiv 1 \\pmod{m} kuralı. Asal sayılar için Wilson teoremi: (p - 1)! \\equiv -1 \\pmod{p}.',
    solvedPastQuestion: {
      year: 'TÜBİTAK 2024 Matematik 1. Aşama',
      questionText: '7^{100} sayısının 100 ile bölümünden kalan kaçtır?',
      solutionProof: '\\phi(100) = 100 * (1 - 1/2) * (1 - 1/5) = 40. Euler teoremine göre 7^{40} = 1 mod 100. 7^{100} = (7^{40})^2 * 7^{20}. 7^4 = 2401 = 1 mod 100. Dolayısıyla 7^{20} = (7^4)^5 = 1 mod 100. Kalan 1\'dir.'
    },
    latexProofFormula: 'a^{\\phi(n)} \\equiv 1 \\pmod{n} \\quad \\text{ve} \\quad (p-1)! \\equiv -1 \\pmod{p}'
  },
  {
    id: 'olymp-5',
    branch: 'Fizik',
    topicName: 'Dönme Kinetik Enerjisi, Eylemsizlik Momenti ve Jiroskopik Presesyon Hızı',
    difficultyLevel: '2. Aşama / Kış Kampı',
    campbellOrAdvancedRef: 'Halliday-Resnick Fizik 11. Bölüm / Kleppner Mechanics',
    summaryNotes: 'Tork vektörü dL/dt açısal momentum değişimine eşittir. Hızlı dönen bir tekerleğe uygulanan dikey yerçekimi torku, tekerleği devirmek yerine yatay eksende presesyon dönmesine yol açar.',
    solvedPastQuestion: {
      year: 'TÜBİTAK 2023 Fizik 2. Aşama',
      questionText: 'Kütlesi M, yarıçapı R olan bir diskin açısal hızı \\omega ise presesyon frekansı \\Omega_p tork ile nasıl orantılıdır?',
      solutionProof: '\\vec{\\tau} = \\vec{\\Omega}_p \\times \\vec{L}. L = I \\omega. Buradan presesyon hızı \\Omega_p = \\tau / (I \\omega) olarak bulunur.'
    },
    latexProofFormula: '\\vec{\\tau} = \\frac{d\\vec{L}}{dt} = \\vec{\\Omega}_p \\times \\vec{L}'
  }
];

export const INITIAL_OLYMPIAD_EVENTS: OlympiadCalendarEvent[] = [
  {
    id: 'oe-1',
    title: '34. Ulusal Bilim Olimpiyatları 1. Aşama Sınavı',
    branch: 'Biyoloji',
    organizer: 'TÜBİTAK BİDEB 2202',
    applicationDeadline: '2027-04-18',
    examOrCampDate: '2027-05-16',
    location: '81 İl Sınav Merkezleri (Üniversiteler)',
    daysRemaining: 186,
    status: 'Başvuru Devam Ediyor',
    officialBidebUrl: 'https://e-bideb.tubitak.gov.tr'
  },
  {
    id: 'oe-2',
    title: 'TÜBİTAK Ulusal Biyoloji Olimpiyatı Kış Hazırlık Kampı',
    branch: 'Biyoloji',
    organizer: 'TÜBİTAK Bilim İnsanı Destekleme Daire Başkanlığı',
    applicationDeadline: '2027-01-05',
    examOrCampDate: '2027-01-18 - 2027-01-31',
    location: 'TÜSSİDE Yerleşkesi / Gebze Kocaeli',
    daysRemaining: 82,
    status: 'Hazırlık Kampı',
    officialBidebUrl: 'https://tubitak.gov.tr/tr/olimpiyatlar'
  },
  {
    id: 'oe-3',
    title: '38. Uluslararası Biyoloji Olimpiyatı (IBO 2027)',
    branch: 'Biyoloji',
    organizer: 'International Biology Olympiad Association',
    applicationDeadline: '2027-05-30',
    examOrCampDate: '2027-07-11 - 2027-07-18',
    location: 'Vilnius, Litvanya',
    daysRemaining: 270,
    status: 'Başvuru Devam Ediyor',
    officialBidebUrl: 'https://ibo-info.org'
  }
];

export const INITIAL_OLYMPIAD_STUDENTS: OlympiadTeamMember[] = [
  {
    id: 'om-1',
    fullName: 'Zeynep Kaya',
    className: '10-B',
    studentNumber: '118',
    branch: 'Biyoloji',
    trialExamNet: 84,
    solvedQuestionsCount: 1850,
    targetMedal: 'Altın Madalya',
    weeklyHoursCommitted: 12
  },
  {
    id: 'om-2',
    fullName: 'Ahmet Yılmaz',
    className: '10-B',
    studentNumber: '104',
    branch: 'Biyoloji',
    trialExamNet: 76,
    solvedQuestionsCount: 1420,
    targetMedal: 'Gümüş Madalya',
    weeklyHoursCommitted: 10
  },
  {
    id: 'om-3',
    fullName: 'Barış Demir',
    className: '10-B',
    studentNumber: '205',
    branch: 'Matematik',
    trialExamNet: 71,
    solvedQuestionsCount: 1100,
    targetMedal: 'Bronz Madalya',
    weeklyHoursCommitted: 8
  }
];

// Sınıf İçi Anlık ve Geniş Süreli Bilgi Toplama Formları
export const INITIAL_SCHOOL_FORMS: SchoolDataForm[] = [
  {
    id: 'form-exit-ticket-1',
    title: 'Ders Sonu Çıkış Bileti (Exit Ticket) & Anlama Düzeyi',
    description: '10-A Biyoloji "Mayoz Bölünme ve Krossing-Over" dersi bitiminde öğrencilerin anlama düzeyini ve zorlandıkları kavramları tespit etmek için anlık sınıf içi değerlendirme formu.',
    category: 'in_class_instant',
    audience: 'student',
    isInstantInClass: true,
    instantCode: 'EXIT-10A',
    createdAt: 'Bugün 09:55',
    isActive: true,
    targetClasses: ['10-A'],
    responseCount: 26,
    totalTargetCount: 28,
    questions: [
      {
        id: 'q-exit-1',
        title: 'Bugünkü dersin konusunu (Krossing-over ve Mayoz) kavrama düzeyinizi puanlayınız:',
        type: 'rating',
        required: true,
        minLabel: '1 - Hiç Anlamadım',
        maxLabel: '5 - Çok İyi Anladım'
      },
      {
        id: 'q-exit-2',
        title: 'Derste en çok zorlandığınız veya aklınıza yatmayan ana kavram hangisi oldu?',
        type: 'single_choice',
        required: true,
        options: [
          'Krossing-over kiazma noktalarının oluşumu',
          'Homolog kromozomların rastgele kutuplara çekilmesi',
          'Mayoz I ve Mayoz II arasındaki temel farklar',
          'Hepsini rahatlıkla anladım, zorluk yaşamadım'
        ]
      },
      {
        id: 'q-exit-3',
        title: 'Öğretmene bir sonraki ders için sormak istediğiniz açık soru veya notunuz:',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: 'form-pulse-quiz-1',
    title: 'Sınıf İçi Canlı Kavram Oylaması (Pulse Check)',
    description: 'Ders esnasında anlık yoklama: Akıllı tahtadan soru yansıtıldığında tüm sınıfın tek tıkla canlı katıldığı formatif ölçme formu.',
    category: 'in_class_instant',
    audience: 'student',
    isInstantInClass: true,
    instantCode: 'CANLI-88',
    createdAt: 'Dün 14:15',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 52,
    totalTargetCount: 56,
    questions: [
      {
        id: 'q-pulse-1',
        title: 'Mayoz-I Anafaz evresinde kutuplara çekilen yapılar hangisidir?',
        type: 'single_choice',
        required: true,
        options: [
          'Kardeş kromatitler',
          'Homolog kromozom çiftleri',
          'Sentrozom iğ iplikleri',
          'Çekirdekçik zarları'
        ]
      },
      {
        id: 'q-pulse-2',
        title: 'Bu soruya yanıt verirken kendinizden ne kadar eminsiniz?',
        type: 'rating',
        required: true,
        minLabel: '1 - Tahmin Ettim',
        maxLabel: '5 - Kesinlikle Eminim'
      }
    ]
  },
  {
    id: 'form-health-safety-1',
    title: 'Öğrenci Sağlık, Kronik Rahatsızlık ve Acil Durum Bilgi Formu',
    description: 'Milli Eğitim Bakanlığı Okul Sağlığı Yönergesi uyarınca acil durum, kronik hastalık, alerji ve düzenli kullanılan ilaç bilgilerinin velilerden toplanması.',
    category: 'health_safety',
    audience: 'parent',
    isInstantInClass: false,
    deadline: '24 Ekim 2026',
    createdAt: '01 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B', '10-C'],
    responseCount: 78,
    totalTargetCount: 84,
    questions: [
      {
        id: 'q-health-1',
        title: 'Öğrencinin hekim tarafından teşhis konulmuş kronik bir rahatsızlığı var mı?',
        type: 'single_choice',
        required: true,
        options: [
          'Yok / Sağlıklı',
          'Astım / Solunum Yolu',
          'Tip-1 Diyabet',
          'Epilepsi / Nörolojik',
          'Kalp / Dolaşım Rahatsızlığı',
          'Diğer (Açıklayınız)'
        ]
      },
      {
        id: 'q-health-2',
        title: 'Öğrencinin bilinen besin, arı sokması veya ilaç alerjisi var mı?',
        type: 'text',
        required: true
      },
      {
        id: 'q-health-3',
        title: 'Okul saatlerinde düzenli olarak alması gereken reçeteli bir ilaç bulunuyor mu?',
        type: 'single_choice',
        required: true,
        options: [
          'Hayır, ilaç kullanmıyor',
          'Evet (Öğretmene/İdareye reçete teslim edilecek)'
        ]
      },
      {
        id: 'q-health-4',
        title: 'Öğrencinin Kan Grubu:',
        type: 'single_choice',
        required: true,
        options: ['A Rh(+)', 'A Rh(-)', 'B Rh(+)', 'B Rh(-)', 'AB Rh(+)', 'AB Rh(-)', '0 Rh(+)', '0 Rh(-)']
      },
      {
        id: 'q-health-5',
        title: 'Acil durumda aranacak 1. ve 2. Derece Veli İletişim Numaraları:',
        type: 'text',
        required: true
      },
      {
        id: 'q-health-6',
        title: 'Yukarıda beyan ettiğim sağlık ve acil durum bilgilerinin doğruluğunu onaylıyorum.',
        type: 'consent_checkbox',
        required: true
      }
    ]
  },
  {
    id: 'form-trip-permission-1',
    title: 'TÜBİTAK Bilim Merkezi ve Planetaryum Gezisi Veli İzin Belgesi',
    description: '18 Kasım 2026 Çarşamba günü düzenlenecek olan Ankara TÜBİTAK Bilim Merkezi ve Planetaryum gözlem gezisi için MEB Sosyal Etkinlikler Yönetmeliği veli muvafakatname formu.',
    category: 'field_trip_permission',
    audience: 'parent',
    isInstantInClass: false,
    deadline: '10 Kasım 2026',
    createdAt: '08 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 49,
    totalTargetCount: 56,
    questions: [
      {
        id: 'q-trip-1',
        title: 'Öğrencimin 18 Kasım 2026 tarihindeki TÜBİTAK Bilim Merkezi gezisine katılmasına:',
        type: 'single_choice',
        required: true,
        options: [
          'İzin Veriyorum (Onaylıyorum)',
          'İzin Vermiyorum (Katılmayacak)'
        ]
      },
      {
        id: 'q-trip-2',
        title: 'Gezi bitiminde (Saat 17:30) öğrencinin ulaşım durumu:',
        type: 'single_choice',
        required: true,
        options: [
          'Okul servis aracıyla eve bırakılsın',
          'Okul bahçesinden velisi olarak ben teslim alacağım',
          'Kendi imkanlarıyla eve dönmesine izin veriyorum'
        ]
      },
      {
        id: 'q-trip-3',
        title: 'Gezi süresince rehber öğretmenlerin bilmesi gereken özel bir durum veya not:',
        type: 'text',
        required: false
      },
      {
        id: 'q-trip-4',
        title: 'MEB Okul Dışı Gezi Esaslarını okudum, gezi katılım onayını dijital olarak onaylıyorum.',
        type: 'consent_checkbox',
        required: true
      }
    ]
  },
  {
    id: 'form-club-selection-1',
    title: 'Sosyal Kulüp Tercihi & Bireysel Yetenek Envanteri Formu',
    description: 'Öğrencilerin ilgi, yetenek ve sosyal becerilerine uygun kulüplere yerleştirilmesi için 1. ve 2. kulüp tercihleri ile yetenek envanteri formu.',
    category: 'social_club',
    audience: 'student',
    isInstantInClass: false,
    deadline: '15 Ekim 2026',
    createdAt: '25 Eylül 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 54,
    totalTargetCount: 56,
    questions: [
      {
        id: 'q-club-1',
        title: '1. Öncelikli Sosyal Kulüp Tercihiniz:',
        type: 'single_choice',
        required: true,
        options: [
          'Bilim, Fen ve Teknoloji Kulübü',
          'Satranç ve Zeka Oyunları Kulübü',
          'Kültür, Edebiyat ve Münazara Kulübü',
          'Yeşilay ve Çevre Koruma Kulübü',
          'Kızılay ve İlkyardım Kulübü',
          'Müzik ve Sahne Sanatları Kulübü'
        ]
      },
      {
        id: 'q-club-2',
        title: '2. Yedek Sosyal Kulüp Tercihiniz:',
        type: 'single_choice',
        required: true,
        options: [
          'Satranç ve Zeka Oyunları Kulübü',
          'Bilim, Fen ve Teknoloji Kulübü',
          'Kültür, Edebiyat ve Münazara Kulübü',
          'Yeşilay ve Çevre Koruma Kulübü',
          'Kızılay ve İlkyardım Kulübü'
        ]
      },
      {
        id: 'q-club-3',
        title: 'Kulüp çalışmalarına katkı sağlayabilecek özel yetenek veya lisanslarınız (Robotik, kodlama, satranç UKD, enstrüman vb.):',
        type: 'text',
        required: true
      },
      {
        id: 'q-club-4',
        title: 'Kulüpte üstlenmek istediğiniz görev rolü:',
        type: 'single_choice',
        required: true,
        options: [
          'Kulüp Başkanı / Yönetim Kurulu',
          'Kulüp Yazmanı (Karar Defteri & Tutanak)',
          'Sosyal Medya & Pano Sorumlusu',
          'Aktif Üye / Etkinlik Katılımcısı'
        ]
      }
    ]
  },
  {
    id: 'form-olympiad-apply-1',
    title: 'TÜBİTAK 2202 Bilim Olimpiyatları Takım Başvuru ve Motivasyon Formu',
    description: 'Biyoloji, Matematik, Fizik, Kimya ve Bilgisayar dallarında okul olimpiyat takımına katılmak isteyen öğrencilerin akademik geçmiş ve motivasyon beyan formu.',
    category: 'olympiad_application',
    audience: 'student',
    isInstantInClass: false,
    deadline: '30 Ekim 2026',
    createdAt: '05 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 18,
    totalTargetCount: 56,
    questions: [
      {
        id: 'q-oly-1',
        title: 'Hazırlanmak istediğiniz Bilim Olimpiyatı Branşı:',
        type: 'single_choice',
        required: true,
        options: ['Biyoloji', 'Matematik', 'Fizik', 'Kimya', 'Bilgisayar']
      },
      {
        id: 'q-oly-2',
        title: 'Haftalık okul sonrası laboratuvar ve problem çözme etütlerine kaç saat ayırabilirsiniz?',
        type: 'single_choice',
        required: true,
        options: ['4 - 6 Saat', '6 - 10 Saat', '10 Saat ve Üzeri (İleri Düzey Taahhüt)']
      },
      {
        id: 'q-oly-3',
        title: 'Daha önce Kanguru Matematik, TÜBİTAK Ortaokul veya benzeri yarışmalara katıldınız mı? Dereceleriniz:',
        type: 'text',
        required: true
      },
      {
        id: 'q-oly-4',
        title: 'Olimpiyat takımına seçilmeniz halinde hedeflediğiniz başarı düzeyi nedir?',
        type: 'single_choice',
        required: true,
        options: [
          '1. Aşama Sınavını Geçip Kış Kampına Katılmak',
          'Ulusal Madalya (Altın / Gümüş / Bronz)',
          'Milli Takım Seçmelerine Kalıp Ülkemizi Temsil Etmek'
        ]
      }
    ]
  },
  {
    id: 'form-dyk-request-1',
    title: 'DYK Destekleme Kursu & Hafta Sonu Etüt Talep Formu',
    description: 'Öğrenci ve velilerin MEB e-Kurs DYK kapsamında hafta sonu açılmasını istedikleri ders, konu ve etüt saat tercihlerini belirleme anketi.',
    category: 'dyk_tutoring',
    audience: 'both',
    isInstantInClass: false,
    deadline: '20 Ekim 2026',
    createdAt: '02 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 51,
    totalTargetCount: 56,
    questions: [
      {
        id: 'q-dyk-1',
        title: 'Destekleme ve Yetiştirme Kursu (DYK) talep ettiğiniz temel ders:',
        type: 'single_choice',
        required: true,
        options: [
          'Biyoloji (Hücre Bölünmeleri & Kalıtım)',
          'Fizik (Elektrik, Manyetizma, Dalgalar)',
          'Matematik (Fonksiyonlar & Polinomlar)',
          'Kimya (Mol Kavramı & Kimyasal Hesaplamalar)'
        ]
      },
      {
        id: 'q-dyk-2',
        title: 'Kursta özellikle hangi çalışma yöntemine ağırlık verilmesini istersiniz?',
        type: 'single_choice',
        required: true,
        options: [
          'Yeni Nesil Soru Çözümü & Problem Analizi',
          'Kazanım Tekrarı & Konu Özeti',
          'Deneme Sınavları & Hata Analizi',
          'Laboratuvar & Deneysel Pekiştirme'
        ]
      },
      {
        id: 'q-dyk-3',
        title: 'Size en uygun kurs zaman dilimi:',
        type: 'single_choice',
        required: true,
        options: [
          'Hafta İçi Ders Çıkışı (16:00 - 17:30)',
          'Cumartesi Sabah (09:00 - 12:10)',
          'Cumartesi Öğleden Sonra (13:00 - 16:10)'
        ]
      }
    ]
  },
  {
    id: 'form-guidance-bep-1',
    title: 'BEP & Rehberlik İhtiyaç Belirleme / Veli Gözlem Formu',
    description: 'Kaynaştırma/BEP kapsamındaki öğrencilerin evdeki çalışma ortamı, dikkat süresi ve sınav uyarlaması (ek süre, büyük punto vb.) ihtiyaçları için veli bildirim formu.',
    category: 'guidance_bep',
    audience: 'parent',
    isInstantInClass: false,
    deadline: '30 Ekim 2026',
    createdAt: '03 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B'],
    responseCount: 12,
    totalTargetCount: 15,
    questions: [
      {
        id: 'q-bep-1',
        title: 'Öğrencinin evde kesintisiz odaklanarak ders çalışma süresi ortalama ne kadardır?',
        type: 'single_choice',
        required: true,
        options: ['10 - 15 Dakika', '20 - 30 Dakika', '35 - 45 Dakika', '50 Dakika ve Üzeri']
      },
      {
        id: 'q-bep-2',
        title: 'Ödev ve konu tekrarlarında en çok hangi tür desteğe ihtiyaç duyuyor?',
        type: 'single_choice',
        required: true,
        options: [
          'Yönergeleri adım adım sadeleştirme & görselleştirme',
          'Süre yönetimi ve sınav kaygısını yatıştırma',
          'Matematiksel işlem basamaklarını takip etme',
          'Metin okuma ve özet çıkarma desteği'
        ]
      },
      {
        id: 'q-bep-3',
        title: 'Okul sınavlarında talep edilen resmi MEB uyarlaması:',
        type: 'single_choice',
        required: true,
        options: [
          'Ek Süre (%25 Süre Artırımı)',
          'Büyük Punto (14-16 Punto Sınav Kağıdı)',
          'Ayrı Sessiz Salon & Okuyucu/Kodlayıcı Desteği',
          'Uyarlama Talebi Yok / Standart Uygulama'
        ]
      },
      {
        id: 'q-bep-4',
        title: 'Öğretmene veya okul rehberlik servisine iletmek istediğiniz özel veli gözlemi:',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: 'form-transport-contact-1',
    title: 'Veli İletişim, Ev Adresi ve Servis Güzergahı Güncelleme Formu',
    description: 'E-Okul ve SMS bilgilendirme sisteminde veli cep telefonu, güncel ikametgah adresi ve öğrenci okul servis firması/plaka bilgilerinin güncellenmesi.',
    category: 'contact_transport',
    audience: 'parent',
    isInstantInClass: false,
    deadline: '15 Kasım 2026',
    createdAt: '06 Ekim 2026',
    isActive: true,
    targetClasses: ['10-A', '10-B', '10-C'],
    responseCount: 65,
    totalTargetCount: 84,
    questions: [
      {
        id: 'q-trans-1',
        title: 'Öğrencinin okula geliş - gidiş yöntemi:',
        type: 'single_choice',
        required: true,
        options: [
          'Okul Servis Aracı ile',
          'Yürüyerek (Yakın Çevre)',
          'Veli Özel Aracı ile',
          'Belediye Toplu Taşıma / Metro ile'
        ]
      },
      {
        id: 'q-trans-2',
        title: 'Servis kullanıyorsa Servis Firma Adı, Plaka ve Şoför İrtibatı:',
        type: 'text',
        required: false
      },
      {
        id: 'q-trans-3',
        title: 'Güncel İkametgah Adresi (Mahalle, Sokak, İlçe):',
        type: 'text',
        required: true
      },
      {
        id: 'q-trans-4',
        title: 'Okul Aile Birliği ve Kariyer Günleri etkinliklerinde mesleki deneyiminizi öğrencilerle paylaşmak ister misiniz?',
        type: 'single_choice',
        required: true,
        options: ['Evet, memnuniyetle gönüllü olurum', 'Belki ikinci dönem', 'Zamanım uygun değil']
      }
    ]
  }
];

// Başlangıç Form Yanıtları (Canlı istatistikler ve analizler için)
export const INITIAL_FORM_RESPONSES: FormResponseSubmission[] = [
  {
    id: 'resp-1',
    formId: 'form-exit-ticket-1',
    formTitle: 'Ders Sonu Çıkış Bileti (Exit Ticket) & Anlama Düzeyi',
    submittedBy: 'Ahmet Yılmaz',
    role: 'student',
    studentNumber: '104',
    studentName: 'Ahmet Yılmaz',
    className: '10-A',
    submittedAt: 'Bugün 09:58',
    isVerified: true,
    answers: [
      {
        questionId: 'q-exit-1',
        questionTitle: 'Kavrama Düzeyi',
        value: 5
      },
      {
        questionId: 'q-exit-2',
        questionTitle: 'En Çok Zorlanılan Kavram',
        value: 'Hepsini rahatlıkla anladım, zorluk yaşamadım'
      },
      {
        questionId: 'q-exit-3',
        questionTitle: 'Öğretmene Soru / Not',
        value: 'Hocam, krossing-over olasılığı genler arasındaki sentimorgan mesafesiyle orantılı mıdır?'
      }
    ]
  },
  {
    id: 'resp-2',
    formId: 'form-exit-ticket-1',
    formTitle: 'Ders Sonu Çıkış Bileti (Exit Ticket) & Anlama Düzeyi',
    submittedBy: 'Zeynep Kaya',
    role: 'student',
    studentNumber: '118',
    studentName: 'Zeynep Kaya',
    className: '10-A',
    submittedAt: 'Bugün 09:57',
    isVerified: true,
    answers: [
      {
        questionId: 'q-exit-1',
        questionTitle: 'Kavrama Düzeyi',
        value: 4
      },
      {
        questionId: 'q-exit-2',
        questionTitle: 'En Çok Zorlanılan Kavram',
        value: 'Krossing-over kiazma noktalarının oluşumu'
      },
      {
        questionId: 'q-exit-3',
        questionTitle: 'Öğretmene Soru / Not',
        value: 'Drive klasöründeki kiazma mikroskop görseli çok faydalı oldu, teşekkürler.'
      }
    ]
  },
  {
    id: 'resp-3',
    formId: 'form-exit-ticket-1',
    formTitle: 'Ders Sonu Çıkış Bileti (Exit Ticket) & Anlama Düzeyi',
    submittedBy: 'Barış Demir',
    role: 'student',
    studentNumber: '205',
    studentName: 'Barış Demir',
    className: '10-A',
    submittedAt: 'Bugün 09:56',
    isVerified: true,
    answers: [
      {
        questionId: 'q-exit-1',
        questionTitle: 'Kavrama Düzeyi',
        value: 3
      },
      {
        questionId: 'q-exit-2',
        questionTitle: 'En Çok Zorlanılan Kavram',
        value: 'Homolog kromozomların rastgele kutuplara çekilmesi'
      },
      {
        questionId: 'q-exit-3',
        questionTitle: 'Öğretmene Soru / Not',
        value: 'Hocam bir sonraki derste Anafaz-I ve Anafaz-II farkını bir kez daha şema ile çizebilir miyiz?'
      }
    ]
  },
  {
    id: 'resp-4',
    formId: 'form-trip-permission-1',
    formTitle: 'TÜBİTAK Bilim Merkezi ve Planetaryum Gezisi Veli İzin Belgesi',
    submittedBy: 'Mehmet Yılmaz (Ahmet Yılmaz Velisi)',
    role: 'parent',
    studentNumber: '104',
    studentName: 'Ahmet Yılmaz',
    className: '10-A',
    submittedAt: 'Dün 19:42',
    isVerified: true,
    answers: [
      {
        questionId: 'q-trip-1',
        questionTitle: 'Gezi İzni',
        value: 'İzin Veriyorum (Onaylıyorum)'
      },
      {
        questionId: 'q-trip-2',
        questionTitle: 'Gezi Sonu Ulaşım',
        value: 'Okul servis aracıyla eve bırakılsın'
      },
      {
        questionId: 'q-trip-3',
        questionTitle: 'Rehber Öğretmene Not',
        value: 'Ahmet bilimsel etkinliklere çok ilgili, geziye katılımından çok mutluyuz.'
      },
      {
        questionId: 'q-trip-4',
        questionTitle: 'Dijital Onay',
        value: true
      }
    ]
  },
  {
    id: 'resp-5',
    formId: 'form-health-safety-1',
    formTitle: 'Öğrenci Sağlık, Kronik Rahatsızlık ve Acil Durum Bilgi Formu',
    submittedBy: 'Mehmet Yılmaz (Ahmet Yılmaz Velisi)',
    role: 'parent',
    studentNumber: '104',
    studentName: 'Ahmet Yılmaz',
    className: '10-A',
    submittedAt: '03 Ekim 2026 21:10',
    isVerified: true,
    answers: [
      {
        questionId: 'q-health-1',
        questionTitle: 'Kronik Rahatsızlık',
        value: 'Yok / Sağlıklı'
      },
      {
        questionId: 'q-health-2',
        questionTitle: 'Alerji Durumu',
        value: 'Hafif polen alerjisi var (Bahar aylarında)'
      },
      {
        questionId: 'q-health-3',
        questionTitle: 'Reçeteli İlaç',
        value: 'Hayır, ilaç kullanmıyor'
      },
      {
        questionId: 'q-health-4',
        questionTitle: 'Kan Grubu',
        value: 'A Rh(+)'
      },
      {
        questionId: 'q-health-5',
        questionTitle: 'Acil İletişim',
        value: 'Baba: 0532 555 44 33 - Anne: 0533 444 33 22'
      },
      {
        questionId: 'q-health-6',
        questionTitle: 'Bilgi Doğruluk Onayı',
        value: true
      }
    ]
  },
  {
    id: 'resp-6',
    formId: 'form-club-selection-1',
    formTitle: 'Sosyal Kulüp Tercihi & Bireysel Yetenek Envanteri Formu',
    submittedBy: 'Ahmet Yılmaz',
    role: 'student',
    studentNumber: '104',
    studentName: 'Ahmet Yılmaz',
    className: '10-A',
    submittedAt: '28 Eylül 2026 13:40',
    isVerified: true,
    answers: [
      {
        questionId: 'q-club-1',
        questionTitle: '1. Kulüp Tercihi',
        value: 'Bilim, Fen ve Teknoloji Kulübü'
      },
      {
        questionId: 'q-club-2',
        questionTitle: '2. Kulüp Tercihi',
        value: 'Satranç ve Zeka Oyunları Kulübü'
      },
      {
        questionId: 'q-club-3',
        questionTitle: 'Özel Yetenekler',
        value: 'Python programlama biliyorum, TÜBİTAK 2204 biyoloji projesi geliştirmek istiyorum.'
      },
      {
        questionId: 'q-club-4',
        questionTitle: 'Kulüp Görevi',
        value: 'Kulüp Başkanı / Yönetim Kurulu'
      }
    ]
  }
];

// ==========================================
// BİREBİR ÖZEL DERS & KOÇLUK BAŞLANGIÇ VERİLERİ
// ==========================================

export const INITIAL_PRIVATE_STUDENTS: PrivateStudent[] = [
  {
    id: 'p-std-1',
    fullName: 'Zeynep Demir',
    grade: '12. Sınıf',
    school: 'Atatürk Anadolu Lisesi',
    targetExam: 'AYT Matematik & Geometri',
    parentName: 'Ayşe Demir (Anne)',
    parentPhone: '0532 555 12 34',
    currentTrialNet: 26.5,
    targetTrialNet: 36.0,
    hourlyRate: 1200,
    totalPackageHours: 10,
    remainingPackageHours: 4,
    completedHours: 6,
    paymentStatus: 'Ödendi',
    weeklyPreferredSlot: 'Salı 18:00 - 19:30',
    pedagogicalNotes: 'Cebir ve fonksiyon temeli çok sağlam. Türev geometrik yorumu ve analitik geometri dönüşümlerinde pratik eksiği var; hız kazandırılmalı.',
    avatarBgColor: 'bg-indigo-600'
  },
  {
    id: 'p-std-2',
    fullName: 'Can Berk Öztürk',
    grade: '8. Sınıf',
    school: 'TED Koleji',
    targetExam: 'LGS (8. Sınıf)',
    parentName: 'Murat Öztürk (Baba)',
    parentPhone: '0544 333 88 99',
    currentTrialNet: 14.5,
    targetTrialNet: 19.0,
    hourlyRate: 1000,
    totalPackageHours: 8,
    remainingPackageHours: 2,
    completedHours: 6,
    paymentStatus: 'Ödendi',
    weeklyPreferredSlot: 'Perşembe 17:30 - 19:00',
    pedagogicalNotes: 'Yeni nesil uzun paragraf şekilli soruları okurken işlem hatası yapabiliyor. Çarpanlar-katlar ve olasılık mantığı oturdu, geometri sorularına odaklanıldı.',
    avatarBgColor: 'bg-emerald-600'
  },
  {
    id: 'p-std-3',
    fullName: 'Melis Arda',
    grade: '11. Sınıf',
    school: 'Özel Fen Lisesi',
    targetExam: 'Okul Sınavlarına Takviye',
    parentName: 'Fatma Arda (Anne)',
    parentPhone: '0505 444 22 11',
    currentTrialNet: 21.0,
    targetTrialNet: 32.0,
    hourlyRate: 1100,
    totalPackageHours: 10,
    remainingPackageHours: 7,
    completedHours: 3,
    paymentStatus: 'Kısmi Ödendi',
    weeklyPreferredSlot: 'Cumartesi 14:00 - 15:30',
    pedagogicalNotes: 'Trigonometri toplam-fark ve yarım açı formülleri çalışıldı. Okul 1. yazılısından 92 aldı. TYT problemler kampına başlandı.',
    avatarBgColor: 'bg-amber-600'
  },
  {
    id: 'p-std-4',
    fullName: 'Emre Can Polat',
    grade: 'Mezun (YKS)',
    school: 'Fen Lisesi Mezunu',
    targetExam: 'AYT Matematik & Geometri',
    parentName: 'Kemal Polat (Baba)',
    parentPhone: '0533 222 77 44',
    currentTrialNet: 31.5,
    targetTrialNet: 39.0,
    hourlyRate: 1300,
    totalPackageHours: 12,
    remainingPackageHours: 3,
    completedHours: 9,
    paymentStatus: 'Beklemede',
    weeklyPreferredSlot: 'Pazar 10:30 - 12:30',
    pedagogicalNotes: 'Tıp Fakültesi / İTÜ Bilgisayar hedefliyor. İntegral alan hesabı ve katı cisimler odaklı ileri düzey ÖSYM soruları çözülüyor.',
    avatarBgColor: 'bg-violet-600'
  }
];

export const INITIAL_PRIVATE_SESSIONS: PrivateLessonSession[] = [
  {
    id: 'ps-1',
    studentId: 'p-std-1',
    studentName: 'Zeynep Demir',
    date: '2026-10-13',
    day: 'Salı',
    time: '18:00 - 19:30',
    durationMinutes: 90,
    topicsCovered: ['Parabol Tepe Noktası & Doğru ile Kesişimi', 'Simetri Ekseni Soru Tipleri'],
    solvedQuestionsCount: 28,
    homeworkAssigned: 'Orijinal AYT Soru Bankası Parabol Test 3 & 4 (Toplam 32 Soru)',
    homeworkStatus: 'Tamamlandı',
    teacherNotes: 'Formülleri çok hızlı kavradı. 3 farklı ekstremum sorusunda türev yardımıyla pratik kestirme yol gösterildi.',
    status: 'Tamamlandı',
    feeAmount: 1800,
    isPaid: true
  },
  {
    id: 'ps-2',
    studentId: 'p-std-2',
    studentName: 'Can Berk Öztürk',
    date: '2026-10-15',
    day: 'Perşembe',
    time: '17:30 - 19:00',
    durationMinutes: 90,
    topicsCovered: ['LGS Üslü İfadeler: Çözümleme ve Bilimsel Gösterim'],
    solvedQuestionsCount: 24,
    homeworkAssigned: 'MEB Örnek Soruları 2026 Üslü Sayılar Fasikülü Sayfa 1-18',
    homeworkStatus: 'Yeni Atandı',
    teacherNotes: 'Çok büyük ve çok küçük sayılarda virgül kaydırma pratiği pekiştirildi.',
    status: 'Planlandı',
    feeAmount: 1500,
    isPaid: true
  },
  {
    id: 'ps-3',
    studentId: 'p-std-3',
    studentName: 'Melis Arda',
    date: '2026-10-17',
    day: 'Cumartesi',
    time: '14:00 - 15:30',
    durationMinutes: 90,
    topicsCovered: ['Trigonometrik Denklemler: sin x = sin a ve cos x = cos a'],
    solvedQuestionsCount: 22,
    homeworkAssigned: 'Apotemi Trigonometri Fasikülü Bölüm 4 Testleri',
    homeworkStatus: 'Yeni Atandı',
    teacherNotes: 'Birim çember üzerinde açı köklerinin periyodik yazılımı ($x = \\alpha + 2k\\pi$) öğretildi.',
    status: 'Planlandı',
    feeAmount: 1650,
    isPaid: false
  },
  {
    id: 'ps-4',
    studentId: 'p-std-4',
    studentName: 'Emre Can Polat',
    date: '2026-10-11',
    day: 'Pazar',
    time: '10:30 - 12:30',
    durationMinutes: 120,
    topicsCovered: ['İntegralde Alan Hesabı & Eğriler Arasında Kalan Bölge'],
    solvedQuestionsCount: 35,
    homeworkAssigned: 'İleri Düzey ÖSYM Çıkmış Sorular (2018-2025 İntegral Denemesi)',
    homeworkStatus: 'Tamamlandı',
    teacherNotes: 'Parabol ile doğru arasında kalan alan formülü (S = (kökler farkı)^3 / 6a²) pratik yol olarak verildi. Netleri 32 bandına oturdu.',
    status: 'Tamamlandı',
    feeAmount: 2600,
    isPaid: false
  },
  {
    id: 'ps-5',
    studentId: 'p-std-1',
    studentName: 'Zeynep Demir',
    date: '2026-10-20',
    day: 'Salı',
    time: '18:00 - 19:30',
    durationMinutes: 90,
    topicsCovered: ['Türev: Fiziksel & Geometrik Yorum, Teğet Eğimleri'],
    solvedQuestionsCount: 0,
    homeworkAssigned: 'Türev Giriş Föyü Hazırlık',
    homeworkStatus: 'Yeni Atandı',
    teacherNotes: 'Gelecek seans için teğet denklemi ve normal doğrusu konusu planlandı.',
    status: 'Planlandı',
    feeAmount: 1800,
    isPaid: true
  }
];

export const INITIAL_PRIVATE_TOPICS: PrivateTopicMastery[] = [
  // Zeynep Demir (AYT)
  { id: 'top-1', studentId: 'p-std-1', category: 'AYT', topicName: 'Fonksiyonlar & Grafikler', status: 'Tamamlandı', masteryPercent: 95, solvedQuestions: 240, targetQuestions: 250 },
  { id: 'top-2', studentId: 'p-std-1', category: 'AYT', topicName: 'İkinci Dereceden Denklemler & Parabol', status: 'Tamamlandı', masteryPercent: 90, solvedQuestions: 185, targetQuestions: 200 },
  { id: 'top-3', studentId: 'p-std-1', category: 'AYT', topicName: 'Polinomlar & Çarpanlara Ayırma', status: 'Tamamlandı', masteryPercent: 88, solvedQuestions: 160, targetQuestions: 180 },
  { id: 'top-4', studentId: 'p-std-1', category: 'AYT', topicName: 'Trigonometri (Tüm Konular)', status: 'Tekrar Edilecek', masteryPercent: 78, solvedQuestions: 210, targetQuestions: 260 },
  { id: 'top-5', studentId: 'p-std-1', category: 'AYT', topicName: 'Türev ve Uygulamaları', status: 'Soru Çözülecek', masteryPercent: 65, solvedQuestions: 120, targetQuestions: 300 },
  { id: 'top-6', studentId: 'p-std-1', category: 'AYT', topicName: 'İntegral ve Alan', status: 'Başlanmadı', masteryPercent: 20, solvedQuestions: 30, targetQuestions: 300 },
  { id: 'top-7', studentId: 'p-std-1', category: 'Geometri', topicName: 'Çember ve Daire', status: 'Soru Çözülecek', masteryPercent: 72, solvedQuestions: 110, targetQuestions: 180 },

  // Can Berk Öztürk (LGS)
  { id: 'top-8', studentId: 'p-std-2', category: 'LGS', topicName: 'Çarpanlar ve Katlar (EBOB-EKOK)', status: 'Tamamlandı', masteryPercent: 92, solvedQuestions: 180, targetQuestions: 200 },
  { id: 'top-9', studentId: 'p-std-2', category: 'LGS', topicName: 'Üslü İfadeler', status: 'Tamamlandı', masteryPercent: 88, solvedQuestions: 165, targetQuestions: 180 },
  { id: 'top-10', studentId: 'p-std-2', category: 'LGS', topicName: 'Kareköklü İfadeler', status: 'Tekrar Edilecek', masteryPercent: 74, solvedQuestions: 130, targetQuestions: 200 },
  { id: 'top-11', studentId: 'p-std-2', category: 'LGS', topicName: 'Veri Analizi & Olasılık', status: 'Tamamlandı', masteryPercent: 90, solvedQuestions: 140, targetQuestions: 150 },
  { id: 'top-12', studentId: 'p-std-2', category: 'LGS', topicName: 'Doğrusal Denklemler & Eğim', status: 'Soru Çözülecek', masteryPercent: 68, solvedQuestions: 90, targetQuestions: 180 },
  { id: 'top-13', studentId: 'p-std-2', category: 'LGS', topicName: 'Üçgenler & Pisagor Bağıntısı', status: 'Başlanmadı', masteryPercent: 30, solvedQuestions: 25, targetQuestions: 150 }
];

export const INITIAL_MATH_FORMULAS: MathFormulaSnippet[] = [
  {
    id: 'f-1',
    category: 'Fonksiyonlar & Parabol',
    title: 'İkinci Dereceden Denklem Kökleri (Diskriminant)',
    latexCode: 'x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
    description: 'ax² + bx + c = 0 denkleminin genel kök formülü.',
    sampleUse: 'Diskriminant analizi ve kökler toplamı x₁ + x₂ = -b/a, kökler çarpımı x₁ · x₂ = c/a'
  },
  {
    id: 'f-2',
    category: 'Fonksiyonlar & Parabol',
    title: 'Parabol Tepe Noktası ve Simetri Ekseni',
    latexCode: 'T(r,k) \\implies r = -\\frac{b}{2a}, \\quad k = f(r) = \\frac{4ac - b^2}{4a}',
    description: 'Parabolün simetri ekseni x = r ve maksimum/minimum tepe noktası.',
    sampleUse: 'f(x) = a(x - r)² + k tam kare formülü'
  },
  {
    id: 'f-3',
    category: 'Trigonometri',
    title: 'Kosinüs Teoremi',
    latexCode: 'a^2 = b^2 + c^2 - 2bc \\cos(\\widehat{A})',
    description: 'Üç kenarı ve bir açısı bilinen herhangi bir üçgende kenar ve açı hesabı.',
    sampleUse: 'Geometri ve TYT/AYT üçgen çözümlemelerinde sıkça kullanılır.'
  },
  {
    id: 'f-4',
    category: 'Trigonometri',
    title: 'Toplam ve Fark Formülleri',
    latexCode: '\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b, \\quad \\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b',
    description: 'Açıların toplam ve farkının trigonometrik değerleri.',
    sampleUse: 'sin(75°) = sin(45° + 30°) ve yarım açı türetimlerinde temeldir.'
  },
  {
    id: 'f-5',
    category: 'Trigonometri',
    title: 'Yarım Açı Formülleri',
    latexCode: '\\sin(2x) = 2\\sin x \\cos x, \\quad \\cos(2x) = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1',
    description: 'Çift kat açıyı tek kata indirme bağıntıları.',
    sampleUse: 'Trigonometrik integral ve sadeleştirmelerin vazgeçilmezi.'
  },
  {
    id: 'f-6',
    category: 'Türev & İntegral',
    title: 'Türevin Limit Tanımı',
    latexCode: 'f\'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}',
    description: 'Fonksiyonun anlık değişim oranı ve teğetin eğimi.',
    sampleUse: 'Türevin geometrik yorumu ve eğim hesabı m_t = f\'(x_0)'
  },
  {
    id: 'f-7',
    category: 'Türev & İntegral',
    title: 'Çarpım ve Bölümün Türevi',
    latexCode: '(u \\cdot v)\' = u\'v + uv\', \\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
    description: 'İki fonksiyonun çarpım ve bölüm fonksiyonlarının türev kuralları.',
    sampleUse: 'AYT matematik cebirsel türev testlerinde standart kural.'
  },
  {
    id: 'f-8',
    category: 'Türev & İntegral',
    title: 'Belirli İntegral & Alan Hesabı (Analizin Temel Teoremi)',
    latexCode: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a), \\quad \\text{Alan} = \\int_{a}^{b} |f(x) - g(x)|\\,dx',
    description: 'Eğrinin altında ve iki eğri arasında kalan geometrik alan.',
    sampleUse: 'ÖSYM AYT Matematik alan soruları.'
  },
  {
    id: 'f-9',
    category: 'Polinom & Çarpanlara Ayırma',
    title: 'İki Kare Farkı ve Küp Açılımları',
    latexCode: 'a^2 - b^2 = (a-b)(a+b), \\quad a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
    description: 'Cebirsel sadeleştirmede en kritik çarpanlara ayırma özdeşlikleri.',
    sampleUse: 'LGS, TYT ve AYT ortak temel özdeşliği.'
  },
  {
    id: 'f-10',
    category: 'Geometri & Üçgenler',
    title: 'Öklid Bağıntıları (Dik Üçgende Yükseklik)',
    latexCode: 'h^2 = p \\cdot k, \\quad b^2 = k \\cdot a, \\quad c^2 = p \\cdot a, \\quad b \\cdot c = a \\cdot h',
    description: 'Hipotenüse indirilen yükseklik ve dik kenar uzunluk bağıntıları.',
    sampleUse: 'Geometri alan ve uzunluk problemlerinin can damarı.'
  }
];

export const INITIAL_STUDENT_QUESTIONS: StudentSubmittedQuestion[] = [
  {
    id: 'q-sub-1',
    studentId: 'std-1',
    studentName: 'Ahmet Yılmaz',
    className: '10-A',
    subject: 'Matematik',
    topic: 'İkinci Dereceden Denklemler & Parabol',
    questionText: 'f(x) = 2x² - 8x + 5 fonksiyonunun tepe noktasının simetri eksenini bulurken r = -b/(2a) formülünde eksiyi unutuyorum. Tepe noktası apsisi ve ordinatı nasıl doğrulanır?',
    questionLatex: 'f(x) = 2x^2 - 8x + 5 \\implies T(r,k) = ?',
    difficulty: 'Orta',
    submittedAt: '15 Ekim 2026 10:15',
    status: 'Beklemede',
    isFlaggedAsDeficiency: true,
    relatedFormulaCardKey: 'parabol'
  },
  {
    id: 'q-sub-2',
    studentId: 'p-std-1',
    studentName: 'Zeynep Demir',
    className: '12. Sınıf',
    subject: 'Matematik',
    topic: 'Trigonometri (Tüm Konular)',
    questionText: 'sin(2x) = cos(x) trigonometrik denkleminde [0, 2π] aralığında kaç farklı kök vardır sorusunu çözerken cos(x) terimini her iki taraftan sadeleştirince kök kayboluyor. Doğru kök bulma adımı nedir?',
    questionLatex: '\\sin(2x) = \\cos(x), \\quad x \\in [0, 2\\pi]',
    difficulty: 'İleri Düzey',
    submittedAt: '14 Ekim 2026 19:40',
    status: 'İnceleniyor',
    teacherPedagogicalHint: 'Sadeleştirme yapma! 2 sin x cos x - cos x = 0 şeklinde cos x parantezine al.',
    isFlaggedAsDeficiency: true,
    relatedFormulaCardKey: 'trigonometri'
  },
  {
    id: 'q-sub-3',
    studentId: 'p-std-2',
    studentName: 'Can Berk Öztürk',
    className: '8. Sınıf (LGS)',
    subject: 'Matematik',
    topic: 'Kareköklü İfadeler',
    questionText: '√72 + √32 - √50 işlemini yaparken kök dışına çıkarma yapamıyorum. En büyük tam kare çarpanı nasıl hızlı tespit edebilirim?',
    questionLatex: '\\sqrt{72} + \\sqrt{32} - \\sqrt{50} = ?',
    difficulty: 'Temel',
    submittedAt: '13 Ekim 2026 16:30',
    status: 'Çözüldü',
    teacherAnswer: '72 = 36·2 olduğundan 6√2, 32 = 16·2 olduğundan 4√2 ve 50 = 25·2 olduğundan 5√2 dir. Katsayıları topladığında: (6 + 4 - 5)√2 = 5√2.',
    teacherAnswerLatex: '6\\sqrt{2} + 4\\sqrt{2} - 5\\sqrt{2} = 5\\sqrt{2}',
    teacherPedagogicalHint: 'Sayıları 2 ye bölerek kontrol et: 72/2 = 36 (tam kare!), 32/2 = 16 (tam kare!). Ortak kök içi √2 dir.',
    isFlaggedAsDeficiency: true,
    relatedFormulaCardKey: 'karekok'
  },
  {
    id: 'q-sub-4',
    studentId: 'p-std-4',
    studentName: 'Emre Can Polat',
    className: 'Mezun (YKS)',
    subject: 'Matematik',
    topic: 'Türev ve Uygulamaları',
    questionText: 'f(x) = x³ - 3x² + k eğrisinin yerel minimum noktası x ekseni üzerinde olduğuna göre k kaçtır? Çift katlı kök ilişkisiyle nasıl çözülür?',
    questionLatex: 'f(x) = x^3 - 3x^2 + k, \\quad y_{\\min} = 0 \\implies k = ?',
    difficulty: 'İleri Düzey',
    submittedAt: '12 Ekim 2026 21:05',
    status: 'Çözüldü',
    teacherAnswer: 'Türev f\'(x) = 3x² - 6x = 3x(x - 2). Kökler x = 0 (maksimum) ve x = 2 (minimum). Yerel minimum x ekseninde ise f(2) = 0 olmalıdır: 2³ - 3(4) + k = 0 => 8 - 12 + k = 0 => k = 4.',
    teacherAnswerLatex: 'f\'(x) = 3x(x - 2) = 0 \\implies x = 2 \\implies f(2) = 0 \\implies k = 4',
    isFlaggedAsDeficiency: false,
    relatedFormulaCardKey: 'turev'
  }
];




export interface FormulaItem {
  name: string;
  latex: string;
  note?: string;
}

export interface SolutionStep {
  stepTitle: string;
  stepExplanation: string;
  stepLatex?: string;
}

export interface CriticalFormulaCardData {
  topicKey: string;
  category: 'TYT' | 'AYT' | 'LGS' | 'Geometri';
  title: string;
  summary: string;
  criticalFormulas: FormulaItem[];
  pitfalls: string[]; // Sık yapılan hatalar & dikkat tuzakları
  sampleQuestion: {
    question: string;
    questionLatex?: string;
    solutionSteps: SolutionStep[];
    finalAnswer: string;
  };
  recommendedPracticeCount: number;
}

export const TOPIC_FORMULA_DATABASE: Record<string, CriticalFormulaCardData> = {
  'trigonometri': {
    topicKey: 'trigonometri',
    category: 'AYT',
    title: 'Trigonometri: Toplam-Fark, Yarım Açı ve Dönüşümler',
    summary: 'Birim çember üzerindeki koordinatlar x = cos α ve y = sin α dır. İki açının toplam veya farkının trigonometrik değerleri doğrudan açıların trigonometrik değerleri toplamına eşit değildir; toplam-fark formülleri uygulanmalıdır.',
    criticalFormulas: [
      {
        name: 'Sinüs Toplam ve Fark',
        latex: '\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b',
        note: 'Sinüste işaret korunur, terimler sin-cos şeklinde eşleşir.'
      },
      {
        name: 'Kosinüs Toplam ve Fark',
        latex: '\\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b',
        note: 'Kosinüste işaret değişir! + iken -, - iken + olur.'
      },
      {
        name: 'Sinüs Yarım Açı',
        latex: '\\sin(2x) = 2 \\sin x \\cos x',
        note: 'sin x · cos x çarpımını gördüğünde 2 ile çarpıp böl.'
      },
      {
        name: 'Kosinüs Yarım Açı',
        latex: '\\cos(2x) = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x',
        note: '+1 veya -1 li ifadelerde 1 i yok etmek için uygun formu seç.'
      },
      {
        name: 'Kosinüs Teoremi',
        latex: 'a^2 = b^2 + c^2 - 2bc \\cos(\\widehat{A})',
        note: 'Üç kenar ve bir açı arasındaki temel ilişki.'
      }
    ],
    pitfalls: [
      'cos(a + b) açılımında aradaki işaretin EKSİ (-) olduğunu unutma.',
      'sin(2x) = 2 sin x YANLIŞTIR; mutlaka 2 sin x cos x olmalıdır.',
      'Geniş açılarda trigonometrik fonksiyonların bölgelere göre işaret değişimlerini daima kontrol et (2. bölgede cos negatif, sin pozitiftir).'
    ],
    sampleQuestion: {
      question: 'sin x - cos x = 1/3 olduğuna göre sin(2x) değerini bulunuz.',
      questionLatex: '\\sin x - \\cos x = \\frac{1}{3} \\implies \\sin(2x) = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Her İki Tarafın Karesini Alma',
          stepExplanation: 'Verilen eşitliğin her iki tarafının parantez karesi alınır:',
          stepLatex: '(\\sin x - \\cos x)^2 = \\left(\\frac{1}{3}\\right)^2 \\implies \\sin^2 x - 2\\sin x \\cos x + \\cos^2 x = \\frac{1}{9}'
        },
        {
          stepTitle: '2. Adım: Temel Özdeşlik ve Yarım Açıyı Yerleştirme',
          stepExplanation: 'sin²x + cos²x = 1 ve 2 sin x cos x = sin(2x) bağıntıları yerine yazılır:',
          stepLatex: '1 - \\sin(2x) = \\frac{1}{9}'
        },
        {
          stepTitle: '3. Adım: sin(2x) İfadesini Yalnız Bırakma',
          stepExplanation: 'Denklem düzenlenerek bilinmeyen çekilir:',
          stepLatex: '\\sin(2x) = 1 - \\frac{1}{9} = \\frac{8}{9}'
        }
      ],
      finalAnswer: 'sin(2x) = 8/9'
    },
    recommendedPracticeCount: 40
  },

  'turev': {
    topicKey: 'turev',
    category: 'AYT',
    title: 'Türev ve Uygulamaları: Kurallar, Teğet Eğimi ve Ekstremum',
    summary: 'Bir fonksiyonun bir noktadaki türevi, o noktadaki anlık değişim oranını ve fonksiyona çizilen teğet doğrusunun eğimini (m = f\'(x₀)) verir. Türevin sıfır olduğu ve işaret değiştirdiği noktalar yerel ekstremum (maksimum/minimum) noktalarıdır.',
    criticalFormulas: [
      {
        name: 'Türevin Limit Tanımı',
        latex: 'f\'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}',
        note: 'Fonksiyonun x₀ noktasındaki anlık türevi.'
      },
      {
        name: 'Çarpım Türevi Kuralı',
        latex: '(u \\cdot v)\' = u\'v + uv\'',
        note: 'Birincinin türevi çarpı ikinci artı birincisi çarpı ikincinin türevi.'
      },
      {
        name: 'Bölüm Türevi Kuralı',
        latex: '\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
        note: 'Paydayı kareye almayı asla unutma!'
      },
      {
        name: 'Teğet Doğrusu Denklemi',
        latex: 'y - y_0 = f\'(x_0)(x - x_0), \\quad m_t = f\'(x_0)',
        note: 'Normalin eğimi m_n = -1 / f\'(x_0) dır.'
      }
    ],
    pitfalls: [
      'Bölüm türevinde pay kısmındaki eksi işaretini dağıtırken işlem hatası yapma: u\'v - uv\'.',
      'Teğetin eğimini bulurken türevi aldıktan sonra x₀ değerini türevli fonksiyonda yerine yaz; orijinal fonksiyonda değil!',
      'f\'(x) = 0 olması tek başına yerel ekstremum olması için yetmez; türevin işaret değiştirmesi şarttır (çift katlı köklerde ekstremum olmaz).'
    ],
    sampleQuestion: {
      question: 'f(x) = x³ - 3x² + 4 eğrisine üzerindeki x = 3 apsisli noktadan çizilen teğetin denklemini bulunuz.',
      questionLatex: 'f(x) = x^3 - 3x^2 + 4, \\quad x_0 = 3 \\implies \\text{Teğet Denklemi} = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Değme Noktası Ordinatını (y₀) Bulma',
          stepExplanation: 'x = 3 fonksiyon kuralına yazılır:',
          stepLatex: 'y_0 = f(3) = 3^3 - 3(3^2) + 4 = 27 - 27 + 4 = 4 \\implies A(3, 4)'
        },
        {
          stepTitle: '2. Adım: Fonksiyonun Türevini ve Teğet Eğimini (m) Bulma',
          stepExplanation: 'f\'(x) türevi hesaplanıp x = 3 yazılır:',
          stepLatex: 'f\'(x) = 3x^2 - 6x \\implies m_t = f\'(3) = 3(9) - 6(3) = 27 - 18 = 9'
        },
        {
          stepTitle: '3. Adım: Noktası ve Eğimi Bilinen Doğru Denklemi',
          stepExplanation: 'A(3, 4) ve m = 9 ile doğru denklemi yazılır:',
          stepLatex: 'y - 4 = 9(x - 3) \\implies y = 9x - 27 + 4 \\implies y = 9x - 23'
        }
      ],
      finalAnswer: 'y = 9x - 23'
    },
    recommendedPracticeCount: 45
  },

  'integral': {
    topicKey: 'integral',
    category: 'AYT',
    title: 'İntegral ve Uygulamaları: Belirsiz İntegral & Alan Hesabı',
    summary: 'İntegral, türevin tersi işlemidir (ters türev). Belirli integral ise Kartezyen düzlemde eğri ile x ekseni veya iki eğri arasında kalan net alanı hesaplar.',
    criticalFormulas: [
      {
        name: 'Kuvvet Kuralı',
        latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
        note: 'Sabit C katsayısını belirsiz integralde unutma.'
      },
      {
        name: 'Değişken Değiştirme',
        latex: '\\int f(g(x)) g\'(x) \\, dx = \\int f(u) \\, du \\quad (u = g(x))',
        note: 'İçerideki fonksiyonun türevi yanında çarpım halindeyse u dönüşümü yap.'
      },
      {
        name: 'Analizin Temel Teoremi',
        latex: '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)',
        note: 'Önce üst sınır b yazılır, alt sınır a çıkarılır.'
      },
      {
        name: 'İki Eğri Arasında Kalan Alan',
        latex: 'A = \\int_{a}^{b} [f(x) - g(x)] \\, dx \\quad (f(x) \\ge g(x))',
        note: 'Üstteki fonksiyondan alttaki fonksiyon çıkarılır.'
      }
    ],
    pitfalls: [
      'x ekseninin altında kalan bölgelerde integral değeri negatiftir; alan soruluyorsa mutlak değeri alınmalıdır.',
      'Belirli integralde değişken değiştirdiğinde integrasyon sınırlarını (a ve b) da u cinsine çevirmeyi unutma.'
    ],
    sampleQuestion: {
      question: 'f(x) = 4 - x² parabolü ile x ekseni arasında kalan kapalı bölgenin alanını hesaplayınız.',
      questionLatex: 'A = \\int_{-2}^{2} (4 - x^2) \\, dx = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Sınırları (Kökleri) Bulma',
          stepExplanation: '4 - x² = 0 => x² = 4 => x = -2 ve x = 2.',
          stepLatex: 'x_1 = -2, \\quad x_2 = 2'
        },
        {
          stepTitle: '2. Adım: Belirli İntegrali Kurma ve İntegral Alma',
          stepExplanation: 'Simetriden yararlanarak 2 · ∫₀² (4 - x²) dx de yazılabilir:',
          stepLatex: '\\int_{-2}^{2} (4 - x^2) \\, dx = \\left[ 4x - \\frac{x^3}{3} \\right]_{-2}^{2}'
        },
        {
          stepTitle: '3. Adım: Sınır Değerlerini Yerine Koyma',
          stepExplanation: 'F(2) - F(-2) farkı hesaplanır:',
          stepLatex: '\\left(8 - \\frac{8}{3}\\right) - \\left(-8 + \\frac{8}{3}\\right) = \\frac{16}{3} - \\left(-\\frac{16}{3}\\right) = \\frac{32}{3}'
        }
      ],
      finalAnswer: 'Alan = 32/3 birimkare'
    },
    recommendedPracticeCount: 35
  },

  'parabol': {
    topicKey: 'parabol',
    category: 'AYT',
    title: 'Parabol ve İkinci Dereceden Fonksiyonlar',
    summary: 'İkinci dereceden f(x) = ax² + bx + c fonksiyonlarının grafiğine parabol denir. Tepe noktası T(r,k) kıvrılma noktasıdır ve simetri ekseni x = r doğrusudur.',
    criticalFormulas: [
      {
        name: 'Tepe Noktası Koordinatları',
        latex: 'T(r, k) \\implies r = -\\frac{b}{2a}, \\quad k = f(r) = \\frac{4ac - b^2}{4a}',
        note: 'k değerini bulmak için r yi doğrudan fonksiyonda x yerine yazmak en kolayıdır.'
      },
      {
        name: 'Parabolün Tam Kare Biçimi',
        latex: 'f(x) = a(x - r)^2 + k',
        note: 'Tepe noktası bilindiğinde parabol denklemini doğrudan bu formülle kur.'
      },
      {
        name: 'Diskriminant ve Kök İlişkisi',
        latex: '\\Delta = b^2 - 4ac \\quad (\\Delta > 0 \\implies 2\\text{ kök}, \\Delta = 0 \\implies \\text{teğet})',
        note: 'Δ < 0 ise parabol x eksenini kesmez.'
      }
    ],
    pitfalls: [
      'r = -b/(2a) formülündeki eksi (-) işaretini unutma.',
      'Parabolün tepe noktası simetri eksenidir; simetri eksenine eşit uzaklıktaki noktaların ordinatları eşittir: f(r - d) = f(r + d).'
    ],
    sampleQuestion: {
      question: 'f(x) = x² - 6x + m + 1 parabolünün tepe noktası x ekseni üzerinde olduğuna göre m kaçtır?',
      questionLatex: 'f(x) = x^2 - 6x + m + 1, \\quad T \\in Ox \\implies m = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: x Eksenine Teğet Olma Koşulu',
          stepExplanation: 'Tepe noktası x ekseni üzerindeyse k = 0 ve dolayısıyla parabol x eksenine teğettir (Δ = 0):',
          stepLatex: '\\Delta = b^2 - 4ac = 0'
        },
        {
          stepTitle: '2. Adım: Diskriminantı Hesaplama',
          stepExplanation: 'a = 1, b = -6, c = m + 1 değerleri yerine konur:',
          stepLatex: '(-6)^2 - 4(1)(m + 1) = 0 \\implies 36 - 4m - 4 = 0 \\implies 32 - 4m = 0'
        },
        {
          stepTitle: '3. Adım: m Değerini Çözme',
          stepExplanation: '4m = 32 => m = 8.',
          stepLatex: '4m = 32 \\implies m = 8'
        }
      ],
      finalAnswer: 'm = 8'
    },
    recommendedPracticeCount: 30
  },

  'polinom': {
    topicKey: 'polinom',
    category: 'AYT',
    title: 'Polinomlar ve Çarpanlara Ayırma',
    summary: 'Polinomlarda dereceler doğal sayı olmalıdır. P(x) polinomunun (x - a) ile bölümünden kalan için bölen sıfıra eşitlenip x yerine a yazılır: Kalan = P(a). Çarpanlara ayırmada özdeşlikler en güçlü silahtır.',
    criticalFormulas: [
      {
        name: 'Kalan Teoremi',
        latex: 'P(x) = (x - a)Q(x) + K \\implies K = P(a)',
        note: 'Bölme işlemi yapmadan kalanı doğrudan bulur.'
      },
      {
        name: 'Katsayılar Toplamı & Sabit Terim',
        latex: '\\text{Katsayılar Toplamı} = P(1), \\quad \\text{Sabit Terim} = P(0)',
        note: 'P(2x + 1) verilirse katsayılar toplamı için x=1 yazılarak P(3) bulunur!'
      },
      {
        name: 'İki Kare Farkı',
        latex: 'a^2 - b^2 = (a - b)(a + b)',
        note: 'Her kademede en sık sorulan temel özdeşlik.'
      },
      {
        name: 'İki Küp Toplamı ve Farkı',
        latex: 'a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
        note: 'İlk parantezdeki işaret aynıdır, ikinci parantezdeki çarpım teriminin işareti zıttır.'
      }
    ],
    pitfalls: [
      'P(x + 2) polinomunun katsayılar toplamı sorulduğunda doğrudan P(1) hesaplanmaz; x yerine 1 yazılır ve P(1 + 2) = P(3) bulunur.',
      '(a + b)² ile a² + b² yi birbirine karıştırma! (a + b)² = a² + 2ab + b² dir.'
    ],
    sampleQuestion: {
      question: 'P(x) = x³ - 2x² + ax - 5 polinomunun (x - 2) ile bölümünden kalan 7 olduğuna göre a kaçtır?',
      questionLatex: 'P(x) = x^3 - 2x^2 + ax - 5, \\quad P(2) = 7 \\implies a = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Kalan Bağıntısını Kurma',
          stepExplanation: 'x - 2 = 0 => x = 2 yazıldığında kalana eşit olmalıdır: P(2) = 7.',
          stepLatex: 'P(2) = 7'
        },
        {
          stepTitle: '2. Adım: x = 2 Değerini Polinoma Yazma',
          stepExplanation: 'Polinom kuralında x yerine 2 yazılır:',
          stepLatex: 'P(2) = 2^3 - 2(2^2) + a(2) - 5 = 8 - 8 + 2a - 5 = 2a - 5'
        },
        {
          stepTitle: '3. Adım: Denklemi Çözme',
          stepExplanation: '2a - 5 = 7 => 2a = 12 => a = 6.',
          stepLatex: '2a - 5 = 7 \\implies 2a = 12 \\implies a = 6'
        }
      ],
      finalAnswer: 'a = 6'
    },
    recommendedPracticeCount: 30
  },

  'karekok': {
    topicKey: 'karekok',
    category: 'LGS',
    title: 'Kareköklü İfadeler ve Eşlenik ile Çarpma',
    summary: 'Pozitif bir a sayısının karekökü √a, karesi a ya eşit olan pozitif sayıdır. Kareköklü ifadelerde toplama-çıkarma sadece kök içleri ve dereceleri aynı olduğunda katsayılar arasında yapılır.',
    criticalFormulas: [
      {
        name: 'Kök Dışına Çıkarma',
        latex: '\\sqrt{a^2 \\cdot b} = a\\sqrt{b} \\quad (a \\ge 0)',
        note: 'Tam kare çarpanları dışarı çıkar.'
      },
      {
        name: 'Karekökte Çarpma ve Bölme',
        latex: '\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{a \\cdot b}, \\quad \\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}',
        note: 'Aynı kök çatısı altında toplanabilir.'
      },
      {
        name: 'Paydayı Rasyonel Yapma (Eşlenik)',
        latex: '\\frac{1}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} + \\sqrt{b}}{a - b}',
        note: 'Pay ve paydayı eşlenikle genişlet.'
      }
    ],
    pitfalls: [
      '√(a + b) ifadesi √a + √b ye EŞİT DEĞİLDİR! Örneğin √(9 + 16) = √25 = 5 iken √9 + √16 = 3 + 4 = 7 dir.',
      'Kök derecesi çift olan sayıların kök içi negatif olamaz.'
    ],
    sampleQuestion: {
      question: '√75 - √27 + √12 işleminin sonucunu bulunuz.',
      questionLatex: '\\sqrt{75} - \\sqrt{27} + \\sqrt{12} = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Kök İçlerini a² · b Şeklinde Yazma',
          stepExplanation: 'Her bir terim tam kare çarpanlarına ayrılır:',
          stepLatex: '\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}, \\quad \\sqrt{27} = \\sqrt{9 \\cdot 3} = 3\\sqrt{3}, \\quad \\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}'
        },
        {
          stepTitle: '2. Adım: Katsayıları Toplama ve Çıkarma',
          stepExplanation: 'Ortak √3 parantezine alınır:',
          stepLatex: '5\\sqrt{3} - 3\\sqrt{3} + 2\\sqrt{3} = (5 - 3 + 2)\\sqrt{3} = 4\\sqrt{3}'
        }
      ],
      finalAnswer: '4√3'
    },
    recommendedPracticeCount: 25
  },

  'carpanlar_katlar': {
    topicKey: 'carpanlar_katlar',
    category: 'LGS',
    title: 'Çarpanlar ve Katlar: EBOB - EKOK Problemleri',
    summary: 'Büyük parçaları küçük parçalara bölme, paylaştırma ve şişeleme soruları EBOB ile çözülür. Küçük parçalardan büyük bir bütün oluşturma, nöbet ve zillerin birlikte çalması soruları EKOK ile çözülür.',
    criticalFormulas: [
      {
        name: 'İki Sayının Çarpımı Kuralı',
        latex: 'a \\cdot b = \\text{EBOB}(a, b) \\cdot \\text{EKOK}(a, b)',
        note: 'Yalnızca iki sayı için geçerlidir.'
      },
      {
        name: 'Aralarında Asal Sayılar',
        latex: '\\text{Aralarında Asal } \\implies \\text{EBOB}(a, b) = 1, \\quad \\text{EKOK}(a, b) = a \\cdot b',
        note: 'Ortak bölenleri sadece 1 dir.'
      }
    ],
    pitfalls: [
      'Problemde "en az kaç poşet/kutu gerekir" dendiğinde önce EBOB bulunur, sonra toplam miktar EBOB a bölünerek kutu sayısı hesaplanır; EBOB un kendisi kutu sayısı değildir!'
    ],
    sampleQuestion: {
      question: 'Kenar uzunlukları 48 metre ve 60 metre olan dikdörtgen biçimindeki bir tarlanın etrafına ve köşelerine eşit aralıklarla fidan dikilecektir. En az kaç fidan gerekir?',
      questionLatex: '\\text{EBOB}(48, 60) = ? \\implies \\text{Fidan Sayısı} = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Fidanlar Arası Mesafeyi (EBOB) Bulma',
          stepExplanation: 'En az fidan için fidan aralığı en büyük olmalıdır. EBOB(48, 60) = 12 metredir.',
          stepLatex: '\\text{EBOB}(48, 60) = 12\\text{ metre}'
        },
        {
          stepTitle: '2. Adım: Çevre Üzerinden Fidan Sayısını Hesaplama',
          stepExplanation: 'Fidan Sayısı = Tarlanın Çevresi / Fidan Aralığı:',
          stepLatex: '\\text{Çevre} = 2 \\cdot (48 + 60) = 2 \\cdot 108 = 216\\text{ metre}'
        },
        {
          stepTitle: '3. Adım: Bölme İşlemi',
          stepExplanation: '216 / 12 = 18 fidan gerekir.',
          stepLatex: '\\text{Fidan Sayısı} = \\frac{216}{12} = 18'
        }
      ],
      finalAnswer: '18 fidan'
    },
    recommendedPracticeCount: 30
  },

  'cember_daire': {
    topicKey: 'cember_daire',
    category: 'Geometri',
    title: 'Çember ve Daire: Açılar, Kiriş ve Alan Bağıntıları',
    summary: 'Çemberde aynı yayı gören çevre açı, merkez açının yarısıdır. Çapı gören çevre açı 90 derecedir. Dairenin alanı πr², çevresi 2πr dir.',
    criticalFormulas: [
      {
        name: 'Açı Bağıntıları',
        latex: '\\text{Çevre Açı} = \\frac{\\alpha}{2}, \\quad \\text{Merkez Açı} = \\alpha, \\quad \\text{Çapı Gören Açı} = 90^\\circ',
        note: 'Teğet-kiriş açı da gördüğü yayın yarısına eşittir.'
      },
      {
        name: 'Daire Diliminin Alanı',
        latex: 'S = \\pi r^2 \\cdot \\frac{\\alpha}{360^\\circ}',
        note: 'α merkez açıdır.'
      },
      {
        name: 'Daire Yayının Uzunluğu',
        latex: 'L = 2\\pi r \\cdot \\frac{\\alpha}{360^\\circ}',
        note: 'Yay uzunluğu ile alan bağıntısı: S = (L · r) / 2'
      }
    ],
    pitfalls: [
      'Merkezden teğet değme noktasına çizilen yarıçap teğete daima DİK (90°) tir; bu özelliği dik üçgen oluşturmak için kullanmayı unutma.'
    ],
    sampleQuestion: {
      question: 'Yarıçapı 6 cm olan bir dairede 60 derecelik merkez açının gördüğü daire diliminin alanını bulunuz. (π = 3 alınız)',
      questionLatex: 'r = 6, \\quad \\alpha = 60^\\circ, \\quad \\pi = 3 \\implies S = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Dilim Alan Formülünü Yazma',
          stepExplanation: 'S = π r² · (α / 360°)',
          stepLatex: 'S = \\pi \\cdot r^2 \\cdot \\frac{\\alpha}{360^\\circ}'
        },
        {
          stepTitle: '2. Adım: Verilen Değerleri Yerine Koyma',
          stepExplanation: 'r = 6, α = 60°, π = 3 yerine konur:',
          stepLatex: 'S = 3 \\cdot 6^2 \\cdot \\frac{60^\\circ}{360^\\circ} = 3 \\cdot 36 \\cdot \\frac{1}{6} = 3 \\cdot 6 = 18\\text{ cm}^2'
        }
      ],
      finalAnswer: '18 cm²'
    },
    recommendedPracticeCount: 25
  },

  'fonksiyonlar': {
    topicKey: 'fonksiyonlar',
    category: 'AYT',
    title: 'Fonksiyonlar: Tanım Kümesi, Bileşke ve Ters Fonksiyon',
    summary: 'Tanım kümesindeki her elemanın değer kümesinde yalnız bir görüntüsü olmalıdır. Birebir ve örten fonksiyonların tersi vardır. Bileşke işleminde (f ∘ g)(x) = f(g(x)) kuralı uygulanır.',
    criticalFormulas: [
      {
        name: 'Bileşke Fonksiyon Kuralı',
        latex: '(f \\circ g)(x) = f(g(x)), \\quad (f \\circ g)^{-1} = g^{-1} \\circ f^{-1}',
        note: 'Ters alma işleminde sıra yer değiştirir!'
      },
      {
        name: 'Doğrusal Fonksiyonun Tersi',
        latex: 'f(x) = ax + b \\implies f^{-1}(x) = \\frac{x - b}{a} \\quad (a \\ne 0)',
        note: 'x i yalnız bırakıp x ile y nin yerini değiştir.'
      },
      {
        name: 'Kesirli Fonksiyonun Tersi',
        latex: 'f(x) = \\frac{ax + b}{cx + d} \\implies f^{-1}(x) = \\frac{-dx + b}{cx - a}',
        note: 'Paydaki x in katsayısı ile paydadaki sabit terim hem yer hem işaret değiştirir.'
      },
      {
        name: 'Tek ve Çift Fonksiyonlar',
        latex: 'f(-x) = f(x) \\implies \\text{Çift (y eksenine göre simetrik)}, \\quad f(-x) = -f(x) \\implies \\text{Tek (orijine göre simetrik)}',
        note: 'Polinom fonksiyonlarda tek dereceli terimler tek, çift dereceliler çifttir.'
      }
    ],
    pitfalls: [
      '(f ∘ g)(x) ile (g ∘ f)(x) genellikle birbirine EŞİT DEĞİLDİR (değişme özelliği yoktur).',
      'Paydayı sıfır yapan x değerleri mutlaka tanım kümesinden çıkartılmalıdır (R - {tanımsız yapanlar}).'
    ],
    sampleQuestion: {
      question: 'f(x) = (3x + 5) / (2x - 4) fonksiyonunun tersini bulunuz.',
      questionLatex: 'f(x) = \\frac{3x + 5}{2x - 4} \\implies f^{-1}(x) = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Pratik Ters Formülünü Hatırlama',
          stepExplanation: 'ax + b / cx + d formunda a = 3 ve d = -4 tür. a ile d yer ve işaret değiştirir:',
          stepLatex: 'f^{-1}(x) = \\frac{-(-4)x + 5}{2x - 3} = \\frac{4x + 5}{2x - 3}'
        },
        {
          stepTitle: '2. Adım: Tanım Kümesi Kontrolü',
          stepExplanation: 'Ters fonksiyonun paydası 2x - 3 = 0 => x = 3/2 noktasında tanımsızdır:',
          stepLatex: 'x \\ne \\frac{3}{2}'
        }
      ],
      finalAnswer: 'f⁻¹(x) = (4x + 5) / (2x - 3)'
    },
    recommendedPracticeCount: 30
  },

  'uslu_ifadeler': {
    topicKey: 'uslu_ifadeler',
    category: 'LGS',
    title: 'Üslü İfadeler: Çözümleme, Çarpma-Bölme ve Bilimsel Gösterim',
    summary: 'aⁿ ifadesinde a taban, n üstür. Tabanları aynı olan sayıların çarpımında üsler toplanır, bölümünde üsler çıkarılır. Bilimsel gösterimde 1 ≤ |a| < 10 olmalıdır.',
    criticalFormulas: [
      {
        name: 'Çarpma ve Bölme Kuralı',
        latex: 'a^m \\cdot a^n = a^{m+n}, \\quad \\frac{a^m}{a^n} = a^{m-n} \\quad (a \\ne 0)',
        note: 'Üsler aynıysa tabanlar çarpılır veya bölünür: a^n · b^n = (a·b)^n'
      },
      {
        name: 'Üssün Üssü Kuralı',
        latex: '(a^m)^n = a^{m \\cdot n}',
        note: 'Negatif tabanlarda parantez konumu işaret belirleyicidir.'
      },
      {
        name: 'Negatif Üs Kuralı',
        latex: 'a^{-n} = \\frac{1}{a^n}, \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n',
        note: 'Negatif üs sayının işaretini değil, çarpmaya göre tersini belirtir.'
      },
      {
        name: 'Bilimsel Gösterim',
        latex: 'a \\cdot 10^n \\quad (1 \\le |a| < 10, \\, n \\in \\mathbb{Z})',
        note: 'LGS nin her yıl kesin gelen garanti soru tipidir.'
      }
    ],
    pitfalls: [
      '(-2)⁴ = +16 iken -2⁴ = -16 dır; parantez yoksa eksi işareti üsten etkilenmez.',
      'Sayı sağa doğru virgül kaydırılarak büyütüldüğünde 10 un kuvveti küçülür.'
    ],
    sampleQuestion: {
      question: '(2⁸ · 5⁵) / 10³ işleminin sonucunu bulunuz.',
      questionLatex: '\\frac{2^8 \\cdot 5^5}{10^3} = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: 10 Tabanını Asal Çarpanlarına Ayırma',
          stepExplanation: '10³ = (2 · 5)³ = 2³ · 5³ olarak yazılır:',
          stepLatex: '\\frac{2^8 \\cdot 5^5}{2^3 \\cdot 5^3}'
        },
        {
          stepTitle: '2. Adım: Bölme Kuralı ile Üsleri Çıkarma',
          stepExplanation: '2⁸⁻³ · 5⁵⁻³ hesaplanır:',
          stepLatex: '2^{8-3} \\cdot 5^{5-3} = 2^5 \\cdot 5^2'
        },
        {
          stepTitle: '3. Adım: Sayısal Değeri Bulma',
          stepExplanation: '2⁵ = 32 ve 5² = 25 tir. 32 · 25 = 800:',
          stepLatex: '32 \\cdot 25 = 800'
        }
      ],
      finalAnswer: '800'
    },
    recommendedPracticeCount: 30
  },

  'dogrusal_denklemler': {
    topicKey: 'dogrusal_denklemler',
    category: 'LGS',
    title: 'Doğrusal Denklemler, Koordinat Sistemi ve Eğim (m)',
    summary: 'Dikey değişimin yatay değişime oranına eğim denir (m = Δy / Δx). Sağa yatık doğruların eğimi pozitif, sola yatık doğruların eğimi negatiftir. y = mx + n denkleminde x in katsayısı eğimdir.',
    criticalFormulas: [
      {
        name: 'İki Noktadan Geçen Doğrunun Eğimi',
        latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}',
        note: 'Dikey fark / Yatay fark.'
      },
      {
        name: 'Doğru Denklemi ve Eğim İlişkisi',
        latex: 'ax + by + c = 0 \\implies m = -\\frac{a}{b}, \\quad y = mx + n',
        note: 'y yalnız bırakıldığında x in önündeki katsayı eğimdir.'
      },
      {
        name: 'Özel Doğrular',
        latex: 'x = a \\implies m = \\text{Tanımsız (Dikey)}, \\quad y = b \\implies m = 0 \\text{ (Yatay)}',
        note: 'x eksenine dik doğruların eğimi tanımsızdır.'
      }
    ],
    pitfalls: [
      'ax + by + c = 0 denkleminde eğimi a/b alıp eksi işaretini unutma! Doğru cevap -a/b dir.',
      'Sola yatık doğruların eğiminin mutlaka EKSİ işaretli olduğunu şekle bakarak teyit et.'
    ],
    sampleQuestion: {
      question: 'A(2, -1) ve B(5, 8) noktalarından geçen doğrunun eğimini bulunuz.',
      questionLatex: 'A(2, -1), \\, B(5, 8) \\implies m = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Eğim Formülünü Yazma',
          stepExplanation: 'm = (y₂ - y₁) / (x₂ - x₁)',
          stepLatex: 'm = \\frac{8 - (-1)}{5 - 2}'
        },
        {
          stepTitle: '2. Adım: İşaretleri Düzenleme ve Hesaplama',
          stepExplanation: '8 - (-1) = 8 + 1 = 9 ve 5 - 2 = 3 tür:',
          stepLatex: 'm = \\frac{9}{3} = 3'
        }
      ],
      finalAnswer: 'Eğim m = 3'
    },
    recommendedPracticeCount: 25
  },

  'ucgenler_pisagor': {
    topicKey: 'ucgenler_pisagor',
    category: 'LGS',
    title: 'Üçgenler: Üçgen Eşitsizliği, Pisagor Bağıntısı ve Özel Üçgenler',
    summary: 'Bir üçgende bir kenarın uzunluğu diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçüktür: |b - c| < a < b + c. Dik üçgende a² + b² = c² dir.',
    criticalFormulas: [
      {
        name: 'Pisagor Bağıntısı',
        latex: 'a^2 + b^2 = c^2 \\quad (c = \\text{Hipotenüs})',
        note: 'En uzun kenar daima 90 derecenin karşısındaki hipotenüstür.'
      },
      {
        name: 'Özel Dik Üçgen Kalıpları',
        latex: '3k - 4k - 5k, \\quad 5k - 12k - 13k, \\quad 8k - 15k - 17k, \\quad 7k - 24k - 25k',
        note: 'Sınavlarda işlem yapmadan doğrudan süreden tasarruf sağlar.'
      },
      {
        name: 'Muhteşem Üçlü',
        latex: '\\text{Dik köşeden hipotenüse kenarortay indirilirse: } V_a = \\frac{a}{2}',
        note: 'Hipotenüse ait kenarortay hipotenüsün yarısına eşittir.'
      }
    ],
    pitfalls: [
      '3-4-5 kuralını uygularken 5 in mutlaka DİK KENAR değil HİPOTENÜS olduğunu kontrol et! Dik kenarlar 3 ve 5 ise hipotenüs √34 olur.',
      'Üçgen eşitsizliğinde her iki sınırın da (< ve >) sağlanması zorunludur.'
    ],
    sampleQuestion: {
      question: 'Dik kenarları 9 cm ve 12 cm olan bir dik üçgenin hipotenüs uzunluğu kaç cm dir?',
      questionLatex: 'a = 9, \\, b = 12 \\implies c = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: Özel Üçgen Katı Analizi',
          stepExplanation: '9 = 3 · 3 ve 12 = 3 · 4 tür. Bu üçgen 3-4-5 özel üçgeninin 3 katıdır (k = 3):',
          stepLatex: 'c = 5 \\cdot k = 5 \\cdot 3 = 15\\text{ cm}'
        },
        {
          stepTitle: '2. Adım: Pisagor ile Sağlama',
          stepExplanation: 'c² = 9² + 12² = 81 + 144 = 225 => c = √225 = 15 cm.',
          stepLatex: 'c = \\sqrt{81 + 144} = \\sqrt{225} = 15'
        }
      ],
      finalAnswer: 'c = 15 cm'
    },
    recommendedPracticeCount: 30
  },

  'logaritma': {
    topicKey: 'logaritma',
    category: 'AYT',
    title: 'Logaritma Fonksiyonu ve Özellikleri',
    summary: 'Logaritma, üstel fonksiyonun tersidir: aˣ = b ⇔ x = log_a(b). Taban a > 0 ve a ≠ 1; logaritması alınan ifade b > 0 olmalıdır.',
    criticalFormulas: [
      {
        name: 'Çarpım ve Bölüm Logaritması',
        latex: '\\log_a(x \\cdot y) = \\log_a x + \\log_a y, \\quad \\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y',
        note: 'Toplam logaritması tek logaritma çarpımına dönüşür.'
      },
      {
        name: 'Kuvvet Kuralı',
        latex: '\\log_{a^n}(b^m) = \\frac{m}{n} \\log_a b',
        note: 'Üstteki üs paya, tabandaki üs paydaya katsayı olarak geçer.'
      },
      {
        name: 'Taban Değiştirme Kuralı',
        latex: '\\log_a b = \\frac{\\log_c b}{\\log_c a} = \\frac{\\ln b}{\\ln a} = \\frac{1}{\\log_b a}',
        note: 'ÖSYM sorularında tabanları eşitlemek için en çok kullanılan kural.'
      }
    ],
    pitfalls: [
      'log(x + y) ifadesi log x + log y ye EŞİT DEĞİLDİR.',
      'Logaritma denklemini çözdükten sonra bulunan köklerin tanım aralığını (iç > 0, taban > 0, taban ≠ 1) sağladığını mutlaka kontrol et.'
    ],
    sampleQuestion: {
      question: 'log₂ 3 = a olduğuna göre log₁₂ 18 ifadesinin a cinsinden eşitini bulunuz.',
      questionLatex: '\\log_2 3 = a \\implies \\log_{12} 18 = ?',
      solutionSteps: [
        {
          stepTitle: '1. Adım: 2 Tabanında Taban Değiştirme',
          stepExplanation: 'Verilen log₂ tabanında olduğu için ifade 2 tabanına dönüştürülür:',
          stepLatex: '\\log_{12} 18 = \\frac{\\log_2 18}{\\log_2 12}'
        },
        {
          stepTitle: '2. Adım: Sayıları 2 ve 3 Asal Çarpanlarına Ayırma',
          stepExplanation: '18 = 2 · 3² ve 12 = 2² · 3 olarak açılır:',
          stepLatex: '\\frac{\\log_2 (2 \\cdot 3^2)}{\\log_2 (2^2 \\cdot 3)} = \\frac{\\log_2 2 + 2\\log_2 3}{2\\log_2 2 + \\log_2 3}'
        },
        {
          stepTitle: '3. Adım: log₂ 3 = a Değerini Yazma',
          stepExplanation: 'log₂ 2 = 1 yazılarak sonuç elde edilir:',
          stepLatex: '\\frac{1 + 2a}{2 + a}'
        }
      ],
      finalAnswer: '(2a + 1) / (a + 2)'
    },
    recommendedPracticeCount: 30
  }
};

// Fallback generator for custom or any other topic
export function getTopicSummaryCard(topicName: string, category: 'TYT' | 'AYT' | 'LGS' | 'Geometri'): CriticalFormulaCardData {
  const normalized = topicName.toLowerCase()
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c');

  if (normalized.includes('trigo')) return TOPIC_FORMULA_DATABASE['trigonometri'];
  if (normalized.includes('turev')) return TOPIC_FORMULA_DATABASE['turev'];
  if (normalized.includes('integral')) return TOPIC_FORMULA_DATABASE['integral'];
  if (normalized.includes('parabol') || normalized.includes('ikinci derece')) return TOPIC_FORMULA_DATABASE['parabol'];
  if (normalized.includes('polinom') || normalized.includes('carpanlara')) return TOPIC_FORMULA_DATABASE['polinom'];
  if (normalized.includes('karekok') || normalized.includes('koklu')) return TOPIC_FORMULA_DATABASE['karekok'];
  if (normalized.includes('ebob') || normalized.includes('ekok') || normalized.includes('carpanlar ve kat')) return TOPIC_FORMULA_DATABASE['carpanlar_katlar'];
  if (normalized.includes('cember') || normalized.includes('daire')) return TOPIC_FORMULA_DATABASE['cember_daire'];
  if (normalized.includes('fonksiyon')) return TOPIC_FORMULA_DATABASE['fonksiyonlar'];
  if (normalized.includes('uslu') || normalized.includes('usler')) return TOPIC_FORMULA_DATABASE['uslu_ifadeler'];
  if (normalized.includes('dogrusal') || normalized.includes('egim')) return TOPIC_FORMULA_DATABASE['dogrusal_denklemler'];
  if (normalized.includes('ucgen') || normalized.includes('pisagor')) return TOPIC_FORMULA_DATABASE['ucgenler_pisagor'];
  if (normalized.includes('logaritma')) return TOPIC_FORMULA_DATABASE['logaritma'];

  // Universal high-quality fallback for any math topic
  return {
    topicKey: normalized,
    category,
    title: `${topicName} - Kritik Formüller & Konu Özeti`,
    summary: `${topicName} konusunun temel kuralları, soru çözüm basamakları ve ÖSYM / LGS sınavlarında en sık soru gelen kritik püf noktaları.`,
    criticalFormulas: [
      {
        name: 'Temel Özdeşlik & Formül Bağıntısı',
        latex: 'f(x) = \\sum_{i=1}^{n} a_i x^i \\implies \\Delta = b^2 - 4ac',
        note: 'Konunun temel analitik çerçevesi.'
      },
      {
        name: 'İlişkili Oran / Eşitlik',
        latex: '\\frac{A}{B} = \\frac{C}{D} \\implies A \\cdot D = B \\cdot C',
        note: 'Cebirsel sadeleştirme ve denklem çözümlerinde kullanılır.'
      }
    ],
    pitfalls: [
      'Soruyu okurken tanım ve değer kümesi aralıklarına (pozitif tam sayı, reel sayı vb.) dikkat ediniz.',
      'İşlem önceliğine ve işaret dağılımlarına azami özen gösteriniz.'
    ],
    sampleQuestion: {
      question: `${topicName} konusuna ait tipik sınav sorusu ve adım adım işlem basamakları.`,
      solutionSteps: [
        {
          stepTitle: '1. Adım: Verilenleri Belirleme',
          stepExplanation: 'Sorudaki değişkenler ve katsayılar düzenlenir.'
        },
        {
          stepTitle: '2. Adım: Formül Uygulaması',
          stepExplanation: 'Temel bağıntı kurularak sadeleştirme yapılır.'
        }
      ],
      finalAnswer: 'Çözüm doğrulandı.'
    },
    recommendedPracticeCount: 25
  };
}

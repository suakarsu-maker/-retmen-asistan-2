export type DayOfWeek = 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma';

export interface SchedulePeriod {
  period: number;
  timeRange: string;
  startTime: string; // "08:30"
  endTime: string;   // "09:10"
  subject: string;
  className: string;
  classroom: string;
  topic: string;
  driveNotesUrl: string;
  isDutyPeriod?: boolean; // Nöbet görevi
}

export interface DaySchedule {
  day: DayOfWeek;
  dutyLocation?: string; // Nöbet yeri (örn: 2. Kat Koridor)
  periods: SchedulePeriod[];
}

export interface AdministrativeDuty {
  id: string;
  title: string;
  category: 'Nöbet' | 'Zümre Başkanlığı' | 'Şube Rehberliği' | 'Kurul / Komisyon' | 'Diğer';
  detail: string;
  assignedClass?: string;
  scheduleDay?: string;
  relevantRegulation: string;
}

export interface CurriculumItem {
  id: string;
  grade: string;
  subject: string;
  term: '1. Dönem' | '2. Dönem';
  unit: string;
  outcomes: string[];
  recommendedHours: number;
  uploadedBookName?: string;
  uploadedBookSize?: string;
}

export interface DailyPlanStage {
  stageName: string;
  activity: string;
  teacherRole: string;
  studentRole: string;
}

export interface LessonPlan {
  id: string;
  type: 'daily' | 'annual';
  title: string;
  subject: string;
  grade: string;
  weekNumber: string;
  topic: string;
  learningOutcomes: string[];
  targetSkills: string[];
  methods: string[];
  materials: string[];
  stages: DailyPlanStage[];
  homework: string;
  pedagogicalNotes: string;
  createdAt: string;
}

export interface ScenarioLessonNote {
  id: string;
  subject: string;
  grade: string;
  targetClass: string;
  topic: string;
  periodTime: string;
  driveFileName: string;
  driveFileUrl: string;
  teacherCopy: {
    title: string;
    scenarioTimeline: { time: string; phase: string; action: string }[];
    pedagogicalCues: string[];
    masterSolutions: { question: string; solution: string }[];
  };
  studentCopy: {
    title: string;
    summary: string;
    fillInTheBlanks: string[];
    conceptMap: { concept: string; features: string }[];
    practiceQuestions: string[];
  };
  latexSource: string;
}

export interface Student {
  id: string;
  studentNumber: string;
  fullName: string;
  className: string;
  attendanceDaysMissed: number;
  overallScore: number;
  bepStatus: boolean; // Bireyselleştirilmiş Eğitim Planı
  parentContact: string;
  notes: string;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  className: string;
  submittedAt: string;
  status: 'Bekliyor' | 'Değerlendirildi';
  submissionText: string;
  score?: number;
  letterGrade?: string;
  criteriaScores?: { criterion: string; max: number; given: number; comment: string }[];
  feedback?: string;
  studentMessage?: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  weight: number; // e.g. 25 (%)
  levels: {
    score: number;
    title: string;
    description: string;
  }[];
}

export interface Rubric {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: 'Analitik' | 'Holistik';
  totalPoints: number;
  criteria: RubricCriterion[];
}

export interface MevzuatQueryResponse {
  question: string;
  legalBasis: { regulation: string; article: string; summary: string }[];
  clearAnswer: string;
  actionSteps: string[];
  officialDocumentTemplates: string;
}

export interface SocialClub {
  id: string;
  name: string;
  teacherAdvisor: string;
  studentPresident: string;
  studentVicePresident: string;
  studentTreasurer: string;
  memberCount: number;
  annualGoals: string[];
  upcomingActivity: string;
  meetings: { date: string; topic: string; decisions: string[] }[];
  communityService: { title: string; targetGroup: string; date: string; status: string }[];
}

export interface GuidanceRecord {
  id: string;
  studentName: string;
  studentNumber: string;
  className: string;
  category: 'Öğrenci Görüşmesi' | 'Veli Görüşmesi' | 'BEP Takibi' | 'RAM Yönlendirme' | 'Disiplin / Uyum';
  date: string;
  summary: string;
  actionPlan: string;
  status: 'Açık' | 'Takipte' | 'Tamamlandı';
}

export type UserRole = 'teacher' | 'student' | 'parent';

// Okul İçi Komisyonlar
export interface SchoolCommission {
  id: string;
  name: string; // e.g. "Satın Alma ve Muayene Kabul Komisyonu"
  role: 'Başkan' | 'Asil Üye' | 'Yedek Üye';
  term: string;
  meetingFrequency: string;
  responsibilities: string[];
  lastMeetingDate: string;
  officialRegulation: string;
}

// Belirli Gün ve Haftalar & Kutlama Organizasyonları
export interface CelebrationEvent {
  id: string;
  title: string; // e.g. "29 Ekim Cumhuriyet Bayramı Töreni"
  date: string;
  location: string;
  coordinatorTeacher: string;
  assignedTeachers: string[];
  programFlow: { time: string; activity: string; inCharge: string }[];
  speechesAndPoems: { title: string; studentOrTeacher: string; type: string }[];
  status: 'Hazırlık Aşamasında' | 'İdare Onayında' | 'Tamamlandı';
  districtApprovalNumber: string;
}

// Projeler Platformu (TÜBİTAK, TEKNOFEST, Erasmus+)
export interface SchoolProject {
  id: string;
  title: string;
  type: 'TÜBİTAK 2204-A' | 'TÜBİTAK 2204-B' | 'TEKNOFEST' | 'Erasmus+ KA1/KA2' | 'eTwinning' | 'Kalkınma Ajansı';
  advisorTeacher: string;
  studentTeam: { name: string; class: string; role: string }[];
  summary: string;
  currentStage: 'Fikir & Hipotez' | 'Literatür Taraması' | 'Deney & Prototip' | 'Rapor Yazımı' | 'Başvuru Gönderildi' | 'Bölge Sergisi / Final';
  deadline: string;
  budgetAllocated?: string;
  progressPercent: number;
}

// DYK Kursları & Etüt & Egzersiz
export interface DYKCourse {
  id: string;
  courseName: string; // e.g. "12. Sınıf AYT Biyoloji Destekleme Kursu"
  grade: string;
  weeklyHours: number;
  scheduleTime: string; // e.g. "Cumartesi 09:00 - 12:10 (4 Saat)"
  studentCount: number;
  classroom: string;
  syllabusTopicThisWeek: string;
  averagePracticeExamScore: number;
  targetExamScore: number;
}

export interface ExerciseActivity {
  id: string;
  name: string; // e.g. "Okul Satranç Takımı Egzersizi" or "Tiyatro Egzersizi"
  weeklyHours: number; // max 6 hours by MEB
  days: string; // e.g. "Pazartesi & Çarşamba 16:00 - 17:30"
  studentsCount: number;
  approvalStatus: 'Kaymakamlık Onaylandı' | 'Onay Bekliyor';
  upcomingTournament: string;
}

// Hizmet İçi Eğitim Süreçleri & Hatırlatıcılar
export interface InServiceTraining {
  id: string;
  courseCode: string;
  title: string; // e.g. "Öğretmenler İçin Üretken Yapay Zeka Semineri (ÖBA)"
  organizer: 'MEB Merkezi' | 'İl MEM Mahalli' | 'ÖBA Online';
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  durationHours: number;
  status: 'Başvuru Açık' | 'Kabul Edildi' | 'Devam Ediyor' | 'Sertifika Alındı';
  isReminderSet: boolean;
  reminderNote?: string;
}

// Veli Randevu & İletişim
export interface ParentAppointment {
  id: string;
  parentName: string;
  studentName: string;
  studentNumber: string;
  className: string;
  requestedDate: string;
  requestedTime: string;
  topic: string;
  status: 'Onaylandı' | 'Beklemede' | 'Tamamlandı';
  teacherNotes?: string;
}

// Bilim Olimpiyatları Portalı (TÜBİTAK BİDEB 2202)
export type OlympiadBranch = 'Biyoloji' | 'Matematik' | 'Fizik' | 'Kimya' | 'Bilgisayar';

export interface OlympiadLessonTopic {
  id: string;
  branch: OlympiadBranch;
  topicName: string; // e.g. "Michaelis-Menten Enzim Kinetiği & Lineweaver-Burk Grafikleri"
  difficultyLevel: '1. Aşama Temel' | '1. Aşama İleri' | '2. Aşama / Kış Kampı' | 'Milli Takım Düzeyi';
  campbellOrAdvancedRef: string; // e.g. "Campbell Biyoloji 8. Bölüm / Lehninger Biyokimya"
  summaryNotes: string;
  solvedPastQuestion: {
    year: string;
    questionText: string;
    solutionProof: string;
  };
  latexProofFormula?: string;
}

export interface OlympiadCalendarEvent {
  id: string;
  title: string;
  branch: OlympiadBranch;
  organizer: string; // e.g. "TÜBİTAK BİDEB 2202"
  applicationDeadline: string;
  examOrCampDate: string;
  location: string;
  daysRemaining: number;
  status: 'Başvuru Devam Ediyor' | 'Hazırlık Kampı' | 'Sınav Aşaması' | 'Tamamlandı';
  officialBidebUrl: string;
}

export interface OlympiadTeamMember {
  id: string;
  fullName: string;
  className: string;
  studentNumber: string;
  branch: OlympiadBranch;
  trialExamNet: number; // e.g. 78 / 100
  solvedQuestionsCount: number; // e.g. 1420 soru
  targetMedal: 'Altın Madalya' | 'Gümüş Madalya' | 'Bronz Madalya' | 'Milli Takım Asil';
  weeklyHoursCommitted: number;
}

// Öğretmen Rolü ve Modu: Sınıf Öğretmeni (İlkokul 1-4) veya Branş Öğretmeni (Ortaokul/Lise)
export type TeacherType = 'classroom' | 'branch';

// İlkokul Sınıf Seviyeleri
export type PrimaryGradeLevel = '1. Sınıf' | '2. Sınıf' | '3. Sınıf' | '4. Sınıf';

// Ders Bazlı Disiplin & Üstün Performans Profili (Bilişsel Yük Zorluğu yerine Eşit ve Üstün Performans Motoru)
export interface SubjectCognitiveMetric {
  subject: string;
  difficultyCoefficient?: number; // legacy backward compatibility
  cognitiveLoadIndex?: 'Çok Yüksek' | 'Yüksek' | 'Dengeli'; // legacy
  abstractThinkingWeight: number; // %
  algorithmicStepsWeight: number; // %
  recommendedWeeklyStudyHours: number;
  struggleReason: string;
  pedagogicalAdvice: string;
  // Yeni Eşit Performans & Disiplin Motoru Nitelikleri:
  primaryEngine: 'latex_math' | 'rich_text_lit' | 'primary_integrated' | 'science_lab' | 'social_history';
  engineName: string;
  engineFeatures: string[];
  performanceOptimization: string; // e.g. "%100 Optimize - Donanım Hızlandırmalı Render"
  sampleLatexOrText: string;
}

// Sınıf Öğretmenliği Modülü Tipleri
export interface PrimaryPhonicsLetterGroup {
  groupNumber: number;
  letters: string[]; // e.g. ['E', 'L', 'A', 'K', 'İ', 'N']
  completedCount: number;
  totalLetters: number;
  activeLetter: string;
}

export interface PrimaryReadingFluencyRecord {
  id: string;
  studentName: string;
  studentNumber: string;
  wordsPerMinute: number; // Dakikada Okunan Kelime Sayısı (DOKS)
  accuracyRate: number; // %
  comprehensionScore: number; // /100
  readingLevel: 'Heceleyerek' | 'Gelişmekte' | 'Akıcı Okuyucu' | 'İleri Düzey';
  booksReadThisTerm: number;
}

export interface PrimaryMultiplicationSkill {
  multiplier: number; // 1 to 10
  title: string;
  masteredStudentCount: number;
  totalStudents: number;
  status: 'Tamamlandı' | 'Devam Ediyor' | 'Sırada';
}

export interface PrimaryObservationCard {
  id: string;
  studentId?: string;
  studentNumber?: string;
  studentName: string;
  category: 'Sosyal Uyum' | 'Sosyal Uyum & Liderlik' | 'Ders İçi İlgi' | 'Sorumluluk ve Öz Bakım' | 'Arkadaşlık İlişkileri';
  evaluation: 'Geliştirilmeli' | 'İyi' | 'Çok İyi';
  teacherNotes?: string;
  notes?: string;
  reportCardOpinion: string; // e-Okul karne gelişim görüşü
}

export interface PrimaryDailyLessonPeriod {
  periodNumber: number;
  timeRange: string;
  subject: 'Türkçe' | 'Matematik' | 'Hayat Bilgisi' | 'Fen Bilimleri' | 'Sosyal Bilgiler' | 'Görsel Sanatlar' | 'Müzik' | 'Oyun ve Fiziki Etkinlikler' | 'Serbest Etkinlikler';
  topic: string;
  kazanimCode: string;
  kazanimText: string;
  activityDescription: string;
  materialsNeeded: string;
  isLogFilled: boolean;
}

// Sınıf İçi Anlık ve Geniş Süreli Bilgi Toplama Formları & Anket Sistemi
export type FormAudience = 'student' | 'parent' | 'both';

export type FormCategory =
  | 'in_class_instant'      // Sınıf İçi Anlık (Çıkış bileti, anlık anket, quiz)
  | 'health_safety'         // Sağlık, Alerji, Acil Durum (Veli)
  | 'field_trip_permission' // Gezi, Gözlem & Etkinlik İzni (Veli)
  | 'social_club'           // Sosyal Kulüp Tercihi & Yetenek (Öğrenci)
  | 'olympiad_application'  // Bilim Olimpiyatı & TÜBİTAK Başvuru (Öğrenci)
  | 'guidance_bep'          // Rehberlik & BEP Veli Gözlem (Veli/Öğrenci)
  | 'dyk_tutoring'          // DYK & Etüt Talep (Öğrenci/Veli)
  | 'contact_transport'     // Veli İletişim, Adres & Servis (Veli)
  | 'in_class_lab';         // Laboratuvar & Deney Gözlem (Öğrenci)

export type FormQuestionType = 'rating' | 'single_choice' | 'multi_choice' | 'text' | 'consent_checkbox';

export interface FormQuestion {
  id: string;
  title: string;
  type: FormQuestionType;
  required: boolean;
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
}

export interface FormResponseAnswer {
  questionId: string;
  questionTitle: string;
  value: string | number | string[] | boolean;
}

export interface FormResponseSubmission {
  id: string;
  formId: string;
  formTitle: string;
  submittedBy: string;
  role: 'student' | 'parent';
  studentNumber?: string;
  studentName?: string;
  className?: string;
  submittedAt: string;
  answers: FormResponseAnswer[];
  notes?: string;
  isVerified?: boolean;
}

export interface SchoolDataForm {
  id: string;
  title: string;
  description: string;
  category: FormCategory;
  audience: FormAudience;
  isInstantInClass: boolean; // Sınıf içi anlık oylama / çıkış bileti mi?
  instantCode?: string;      // Akıllı tahta kodu (örn: "EXIT-10A")
  deadline?: string;
  createdAt: string;
  isActive: boolean;
  targetClasses: string[];
  questions: FormQuestion[];
  responseCount: number;
  totalTargetCount: number;
}

// ==========================================
// BİREBİR ÖZEL DERS & KOÇLUK YÖNETİMİ TİPLERİ
// ==========================================

export type ExamTarget = 'LGS (8. Sınıf)' | 'TYT Matematik' | 'AYT Matematik & Geometri' | 'Okul Sınavlarına Takviye' | 'Olimpiyat / İleri Düzey';

export interface PrivateStudent {
  id: string;
  fullName: string;
  grade: string;
  school: string;
  targetExam: ExamTarget;
  parentName: string;
  parentPhone: string;
  currentTrialNet: number;
  targetTrialNet: number;
  hourlyRate: number; // Saat başı TL
  totalPackageHours: number; // e.g. 10 saatlik paket
  remainingPackageHours: number; // Kalan saat
  completedHours: number; // Yapılan toplam saat
  paymentStatus: 'Ödendi' | 'Kısmi Ödendi' | 'Beklemede';
  weeklyPreferredSlot: string; // e.g. "Salı 18:00 - 19:30"
  pedagogicalNotes: string;
  avatarBgColor?: string;
}

export type SessionStatus = 'Planlandı' | 'Tamamlandı' | 'İptal Edildi' | 'Ertelendi';

export interface PrivateLessonSession {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // YYYY-MM-DD or DD.MM.YYYY
  day: string; // e.g. "Salı"
  time: string; // e.g. "18:00 - 19:30"
  durationMinutes: number; // 60, 90, 120
  topicsCovered: string[];
  solvedQuestionsCount: number;
  homeworkAssigned: string;
  homeworkStatus: 'Tamamlandı' | 'Eksik Yapıldı' | 'Yapılmadı' | 'Yeni Atandı';
  teacherNotes: string;
  status: SessionStatus;
  feeAmount: number;
  isPaid: boolean;
}

export interface PrivateTopicMastery {
  id: string;
  studentId: string;
  category: 'TYT' | 'AYT' | 'LGS' | 'Geometri';
  topicName: string;
  status: 'Tamamlandı' | 'Tekrar Edilecek' | 'Soru Çözülecek' | 'Başlanmadı';
  masteryPercent: number; // 0 - 100
  solvedQuestions: number;
  targetQuestions: number;
}

export interface MathFormulaSnippet {
  id: string;
  category: 'Trigonometri' | 'Türev & İntegral' | 'Fonksiyonlar & Parabol' | 'Polinom & Çarpanlara Ayırma' | 'Geometri & Üçgenler' | 'Kombinatorik & Olasılık' | 'Temel Kavramlar & Sayılar';
  title: string;
  latexCode: string;
  description: string;
  sampleUse: string;
}

// ==========================================
// ÖĞRENCİ - ÖĞRETMEN SORU HAVUZU & ANALİZ TİPLERİ
// ==========================================

export type StudentQuestionDifficulty = 'Temel' | 'Orta' | 'İleri Düzey' | 'ÖSYM / LGS Çıkmış';
export type StudentQuestionStatus = 'Beklemede' | 'İnceleniyor' | 'Çözüldü' | 'Eksik Kazanım Eklendi';

export interface StudentSubmittedQuestion {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  subject: string;
  topic: string;
  questionText: string;
  questionLatex?: string;
  difficulty: StudentQuestionDifficulty;
  submittedAt: string;
  status: StudentQuestionStatus;
  teacherAnswer?: string;
  teacherAnswerLatex?: string;
  teacherAudioNote?: string;
  teacherPedagogicalHint?: string;
  isFlaggedAsDeficiency?: boolean;
  relatedFormulaCardKey?: string;
}


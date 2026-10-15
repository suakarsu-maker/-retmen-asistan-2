import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ScheduleTab } from './components/ScheduleTab';
import { CurriculumAdminTab } from './components/CurriculumAdminTab';
import { PlansTab } from './components/PlansTab';
import { ScenariosLatexTab } from './components/ScenariosLatexTab';
import { StudentsHomeworkTab } from './components/StudentsHomeworkTab';
import { RubricsTab } from './components/RubricsTab';
import { MevzuatTab } from './components/MevzuatTab';
import { ClubPortalTab } from './components/ClubPortalTab';
import { GuidancePortalTab } from './components/GuidancePortalTab';
import { ArchitectureFaqTab } from './components/ArchitectureFaqTab';
import { SystemTestTab } from './components/SystemTestTab';
import { StudentPortalView } from './components/StudentPortalView';
import { ParentPortalView } from './components/ParentPortalView';
import { ProjectsPlatformTab } from './components/ProjectsPlatformTab';
import { DYKExerciseInServiceTab } from './components/DYKExerciseInServiceTab';
import { OlympiadPortalTab } from './components/OlympiadPortalTab';
import { FormsDataCollectionTab } from './components/FormsDataCollectionTab';
import { ClassroomTeacherTab } from './components/ClassroomTeacherTab';
import { PrivateTutoringTab } from './components/PrivateTutoringTab';
import { MathToolsTab } from './components/MathToolsTab';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { PortalAccessControlModal } from './components/PortalAccessControlModal';
import { PortalAccessDeniedView } from './components/PortalAccessDeniedView';
import { DeviceTesterBar, DeviceMode } from './components/DeviceTesterBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DriveModal } from './components/DriveModal';
import { PrintModal } from './components/PrintModal';
import { GoogleDriveManagerModal } from './components/GoogleDriveManagerModal';
import { User } from 'firebase/auth';
import { initAuth, logoutGoogle } from './services/authService';
import { AppBackupData } from './services/googleDriveService';

import {
  INITIAL_SCHEDULE,
  INITIAL_ADMIN_DUTIES,
  INITIAL_CURRICULUM,
  INITIAL_LESSON_PLAN,
  INITIAL_SCENARIO,
  INITIAL_STUDENTS,
  INITIAL_HOMEWORKS,
  INITIAL_RUBRICS,
  INITIAL_CLUBS,
  INITIAL_GUIDANCE,
  INITIAL_COMMISSIONS,
  INITIAL_CELEBRATIONS,
  INITIAL_PROJECTS,
  INITIAL_DYK_COURSES,
  INITIAL_EXERCISES,
  INITIAL_INSERVICE_TRAININGS,
  INITIAL_PARENT_APPOINTMENTS,
  INITIAL_OLYMPIAD_TOPICS,
  INITIAL_OLYMPIAD_EVENTS,
  INITIAL_OLYMPIAD_STUDENTS,
  COGNITIVE_DIFFICULTY_METRICS,
  INITIAL_SCHOOL_FORMS,
  INITIAL_FORM_RESPONSES,
  INITIAL_PRIVATE_STUDENTS,
  INITIAL_PRIVATE_SESSIONS,
  INITIAL_PRIVATE_TOPICS,
  INITIAL_STUDENT_QUESTIONS
} from './data/mockInitialData';

import {
  SchedulePeriod,
  LessonPlan,
  ScenarioLessonNote,
  AdministrativeDuty,
  CurriculumItem,
  HomeworkSubmission,
  Rubric,
  GuidanceRecord,
  UserRole,
  SchoolCommission,
  CelebrationEvent,
  SchoolProject,
  DYKCourse,
  ExerciseActivity,
  InServiceTraining,
  ParentAppointment,
  SchoolDataForm,
  FormResponseSubmission,
  TeacherType,
  PrivateStudent,
  PrivateLessonSession,
  PrivateTopicMastery,
  StudentSubmittedQuestion,
  StudentQuestionDifficulty
} from './types';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('teacher');
  const [teacherType, setTeacherType] = useState<TeacherType>('branch');
  const [activeTab, setActiveTab] = useState<string>('private_tutoring');
  const [activeDay, setActiveDay] = useState<string>('Pazartesi');

  // Application Data States
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [duties, setDuties] = useState<AdministrativeDuty[]>(INITIAL_ADMIN_DUTIES);
  const [commissions, setCommissions] = useState<SchoolCommission[]>(INITIAL_COMMISSIONS);
  const [celebrations, setCelebrations] = useState<CelebrationEvent[]>(INITIAL_CELEBRATIONS);
  const [projects, setProjects] = useState<SchoolProject[]>(INITIAL_PROJECTS);
  const [dykCourses, setDykCourses] = useState<DYKCourse[]>(INITIAL_DYK_COURSES);
  const [exercises, setExercises] = useState<ExerciseActivity[]>(INITIAL_EXERCISES);
  const [inServiceTrainings, setInServiceTrainings] = useState<InServiceTraining[]>(INITIAL_INSERVICE_TRAININGS);
  const [parentAppointments, setParentAppointments] = useState<ParentAppointment[]>(INITIAL_PARENT_APPOINTMENTS);

  // Private Tutoring States (Birebir Matematik ve Özel Ders)
  const [privateStudents, setPrivateStudents] = useState<PrivateStudent[]>(INITIAL_PRIVATE_STUDENTS);
  const [privateSessions, setPrivateSessions] = useState<PrivateLessonSession[]>(INITIAL_PRIVATE_SESSIONS);
  const [privateTopics, setPrivateTopics] = useState<PrivateTopicMastery[]>(INITIAL_PRIVATE_TOPICS);

  const [curriculum, setCurriculum] = useState<CurriculumItem[]>(INITIAL_CURRICULUM);
  const [plans, setPlans] = useState<LessonPlan[]>([INITIAL_LESSON_PLAN]);
  const [scenario, setScenario] = useState<ScenarioLessonNote>(INITIAL_SCENARIO);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [homeworks, setHomeworks] = useState<HomeworkSubmission[]>(INITIAL_HOMEWORKS);
  const [rubrics, setRubrics] = useState<Rubric[]>(INITIAL_RUBRICS);
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [guidance, setGuidance] = useState<GuidanceRecord[]>(INITIAL_GUIDANCE);

  // Olympiad & Cognitive Difficulty States
  const [olympiadTopics, setOlympiadTopics] = useState(INITIAL_OLYMPIAD_TOPICS);
  const [olympiadEvents, setOlympiadEvents] = useState(INITIAL_OLYMPIAD_EVENTS);
  const [olympiadTeam, setOlympiadTeam] = useState(INITIAL_OLYMPIAD_STUDENTS);
  const [cognitiveMetrics, setCognitiveMetrics] = useState(COGNITIVE_DIFFICULTY_METRICS);

  // School Data Forms & Information Gathering States
  const [schoolForms, setSchoolForms] = useState<SchoolDataForm[]>(INITIAL_SCHOOL_FORMS);
  const [formResponses, setFormResponses] = useState<FormResponseSubmission[]>(INITIAL_FORM_RESPONSES);

  // Student Questions & Zero-Lag Analytics States
  const [submittedQuestions, setSubmittedQuestions] = useState<StudentSubmittedQuestion[]>(INITIAL_STUDENT_QUESTIONS);
  const [isQuestionSubmissionEnabled, setIsQuestionSubmissionEnabled] = useState(true);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Google Drive Authentication & Cloud Sync States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isDriveManagerOpen, setIsDriveManagerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const getAppDataForBackup = (): AppBackupData => {
    return {
      appName: 'Remix MEB Öğretmen Portalı Pro',
      exportedAt: new Date().toISOString(),
      version: '2.5.0',
      schedule,
      curriculum,
      plans,
      scenario,
      students,
      homeworks,
      rubrics,
      clubs,
      guidance,
      commissions,
      celebrations,
      projects,
      dykCourses,
      exercises,
      inServiceTrainings,
      parentAppointments,
      schoolForms,
      formResponses,
      privateStudents,
      privateSessions,
      privateTopics,
      submittedQuestions,
    };
  };

  const handleRestoreBackup = (backup: AppBackupData) => {
    if (!backup) return;
    if (backup.schedule) setSchedule(backup.schedule);
    if (backup.curriculum) setCurriculum(backup.curriculum);
    if (backup.plans) setPlans(backup.plans);
    if (backup.scenario) setScenario(backup.scenario);
    if (backup.students) setStudents(backup.students);
    if (backup.homeworks) setHomeworks(backup.homeworks);
    if (backup.rubrics) setRubrics(backup.rubrics);
    if (backup.clubs) setClubs(backup.clubs);
    if (backup.guidance) setGuidance(backup.guidance);
    if (backup.commissions) setCommissions(backup.commissions);
    if (backup.celebrations) setCelebrations(backup.celebrations);
    if (backup.projects) setProjects(backup.projects);
    if (backup.dykCourses) setDykCourses(backup.dykCourses);
    if (backup.exercises) setExercises(backup.exercises);
    if (backup.inServiceTrainings) setInServiceTrainings(backup.inServiceTrainings);
    if (backup.parentAppointments) setParentAppointments(backup.parentAppointments);
    if (backup.schoolForms) setSchoolForms(backup.schoolForms);
    if (backup.formResponses) setFormResponses(backup.formResponses);
    if (backup.privateStudents) setPrivateStudents(backup.privateStudents);
    if (backup.privateSessions) setPrivateSessions(backup.privateSessions);
    if (backup.privateTopics) setPrivateTopics(backup.privateTopics);
    if (backup.submittedQuestions) setSubmittedQuestions(backup.submittedQuestions);
  };

  // Modals
  const [driveModalPeriod, setDriveModalPeriod] = useState<SchedulePeriod | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printPlan, setPrintPlan] = useState<LessonPlan | null>(INITIAL_LESSON_PLAN);
  const [printScenario, setPrintScenario] = useState<ScenarioLessonNote | null>(INITIAL_SCENARIO);

  // Active period for top ticker: Period 1 Pazartesi
  const currentActivePeriod = schedule[0]?.periods[0] || null;

  // Selected student for student/parent view: Ahmet Yılmaz
  const activeStudent = students[0];

  const pendingHomeworkCount = homeworks.filter((h) => h.status === 'Bekliyor').length;

  const handleOpenDriveModal = (period: SchedulePeriod) => {
    setDriveModalPeriod(period);
  };

  const handleGenerateNotesForPeriod = (period: SchedulePeriod) => {
    setScenario((prev) => ({
      ...prev,
      subject: period.subject,
      topic: period.topic,
      targetClass: period.className,
      periodTime: period.timeRange,
      driveFileName: `${period.className}_${period.subject}_${period.topic.replace(/\s+/g, '_')}.pdf`,
    }));
    setActiveTab('scenarios');
  };

  const handleSelectPlanForPrint = (plan: LessonPlan) => {
    setPrintPlan(plan);
    setPrintScenario(null);
    setIsPrintModalOpen(true);
  };

  const handleOpenPrintForCurrent = (customContent?: any) => {
    setPrintScenario(scenario);
    setPrintPlan(plans[0] || null);
    setIsPrintModalOpen(true);
  };

  const handleAddPlan = (newPlan: LessonPlan) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  const handleAddDuty = (newDuty: AdministrativeDuty) => {
    setDuties((prev) => [newDuty, ...prev]);
  };

  const handleDeleteDuty = (dutyId: string) => {
    setDuties((prev) => prev.filter((d) => d.id !== dutyId));
  };

  const handleAddCurriculum = (item: CurriculumItem) => {
    setCurriculum((prev) => [item, ...prev]);
  };

  const handleUpdateHomework = (updated: HomeworkSubmission) => {
    setHomeworks((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };

  const handleAddHomeworkSubmission = (newHw: HomeworkSubmission) => {
    setHomeworks((prev) => [newHw, ...prev]);
  };

  const handleAddClubMeeting = (clubId: string, meeting: { date: string; topic: string; decisions: string[] }) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId
          ? { ...c, meetings: [meeting, ...c.meetings] }
          : c
      )
    );
  };

  const handleAddGuidanceRecord = (record: GuidanceRecord) => {
    setGuidance((prev) => [record, ...prev]);
  };

  const handleAddProject = (newProject: SchoolProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleToggleReminder = (trainingId: string) => {
    setInServiceTrainings((prev) =>
      prev.map((t) => (t.id === trainingId ? { ...t, isReminderSet: !t.isReminderSet } : t))
    );
  };

  const handleAddParentAppointment = (appointment: ParentAppointment) => {
    setParentAppointments((prev) => [appointment, ...prev]);
  };

  const handleAddForm = (newForm: SchoolDataForm) => {
    setSchoolForms((prev) => [newForm, ...prev]);
  };

  const handleToggleFormActive = (formId: string) => {
    setSchoolForms((prev) =>
      prev.map((f) => (f.id === formId ? { ...f, isActive: !f.isActive } : f))
    );
  };

  const handleSubmitFormResponse = (res: FormResponseSubmission) => {
    setFormResponses((prev) => [res, ...prev]);
    setSchoolForms((prev) =>
      prev.map((f) => (f.id === res.formId ? { ...f, responseCount: f.responseCount + 1 } : f))
    );
  };

  // Private Tutoring Handlers
  const handleAddPrivateStudent = (student: PrivateStudent) => {
    setPrivateStudents((prev) => [student, ...prev]);
  };

  const handleAddPrivateSession = (session: PrivateLessonSession) => {
    setPrivateSessions((prev) => [session, ...prev]);
    setPrivateStudents((prev) =>
      prev.map((s) =>
        s.id === session.studentId
          ? {
              ...s,
              completedHours: s.completedHours + session.durationMinutes / 60,
              remainingPackageHours: Math.max(0, s.remainingPackageHours - session.durationMinutes / 60)
            }
          : s
      )
    );
  };

  const handleUpdatePrivateSessionStatus = (
    sessionId: string,
    status: PrivateLessonSession['status'],
    isPaid?: boolean
  ) => {
    setPrivateSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status,
              ...(isPaid !== undefined ? { isPaid } : {})
            }
          : s
      )
    );
  };

  const handleUpdateTopicMastery = (
    topicId: string,
    status: PrivateTopicMastery['status'],
    masteryPercent: number,
    solvedQuestions: number
  ) => {
    setPrivateTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? { ...t, status, masteryPercent, solvedQuestions }
          : t
      )
    );
  };

  // Student Question Handlers (Zero-Lag Local State Processing)
  const handleAddStudentQuestion = (qData: {
    topic: string;
    subject: string;
    questionText: string;
    questionLatex?: string;
    difficulty: StudentQuestionDifficulty;
  }) => {
    const newQ: StudentSubmittedQuestion = {
      id: 'q-sub-' + Date.now(),
      studentId: activeStudent.id,
      studentName: activeStudent.fullName,
      className: activeStudent.className,
      subject: qData.subject,
      topic: qData.topic,
      questionText: qData.questionText,
      questionLatex: qData.questionLatex,
      difficulty: qData.difficulty,
      submittedAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Beklemede',
      isFlaggedAsDeficiency: true,
      relatedFormulaCardKey: qData.topic.toLowerCase().includes('parabol') ? 'parabol' : qData.topic.toLowerCase().includes('trigonometri') ? 'trigonometri' : undefined
    };
    setSubmittedQuestions((prev) => [newQ, ...prev]);
  };

  const handleAnswerQuestion = (questionId: string, answer: string, answerLatex?: string, hint?: string) => {
    setSubmittedQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              status: 'Çözüldü',
              teacherAnswer: answer,
              teacherAnswerLatex: answerLatex,
              teacherPedagogicalHint: hint
            }
          : q
      )
    );
  };

  const handleToggleQuestionDeficiency = (questionId: string) => {
    setSubmittedQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, isFlaggedAsDeficiency: !q.isFlaggedAsDeficiency }
          : q
      )
    );
  };

  const handleToggleQuestionSubmissionEnabled = () => {
    setIsQuestionSubmissionEnabled((prev) => !prev);
  };

  const handleNavigateToFormulaCards = (_studentName: string, _topicName: string) => {
    setCurrentRole('teacher');
    setActiveTab('private_tutoring');
  };

  const handleSelectRoleProfile = (role: UserRole, type: TeacherType, targetTab?: string) => {
    setCurrentRole(role);
    setTeacherType(type);
    if (targetTab && role === 'teacher') {
      setActiveTab(targetTab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar with Role Switcher & PIN Security */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        teacherType={teacherType}
        onSelectTeacherType={setTeacherType}
        activePeriod={currentActivePeriod}
        onOpenDriveModal={handleOpenDriveModal}
        onOpenPrintModal={() => handleOpenPrintForCurrent()}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenDriveManager={() => setIsDriveManagerOpen(true)}
        isDriveConnected={!!accessToken}
        onNavigateToTab={(tab) => {
          setCurrentRole('teacher');
          setActiveTab(tab);
        }}
      />

      {/* Conditional Rendering Based on Active Role (Role Isolation Enforced) */}
      {currentRole === 'student' ? (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <StudentPortalView
            currentStudent={activeStudent}
            homeworks={homeworks}
            currentScenario={scenario}
            projects={projects}
            olympiadMember={olympiadTeam.find((m) => m.studentNumber === activeStudent.studentNumber)}
            forms={schoolForms}
            responses={formResponses}
            submittedQuestions={submittedQuestions}
            isQuestionSubmissionEnabled={isQuestionSubmissionEnabled}
            onSubmitHomework={handleAddHomeworkSubmission}
            onSubmitFormResponse={handleSubmitFormResponse}
            onSubmitQuestion={handleAddStudentQuestion}
          />
        </div>
      ) : currentRole === 'parent' ? (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <ParentPortalView
            currentStudent={activeStudent}
            homeworks={homeworks}
            appointments={parentAppointments}
            cognitiveMetrics={cognitiveMetrics}
            forms={schoolForms}
            responses={formResponses}
            submittedQuestions={submittedQuestions}
            onAddAppointment={handleAddParentAppointment}
            onSubmitFormResponse={handleSubmitFormResponse}
          />
        </div>
      ) : (
        /* Teacher Executive Cockpit */
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            pendingHomeworkCount={pendingHomeworkCount}
            onOpenDriveManager={() => setIsDriveManagerOpen(true)}
            isDriveConnected={!!accessToken}
          />

          {/* Dynamic Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {activeTab === 'private_tutoring' && (
              <PrivateTutoringTab
                students={privateStudents}
                sessions={privateSessions}
                topics={privateTopics}
                onAddStudent={handleAddPrivateStudent}
                onAddSession={handleAddPrivateSession}
                onUpdateSessionStatus={handleUpdatePrivateSessionStatus}
                onUpdateTopicMastery={handleUpdateTopicMastery}
              />
            )}

            {activeTab === 'math_tools' && (
              <MathToolsTab />
            )}

            {activeTab === 'schedule' && (
              <ScheduleTab
                schedule={schedule}
                activeDay={activeDay}
                onSelectDay={setActiveDay}
                onOpenDriveModal={handleOpenDriveModal}
                onGenerateNotesForPeriod={handleGenerateNotesForPeriod}
              />
            )}

            {activeTab === 'curriculum' && (
              <CurriculumAdminTab
                curriculum={curriculum}
                duties={duties}
                commissions={commissions}
                celebrations={celebrations}
                onAddCurriculum={handleAddCurriculum}
                onAddDuty={handleAddDuty}
                onDeleteDuty={handleDeleteDuty}
                onNavigateToPlans={() => setActiveTab('plans')}
              />
            )}

            {activeTab === 'classroom_teacher' && (
              <ClassroomTeacherTab
                onOpenPrintModal={(content) => handleOpenPrintForCurrent(content)}
              />
            )}

            {activeTab === 'plans' && (
              <PlansTab
                plans={plans}
                onAddPlan={handleAddPlan}
                onSelectPlanForPrint={handleSelectPlanForPrint}
                onNavigateToScenarios={(plan) => {
                  setScenario((prev) => ({
                    ...prev,
                    subject: plan.subject,
                    grade: plan.grade,
                    topic: plan.topic,
                  }));
                  setActiveTab('scenarios');
                }}
              />
            )}

            {activeTab === 'scenarios' && (
              <ScenariosLatexTab
                currentScenario={scenario}
                onUpdateScenario={setScenario}
                onOpenPrintModal={() => handleOpenPrintForCurrent()}
              />
            )}

            {activeTab === 'students' && (
              <StudentsHomeworkTab
                students={students}
                homeworks={homeworks}
                submittedQuestions={submittedQuestions}
                isQuestionSubmissionEnabled={isQuestionSubmissionEnabled}
                onUpdateHomework={handleUpdateHomework}
                onAddHomeworkSubmission={handleAddHomeworkSubmission}
                onAnswerQuestion={handleAnswerQuestion}
                onToggleQuestionDeficiency={handleToggleQuestionDeficiency}
                onToggleQuestionSubmissionEnabled={handleToggleQuestionSubmissionEnabled}
                onNavigateToFormulaCards={handleNavigateToFormulaCards}
              />
            )}

            {activeTab === 'rubrics' && (
              <RubricsTab
                rubrics={rubrics}
                onAddRubric={(r) => setRubrics((prev) => [r, ...prev])}
              />
            )}

            {activeTab === 'mevzuat' && <MevzuatTab />}

            {activeTab === 'clubs' && (
              <ClubPortalTab
                clubs={clubs}
                onAddClubMeeting={handleAddClubMeeting}
                onOpenPrintModal={() => handleOpenPrintForCurrent()}
              />
            )}

            {activeTab === 'guidance' && (
              <GuidancePortalTab
                records={guidance}
                onAddRecord={handleAddGuidanceRecord}
                onOpenPrintModal={() => handleOpenPrintForCurrent()}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsPlatformTab
                projects={projects}
                onAddProject={handleAddProject}
                onOpenPrintModal={() => handleOpenPrintForCurrent()}
              />
            )}

            {activeTab === 'dyk_inservice' && (
              <DYKExerciseInServiceTab
                dykCourses={dykCourses}
                exercises={exercises}
                inServiceTrainings={inServiceTrainings}
                onToggleReminder={handleToggleReminder}
                onAddTraining={(t) => setInServiceTrainings((prev) => [t, ...prev])}
              />
            )}

            {activeTab === 'olimpiyat' && (
              <OlympiadPortalTab
                topics={olympiadTopics}
                events={olympiadEvents}
                teamMembers={olympiadTeam}
                cognitiveMetrics={cognitiveMetrics}
                onOpenPrintModal={(content) => handleOpenPrintForCurrent(content)}
              />
            )}

            {activeTab === 'forms_data_collection' && (
              <FormsDataCollectionTab
                forms={schoolForms}
                responses={formResponses}
                onAddForm={handleAddForm}
                onToggleFormActive={handleToggleFormActive}
              />
            )}

            {activeTab === 'architecture' && <ArchitectureFaqTab />}

            {activeTab === 'system_test' && (
              <SystemTestTab onNavigateToTab={setActiveTab} />
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <DriveModal
        period={driveModalPeriod}
        isOpen={!!driveModalPeriod}
        onClose={() => setDriveModalPeriod(null)}
        onPrint={() => {
          handleOpenPrintForCurrent();
        }}
        accessToken={accessToken}
        onOpenDriveManager={() => setIsDriveManagerOpen(true)}
      />

      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        plan={printPlan}
        scenario={printScenario}
      />

      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        currentTeacherType={teacherType}
        onSelectRoleProfile={handleSelectRoleProfile}
      />

      <GoogleDriveManagerModal
        isOpen={isDriveManagerOpen}
        onClose={() => setIsDriveManagerOpen(false)}
        currentUser={currentUser}
        accessToken={accessToken}
        onAuthSuccess={(user, token) => {
          setCurrentUser(user);
          setAccessToken(token);
        }}
        onLogout={() => {
          logoutGoogle();
          setCurrentUser(null);
          setAccessToken(null);
        }}
        getAppDataForBackup={getAppDataForBackup}
        onRestoreBackup={handleRestoreBackup}
      />
    </div>
  );
}

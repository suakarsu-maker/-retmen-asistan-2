export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  size?: string;
  description?: string;
}

export interface AppBackupData {
  appName: string;
  exportedAt: string;
  version: string;
  schedule: any;
  curriculum: any;
  plans: any;
  scenario: any;
  students: any;
  homeworks: any;
  rubrics: any;
  clubs: any;
  guidance: any;
  commissions: any;
  celebrations: any;
  projects: any;
  dykCourses: any;
  exercises: any;
  inServiceTrainings: any;
  parentAppointments: any;
  schoolForms: any;
  formResponses: any;
  privateStudents: any;
  privateSessions: any;
  privateTopics: any;
  submittedQuestions: any;
}

/**
 * List files created or accessible by this app in Google Drive
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFileItem[]> {
  try {
    const query = encodeURIComponent("trashed = false");
    const fields = encodeURIComponent('files(id, name, mimeType, webViewLink, webContentLink, createdTime, modifiedTime, size, description)');
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=modifiedTime desc`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Drive dosyaları listelenemedi (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Drive files listing error:', error);
    throw error;
  }
}

/**
 * Upload a text or JSON file to Google Drive using multipart upload
 */
export async function uploadFileToDrive(
  accessToken: string,
  options: {
    name: string;
    mimeType: string;
    content: string;
    description?: string;
  }
): Promise<DriveFileItem> {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: options.name,
    mimeType: options.mimeType,
    description: options.description || 'Remix MEB Öğretmen Asistanı tarafından oluşturuldu',
  };

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${options.mimeType}; charset=UTF-8\r\n\r\n` +
    options.content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,createdTime,modifiedTime,size,description',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive dosyası yüklenemedi (${response.status}): ${errText}`);
  }

  return await response.json();
}

/**
 * Read the content of a file from Google Drive
 */
export async function getDriveFileContent(accessToken: string, fileId: string): Promise<string> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Drive dosya içeriği okunamadı (${response.status}): ${errText}`);
  }

  return await response.text();
}

/**
 * Delete a file from Google Drive
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive dosyası silinemedi (${response.status}): ${errText}`);
  }
}

/**
 * Full application state backup to Google Drive
 */
export async function saveAppBackupToDrive(
  accessToken: string,
  backupData: AppBackupData
): Promise<DriveFileItem> {
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `Remix_Ogretmen_Asistani_Tam_Yedek_${dateStr}.json`;
  const content = JSON.stringify(backupData, null, 2);

  return await uploadFileToDrive(accessToken, {
    name: fileName,
    mimeType: 'application/json',
    content,
    description: `Remix MEB Öğretmen Portalı Tam Sistem Yedeği - ${new Date().toLocaleString('tr-TR')}`,
  });
}

/**
 * Upload lesson plan to Google Drive
 */
export async function saveLessonPlanToDrive(
  accessToken: string,
  plan: {
    grade: string;
    subject: string;
    topic: string;
    weekNumber: number;
    achievements: string[];
    activities: string;
    assessment: string;
  }
): Promise<DriveFileItem> {
  const cleanTopic = plan.topic.replace(/[^a-zA-Z0-9ığüşöçİĞÜŞÖÇ]/g, '_').slice(0, 30);
  const fileName = `MEB_Plan_${plan.grade}_${plan.subject}_${cleanTopic}.json`;
  const content = JSON.stringify(plan, null, 2);

  return await uploadFileToDrive(accessToken, {
    name: fileName,
    mimeType: 'application/json',
    content,
    description: `MEB ${plan.grade} ${plan.subject} Haftalık Ders Planı: ${plan.topic}`,
  });
}

/**
 * Upload schedule period notes to Google Drive
 */
export async function savePeriodNotesToDrive(
  accessToken: string,
  period: {
    className: string;
    subject: string;
    topic: string;
    timeRange: string;
    classroom: string;
  },
  detailedNotes?: string
): Promise<DriveFileItem> {
  const safeName = `${period.className}_${period.subject}_Ders_Notu`.replace(/\s+/g, '_');
  const fileName = `${safeName}.md`;

  const markdownContent = `# ${period.className} - ${period.subject}
**Ders Saati:** ${period.timeRange}
**Derslik:** ${period.classroom}
**İşlenen Konu:** ${period.topic}
**Kayıt Tarihi:** ${new Date().toLocaleString('tr-TR')}

---

## Ders Kazanım ve İşleniş Özeti
- MEB Müfredatına tam uyumlu işleniş planlandı.
- Öğrenci etkileşimi ve formül çözümleri tamamlandı.

${detailedNotes ? `\n## Detaylı Notlar:\n${detailedNotes}` : ''}

---
*Remix MEB Öğretmen Asistanı Google Drive Entegrasyonu tarafından otomatik üretildi.*
`;

  return await uploadFileToDrive(accessToken, {
    name: fileName,
    mimeType: 'text/markdown',
    content: markdownContent,
    description: `${period.className} ${period.subject} - ${period.topic} dersi notları`,
  });
}

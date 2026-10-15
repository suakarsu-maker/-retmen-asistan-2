import React, { useState, useEffect } from 'react';
import {
  HardDrive,
  Cloud,
  CloudUpload,
  CloudDownload,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  X,
  FileText,
  Database,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  listDriveFiles,
  saveAppBackupToDrive,
  getDriveFileContent,
  deleteDriveFile,
  DriveFileItem,
  AppBackupData
} from '../services/googleDriveService';
import { googleSignIn, logoutGoogle } from '../services/authService';

interface GoogleDriveManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  onLogout: () => void;
  getAppDataForBackup: () => AppBackupData;
  onRestoreBackup: (backupData: AppBackupData) => void;
}

export const GoogleDriveManagerModal: React.FC<GoogleDriveManagerModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  accessToken,
  onAuthSuccess,
  onLogout,
  getAppDataForBackup,
  onRestoreBackup,
}) => {
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string; link?: string } | null>(null);

  // Destructive Confirmation Modal state (Mandatory per Google Workspace Integration Skill)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: 'delete' | 'restore';
    targetFileId?: string;
    targetFileName?: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionType: 'delete',
  });

  // Fetch files whenever modal opens and token is available
  useEffect(() => {
    if (isOpen && accessToken) {
      handleRefreshFiles(accessToken);
    }
  }, [isOpen, accessToken]);

  const handleRefreshFiles = async (token = accessToken) => {
    if (!token) return;
    setIsLoadingFiles(true);
    try {
      const files = await listDriveFiles(token);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Drive dosyaları getirilemedi:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setFeedbackMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
        setFeedbackMessage({
          type: 'success',
          text: `Google Drive'a ${res.user.email} hesabıyla başarıyla bağlandınız!`,
        });
        handleRefreshFiles(res.accessToken);
      }
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: `Google ile giriş yapılamadı: ${err.message || 'Yetkilendirme reddedildi veya pencere kapatıldı.'}`,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleFullBackup = async () => {
    if (!accessToken) {
      setFeedbackMessage({ type: 'error', text: 'Lütfen önce Google hesabınızla giriş yapınız.' });
      return;
    }

    setIsUploading(true);
    setFeedbackMessage(null);
    try {
      const currentData = getAppDataForBackup();
      const uploadedFile = await saveAppBackupToDrive(accessToken, currentData);
      setFeedbackMessage({
        type: 'success',
        text: `Tüm uygulama verileri başarıyla Google Drive'a aktarıldı: ${uploadedFile.name}`,
        link: uploadedFile.webViewLink,
      });
      await handleRefreshFiles(accessToken);
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: `Drive'a yedekleme başarısız: ${err.message}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Open confirmation modal for restore
  const promptRestore = (file: DriveFileItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Yedeği Geri Yükle',
      description: `"${file.name}" dosyasındaki tüm ders programı, MEB planları, öğrenci soruları ve verileri uygulamaya yüklenecektir. Mevcut verilerin üzerine yazılacaktır. Devam etmek istiyor musunuz?`,
      actionType: 'restore',
      targetFileId: file.id,
      targetFileName: file.name,
    });
  };

  // Open confirmation modal for delete
  const promptDelete = (file: DriveFileItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Google Drive Dosyasını Sil',
      description: `"${file.name}" dosyası Google Drive hesabınızdan kalıcı olarak silinecektir. Bu işlem geri alınamaz. Onaylıyor musunuz?`,
      actionType: 'delete',
      targetFileId: file.id,
      targetFileName: file.name,
    });
  };

  const handleConfirmAction = async () => {
    if (!accessToken || !confirmDialog.targetFileId) return;

    if (confirmDialog.actionType === 'delete') {
      try {
        await deleteDriveFile(accessToken, confirmDialog.targetFileId);
        setFeedbackMessage({
          type: 'success',
          text: `"${confirmDialog.targetFileName}" dosyası Google Drive'dan başarıyla silindi.`,
        });
        setDriveFiles((prev) => prev.filter((f) => f.id !== confirmDialog.targetFileId));
      } catch (err: any) {
        setFeedbackMessage({
          type: 'error',
          text: `Dosya silinemedi: ${err.message}`,
        });
      }
    } else if (confirmDialog.actionType === 'restore') {
      setIsRestoring(true);
      try {
        const contentStr = await getDriveFileContent(accessToken, confirmDialog.targetFileId);
        const parsed = JSON.parse(contentStr);
        onRestoreBackup(parsed);
        setFeedbackMessage({
          type: 'success',
          text: `"${confirmDialog.targetFileName}" yedeği sisteme başarıyla geri yüklendi!`,
        });
      } catch (err: any) {
        setFeedbackMessage({
          type: 'error',
          text: `Geri yükleme başarısız: Geçerli bir yedek formatı bulunamadı (${err.message})`,
        });
      } finally {
        setIsRestoring(false);
      }
    }

    setConfirmDialog({ isOpen: false, title: '', description: '', actionType: 'delete' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Google Workspace
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Google Drive Senkronizasyon
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Google Drive Bulut Taşıma & Yedekleme Merkezi
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          {/* Feedback Banner */}
          {feedbackMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-start justify-between gap-3 border ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : feedbackMessage.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedbackMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{feedbackMessage.text}</span>
              </div>
              {feedbackMessage.link && (
                <a
                  href={feedbackMessage.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 shrink-0"
                >
                  <span>Drive'da Aç</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Account Authentication Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Google Kullanıcısı'}
                    className="w-11 h-11 rounded-full border border-slate-300"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm">
                    {currentUser?.email ? currentUser.email[0].toUpperCase() : 'G'}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {currentUser ? currentUser.displayName || 'Google Kullanıcısı' : 'Google Hesabı Bağlı Değil'}
                    {currentUser && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Bağlı" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {currentUser?.email || 'Verilerinizi Drive üzerinde saklamak için oturum açın'}
                  </div>
                </div>
              </div>

              <div>
                {!currentUser || !accessToken ? (
                  /* Standard Google Sign-In button specification */
                  <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 shadow-xs transition cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    <span>{isSigningIn ? 'Giriş Yapılıyor...' : 'Google ile Bağlan'}</span>
                  </button>
                ) : (
                  <button
                    onClick={onLogout}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
                  >
                    Bağlantıyı Kes
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions / Main Backup Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
                  <CloudUpload className="w-4 h-4 text-amber-600" />
                  <span>Uygulamayı Drive'a Taşı & Yedekle</span>
                </div>
                <p className="text-[11px] text-amber-900/80 leading-relaxed">
                  Tüm MEB ders programını, yıllık planları, senaryoları, öğrenci soruları ve analizlerini Google Drive'da tek tıkla arşivleyin.
                </p>
              </div>
              <button
                onClick={handleFullBackup}
                disabled={!accessToken || isUploading}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs ${
                  !accessToken
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : isUploading
                    ? 'bg-amber-400 text-white animate-pulse'
                    : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                }`}
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Drive'a Aktarılıyor...</span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Hepsini Google Drive'a Taşı</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-200/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs mb-1">
                  <Database className="w-4 h-4 text-indigo-600" />
                  <span>Drive'dan Kolay Erişim</span>
                </div>
                <p className="text-[11px] text-indigo-900/80 leading-relaxed">
                  Drive'daki dosyalarınıza telefon, tablet veya okul bilgisayarınızdan erişebilir, dilediğiniz an tek tıkla geri yükleyebilirsiniz.
                </p>
              </div>
              <button
                onClick={() => handleRefreshFiles(accessToken)}
                disabled={!accessToken || isLoadingFiles}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs ${
                  !accessToken
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                <span>Drive Dosyalarını Yenile</span>
              </button>
            </div>
          </div>

          {/* Drive Files List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span>Google Drive'daki Uygulama Dosyaları ({driveFiles.length})</span>
              </h3>
              {accessToken && (
                <button
                  onClick={() => handleRefreshFiles(accessToken)}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Listeyi Güncelle</span>
                </button>
              )}
            </div>

            {!accessToken ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-2">
                <Cloud className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="font-semibold text-slate-700">Google Hesabı Girişi Bekleniyor</div>
                <p className="text-[11px] max-w-sm mx-auto">
                  Google Drive'daki mevcut yedeklerinizi görmek ve yeni dosya taşımak için lütfen yukarıdan Google ile giriş yapın.
                </p>
              </div>
            ) : isLoadingFiles ? (
              <div className="bg-slate-50 rounded-2xl p-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                <span>Google Drive taranıyor...</span>
              </div>
            ) : driveFiles.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-1">
                <HardDrive className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                <div className="font-semibold text-slate-700">Henüz Drive'a Dosya Taşınmadı</div>
                <p className="text-[11px]">
                  "Hepsini Google Drive'a Taşı" butonuna tıklayarak ilk tam yedeğinizi buluta aktarabilirsiniz.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {driveFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-2xs transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate" title={file.name}>
                          {file.name}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {file.modifiedTime
                              ? new Date(file.modifiedTime).toLocaleString('tr-TR')
                              : 'Bilinmiyor'}
                          </span>
                          {file.size && (
                            <span>&bull; {(parseInt(file.size, 10) / 1024).toFixed(1)} KB</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition"
                          title="Google Drive'da Görüntüle"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {/* Restore Button */}
                      {file.name.endsWith('.json') && (
                        <button
                          onClick={() => promptRestore(file)}
                          disabled={isRestoring}
                          className="px-2.5 py-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition flex items-center gap-1"
                          title="Bu Yedeği Sisteme Yükle"
                        >
                          <CloudDownload className="w-3 h-3" />
                          <span>Geri Yükle</span>
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => promptDelete(file)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Drive'dan Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Drive Güvenli API Erişimi Aktif</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
          >
            Kapat
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive Operations (Delete or Overwrite/Restore) */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  confirmDialog.actionType === 'delete'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{confirmDialog.title}</h3>
                <div className="text-[11px] text-slate-400 font-semibold truncate max-w-[260px]">
                  {confirmDialog.targetFileName}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {confirmDialog.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Vazgeç
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-xs font-bold text-white rounded-xl shadow-xs transition ${
                  confirmDialog.actionType === 'delete'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {confirmDialog.actionType === 'delete' ? 'Evet, Drive\'dan Sil' : 'Evet, Geri Yükle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

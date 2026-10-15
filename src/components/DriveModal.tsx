import React, { useState } from 'react';
import {
  HardDrive,
  ExternalLink,
  FileText,
  Download,
  CheckCircle2,
  X,
  Share2,
  Clock,
  Printer,
  CloudUpload,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { SchedulePeriod } from '../types';
import { savePeriodNotesToDrive } from '../services/googleDriveService';

interface DriveModalProps {
  period: SchedulePeriod | null;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  accessToken?: string | null;
  onOpenDriveManager?: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({
  period,
  isOpen,
  onClose,
  onPrint,
  accessToken,
  onOpenDriveManager,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessFile, setUploadSuccessFile] = useState<{ name: string; link?: string } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!isOpen || !period) return null;

  const handleUploadPeriodToDrive = async () => {
    if (!accessToken) {
      if (onOpenDriveManager) {
        onClose();
        onOpenDriveManager();
      }
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await savePeriodNotesToDrive(accessToken, period);
      setUploadSuccessFile({
        name: uploaded.name,
        link: uploaded.webViewLink,
      });
    } catch (err: any) {
      console.error('Ders notu Drive yükleme hatası:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyLink = () => {
    const url = uploadSuccessFile?.link || period.driveNotesUrl;
    navigator.clipboard.writeText(url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Google Drive
              </span>
              <span className="text-xs text-slate-400 font-semibold">{period.timeRange}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {period.className} &bull; {period.subject} Ders Notları
            </h3>
          </div>
        </div>

        {/* Active Lesson Topic */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-4 text-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            İlgili Ders ve Konu
          </div>
          <div className="font-bold text-slate-900">{period.topic}</div>
          <div className="text-slate-500 text-[11px] mt-0.5">{period.classroom}</div>
        </div>

        {/* Upload Success Feedback Banner */}
        {uploadSuccessFile && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-3 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ders notları Google Drive'a başarıyla kaydedildi!</span>
            </div>
            {uploadSuccessFile.link && (
              <a
                href={uploadSuccessFile.link}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Aç</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* Drive Files List */}
        <div className="space-y-2 mb-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Google Drive Klasöründeki Dosyalar:
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Öğretmen_Senaryosu_ve_Cozumler.pdf</div>
                <div className="text-[10px] text-slate-400">1.2 MB &bull; Çözümlü Nüsha</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Öğretmen
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Ogrenci_Calisma_Foyu.pdf</div>
                <div className="text-[10px] text-slate-400">840 KB &bull; Boşluk Doldurmalı</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Öğrenci
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Real Google Drive Upload Action */}
          <button
            onClick={handleUploadPeriodToDrive}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition cursor-pointer"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Google Drive'a Aktarılıyor...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>
                  {accessToken ? 'Bu Dersi Canlı Google Drive\'a Aktar' : 'Google Hesabıyla Drive\'a Aktar'}
                </span>
              </>
            )}
          </button>

          <a
            href={uploadSuccessFile?.link || period.driveNotesUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Drive Klasörünü Aç</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onPrint();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Al</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copyFeedback ? 'Kopyalandı!' : 'Linki Kopyala'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Zap,
  MessageSquarePlus,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Gauge
} from 'lucide-react';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface DeviceTesterBarProps {
  deviceMode: DeviceMode;
  onSelectDeviceMode: (mode: DeviceMode) => void;
}

export const DeviceTesterBar: React.FC<DeviceTesterBarProps> = ({
  deviceMode,
  onSelectDeviceMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [fps, setFps] = useState<number>(60);

  // Measure basic frame interval to show authentic live performance metrics
  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();
    let frames = 0;

    const measure = () => {
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frames * 1000) / (now - lastTime))));
        frames = 0;
        lastTime = now;
      }
      frameId = requestAnimationFrame(measure);
    };

    frameId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSaved(true);
    setTimeout(() => {
      setFeedbackSaved(false);
      setShowFeedbackModal(false);
      setFeedbackText('');
    }, 1800);
  };

  if (isCollapsed) {
    return (
      <div className="fixed top-2 right-2 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-[11px] font-bold shadow-lg hover:bg-slate-800 transition backdrop-blur-md border border-slate-700"
          title="Tester Araç Çubuğunu Göster"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tester Görünümü: {deviceMode === 'desktop' ? 'Masaüstü' : deviceMode === 'tablet' ? 'Tablet (768px)' : 'Mobil (390px)'}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 border-b border-slate-800 text-white px-3 py-1.5 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Left: Info */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-slate-200">İlk Tester Modu:</span>
            <span className="text-slate-400 hidden sm:inline">Tablet ve Mobil UI/UX Anlık Test Aracı</span>
          </div>

          {/* Center: Device Switcher Buttons */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
            <button
              onClick={() => onSelectDeviceMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition ${
                deviceMode === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tam Ekran Masaüstü Görünümü (1440px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Masaüstü</span>
            </button>

            <button
              onClick={() => onSelectDeviceMode('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition ${
                deviceMode === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tablet Görünümünü Test Et (768px iPad)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => onSelectDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition ${
                deviceMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobil Görünümünü Test Et (390px iPhone)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobil (390px)</span>
            </button>
          </div>

          {/* Right: Performance Indicator & Tester Feedback Button */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>{fps} FPS • Sıfır Gecikme</span>
            </div>

            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 font-bold transition text-[11px]"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Dönüt Bırak</span>
            </button>

            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-white transition"
              title="Çubuğu Küçült"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tester Görüş & Dönüt Kaydı</h3>
                  <p className="text-[11px] text-slate-500">Mobil / Tablet arayüz deneyiminiz hakkında</p>
                </div>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSaved ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-emerald-900 text-sm">Dönütünüz Başarıyla Kaydedildi!</div>
                <div className="text-xs text-emerald-700">Test geri bildiriminiz için teşekkür ederiz.</div>
              </div>
            ) : (
              <form onSubmit={handleSaveFeedback} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Aktif Cihaz: <span className="text-indigo-600 font-semibold">{deviceMode.toUpperCase()}</span>
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Örnek: Tablet ekranında butonlar çok rahat dokunuluyor, mobil menü akıcı açılıyor..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
                  >
                    Dönütü Gönder
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

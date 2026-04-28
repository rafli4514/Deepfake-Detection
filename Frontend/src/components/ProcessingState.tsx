import { Loader2, Film, Scan, Brain, CheckCircle2, Shield, Activity, Cpu, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Card } from "./ui/card";

export default function ProcessingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      icon: Film, 
      title: "Ekstraksi Video", 
      description: "Memecah video menjadi frame individu untuk dianalisis",
      details: ["Membaca header file...", "Mengekstrak frame per detik...", "Normalisasi resolusi..."]
    },
    { 
      icon: Scan, 
      title: "Deteksi Wajah", 
      description: "Mengidentifikasi dan melacak koordinat wajah di setiap frame",
      details: ["Menjalankan MTCNN...", "Penyelarasan landmark wajah...", "Ekstraksi wilayah minat..."]
    },
    { 
      icon: Brain, 
      title: "Analisis Deepfake", 
      description: "Menganalisis artefak manipulasi menggunakan model Xception",
      details: ["Komputasi tensor...", "Deteksi diskontinuitas spasial...", "Analisis koherensi temporal..."]
    },
    { 
      icon: Activity, 
      title: "Finalisasi Laporan", 
      description: "Menggabungkan hasil analisis menjadi laporan komprehensif",
      details: ["Kalkulasi skor akhir...", "Visualisasi Grad-CAM...", "Menyusun ringkasan..."]
    },
  ];

  useEffect(() => {
    const totalDuration = 10000; // 10 seconds total
    const intervalTime = 100;
    const stepIncrement = 100 / (totalDuration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + stepIncrement;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setCurrentStep(stepIndex);
  }, [progress]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <Card className="max-w-4xl w-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/5 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-900">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-0">
          {/* Left Panel: Visual Status */}
          <div className="lg:col-span-2 bg-gray-50/50 dark:bg-gray-900/30 p-10 flex flex-col items-center justify-center text-center border-r border-gray-100 dark:border-gray-800/50">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-teal-500 p-[2px] animate-in zoom-in duration-700">
                <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[2.4rem] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 animate-pulse" />
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                  <Cpu className="w-12 h-12 text-blue-600 dark:text-blue-400 relative z-10" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-3">Analisis Berjalan</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Sistem AI sedang bekerja keras untuk memverifikasi keaslian video Anda. Mohon tunggu sebentar.
            </p>
          </div>

          {/* Right Panel: Steps & Logs */}
          <div className="lg:col-span-3 p-10 flex flex-col">
            <div className="flex-1 space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div 
                    key={index}
                    className={`relative p-5 rounded-3xl transition-all duration-500 border ${
                      isActive 
                        ? 'bg-blue-600/5 border-blue-500/20 shadow-sm' 
                        : isCompleted 
                          ? 'bg-transparent border-transparent opacity-80' 
                          : 'bg-transparent border-transparent opacity-40 grayscale'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : isCompleted 
                            ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-bold transition-colors ${isActive ? 'text-gray-900 dark:text-white text-lg' : 'text-gray-600 dark:text-gray-400'}`}>
                            {step.title}
                          </h3>
                          {isActive && <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />}
                        </div>
                        <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-muted-foreground' : 'text-gray-400 dark:text-gray-500'}`}>
                          {step.description}
                        </p>

                        {/* Logs for active step */}
                        {isActive && (
                          <div className="mt-4 space-y-2 animate-in slide-in-from-top-4 duration-500">
                            {step.details.map((detail, dIndex) => (
                              <div key={dIndex} className="flex items-center gap-2 text-[10px] font-mono text-blue-600/70 dark:text-blue-400/70">
                                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status Keseluruhan</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}% Selesai</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
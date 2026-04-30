import { Loader2, Film, Scan, Brain, CheckCircle2, Shield, Activity, Cpu, Search, Terminal as TerminalIcon } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import api from "@/lib/api";

export default function ProcessingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Menunggu inisialisasi pipeline AI..."]);
  const location = useLocation();
  const navigate = useNavigate();
  const historyId = location.state?.historyId;
  const logEndRef = useRef<HTMLDivElement>(null);

  const steps = [
    { 
      icon: Film, 
      title: "Ekstraksi Video", 
      description: "Memecah video menjadi frame individu",
      details: ["Membaca header file...", "Mengekstrak frame per detik...", "Normalisasi resolusi..."]
    },
    { 
      icon: Scan, 
      title: "Deteksi Wajah", 
      description: "Mengidentifikasi koordinat wajah",
      details: ["Menjalankan MTCNN...", "Penyelarasan landmark wajah...", "Ekstraksi wilayah minat..."]
    },
    { 
      icon: Brain, 
      title: "Analisis Deepfake", 
      description: "Menganalisis artefak manipulasi",
      details: ["Komputasi tensor...", "Deteksi diskontinuitas spasial...", "Analisis koherensi temporal..."]
    },
    { 
      icon: Activity, 
      title: "Finalisasi", 
      description: "Menggabungkan hasil analisis",
      details: ["Kalkulasi skor akhir...", "Visualisasi Grad-CAM...", "Menyusun ringkasan..."]
    },
  ];

  const aiLogs = [
    "Memuat bobot model Xception-Pure...",
    "Mengalokasikan memori GPU (VRAM)...",
    "Mendeteksi objek biometrik wajah...",
    "Menganalisis tekstur kulit pada frame ",
    "Memeriksa inkonsistensi pencahayaan...",
    "Menghitung skor probabilitas manipulasi...",
    "Validasi tanda tangan digital file...",
    "Ekstraksi fitur spasial-temporal...",
    "Mendeteksi artefak kompresi video...",
    "Mengevaluasi batas tepi (edge boundaries)..."
  ];

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    if (!historyId) {
      console.error("No historyId found in location state");
      const timer = setTimeout(() => navigate('/dashboard'), 3000);
      return () => clearTimeout(timer);
    }

    let pollInterval: any;
    let logInterval: any;

    // Simulate logs
    logInterval = setInterval(() => {
      const randomLog = aiLogs[Math.floor(Math.random() * aiLogs.length)];
      const frameNum = Math.floor(Math.random() * 300);
      const timestamp = new Date().toLocaleTimeString([], { hour12: false });
      
      setLogs(prev => [...prev.slice(-15), `[${timestamp}] ${randomLog}${randomLog.includes('frame') ? frameNum : ''}`]);
    }, 1500);

    const checkStatus = async () => {
      try {
        const response = await api.get(`/history/${historyId}`);
        const data = response.data;
          
        if (data.status === 'COMPLETED') {
          setProgress(100);
          setCurrentStep(4);
          setLogs(prev => [...prev, "[SUCCESS] Analisis selesai. Mengalihkan ke hasil..."]);
          clearInterval(pollInterval);
          clearInterval(logInterval);
          setTimeout(() => {
            navigate('/dashboard/result', { state: { resultData: data } });
          }, 2000);
        } else if (data.status === 'PROCESSING' || data.status === 'PENDING') {
          // Increment progress slowly while waiting
          setProgress((prev) => Math.min(prev + 0.3, 98));
        } else if (data.status === 'FAILED') {
          setLogs(prev => [...prev, "[ERROR] Proses gagal di server."]);
          clearInterval(pollInterval);
          clearInterval(logInterval);
          alert("Analisis gagal. Silakan coba video lain.");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error polling status:", error);
      }
    };

    pollInterval = setInterval(checkStatus, 3000);
    return () => {
      clearInterval(pollInterval);
      clearInterval(logInterval);
    };
  }, [historyId, navigate]);

  useEffect(() => {
    const stepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setCurrentStep(stepIndex);
  }, [progress]);

  if (!historyId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
        <p className="text-zinc-500 font-mono">ID Sesi Tidak Ditemukan. Kembali ke Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-6 bg-zinc-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <Card className="max-w-5xl w-full bg-zinc-900/50 backdrop-blur-2xl rounded-3xl border border-zinc-800 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-teal-400 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-0">
          {/* Left: Steps & Visuals */}
          <div className="lg:col-span-7 p-8 md:p-12 border-r border-zinc-800/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-500 animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">AI Neural Engine</h2>
                <p className="text-zinc-500 text-sm font-mono">Status: <span className="text-emerald-500">Active Inference</span></p>
              </div>
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;

                return (
                  <div key={idx} className={`flex gap-6 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
                    <div className="relative flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 
                        isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                      </div>
                      {idx !== steps.length - 1 && (
                        <div className={`w-0.5 h-full my-2 rounded-full ${isCompleted ? 'bg-emerald-500/30' : 'bg-zinc-800'}`} />
                      )}
                    </div>
                    <div className="flex-1 py-1">
                      <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}>{step.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1">{step.description}</p>
                      {isActive && (
                        <div className="mt-4 grid grid-cols-1 gap-2">
                          {step.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-400 font-mono animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${dIdx * 150}ms` }}>
                              <div className="w-1 h-1 bg-blue-500 rounded-full" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Logs Console */}
          <div className="lg:col-span-5 bg-black/40 p-8 flex flex-col h-full min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Inference Console</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
            </div>

            <div className="flex-1 font-mono text-[11px] leading-relaxed overflow-y-auto space-y-2 custom-scrollbar pr-4">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-3 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  <span className="opacity-30 whitespace-nowrap">{i + 1}</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/50">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">Processing Power</p>
                  <p className="text-xs text-zinc-400 font-mono">RTX 4090 vApp Acceleration</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-600 uppercase font-bold mb-1">Network Status</p>
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-zinc-400 font-mono">Synchronized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
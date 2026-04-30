import { Play, Download, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, RefreshCw, Maximize2, FileVideo } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'original' | 'heatmap'>('heatmap');
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const resultData = location.state?.resultData;

  useEffect(() => {
    if (!resultData) {
      navigate('/dashboard/history');
    }
  }, [resultData, navigate]);

  if (!resultData) return null;

  const isFake = resultData.ai_analysis?.prediction === 'FAKE';
  const confidence = (resultData.ai_analysis?.confidence_score * 100).toFixed(1);
  const totalFrames = resultData.ai_analysis?.frames_analyzed || 0;
  const fileName = resultData.video_detail?.original_name || "Video";
  const historyId = resultData._id || resultData.id;
  
  // Construct Video URL
  const baseUrl = import.meta.env.VITE_API_URL.split('/api/v1')[0];
  const videoUrl = resultData.video_detail?.saved_name 
    ? `${baseUrl}/storage/uploads/${resultData.video_detail.saved_name}`
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-medium text-zinc-500">
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">ID: {historyId}</span>
              <span>Sistem Deteksi Forensik AI</span>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">Laporan Analisis Video</h1>
            <p className="text-sm text-zinc-400 mt-1">{fileName} • {resultData.video_detail?.duration_sec}s • {resultData.video_detail?.resolution}</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            <Button className="bg-white text-zinc-900 hover:bg-zinc-200" onClick={() => navigate('/dashboard')}>
              <RefreshCw className="w-4 h-4 mr-2" /> Pindai Baru
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                {videoUrl ? (
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                    preload="auto"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Browser Anda tidak mendukung tag video.
                  </video>
                ) : (
                  <div className="relative z-10 w-24 h-24 bg-white/5 hover:bg-white/10 transition-colors rounded-full flex flex-col items-center justify-center backdrop-blur-sm border border-white/10 text-center p-4">
                    <FileVideo className="w-8 h-8 text-white mb-2" />
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">No Video</span>
                  </div>
                )}
              </div>

              <div className="bg-zinc-900 border-t border-zinc-800/50 p-6 flex items-center gap-6">
                <button onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))} className="p-2 text-zinc-500 hover:text-white transition-colors bg-zinc-800 rounded-xl"><ChevronLeft size={20}/></button>
                
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-medium text-zinc-500 w-16">Frame {currentFrame}</span>
                  <div className="relative flex-1 h-1.5 bg-zinc-800 rounded-full cursor-pointer">
                    <div className="absolute left-[30%] right-[45%] h-full bg-red-900/50 rounded-full" />
                    <div className="absolute left-0 top-0 h-full bg-zinc-400 rounded-full" style={{ width: `${(currentFrame / totalFrames) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-zinc-500">{totalFrames}</span>
                </div>

                <button onClick={() => setCurrentFrame(Math.min(totalFrames, currentFrame + 1))} className="p-1 text-zinc-400 hover:text-white transition-colors"><ChevronRight size={20}/></button>
                <button className="p-1 text-zinc-400 hover:text-white ml-2"><Maximize2 size={18}/></button>
              </div>
            </div>

          <div className="space-y-6">
            
            <div className={`rounded-xl p-6 border ${isFake ? 'bg-red-950/20 border-red-900/30' : 'bg-emerald-950/20 border-emerald-900/30'}`}>
              <div className="flex items-start gap-4 mb-6">
                {isFake ? <AlertTriangle className="text-red-500 w-6 h-6 mt-1" /> : <CheckCircle className="text-emerald-500 w-6 h-6 mt-1" />}
                <div>
                  <h3 className={`text-lg font-semibold ${isFake ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isFake ? 'Manipulasi Terdeteksi' : 'Video Tervalidasi'}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {isFake 
                      ? 'Sistem menemukan indikasi manipulasi AI yang kuat pada wajah.' 
                      : 'Sistem tidak menemukan indikasi manipulasi AI yang signifikan.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-zinc-300">Confidence Score</span>
                  <span className={`text-2xl font-bold ${isFake ? 'text-red-400' : 'text-emerald-400'}`}>{confidence}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${isFake ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${confidence}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Wajah Terdeteksi</p>
                  <p className="text-xl font-bold text-zinc-200">{resultData.ai_analysis?.faces_detected}</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Frame Dianalisis</p>
                  <p className="text-xl font-bold text-zinc-200">{resultData.ai_analysis?.frames_analyzed}</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-300">Model AI</p>
                    <p className="text-xs text-zinc-500">{resultData.ai_analysis?.model_name}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Waktu Mulai</span>
                    <span className="text-zinc-300">{new Date(resultData.execution_stats?.start_time).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Durasi Proses</span>
                    <span className="text-zinc-300">{resultData.execution_stats?.processing_duration_sec} detik</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
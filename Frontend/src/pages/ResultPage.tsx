import { Play, Download, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, RefreshCw, Activity, Layers, Maximize2, Share2, Info, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function CleanResultPage() {
  const [viewMode, setViewMode] = useState<'original' | 'heatmap'>('heatmap');
  const [currentFrame, setCurrentFrame] = useState(45);
  const isFake = true;
  const confidence = 98.5;
  const totalFrames = 135;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-medium text-zinc-500">
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">ID: DF-1092</span>
              <span>Sistem Deteksi Forensik AI</span>
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">Laporan Analisis Video</h1>
            <p className="text-sm text-zinc-400 mt-1">sample_video_hd.mp4 • 0:45 • 1080p</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            <Button className="bg-white text-zinc-900 hover:bg-zinc-200">
              <RefreshCw className="w-4 h-4 mr-2" /> Pindai Ulang
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="aspect-video relative bg-black flex items-center justify-center">
                
                <div className="absolute top-4 right-4 z-20 flex bg-zinc-900/80 backdrop-blur p-1 rounded-lg border border-zinc-800">
                  <button 
                    onClick={() => setViewMode('original')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'original' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Original
                  </button>
                  <button 
                    onClick={() => setViewMode('heatmap')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'heatmap' ? 'bg-red-900/50 text-red-200' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Grad-CAM
                  </button>
                </div>

                {viewMode === 'heatmap' && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay" />
                    <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-red-500/30 rounded-full blur-[40px]" />
                  </div>
                )}

                <button className="relative z-10 w-16 h-16 bg-white/10 hover:bg-white/20 transition-colors rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </button>
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
          </div>

          <div className="space-y-6">
            
            <div className={`rounded-xl p-6 border ${isFake ? 'bg-red-950/20 border-red-900/30' : 'bg-emerald-950/20 border-emerald-900/30'}`}>
              <div className="flex items-start gap-4 mb-6">
                {isFake ? <AlertTriangle className="text-red-500 w-6 h-6 mt-1" /> : <CheckCircle className="text-emerald-500 w-6 h-6 mt-1" />}
                <div>
                  <h3 className={`text-lg font-semibold ${isFake ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isFake ? 'Manipulasi Terdeteksi' : 'Video Tervalidasi'}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">Sistem menemukan indikasi perubahan AI.</p>
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
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
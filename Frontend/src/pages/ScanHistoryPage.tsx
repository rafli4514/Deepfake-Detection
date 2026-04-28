import { FileVideo, Download, Eye, Trash2, Filter, BarChart3, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockHistory = [
  {
    id: "1",
    fileName: "interview_clip_01.mp4",
    date: "2024-04-25 10:30",
    result: "Manipulasi",
    confidence: "98.5%",
    status: "danger",
  },
  {
    id: "2",
    fileName: "speech_original.mp4",
    date: "2024-04-24 15:45",
    result: "Asli",
    confidence: "99.2%",
    status: "success",
  },
  {
    id: "3",
    fileName: "social_media_post.mov",
    date: "2024-04-23 09:12",
    result: "Manipulasi",
    confidence: "87.3%",
    status: "danger",
  },
  {
    id: "4",
    fileName: "news_broadcast.mp4",
    date: "2024-04-22 18:20",
    result: "Asli",
    confidence: "96.8%",
    status: "success",
  },
];

export default function ScanHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Riwayat Pemindaian</h2>
        <p className="text-muted-foreground text-lg">Lihat semua hasil deteksi deepfake sebelumnya dan laporan detailnya.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none shadow-md bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Pemindaian</p>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-md bg-gradient-to-br from-red-500/10 to-red-600/5 dark:from-red-500/20 dark:to-red-600/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Terdeteksi Deepfake</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">12</p>
            </div>
            <div className="p-2 bg-red-500/10 dark:bg-red-500/20 rounded-lg text-red-600 dark:text-red-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-none shadow-md bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Konten Asli</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">116</p>
            </div>
            <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="gap-2 font-bold">
          <Filter className="w-4 h-4" />
          Semua Hasil
        </Button>
        <Button variant="outline" className="gap-2 border-red-500/50 hover:bg-red-500/10 text-red-600 dark:text-red-400 font-bold">
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          Manipulasi
        </Button>
        <Button variant="outline" className="gap-2 border-green-500/50 hover:bg-green-500/10 text-green-600 dark:text-green-400 font-bold">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Asli
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Nama File</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Waktu & Tanggal</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Hasil</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Keyakinan</th>
                <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {mockHistory.map((item) => (
                <tr key={item.id} className="hover:bg-blue-500/5 dark:hover:bg-blue-500/10 transition-all duration-300 group/row">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-blue-600 dark:text-blue-400 shadow-sm group-hover/row:scale-110 group-hover/row:border-blue-500/50 transition-all duration-300">
                        <FileVideo className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{item.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                      item.status === 'danger' 
                        ? 'bg-red-500/10 text-red-600 border border-red-500/20' 
                        : 'bg-green-500/10 text-green-600 border border-green-500/20'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${item.status === 'danger' ? 'bg-red-600' : 'bg-green-600'}`} />
                      {item.result}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{item.confidence}</span>
                      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.status === 'danger' ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: item.confidence }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-none hover:shadow-sm" title="Lihat Laporan">
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-none hover:shadow-sm" title="Unduh">
                        <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-red-600 hover:text-red-600 hover:bg-red-500/10" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="space-y-6 max-w-md animate-in fade-in zoom-in duration-500">
        <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl flex items-center justify-center border border-red-500/20">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-8xl font-black tracking-tighter text-gray-900 dark:text-white opacity-20">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground text-lg">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild variant="outline" className="h-12 px-6">
            <Link to={-1 as any} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </Button>
          <Button asChild className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg shadow-blue-500/20 transition-all border-none">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 mt-auto border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-white font-bold tracking-tight">Deepfake Scanner</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
          &copy; 2026 Deepfake Scanner · Didukung Xception Model & MTCNN · Hanya untuk keperluan riset, verifikasi, dan pendidikan.
        </p>
      </div>
    </footer>
  );
}

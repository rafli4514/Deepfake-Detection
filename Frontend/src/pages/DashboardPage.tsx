import { Upload, FileVideo } from 'lucide-react';
import { useState } from 'react';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

export function UploadSection({ onFileSelect }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'video/mp4' || file.type === 'video/x-msvideo')) {
      setSelectedFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-gray-900 dark:text-white font-bold mb-2">Unggah Video untuk Analisis</h2>
        <p className="text-gray-600 dark:text-gray-400">Deteksi konten buatan AI atau manipulasi dengan deep learning canggih</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
            : selectedFile
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20'
            : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <div className="flex flex-col items-center gap-4">
          {selectedFile ? (
            <>
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center shadow-lg">
                <FileVideo className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold mb-1">{selectedFile.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Seret & lepas video Anda di sini</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">atau</p>
              </div>
            </>
          )}

          <label className="cursor-pointer">
            <span className="inline-block px-6 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold">
              {selectedFile ? 'Pilih File Lain' : 'Pilih Video'}
            </span>
            <input
              type="file"
              className="hidden"
              accept="video/mp4,video/x-msvideo"
              onChange={handleFileInput}
            />
          </label>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Format didukung: .mp4, .avi | Maks: 20MB | Durasi maks: 1 menit
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile}
          className={`px-8 py-3 rounded-xl text-white font-bold transition-all ${
            selectedFile
              ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-xl shadow-blue-500/20'
              : 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          Deteksi Video
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const handleFileSelect = (file: File) => {
    console.log("File dipilih untuk analisis:", file.name);
  };

  return (
    <div className="py-8">
      <UploadSection onFileSelect={handleFileSelect} />
    </div>
  );
}

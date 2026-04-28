import { Shield, Zap, Eye, ArrowRight, ScanSearch, CheckCircle, Lock, Cpu } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { value: '96.5%', label: 'Akurasi Deteksi' },
    { value: '12ms', label: 'Waktu Per Frame' },
    { value: '1000+', label: 'Video Dianalisis' },
    { value: '99.2%', label: 'Skor Presisi' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Deteksi AI Canggih',
      description: 'Didukung model Xception yang dilatih dengan ribuan video asli dan manipulasi.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Eye,
      title: 'Visualisasi Grad-CAM',
      description: 'Lihat persis area wajah mana yang teridentifikasi sebagai hasil manipulasi AI.',
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      icon: Zap,
      title: 'Analisis Real-Time',
      description: 'Pemrosesan cepat dengan pemantauan performa dan inspeksi frame per frame.',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Lock,
      title: 'Aman & Privat',
      description: 'Video Anda diproses secara lokal. Tidak ada data yang disimpan atau dibagikan.',
      gradient: 'from-green-500 to-green-600',
    },
  ];

  const useCases = [
    {
      icon: CheckCircle,
      title: 'Verifikasi Media',
      description: 'Verifikasi keaslian footage berita dan konten media sosial.',
    },
    {
      icon: Cpu,
      title: 'Riset & Pendidikan',
      description: 'Alat riset akademis untuk mempelajari teknik deteksi deepfake.',
    },
    {
      icon: Lock,
      title: 'Keamanan Organisasi',
      description: 'Lindungi organisasi dari penipuan berbasis deepfake.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 dark:from-black dark:via-blue-950/40 dark:to-black">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-8 py-20 lg:py-28">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>AI-Powered Deepfake Detection System</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-6xl text-white mb-6 max-w-4xl mx-auto leading-tight">
              Deteksi Deepfake dengan{' '}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Teknologi AI Terdepan
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Verifikasi keaslian video dalam hitungan detik menggunakan deep learning mutakhir,
              deteksi wajah MTCNN, dan explainability Grad-CAM.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('scan')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
              >
                <ScanSearch className="w-5 h-5" />
                <span>Mulai Deteksi Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Demo preview card */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-500">deepfake-scanner.app — Hasil Analisis</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-900 via-blue-900/20 to-teal-900/20 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-400 text-sm">Dashboard Deteksi Interaktif</p>
                </div>
                {/* Floating badges */}
                <div className="absolute top-6 right-6 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs shadow-lg flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  DEEPFAKE TERDETEKSI
                </div>
                <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 text-white rounded-lg text-xs">
                  Kepercayaan: 96.5%
                </div>
                <div className="absolute bottom-6 right-6 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-lg text-xs">
                  Analisis Selesai
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-white mb-3">
              Fitur Unggulan
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Semua yang Anda butuhkan untuk mendeteksi dan menganalisis video deepfake dengan akurat
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-blue-500/5 hover:-translate-y-1 transition-all group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Quick Steps */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-white mb-3">Cara Kerja</h2>
            <p className="text-gray-500 dark:text-gray-400">Proses 3 langkah sederhana untuk deteksi deepfake</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Video', desc: 'Upload file video (MP4/AVI) hingga 20MB lewat drag & drop.', color: 'text-blue-500' },
              { step: '02', title: 'Analisis AI', desc: 'Model Xception menganalisis setiap frame dengan deteksi wajah MTCNN.', color: 'text-teal-500' },
              { step: '03', title: 'Dapatkan Hasil', desc: 'Terima laporan lengkap dengan skor kepercayaan dan heatmap Grad-CAM.', color: 'text-purple-500' },
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className={`text-6xl ${item.color} opacity-20 mb-3 transition-opacity group-hover:opacity-40`}>
                  {item.step}
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-gray-300 dark:text-gray-700">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl text-gray-900 dark:text-white mb-3">Kasus Penggunaan</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Dipercaya oleh peneliti, jurnalis, dan profesional keamanan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl text-white mb-4">Siap Mendeteksi Deepfake?</h2>
          <p className="text-blue-100 mb-8">
            Mulai verifikasi keaslian video Anda dengan sistem AI canggih kami sekarang juga.
          </p>
          <button
            onClick={() => onNavigate('scan')}
            className="group px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <ScanSearch className="w-5 h-5" />
            <span>Coba Sekarang — Gratis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
}

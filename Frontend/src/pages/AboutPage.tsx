import { Shield, Brain, Target, Award, BookOpen, Code, Globe, Cpu, Eye, Zap, Lock } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: '',
      role: '',
      expertise: '',
      avatar: '',
      gradient: '',
    },
    {
      name: '',
      role: '',
      expertise: '',
      avatar: '',
      gradient: '',
    },
  ];

  const technologies = [
    {
      icon: Brain,
      name: 'Xception Model',
      description:
        'Arsitektur CNN dalam yang dioptimalkan khusus untuk deteksi deepfake. Dilatih pada dataset DeeperForensics dengan akurasi tinggi.',
      badge: 'Core Model',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Eye,
      name: 'MTCNN',
      description:
        'Multi-task Cascaded Convolutional Networks untuk deteksi wajah akurat dan penyelarasan landmark wajah secara real-time.',
      badge: 'Face Detection',
      badgeColor: 'bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400',
    },
    {
      icon: Zap,
      name: 'Grad-CAM',
      description:
        'Gradient-weighted Class Activation Mapping untuk visualisasi explainable AI — menunjukkan area wajah yang termanipulasi.',
      badge: 'Explainability',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Cpu,
      name: 'Frame Pipeline',
      description:
        'Pipeline ekstraksi frame yang efisien dengan analisis temporal untuk mendeteksi inkonsistensi antar frame video.',
      badge: 'Processing',
      badgeColor: 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    },
  ];

  const milestones = [
    { year: '2023', event: 'Penelitian awal dan pengumpulan dataset dimulai.' },
    { year: '2024', event: 'Model Xception pertama berhasil mencapai akurasi 94% pada FaceForensics++.' },
    { year: '2025', event: 'Integrasi Grad-CAM dan antarmuka pengguna pertama diluncurkan.' },
    { year: '2026', event: 'Peluncuran resmi Deepfake Scanner v2.0 dengan performa 96.5% akurasi.' },
  ];

  return (
    <div className="space-y-0">
      {/* Header Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950/60 to-gray-900 dark:from-black dark:via-blue-950/30 dark:to-black py-20 rounded-3xl mt-8 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            <span>Tentang Kami</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Membangun Kepercayaan di Era{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Konten Sintetis
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Deepfake Scanner adalah sistem deteksi deepfake berbasis AI yang dikembangkan untuk
            membantu individu, organisasi, dan peneliti memverifikasi keaslian video digital.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Misi Kami</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Menyediakan alat deteksi deepfake yang akurat, transparan, dan dapat diakses untuk
                memerangi disinformasi visual dan melindungi kepercayaan publik terhadap konten
                digital.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visi Kami</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Menjadi standar global dalam verifikasi keaslian video berbasis AI, di mana setiap
                orang dapat dengan mudah membedakan konten asli dari manipulasi digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gray-100/50 dark:bg-gray-900/50 rounded-[3rem]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Teknologi yang Digunakan</h2>
            <p className="text-muted-foreground">
              Dibangun di atas riset deep learning mutakhir
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-6 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{tech.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tech.badgeColor}`}>
                        {tech.badge}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tim Pengembang</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dibangun oleh para ahli di bidang AI, keamanan, dan rekayasa perangkat lunak untuk menghadirkan solusi deteksi terbaik.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 text-center hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/10`}
                >
                  <span className="text-white text-2xl font-bold">{member.avatar}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h4>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      {/* <section className="py-20 bg-gray-100/50 dark:bg-gray-900/50 rounded-[3rem]">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Perjalanan Kami</h2>
            <p className="text-muted-foreground">Tonggak penting dalam pengembangan sistem deteksi kami</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500" />

            <div className="space-y-12">
              {milestones.map((item, index) => (
                <div key={index} className="flex gap-8 pl-16 relative group">
                  <div className="absolute left-3 top-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full border-4 border-white dark:border-gray-950 shadow-xl group-hover:scale-125 transition-transform" />
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex-1 shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full mb-3">
                      {item.year}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Research & Resources */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Riset & Publikasi</h2>
            <p className="text-muted-foreground">Sistem kami dibangun di atas dasar ilmiah yang kuat dan transparan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'FaceForensics++',
                desc: 'Dataset benchmark utama yang digunakan untuk pelatihan dan evaluasi model kami.',
                link: 'arxiv.org/abs/1901.08971',
              },
              {
                icon: Award,
                title: 'Xception Paper',
                desc: '"Xception: Deep Learning with Depthwise Separable Convolutions" — François Chollet, 2017.',
                link: 'arxiv.org/abs/1610.02357',
              },
              {
                icon: Code,
                title: 'Open Source',
                desc: 'Kami berkomitmen pada transparansi. Kode sumber tersedia untuk audit komunitas.',
                link: 'github.com/deepfake-scanner',
              },
            ].map((res, index) => {
              const Icon = res.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{res.title}</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {res.desc}
                  </p>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-lg">{res.link}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-amber-500/5 border-t border-amber-500/20 rounded-[3rem] mb-12">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <Lock className="w-10 h-10 text-amber-600 dark:text-amber-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer Penggunaan</h3>
          <p className="text-muted-foreground leading-relaxed">
            Deepfake Scanner dikembangkan semata-mata untuk keperluan riset, verifikasi, dan
            pendidikan. Sistem ini tidak boleh digunakan untuk melanggar privasi individu atau
            tujuan yang melanggar hukum. Kami berkomitmen pada penggunaan AI yang etis dan
            bertanggung jawab.
          </p>
        </div>
      </section>
    </div>
  );
}

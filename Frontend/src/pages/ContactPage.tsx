import { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  CheckCircle,
  Code,
  Share2,
  Globe,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
  };

  const contactChannels = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'support@deepfakescanner.app',
      sub: 'Respons dalam 24 jam',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      detail: 'Chat langsung via aplikasi',
      sub: 'Senin–Jumat, 09.00–17.00 WIB',
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      icon: Code,
      title: 'GitHub Issues',
      detail: 'github.com/deepfake-scanner',
      sub: 'Laporkan bug atau fitur',
      gradient: 'from-gray-700 to-gray-800',
    },
    {
      icon: CheckCircle,
      title: 'Status Sistem',
      detail: 'Semua sistem normal',
      sub: 'Uptime 99.9%',
      gradient: 'from-green-500 to-green-600',
    },
  ];

  const faqs = [
    {
      q: 'Apakah video saya aman dan tidak disimpan?',
      a: 'Ya, semua video diproses secara lokal. Kami tidak menyimpan, mengunggah, atau membagikan konten video Anda ke server mana pun. Privasi Anda adalah prioritas utama kami.',
    },
    {
      q: 'Format video apa saja yang didukung?',
      a: 'Saat ini kami mendukung format MP4 dan AVI dengan ukuran maksimum 20MB dan durasi hingga 60 detik per video.',
    },
    {
      q: 'Seberapa akurat sistem deteksi ini?',
      a: 'Sistem kami mencapai akurasi 96.5% pada dataset benchmark FaceForensics++. Namun, hasil AI sebaiknya digunakan sebagai alat bantu verifikasi, bukan satu-satunya penentu.',
    },
    {
      q: 'Apakah saya bisa menggunakan ini untuk keperluan komersial?',
      a: 'Deepfake Scanner saat ini tersedia untuk keperluan riset dan verifikasi non-komersial. Untuk lisensi enterprise, silakan hubungi kami melalui email.',
    },
    {
      q: 'Bagaimana cara melaporkan kesalahan deteksi?',
      a: 'Anda dapat melaporkan kesalahan melalui formulir di halaman ini dengan memilih kategori "Laporan Bug". Laporan Anda sangat berharga bagi pengembangan model kami.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-teal-950/50 to-gray-900 dark:from-black dark:via-teal-950/30 dark:to-black py-20 rounded-3xl mt-8 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm mb-6 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Ada Pertanyaan atau{' '}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Butuh Bantuan?
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Tim kami siap membantu Anda. Hubungi kami melalui salah satu saluran di bawah ini untuk bantuan teknis atau riset.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${channel.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{channel.title}</h4>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{channel.detail}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {channel.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-gray-100/50 dark:bg-gray-900/50 rounded-[3rem]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-950 rounded-3xl p-10 border border-gray-200 dark:border-gray-800 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Kirim Pesan</h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pesan Terkirim!</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Terima kasih! Tim kami akan meninjau pesan Anda dan merespons sesegera mungkin.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-8 rounded-xl h-12 px-8">
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Nama Anda"
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="email@example.com"
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                        Kategori Pesan
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                      >
                        <option value="general">Pertanyaan Umum</option>
                        <option value="technical">Masalah Teknis</option>
                        <option value="bug">Laporan Bug</option>
                        <option value="feature">Permintaan Fitur</option>
                        <option value="research">Kolaborasi Riset</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                        Pesan
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Bagaimana kami bisa membantu Anda hari ini?"
                        className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                      <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                        Kami menjamin kerahasiaan informasi Anda. Data yang dikirimkan hanya akan digunakan untuk memproses permintaan bantuan Anda.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl hover:from-blue-700 hover:to-teal-700 shadow-xl shadow-blue-500/20 text-lg font-bold transition-all flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Kirim Pesan</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-gray-950 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Informasi Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Email Dukungan</p>
                      <p className="text-sm text-muted-foreground">
                        support@deepfakescanner.app
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Media Sosial</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Code, label: 'GitHub', color: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                    { icon: Share2, label: 'Twitter', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/30' },
                    { icon: Globe, label: 'LinkedIn', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/30' },
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <button
                        key={index}
                        className={`flex flex-col items-center gap-2 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-all ${social.color} font-bold`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-[10px] uppercase tracking-widest">{social.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
                <CheckCircle className="w-10 h-10 mb-6 opacity-80" />
                <h4 className="text-xl font-bold mb-4">Waktu Respons Cepat</h4>
                <div className="space-y-3 opacity-90">
                  <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                    <span>Email Teknis</span>
                    <span className="font-bold">≤ 24 Jam</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/20 pb-2">
                    <span>Laporan Bug</span>
                    <span className="font-bold">≤ 8 Jam</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Kemitraan</span>
                    <span className="font-bold">≤ 2 Hari</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
            <p className="text-muted-foreground">Temukan jawaban cepat untuk pertanyaan yang sering diajukan.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openFaq === index ? 'bg-blue-500/5' : 'bg-white dark:bg-gray-950'}`}
                >
                  <span className="text-gray-900 dark:text-white font-bold pr-4">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-6 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-muted-foreground leading-relaxed font-medium">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

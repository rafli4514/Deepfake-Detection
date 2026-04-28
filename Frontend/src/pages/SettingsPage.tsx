import { Settings, User, Bell, Lock, Shield, Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const sections = [
    { icon: User, title: 'Profil Pengguna', desc: 'Kelola informasi pribadi dan foto profil Anda.' },
    { icon: Bell, title: 'Notifikasi', desc: 'Atur bagaimana Anda menerima pembaruan tentang hasil pemindaian.' },
    { icon: Lock, title: 'Keamanan', desc: 'Ubah kata sandi dan aktifkan otentikasi dua faktor.' },
    { icon: Shield, title: 'Privasi', desc: 'Kelola preferensi data dan visibilitas riwayat Anda.' },
    { icon: Palette, title: 'Tampilan', desc: 'Sesuaikan tema, warna, dan tata letak aplikasi.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Pengaturan</h2>
        <p className="text-muted-foreground text-lg">Kelola preferensi akun dan konfigurasi sistem Anda di sini.</p>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:border-blue-500/30 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{section.title}</h3>
                    <p className="text-muted-foreground">{section.desc}</p>
                  </div>
                  <Button variant="ghost" className="font-bold text-blue-600 dark:text-blue-400">
                    Buka
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">Zona Bahaya</h3>
            <p className="text-muted-foreground">Tindakan ini permanen dan tidak dapat dibatalkan.</p>
          </div>
          <Button variant="destructive" className="font-bold rounded-xl h-12 px-8">
            Hapus Akun
          </Button>
        </div>
      </div>
    </div>
  );
}

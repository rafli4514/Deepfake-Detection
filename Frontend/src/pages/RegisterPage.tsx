import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", formData);
      navigate("/login", { state: { message: "Registrasi berhasil! Silakan masuk." } });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for visual consistency with home page */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Buat Akun Baru
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Lengkapi data di bawah ini untuk mulai menggunakan layanan kami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  className="pl-10 h-11 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="pl-10 h-11 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg shadow-blue-500/25 transition-all mt-2"
            >
              {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Masuk di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
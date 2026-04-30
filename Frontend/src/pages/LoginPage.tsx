import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Login uses OAuth2 form data
      const params = new URLSearchParams();
      params.append("username", formData.email);
      params.append("password", formData.password);

      const response = await api.post("/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for visual consistency with home page */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Masuk ke Akun
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Masukkan email dan password Anda untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                {message}
              </div>
            )}
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link to="/reset-password" async className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Lupa password?
                </Link>
              </div>
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
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg shadow-blue-500/25 transition-all"
            >
              {loading ? "Masuk..." : "Masuk"}
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
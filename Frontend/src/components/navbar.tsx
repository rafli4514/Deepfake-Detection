import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield, ArrowRight } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-1.5 rounded-lg text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
             <Shield size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Scanner</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Beranda</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tentang</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hubungi Kami</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
          <Button variant="ghost" asChild className="text-gray-600 dark:text-gray-400 font-semibold">
            <Link to="/login">Masuk</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-blue-500/20 border-none transition-all">
            <Link to="/register" className="flex items-center gap-2">
              Daftar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ModeToggle />
          <button
            className="p-2 text-gray-600 dark:text-gray-400 focus:outline-none bg-gray-100 dark:bg-gray-900 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 absolute w-full shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col px-6 pt-6 pb-8 space-y-4 font-medium text-gray-900 dark:text-white">
            <li>
              <Link to="/" onClick={closeMenu} className="block py-2 hover:text-blue-600">Beranda</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu} className="block py-2 hover:text-blue-600">Tentang</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu} className="block py-2 hover:text-blue-600">Hubungi Kami</Link>
            </li>
            
            <li className="pt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full h-12" asChild>
                <Link to="/login" onClick={closeMenu}>Masuk</Link>
              </Button>
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white" asChild>
                <Link to="/register" onClick={closeMenu}>Daftar Sekarang</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
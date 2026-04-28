import { Outlet } from "react-router-dom";
import Navbar from "./navbar"; 
import Footer from "./footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-0 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
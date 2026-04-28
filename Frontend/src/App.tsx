import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/HomeLayout";
import DashboardLayout from "./components/DashboardLayout";

import HomePage from "./pages/HomePage"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage"; 
import ScanHistoryPage from "./pages/ScanHistoryPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFoundPage";
import { ThemeProvider } from "./components/theme-provider";
import ProcessingState from "./components/ProcessingState";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="min-h-screen font-sans bg-background text-foreground">
          <Routes>
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/history" element={<ScanHistoryPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
              <Route path="/dashboard/processing" element={<ProcessingState />} />
              <Route path="/dashboard/result" element={<ResultPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Events from './pages/Events';
import SocialActivities from './pages/SocialActivities';
import Members from './pages/Members';

import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';



function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/departments" element={<Layout><Departments /></Layout>} />
              <Route path="/departments/:id" element={<Layout><DepartmentDetail /></Layout>} />
              <Route path="/events" element={<Layout><Events /></Layout>} />
              <Route path="/social" element={<Layout><SocialActivities /></Layout>} />
              <Route path="/members" element={<Layout><Members /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

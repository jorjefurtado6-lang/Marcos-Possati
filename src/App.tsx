import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminPackages from './pages/admin/AdminPackages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import ProjectPage from './pages/ProjectPage';
import PdfViewerPage from './pages/PdfViewerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabalho/:id" element={<ProjectPage />} />
        <Route path="/trabalho/:id/ver" element={<PdfViewerPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

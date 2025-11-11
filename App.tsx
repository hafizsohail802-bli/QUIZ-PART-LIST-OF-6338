import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Layout and Route Components
import Header from './components/Header';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';

// Page Components
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudyPage from './pages/study/StudyPage';
import ComponentDetailPage from './pages/study/ComponentDetailPage';
import QuizPage from './pages/quiz/QuizPage'; // This is now the Quiz Hub
import QuizConfigPage from './pages/quiz/QuizConfigPage';
import QuizSessionPage from './pages/quiz/CategoryPage'; // Corrected Path

// Admin Page Components
import AdminDashboard from './pages/admin/AdminDashboard';
import ComponentManagement from './pages/admin/ComponentManagement';
import AddComponent from './pages/admin/AddComponent';
import EditComponent from './pages/admin/EditComponent';
import ImportPage from './pages/admin/ImportPage';
import UserManagement from './pages/admin/UserManagement';
import QuizCategoryManagement from './pages/admin/QuizCategoryManagement';
import QuizManagement from './pages/admin/QuizManagement';
import AddQuizQuestion from './pages/admin/AddQuizQuestion';
import QuizBulkImportPage from './pages/admin/QuizBulkImportPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import StudyMaterialManagement from './pages/admin/StudyMaterialManagement';
import QuizResultsPage from './pages/admin/QuizResultsPage';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<UserDashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* User Routes */}
              <Route path="/study" element={<StudyPage />} />
              <Route path="/study/component/:id" element={<ComponentDetailPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/configure" element={<QuizConfigPage />} />
              <Route path="/quiz/session" element={<QuizSessionPage />} />
              
              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="components" element={<ComponentManagement />} />
                  <Route path="components/new" element={<AddComponent />} />
                  <Route path="components/:id/edit" element={<EditComponent />} />
                  <Route path="import" element={<ImportPage />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="quizzes" element={<QuizCategoryManagement />} />
                  <Route path="quizzes/questions" element={<QuizManagement />} />
                  <Route path="quizzes/questions/new" element={<AddQuizQuestion />} />
                  <Route path="quizzes/import" element={<QuizBulkImportPage />} />
                  <Route path="results" element={<QuizResultsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="materials" element={<StudyMaterialManagement />} />
                </Route>
              </Route>

            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
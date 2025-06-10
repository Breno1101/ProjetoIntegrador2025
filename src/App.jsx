import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout.jsx';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Login from './components/pages/auth/Login.jsx';
import Register from './components/pages/auth/Register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import ChatPage from './components/chat/ChatPage.jsx';
import Profile from './components/pages/profile/Profile.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import ManageUsers from './components/admin/ManageUsers.jsx';
import ManageGroups from './components/admin/ManageGroups.jsx';

// Context Providers
import {AuthProvider} from './context/AuthContext.jsx';
import { ChatProvider } from './context/ChatContext';
import { ProgressProvider } from './context/ProgressContext';

// Theme
import {useTheme} from './components/theme/useTheme';
import Settings from "./components/admin/Settings";
import {AdminProvider} from "./context/AdminContext";
import ProgressOverview from './components/admin/ProgressOverview.jsx';
import ProfessorLayout from './layouts/ProfessorLayout.jsx';
import ProfessorDashboard from './components/professor/ProfessorDashboard.jsx';

// PrivateRoute component for protected routes
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('quantumUser') || '{}');
  if (!user || !user.permission) {
    return <Navigate to="/login" />;
  }
  const isStudent = user.permission === '1';
  return isStudent ? children : <Navigate to="/admin" />;
};

// AdminRoute component for admin-only routes
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('quantumUser') || '{}');
  if (!user || !user.permission) {
    return <Navigate to="/login" />;
  }
  const isAdmin = user.permission === '3';
  return isAdmin ? children : <Navigate to="/dashboard" />;
};

const ProfessorRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('quantumUser') || '{}');
  if (!user || !user.permission) {
    return <Navigate to="/login" />;
  }
  const isProfessor = user.permission === '2';
  return isProfessor ? children : <Navigate to="/professor" />;
};

function App() {
  const [theme] = useTheme();

  return (
    <AuthProvider>
      <ProgressProvider>
        <ChatProvider>
          <AdminProvider>
            <Router>
              <Routes>
                {/* Auth Routes */}
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Navigate to="/login" />} />
                  <Route path="login/*" element={<Login />} />
                  {/*<Route path="register/*" element={<Register />} />*/}
                </Route>

                {/* Main App Routes */}
                <Route path="/" element={
                  <PrivateRoute>
                    <MainLayout />
                  </PrivateRoute>
                }>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="chat/:lessonId?" element={<ChatPage />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminLayout/>
                  </AdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="/admin/manage" element={<ManageUsers />} />
                  <Route path="/admin/manage/groups" element={<ManageGroups />} />
                </Route>

                {/* Professor Routes */}
                <Route path="/professor" element={
                  <ProfessorRoute>
                    <ProfessorLayout/>
                  </ProfessorRoute>
                }>
                  <Route index element={<ProfessorDashboard />} />
                  <Route path="/professor/settings" element={<Settings />} />
                </Route>

                {/* Fallback Route */}
                {/*<Route path="*" element={<Navigate to="/dashboard" />} />*/}
              </Routes>
            </Router>
          </AdminProvider>
        </ChatProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
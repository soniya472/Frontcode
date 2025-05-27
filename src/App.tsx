import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './component/Layout/MainLayout';
import './App.css';
import LoginForm from './component/LoginForm/LoginForm';
import Department from './component/Department/Department';
import Setting from './component/Set/Setting';
import Employee from './component/Employee/Employee';
import ProtectedRoute from './component/protected/protected';

// const LoginForm = lazy(() => import('./component/LoginForm/LoginForm'));
// const Department = lazy(() => import('./component/Department/Department'));
// const Setting = lazy(() => import('./component/Set/Setting'));
// const Employee = lazy(() => import('./component/Employee/Employee'));


const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginForm />}/>
          
          {/* Routes under MainLayout */}
          <Route element={<MainLayout />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/department" element={<ProtectedRoute><Department /></ProtectedRoute>}/>
            <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>}/>
            <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

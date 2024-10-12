import React, { Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/login'));
const Signup = React.lazy(() => import('../pages/signup'));
const ResetPassword = React.lazy(() => import('../pages/reset-password'));
const VerifyOtp = React.lazy(() => import('../pages/verify-otp'));
const ConfirmPassword = React.lazy(() => import('../pages/confirm-password'));
const AddBusiness = React.lazy(() => import('../pages/add-business'));
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const CompareResults = React.lazy(() => import('../pages/compare-results'));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AddBusiness />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/compare-results" element={<CompareResults />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

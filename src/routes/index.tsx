import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/login'));
const Signup = React.lazy(() => import('../pages/signup'));
const ResetPassword = React.lazy(() => import('../pages/reset-password'));
const VerifyOtp = React.lazy(() => import('../pages/verify-otp'));
const ConfirmPassword = React.lazy(() => import('../pages/confirm-password'));
const AddBusiness = React.lazy(() => import('../pages/add-business'));
const Dashboard = React.lazy(() => import('../pages/dashboard/index'));
const CompareResults = React.lazy(() => import('../pages/compare-results'));
const Home = React.lazy(()=> import('../pages/Home/index'))

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>  

      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    </div>}>
        <Routes>
          <Route path="/addbusiness" element={<AddBusiness />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
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

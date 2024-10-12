import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(error);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] px-4 sm:px-6 md:px-8">
      <div className="ml-auto">
        <button
          onClick={() => navigate('/')}
          className="w-[110px] mt-[24px] sm:mt-[30px] py-3 bg-[#3B37FF] text-white font-medium rounded-[8px] sm:rounded-[10px] hover:bg-blue-700 transition-colors"
        >
          Skip
        </button>
      </div>
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[32px] sm:leading-[40px] md:leading-[48px] text-center">
            Welcome Back!
          </h2>
          <p className="text-center text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[24px]">
            Log in to your account
          </p>

          {/* form starts here */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[40px] sm:mt-[48px] md:mt-[56px]"
          >
            <div className="relative">
              <label
                htmlFor="business_listing_price"
                className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
              >
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 sm:px-5 py-3 border border-[#8F8F8F40]/25 rounded-[8px] sm:rounded-[10px] focus:outline-none bg-[#8F8F8F0D]/5"
              />
            </div>
            <div className="relative mt-[24px] sm:mt-[30px]">
              <label
                htmlFor="business_listing_price"
                className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                className="w-full px-4 sm:px-5 py-3 border border-[#8F8F8F40]/25 rounded-[8px] sm:rounded-[10px] focus:outline-none bg-[#8F8F8F0D]/5"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible color="#8F8F8F" size={24} />
                ) : (
                  <IoMdEye color="#8F8F8F" size={24} />
                )}
              </span>
            </div>
            <div className="text-right mt-[8px] sm:mt-[12px]">
              <span
                onClick={() => navigate('/reset-password')}
                className="text-[#3B37FF] cursor-pointer hover:underline text-sm sm:text-base"
              >
                Forgot Password?
              </span>
            </div>
            <button
              type="submit"
              className="w-full mt-[24px] sm:mt-[30px] py-3 bg-[#3B37FF] text-white font-medium rounded-[8px] sm:rounded-[10px] hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>

            <div className="text-center mt-3 text-[#8F8F8F] font-semibold text-sm">
              <p>
                Don't have an account?{' '}
                <span
                  onClick={() => navigate('/signup')}
                  className="text-[#3B37FF] cursor-pointer hover:underline text-sm sm:text-base"
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="py-4">
        <p className="text-center text-[#8F8F8F] text-sm sm:text-base font-medium">
          © 2024 Business Evaluation Tool
        </p>
      </div>
    </div>
  );
};

export default Login;

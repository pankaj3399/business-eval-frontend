import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../../store/authStore';

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { signup, isLoading, error } = useAuthStore();

  const onSubmit = async (data: any) => {
    try {
      const result = await signup(data);
      if (result) {
        console.log('Signup successful', result);
        toast.success('Signup successful!');
        reset();
        navigate('/');
      }
    } catch (err) {
      toast.error(error);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto text-center">
        <h1 className="text-[32px] font-[500] leading-[48px]">
          Analyze. Improve. Thrive.
        </h1>
        <p className="text-[16px] font-normal leading-[24px]">
          Sign up and discover your growth potential!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
          <div className="relative mb-[30px]">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
            />
          </div>
          <div className="relative mb-[30px]">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
            />
          </div>
          <div className="relative mb-[18px]">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
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
          <div className="flex items-center mb-[30px]">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-[#3B37FF]">Save Password</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#3B37FF] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Get started'}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-8">
            <p className="text-[16px]">
              <span className="text-[#8F8F8F]">Already have an account?</span>
              <span
                onClick={() => navigate('/login')}
                className="text-[#3B37FF] hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="py-4">
        <p className="text-center text-[#8F8F8F] text-sm font-medium">
          © 2024 Business Evaluation Tool
        </p>
      </div>
    </div>
  );
};

export default Signup;

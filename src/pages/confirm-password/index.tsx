import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoMdEye } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../../store/authStore';

const ConformPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const location = useLocation();
  const navigate = useNavigate();
  const { email, otp } = location.state || {};

  const onSubmit = async (data: any) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      await resetPassword({ otp, email, password: newPassword });
      toast.success('Password reset successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto text-center">
        <h1 className="text-[32px] font-[500] leading-[48px]">
          Verification Successful!
        </h1>
        <p className="text-[16px] font-normal leading-[24px] mt-[8px]">
          Set Your New Password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
          <div className="relative mb-[30px]">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              New password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              {...register('newPassword', { required: true })}
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
            />
            {errors.newPassword && (
              <p className="text-red-500">New password is required</p>
            )}
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
          <div className="relative mb-[34px]">
            <label
              htmlFor="business_listing_price"
              className="absolute left-[18px] top-[-10px] px-1 bg-[#f5f5ff] rounded text-[#3B37FF] text-[14px] z-10"
            >
              Confirm password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter your confirm password"
              {...register('confirmPassword', { required: true })}
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">Confirm password is required</p>
            )}
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible color="#8F8F8F" size={24} />
              ) : (
                <IoMdEye color="#8F8F8F" size={24} />
              )}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#3B37FF] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoading ? 'Setting Password...' : 'Set password'}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </div>

      <div className="py-4">
        <p className="text-center text-[#8F8F8F] text-sm font-medium">
          © 2024 Business Evaluation Tool
        </p>
      </div>
    </div>
  );
};

export default ConformPassword;

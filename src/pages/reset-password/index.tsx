import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import useAuthStore from '../../store/authStore';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const navigate = useNavigate();
  interface FormData {
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { forgotPassword, isLoading, error } = useAuthStore();

  const onSubmit = async (data: { email: string }) => {
    try {
      await forgotPassword(data.email);
      toast.success('OTP sent to your email!');
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: data.email } });
      }, 2000);
    } catch (err) {
      toast.error(error || 'Failed to send OTP');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <ToastContainer />
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto text-center">
        <h1 className="text-[32px] font-[500] leading-[48px]">
          Reset Password
        </h1>
        <p className="text-[16px] font-normal leading-[24px]">
          Enter your email ID to receive an OTP.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] w-full">
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
              className="w-full px-5 py-3 border border-[#8F8F8F40]/25 rounded-lg focus:outline-none bg-[#8F8F8F0D]/5"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-[32px] bg-[#3B37FF] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoading ? 'Sending...' : 'Next'}
          </button>
        </form>
      </div>
      <div className="py-4">
        <p className="text-center text-[#8F8F8F] text-sm font-medium">
          © 2024 Business Evaluation Tool
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

import React, { useRef, ChangeEvent, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const OtpInput: React.FC = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const { verifyOtp, isLoading, error } = useAuthStore();


    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length === 1) {
            inputRefs.current[index + 1]?.focus();
        } else if (value.length === 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const otp = inputRefs.current.map(input => input?.value).join('');
        console.log('Entered OTP:', otp);

        try {
            await verifyOtp({ email, otp });
            navigate('/confirm-password', { state: { email, otp } });
        } catch (err) {
            console.error('OTP Verification Failed:', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto text-center">
                <h1 className="text-[32px] font-medium leading-[48px]">Email Verification</h1>
                <p className="text-[16px] font-normal leading-[24px]">Enter the OTP sent to your email address.</p>

                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}

                <div className="flex items-center mt-[40px] gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            onChange={(e) => handleChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-[50px] h-[50px] border border-[#8F8F8F40]/25 rounded-lg mx-1 text-center text-[24px] focus:outline-none bg-[#8F8F8F0D]/5"
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-3 mt-[30px] bg-[#3B37FF] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
            </div>
            <div className="py-4">
                <p className="text-center text-[#8F8F8F] text-sm font-medium">
                    © 2024 Business Evaluation Tool
                </p>
            </div>
        </div>
    );
};

export default OtpInput;

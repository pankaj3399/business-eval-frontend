import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  isLoading: boolean;
  error: string | null;
  user: any;
  signup: (userData: any) => Promise<any>;
  login: (credentials: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: {
    otp: string;
    email: string;
    password: string;
  }) => Promise<void>;
  verifyOtp: (data: { email: string; otp: string }) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  user: null,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/register`, userData);
      const user_id = response.data.user._id;
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('token', response.data.token);
      set({ isLoading: false, user: response.data });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);

      const user_id = response.data.user._id;

      localStorage.setItem('user_id', user_id);
      localStorage.setItem('token', response.data.token);

      console.log(user_id);

      set({ isLoading: false, user: response.data });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to send reset link';
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  resetPassword: async ({ otp, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/reset-password`, {
        otp,
        email,
        password,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to reset password';
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  verifyOtp: async ({ email, otp }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/user/verify-otp`, {
        email,
        otp,
      });
      set({ isLoading: false, user: response.data });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'OTP verification failed';
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    set({ user: null });
  },
}));

export default useAuthStore;

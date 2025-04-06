import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type authData = {
  email: string;
  password: string;
  name?: string;
  role?: string;
  portfolio?: string;
};

type editData = {
  bio:string,
  portfolio: string,
  skills: string,
  name?: string;
}

type authUser = {
  _id: string;
  email: string;
  role?: string;
  profile: {
    name: string;
    bio?: string;
    skills?: string[];
    portfolio?: string;
  };
};

type UserDetails = {
  message: string;
  userDetails: {
    _id: string;
    email: string;
    role: 'freelancer' | 'employer';
    profile: {
      name: string;
      skills: string[];
      portfolio: string;
      rating: number;
      bio: string;
    };
    createdOn: string;
    __v: number;
    averageRating: string;
    totalRatings: number;
  };
};

type AuthStore = {
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isProfileLoading: boolean;
  signup: (data: authData) => Promise<void>;
  login: (data: authData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  getProfile: () => Promise<void>;
  editProfile: (data: editData) => Promise<void>;
  
  authUser: authUser | null;
  userProfile: UserDetails | null;
};

export const useAuthStore = create<AuthStore>((set,get) => ({
  isSigningUp: false,
  isLoggingIn: false,
  authUser: null,
  userProfile: null,
  isCheckingAuth: false,
  isProfileLoading: false,

  checkAuth: async () => {
    set({isCheckingAuth: true})
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: authData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      console.log(response);
      set({ authUser: response.data.user });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: authData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      toast.success(response.data.message);
      set({ authUser: response.data.user });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success(response.data.message);
      set({ authUser: null });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "failed to logout";
      toast.error(errorMessage);
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get(`/profile/getUser`);
      set({userProfile: response.data});
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "failed to fetch profile";
      toast.error(errorMessage);
    }
  },

  editProfile: async (data: editData) => {
    try {
      const response = await axiosInstance.put(`/profile/edit`, data)
      toast.success(response.data.message);
      await get().getProfile();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "failed to update profile";
      toast.error(errorMessage);
    }
  }
  
}));

import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Review = {
  _id: string;
  reviewer: {
    profile: {
      name: string;
    }
    _id: string;
  };
  rating: string;
  reviewOf: string;
  review: string;
};

type ReviewStore = {
  postReview: (rating: number, review: string, userId: string) => Promise<void>;
  getReview: (userId: string) => Promise<void>;

  isPostingReview: boolean;
  isFetchingReviews: boolean;
  reviews: Review[];
};

export const useReviewStore = create<ReviewStore>((set) => ({
  isPostingReview: false,
  isFetchingReviews: false,
  reviews: [],

  postReview: async (rating: number, review: string, userId: string) => {
    set({ isPostingReview: true });
    try {
      const response = await axiosInstance.post(`/review/post/${userId}`, {
        rating,
        review,
      });
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({ isPostingReview: false });
    }
  },

  getReview: async (userId: string) => {
    set({ isFetchingReviews: true });
    try {
      const response = await axiosInstance.get(`/review/getReviews/${userId}`);
      set({ reviews: response.data.reviews || [] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
        set({isFetchingReviews: false});
    }
  },
}));

import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Review = {
  _id: string;
  reviewer: {
    profile: {
      name: string;
    };
    _id: string;
  };
  rating: string;
  reviewOf: string;
  review: string;
};

type CurrentReview = {
  message: string;
  userReview: boolean;
  hasReviewed: {
    _id: string;
    reviewer: {
      profile: {
        name: string;
      };
      _id: string;
    };
    rating: string;
    reviewOf: string;
    review: string;
  };
};

type ReviewStore = {
  postReview: (rating: number, review: string, userId: string) => Promise<void>;
  hasReviewed: (userId: string) => Promise<void>;
  getReview: (userId: string) => Promise<void>;
  deleteReview: (reviewId: string, userId: string) => Promise<void>;
  editReview: (
    reviewId: string,
    userId: string,
    rating: number,
    review: string
  ) => Promise<void>;

  isPostingReview: boolean;
  isFetchingReviews: boolean;
  reviews: Review[];
  currentReview: CurrentReview | null;
};

export const useReviewStore = create<ReviewStore>((set, get) => ({
  isPostingReview: false,
  isFetchingReviews: false,
  reviews: [],
  currentReview: null,

  postReview: async (rating: number, review: string, userId: string) => {
    set({ isPostingReview: true });
    try {
      const response = await axiosInstance.post(`/review/post/${userId}`, {
        rating,
        review,
      });
      toast.success(response.data.message);

      const { getReview, hasReviewed } = get();
      await Promise.all([getReview(userId), hasReviewed(userId)]);
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
      set({ isFetchingReviews: false });
    }
  },

  hasReviewed: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/review/getReview/${userId}`);
      set({ currentReview: response.data || null });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      const statusCode = axiosError.response?.status;
      if (statusCode === 500) {
        toast.error(errorMessage);
      }

      set({ currentReview: null });
    }
  },

  deleteReview: async (reviewId: string, userId: string) => {
    try {
      const response = await axiosInstance.delete(
        `/review/deleteReview/${reviewId}`
      );
      toast.success(response.data.message);
      const { getReview, hasReviewed } = get();
      await Promise.all([getReview(userId), hasReviewed(userId)]);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    }
  },

  editReview: async (
    reviewId: string,
    userId: string,
    rating: number,
    review: string
  ) => {
    try {
      const response = await axiosInstance.put(`/review/edit/${reviewId}`, {
        newRating: rating,
        NewReview: review,
      });
      toast.success(response.data.message);
      const { getReview, hasReviewed } = get();
      await Promise.all([getReview(userId), hasReviewed(userId)]);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    }
  },
}));

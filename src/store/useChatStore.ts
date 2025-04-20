import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type message = {
  senderId: string;
  receiverId: string;
  text: string;
  chatId: string;
};

type chatStore = {
  getMessages: (data: string) => Promise<void>;

  isFetchingMessages: boolean;

  messages: message[];
};

export const useAuthStore = create<chatStore>((set) => ({
  isFetchingMessages: false,
  messages: [],

  getMessages: async (userId: string) => {
    set({ isFetchingMessages: true });
    try {
      const response = await axiosInstance.get(`/getMessages/${userId}`);
      set({ messages: response.data.messages });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
        set({ isFetchingMessages: false });
    }
  },
}));

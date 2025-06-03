import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  imageUrl: string;
  chatId: string;
  createdAt: string;
};

type chatStore = {
  getMessages: (data: string) => Promise<void>;
  sendMessage: (data: string, text: string,imageFile: File) => Promise<void>;
  setMessages: (data: message) => Promise<void>;
  isFetchingMessages: boolean;
  isSendingMessage: boolean;
  messages: message[];
};

export const useChatStore = create<chatStore>((set) => ({
  isFetchingMessages: false,
  isSendingMessage: false,
  messages: [],

  getMessages: async (userId: string) => {
    set({ isFetchingMessages: true });
    try {
      const response = await axiosInstance.get(
        `/message/getMessages/${userId}`
      );
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

  setMessages: async (newMsg: message) => {
    set((state) => ({
      messages: [...state.messages, newMsg],
    }));
  },

  sendMessage: async (userId: string, text: string, imageFile?: File) => {
    set({ isSendingMessage: true });

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (imageFile) {
        formData.append("image", imageFile); // "image" must match the field name expected by multer
      }
      const response = await axiosInstance.post(
        `/message/sendMessage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newMessage = response.data.newMessage;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({ isSendingMessage: false });
    }
  },
}));

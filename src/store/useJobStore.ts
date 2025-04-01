import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Job = {
  _id: string;
  title: string;
  description: string;
  budget: string;
  skillsRequired: string[];
  employer: string;
  status: "open" | "in progress" | "completed" | "cancelled";
  createdAt: string;
  employerName: string;
};

type JobStore = {
  getJobs: () => Promise<void>;
  jobs: Job[];
  isFetchingJobs: boolean;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  isFetchingJobs: false,

  getJobs: async () => {
    set({isFetchingJobs: true})
    try {
      const response = await axiosInstance.get<Job[]>("/job/getJobs");
      console.log(response)
      set({ jobs: response.data });
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Server Error.";
        toast.error(errorMessage);
    } finally {
        set({isFetchingJobs: false})
    }
  },
}));

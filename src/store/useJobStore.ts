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
  getJob:(data: string) => Promise<void>;
  saveJob:(data: string) => Promise<void>;
  jobs: Job[];
  isFetchingJobs: boolean;
  job: Job | null;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  job: null,
  isFetchingJobs: false,

  getJobs: async () => {
    set({isFetchingJobs: true})
    try {
      const response = await axiosInstance.get<{jobs: Job[]}>("/job/getJobs");
      set({ jobs: response.data.jobs});
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Server Error.";
        toast.error(errorMessage);
        set({ jobs: [] });
    } finally {
        set({isFetchingJobs: false})
    }
  },

  getJob: async (jobId) => {
    set({isFetchingJobs: true})
    try {
      const response = await axiosInstance.get<{job: Job}>(`/job/getJob/${jobId}`);
      set({ job: response.data.job});
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Server Error.";
        toast.error(errorMessage);
        set({ jobs: [] });
    } finally {
        set({isFetchingJobs: false})
    }
  },

  saveJob: async (jobId: string) => {
    try {
      const response = await axiosInstance.post(`/job/saveJob/${jobId}`)
      console.log(response)
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    }
  }
}));

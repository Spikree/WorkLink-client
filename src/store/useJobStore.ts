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

type FinishedJob = {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  jobId: string;
  freelancer: string;
  createdAt: string;
}

type JobStore = {
  getJobs: () => Promise<void>;
  getJob: (data: string) => Promise<void>;
  saveJob: (data: string) => Promise<void>;
  getFinishedJob: () => Promise<void>;
  applyJob: (
    jobId: string,
    bidAmount: string,
    coverLetter: string
  ) => Promise<void>;
  jobs: Job[];
  finishedJobs : FinishedJob[];
  isFetchingJobs: boolean;
  job: Job | null;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  finishedJobs: [],
  job: null,
  isFetchingJobs: false,

  getJobs: async () => {
    set({ isFetchingJobs: true });
    try {
      const response = await axiosInstance.get<{ jobs: Job[] }>("/job/getJobs");
      set({ jobs: response.data.jobs });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
      set({ jobs: [] });
    } finally {
      set({ isFetchingJobs: false });
    }
  },

  getJob: async (jobId) => {
    set({ isFetchingJobs: true });
    try {
      const response = await axiosInstance.get<{ job: Job }>(
        `/job/getJob/${jobId}`
      );
      set({ job: response.data.job });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
      set({ jobs: [] });
    } finally {
      set({ isFetchingJobs: false });
    }
  },

  saveJob: async (jobId: string) => {
    try {
      const response = await axiosInstance.post(`/job/saveJob/${jobId}`);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    }
  },

  applyJob: async (jobId: string, bidAmount: string, coverLetter: string) => {
    try {
      const response = await axiosInstance.post(
        `/application/applyJob/${jobId}`,
        {
          bidAmount,
          coverLetter,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    }
  },

  getFinishedJob: async () => {
    set({ isFetchingJobs: true });
    try {
      const response = await axiosInstance.get("/job/getFinishedJobs");
      set({finishedJobs: response.data.finishedJobs})
    } catch (error) {
      console.log(error);
    }
  },
}));

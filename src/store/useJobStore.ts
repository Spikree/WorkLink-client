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

type onGoingJobs = {
  _id: string;
  freelancer: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  employer: string;
  payCheck: string;
}

type FinishedJob = {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  jobId: string;
  freelancer: string;
  createdAt: string;
}

type createJobData = {
  title: string;
  description: string;
  budget: string;
  skillsRequired: string[];
  status: string;
}

type SavedJob = {
  _id: string;
  jobTitle: string;
  jobDescription: string;
  jobId: string;
  freelancer: string;
}

type CurrentJob = {
  _id: string;
  freelancer: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  employer: string;
  payCheck: string;
}

type JobStore = {
  getJobs: () => Promise<void>;
  getJob: (data: string) => Promise<void>;
  saveJob: (data: string) => Promise<void>;
  deleteJob: (data: string) => Promise<void>;
  createJob: (data: createJobData) => Promise<void>;
  getFinishedJob: () => Promise<void>;
  getSavedJobs: () => Promise<void>;
  getCurrentJobs: () => Promise<void>;
  getOnGoingJobs: () => Promise<void>;
  applyJob: (
    jobId: string,
    bidAmount: string,
    coverLetter: string
  ) => Promise<void>;
  jobs: Job[];
  finishedJobs : FinishedJob[];
  savedJobs: SavedJob[];
  currentJobs: CurrentJob[];
  onGoingJobs: onGoingJobs[];
  isFetchingJobs: boolean;
  isDeletingJob: boolean;
  isPostingJob: boolean;
  job: Job | null;
};

export const useJobStore = create<JobStore>((set,get) => ({
  jobs: [],
  finishedJobs: [],
  savedJobs:[],
  currentJobs:[],
  onGoingJobs:[],
  job: null,
  isFetchingJobs: false,
  isDeletingJob: false,
  isPostingJob: false,

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
      await get().getSavedJobs();
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
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isFetchingJobs: false});
    }
  },

  getSavedJobs: async () => {
    set({isFetchingJobs: true});
    try {
      const response = await axiosInstance.get("/job/getSavedJobs")
      set({savedJobs: response.data.savedJobs})
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isFetchingJobs: false});
    }
  },

  getCurrentJobs: async () => {
    set({isFetchingJobs: true});
    try {
      const response = await axiosInstance.get("/job/getCurrentJobs")
      set({currentJobs: response.data.currentJobs});
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isFetchingJobs: false});
    }
  },

  createJob : async (data : createJobData) => {
    set({isPostingJob: true});
    try {
      const response = await axiosInstance.post("/job/createJob",
        data
      )
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isPostingJob: false});
    }
  },

  getOnGoingJobs : async () => {
    set({isFetchingJobs: true});
    try {
      const response = await axiosInstance.get("/job/getOnGoingJobs");
      set({onGoingJobs: response.data.jobs})
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isFetchingJobs: false}); 
    }
  },

  deleteJob: async (data: string) => {
    set({isDeletingJob: true});
    try {
      const response = await axiosInstance.delete(`/job/deleteJob/${data}`);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Server Error.";
      toast.error(errorMessage);
    } finally {
      set({isDeletingJob: false});
    }
  }
}));

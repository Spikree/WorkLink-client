import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type Application = {
  _id: string;
  job: string;
  freelancer: string;
  bidAmount: string;
  coverLetter: string;
  status: string;
  submittedAt: string;
  jobTitle: string;
};

type JobApplications = {
  _id: string;
  job: string;
  freelancer: string;
  bidAmount: string;
  coverLetter: string;
  submittedAt: string;
  status: string;
};

type ApplicationStore = {
  isLoadingAppliedJobs: boolean;
  isFetchingApplications: boolean;
  jobApplications: JobApplications[];
  applications: Application[];

  getAppliedJobs: () => Promise<void>;
  getJobApplications: (jobId: string) => Promise<void>;
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
  isLoadingAppliedJobs: false,
  isFetchingApplications: false,
  applications: [],
  jobApplications: [],

  getAppliedJobs: async () => {
    set({ isLoadingAppliedJobs: true });
    try {
      const response = await axiosInstance.get("/job/getAppliedJobs");
      set({ applications: response.data.appliedJobs });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Error Fetching Applications";
      toast.error(errorMessage);
    } finally {
      set({ isLoadingAppliedJobs: false });
    }
  },

  getJobApplications: async (jobId: string) => {
    set({ isFetchingApplications: true });
    try {
      const response = await axiosInstance.get(`/job/getApplications/${jobId}`);
      set({ jobApplications: response.data.applications });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Error Fetching Applications";
      toast.error(errorMessage);
    } finally {
      set({ isLoadingAppliedJobs: false });
    }
  },
}));

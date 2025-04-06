import React, { useEffect } from "react";
import {
  Building2,
  Calendar,
  CircleDollarSign,
  BriefcaseIcon,
  CheckCircle2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";

const JobDetails: React.FC = () => {
  const { jobId } = useParams() as { jobId: string };

  const { getJob, job, saveJob } = useJobStore();

  useEffect(() => {
    getJob(jobId);
  }, [jobId, getJob]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatDescription = (description: string | undefined) => {
    if (!description) return null;
    return description.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-6 sm:mt-0 mt-4">
      <div className="bg-white border-b rounded-xl">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {job?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span className="truncate">{job?.employerName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {formatDate(job?.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <button
                className="bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 
                           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2"
              >
                Apply Now
              </button>
              <button
                className="bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 
                           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2"
                onClick={() => {
                  saveJob(jobId);
                }}
              >
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        <div className="md:col-span-2 space-y-4 sm:space-y-8">
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <div className="prose prose-gray max-w-none text-sm sm:text-base">
              {formatDescription(job?.description)}
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Job Overview
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Salary</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(job?.budget)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Job Status</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {job?.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Required Skills
            </h3>
            <div className="space-y-2">
              {job?.skillsRequired?.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm sm:text-base text-gray-700 capitalize">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
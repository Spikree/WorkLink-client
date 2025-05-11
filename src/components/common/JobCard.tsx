import React from "react";
import { Calendar, Building2, DollarSign, Briefcase } from "lucide-react";
import Button from "./Button";

interface JobCardProps {
  jobs: {
    _id: string;
    title: string;
    description: string;
    budget: string;
    skillsRequired: string[];
    employer: string;
    status: string;
    createdAt: string;
    employerName: string;
  };
  onApply?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
  navigateToJobDashboard?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  jobs,
  onApply,
  onDelete,
  navigateToJobDashboard,
}) => {
  // Format the date to be more readable
  const formattedDate = new Date(jobs.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format budget with proper handling for large numbers
  const formatBudget = (budget: string) => {
    const num = Number(budget);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="space-y-4">
        {/* Header section with title and budget */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div
            onClick={() => {
              navigateToJobDashboard?.(jobs?._id);
            }}
            className="flex-1"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 hidden sm:inline" />
              <span className="break-words">{jobs.title}</span>
            </h2>

            <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
              <Building2 className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="truncate font-medium">{jobs.employerName}</span>

              <span className="mx-1 text-gray-400">•</span>

              <Calendar className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="text-gray-500 text-xs sm:text-sm">
                Posted {formattedDate}
              </span>
            </div>
          </div>

          <div className="flex items-center text-green-600 font-bold text-base sm:text-lg flex-shrink-0 bg-green-50 px-3 py-1 rounded-full">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{formatBudget(jobs.budget)}</span>
          </div>
        </div>

        {/* Description section */}
        <div
          onClick={() => {
            navigateToJobDashboard?.(jobs?._id);
          }}
          className="bg-gray-50 p-3 rounded-lg"
        >
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {jobs.description.length > 150
              ? `${jobs.description.substring(0, 150)}...`
              : jobs.description}
          </p>
        </div>

        {/* Skills section */}
        <div className="flex flex-wrap gap-2">
          {jobs.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium truncate max-w-[150px] border border-blue-100"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Actions section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 mt-2 border-t border-gray-100">
          {onApply && (
            <Button
              onClick={() => onApply(jobs._id)}
              disableStyles={false}
              className="w-full sm:w-auto sm:flex-grow bg-blue-600 text-white py-2.5 px-6 rounded-lg text-sm font-medium 
                     hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
            >
              Apply Now
            </Button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(jobs._id)}
              className="w-full sm:w-auto sm:ml-4 text-center bg-red-50 text-red-600 px-6 py-2.5 rounded-lg text-sm font-medium
                       hover:bg-red-100 transition-colors duration-200 focus:outline-none
                       focus:ring-2 focus:ring-red-500 focus:ring-offset-2 border border-red-100"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;

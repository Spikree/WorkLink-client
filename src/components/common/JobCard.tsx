import React from "react";
import { Calendar, Building2, DollarSign } from "lucide-react";
import Button from "./Button";

interface JobCardProps {
  jobs: {
    _id: string;
    title: string;
    description: string;
    budget: string;
    skillsRequired: string[]; // Changed from Skill[] to string[]
    employer: string;
    status: string;
    createdAt: string;
    employerName: string;
  };
  onApply?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ jobs, onApply, onDelete }) => {
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
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
              {jobs.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{jobs.employerName}</span>
            </div>
          </div>
          <div className="flex items-center text-green-600 font-medium text-sm sm:text-base flex-shrink-0 mt-1 sm:mt-0">
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{formatBudget(jobs.budget)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Posted {formattedDate}</span>
        </div>

        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
          {jobs.description.length > 150
            ? `${jobs.description.substring(0, 150)}...`
            : jobs.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-4">
          {jobs.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium truncate max-w-[150px]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 pt-2 sm:pt-0">
          {onApply && (
            <Button
              onClick={() => onApply(jobs._id)}
              disableStyles={false}
              className="w-full sm:w-auto sm:flex-grow bg-blue-600 text-white py-2 sm:py-2.5 px-4 rounded-lg text-sm font-medium 
                     hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Now
            </Button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(jobs._id)}
              className="w-full sm:w-auto sm:ml-4 text-center bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium
                       hover:bg-red-200 transition-colors duration-200 focus:outline-none
                       focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
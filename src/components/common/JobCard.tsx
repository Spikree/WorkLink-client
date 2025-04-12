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

const JobCard: React.FC<JobCardProps> = ({ jobs, onApply,onDelete }) => {
  // Format the date to be more readable
  const formattedDate = new Date(jobs.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {jobs.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{jobs.employerName}</span>
            </div>
          </div>
          <div className="flex items-center text-green-600 font-medium">
            <DollarSign className="w-4 h-4" />
            <span>{Number(jobs.budget).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Posted {formattedDate}</span>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {jobs.description.length > 200
            ? `${jobs.description.substring(0, 200)}...`
            : jobs.description}
        </p>

        <div className="flex text-center justify-between">
          <div className="flex flex-wrap gap-2 mt-4">
            {jobs.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {onDelete && <div>
              <button onClick={() => onDelete(jobs._id)} className="items-center text-center align-middle bg-blue-500 px-6 py-2 rounded-xl text-white">delete</button>
          </div>}
        </div>

        {onApply && (
          <Button
            onClick={() => onApply(jobs._id)}
            disableStyles={false}
            className="w-full mt-4 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                   hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;

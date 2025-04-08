import React from "react";
import { Bookmark, Briefcase, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobStore } from "../../store/useJobStore";

interface SavedJobProps {
  job: {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    jobId: string;
    freelancer: string;
  };
}

const SavedJobCard: React.FC<SavedJobProps> = ({ job }) => {
  const { saveJob } = useJobStore();

  const removeSavedJob = () => {
    saveJob(job.jobId);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {job.jobTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>Job ID: {job.jobId}</span>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5 text-sm font-medium cursor-pointer"
            onClick={removeSavedJob}
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {job.jobDescription}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-end">
          <Link to={`/jobDetails/${job.jobId}`}>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SavedJobCard;

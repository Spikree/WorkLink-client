import React from 'react';
import { Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinishedJobProps {
  job: {
    _id: string;
    jobId: string;
    jobTitle: string;
    jobDescription: string;
    freelancer: string;
    createdAt: string;
  };
  currentRole: string;
}

const FinishedJobCard: React.FC<FinishedJobProps> = ({ job, currentRole }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {job.jobTitle}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Completed on {formatDate(job.createdAt)}</span>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1.5 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            <span>Completed</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {job.jobDescription}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
            <Link to={`${ currentRole === "freelancer" ? `/jobDetails/${job.jobId}` :  `/jobDashboard/${job.jobId}`}`}>
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5">
            View Full Description
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishedJobCard;
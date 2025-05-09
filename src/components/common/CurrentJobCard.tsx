import React from 'react';
import { Briefcase, DollarSign, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CurrentJobProps {
  job: {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    jobId: string;
    freelancer: string;
    employer: string;
    payCheck: string;
  };
}

const CurrentJobCard: React.FC<CurrentJobProps> = ({ job }) => {
  const formatPaycheck = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                {job.jobTitle}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>ID: {job.jobId}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{formatPaycheck(job.payCheck)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
            {job.jobDescription}
          </p>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex  sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <Link to={`/jobDetails/${job.jobId}`}>
            <button className="text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1.5">
              View Details
            </button>
          </Link>
          <button className="text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1.5">
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentJobCard;
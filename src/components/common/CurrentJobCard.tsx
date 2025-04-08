import React from 'react';
import { Briefcase, DollarSign, Building2 } from 'lucide-react';

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
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {job.jobTitle}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>ID: {job.jobId}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                <span>{formatPaycheck(job.payCheck)}</span>
              </div>
            </div>
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
          <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1.5">
            View Details
          </button>
          <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1.5">
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentJobCard;
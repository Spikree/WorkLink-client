import React from 'react';
import { Calendar, DollarSign, CheckCircle2, Clock, XCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplicationCardProps {
  application: {
    _id: string;
    job: string;
    freelancer: string;
    bidAmount: string;
    coverLetter: string;
    status: string;
    submittedAt: string;
    jobTitle: string;
  };
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const getStatusConfig = (status: string) => {
    const statusMap = {
      accepted: {
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      },
      rejected: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: <XCircle className="h-4 w-4 text-red-600" />,
      },
      pending: {
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: <Clock className="h-4 w-4 text-yellow-600" />,
      },
    } as const;

    return statusMap[status.toLowerCase() as keyof typeof statusMap] || statusMap.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statusConfig = getStatusConfig(application.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {application.jobTitle}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">${application.bidAmount}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(application.submittedAt)}</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full border ${statusConfig.color} flex items-center gap-1.5 text-sm font-medium`}>
            {statusConfig.icon}
            <span>{application.status}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {application.coverLetter}
          </p>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <Link to={`/jobDetails/${application.job}`}>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
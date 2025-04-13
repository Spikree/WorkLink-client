import { BriefcaseIcon, DollarSignIcon, UserIcon, ExternalLinkIcon } from 'lucide-react';

interface JobCardProps {
  job: {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    freelancer: string;
    payCheck: string;
  }
}

const OnGoingJobsCard = ({ job }: JobCardProps) => {
  const truncatedDescription = job.jobDescription.length > 200 
    ? `${job.jobDescription.substring(0, 200)}...` 
    : job.jobDescription;

  const formattedPayment = new Intl.NumberFormat().format(Number(job.payCheck));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BriefcaseIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
        </div>
        <div className="flex items-center text-green-600">
          <DollarSignIcon className="w-4 h-4 mr-1" />
          <span className="font-medium">{formattedPayment}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{truncatedDescription}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500">
          <UserIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">Freelancer ID: {job.freelancer}</span>
        </div>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('View details for job:', job._id)}
        >
          <span className="mr-2">View Details</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OnGoingJobsCard;
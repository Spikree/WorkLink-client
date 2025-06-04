import { BriefcaseIcon, DollarSignIcon, UserIcon, ExternalLinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
interface JobCardProps {
  job: {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    freelancer: {
      _id: string,
      profile: {
        name: string
      }
    };
    payCheck: string;
    jobId: string;
  }
}

const OnGoingJobsCard = ({ job }: JobCardProps) => {
  const truncatedDescription = job.jobDescription.length > 200 
    ? `${job.jobDescription.substring(0, 200)}...` 
    : job.jobDescription;

  // Format the payment amount
  const formattedPayment = new Intl.NumberFormat().format(Number(job.payCheck));

  const navigate = useNavigate();

  const openOnGoingJobDetails = (jobId: string) => {
    navigate(`/getOnGoingJobDetails/${jobId}`);
  }
  
  // If payment amount is too long, truncate with ellipsis
  const displayPayment = formattedPayment.length > 10 
    ? formattedPayment.substring(0, 7) + '...' 
    : formattedPayment;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow mb-6">
      <div className="flex flex-wrap items-start justify-between mb-4">
        <div className="flex items-center space-x-2 flex-1 mr-2 min-w-0">
          <BriefcaseIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-800 truncate max-w-full">{job.jobTitle}</h3>
        </div>
        <div className="flex items-center text-green-600 flex-shrink-0" title={`$${formattedPayment}`}>
          <DollarSignIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="font-medium max-w-24 truncate">${displayPayment}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{truncatedDescription}</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center text-gray-500 flex-1 mr-2">
          <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm truncate">Freelancer name: {job?.freelancer?.profile?.name}</span>
        </div>
        <Button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
          onClick={() => { console.log('View details for job:', job._id); openOnGoingJobDetails(job.jobId); } } disableStyles={false}        >
          <span className="mr-2">View Details</span>
          <ExternalLinkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnGoingJobsCard;
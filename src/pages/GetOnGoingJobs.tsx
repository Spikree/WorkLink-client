import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import OnGoingJobsCard from "../components/common/OnGoingJobCard";
import { Briefcase, Clock, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const GetOnGoingJobs = () => {
  const { getOnGoingJobs, isFetchingJobs, onGoingJobs } = useJobStore();

  useEffect(() => {
    getOnGoingJobs();
  }, [getOnGoingJobs]);

  if (isFetchingJobs) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (onGoingJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="bg-blue-50 rounded-full p-6 mb-6">
          <Clock size={48} className="text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No ongoing jobs
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          You don't have any jobs in progress. Active jobs will appear here.
        </p>
        <Link to={"/postJob"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Start a New Job
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4">
        <Briefcase className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Ongoing Jobs</h2>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
          {onGoingJobs.length}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {onGoingJobs?.map((job) => (
          <OnGoingJobsCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default GetOnGoingJobs;

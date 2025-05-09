import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
// import { Loader } from "lucide-react";
import FinishedJobCard from "../components/common/FinishedJobCard";
import SkeletonCard from "../components/common/SkeletonCard";

const FinishedJobs = () => {
  const { getFinishedJob, finishedJobs,isFetchingJobs } = useJobStore();

  useEffect(() => {
    getFinishedJob();
  }, [getFinishedJob]);

  if (isFetchingJobs) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Completed Jobs</h1>
        <p className="mt-2 text-sm text-gray-600">
          View all your successfully completed projects
        </p>
      </div>

      {finishedJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No completed jobs yet</h3>
            <p className="text-gray-500">Complete your first job to see it listed here.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {finishedJobs.map((job) => (
            <FinishedJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FinishedJobs;
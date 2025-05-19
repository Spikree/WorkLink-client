import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
// import { Loader } from "lucide-react";
import CurrentJobCard from "../components/common/CurrentJobCard";
import SkeletonCard from "../components/common/SkeletonCard";

const CurrentJobs = () => {
  const { getCurrentJobs, currentJobs, isFetchingJobs } = useJobStore();

  useEffect(() => {
    getCurrentJobs();
  }, [getCurrentJobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Current Jobs</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track and manage your active projects
        </p>
      </div>

      {isFetchingJobs ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : !currentJobs || currentJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No active jobs
            </h3>
            <p className="text-gray-500">
              You don't have any ongoing projects at the moment.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentJobs.map((job) => (
            <CurrentJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentJobs;

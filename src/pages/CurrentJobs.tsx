import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import { Loader } from "lucide-react";
import CurrentJobCard from "../components/common/CurrentJobCard";

const CurrentJobs = () => {
  const { getCurrentJobs, currentJobs, isFetchingJobs } = useJobStore();

  useEffect(() => {
    getCurrentJobs();
  }, [getCurrentJobs]);

  if (isFetchingJobs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Current Jobs</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track and manage your active projects
        </p>
      </div>

      {!currentJobs || currentJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No active jobs</h3>
            <p className="text-gray-500">You don't have any ongoing projects at the moment.</p>
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
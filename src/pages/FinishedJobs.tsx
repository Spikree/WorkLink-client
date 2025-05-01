import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
// import { Loader } from "lucide-react";
import FinishedJobCard from "../components/common/FinishedJobCard";

const FinishedJobs = () => {
  const { getFinishedJob, finishedJobs,isFetchingJobs } = useJobStore();

  useEffect(() => {
    getFinishedJob();
  }, [getFinishedJob]);

  const SkeletonFinishedJobs = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Job title with icon */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-6 w-64 bg-gray-200 rounded"></div>
              </div>
              {/* Bid amount and date */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-1 bg-gray-200 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            {/* Status badge */}
            <div className="px-3 py-1 w-24 h-7 bg-gray-200 rounded-full"></div>
          </div>

          {/* Cover letter */}
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  if (isFetchingJobs) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonFinishedJobs key={index} />
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
import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import { Loader } from "lucide-react";
import SavedJobCard from "../components/common/SavedJobCard";

const SavedJobs = () => {
  const { getSavedJobs, isFetchingJobs, savedJobs } = useJobStore();

  useEffect(() => {
    getSavedJobs();
  }, [getSavedJobs]);

  if (isFetchingJobs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your saved job listings
        </p>
      </div>

      {!savedJobs || savedJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No saved jobs yet</h3>
            <p className="text-gray-500">Start saving jobs you're interested in to view them here.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedJobs.map((job) => (
            <SavedJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
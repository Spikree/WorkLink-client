import { useEffect } from "react";
import { useApplicationStore } from "../store/useApplicationStore";
// import { Loader } from "lucide-react";
import ApplicationCard from "../components/common/ApplicationCard";
import SkeletonCard from "../components/common/SkeletonCard";

const AppliedJobs = () => {
  const { isLoadingAppliedJobs, getAppliedJobs, applications } =
    useApplicationStore();

  useEffect(() => {
    getAppliedJobs();
  }, [getAppliedJobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-0 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Applied Jobs</h1>
        <p className="mt-2 text-sm text-gray-600">
          All your applied jobs will appear here
        </p>
      </div>

      {isLoadingAppliedJobs ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No applications found
            </h3>
            <p className="text-gray-500">
              Start applying for jobs you're interested in to view them here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;

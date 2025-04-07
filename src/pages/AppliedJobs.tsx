import { useEffect } from "react";
import { useApplicationStore } from "../store/useApplicationStore";
import { Loader } from "lucide-react";
import ApplicationCard from "../components/common/ApplicationCard";

const AppliedJobs = () => {
  const { isLoadingAppliedJobs, getAppliedJobs, applications } = useApplicationStore();

  useEffect(() => {
    getAppliedJobs();
  }, [getAppliedJobs]);

  if (isLoadingAppliedJobs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Applied Jobs</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No job applications found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
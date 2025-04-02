import { Loader } from "lucide-react";
import JobCard from "../components/common/JobCard";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";

const Dashboard = () => {
  const handleApply = (jobId: string) => {
    alert("Application submitted!" + jobId);
  };

  const { isFetchingJobs, getJobs, jobs } = useJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  if (isFetchingJobs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="mt-16 sm:mt-0 flex flex-col gap-4 sm:overflow-y-auto h-[calc(100vh-3rem)] pb-6">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          jobs={job}
          onApply={() => handleApply(job._id)}
        />
      ))}
    </div>
  );
};

export default Dashboard;

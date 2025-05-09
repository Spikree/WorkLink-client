// import { Loader } from "lucide-react";
import JobCard from "../components/common/JobCard";
import SearchBar from "../components/common/SearchBar";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/common/SkeletonCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleApply = (jobId: string) => {
    navigate(`/jobDetails/${jobId}`);
    getJob(jobId);
  };

  const { isFetchingJobs, getJobs, jobs, getJob } = useJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  if (isFetchingJobs) {
    return (
      <div className="flex flex-col gap-10 p-2 m-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 p-2 m-4 sm:px-16">
      <div className="flex">
        <div className="sm:flex sm:justify-between w-full">
          <div className="header">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              All Job Listings Will Appear Here
            </p>
          </div>
          <div className="mt-6">
            <SearchBar placeholder="search for jobs" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          jobs={job}
          onApply={() => handleApply(job._id)}
        />
      ))}
      </div>
      
    </div>
  );
};

export default Dashboard;

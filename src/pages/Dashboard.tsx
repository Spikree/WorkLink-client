// import { Loader } from "lucide-react";
import JobCard from "../components/common/JobCard";
import SearchBar from "../components/common/SearchBar";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const SkeletonJobCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full w-16 h-6"
              ></div>
            ))}
          </div>

          <div className="w-full h-10 bg-gray-200 rounded-lg mt-4"></div>
        </div>
      </div>
    );
  };

  if (isFetchingJobs) {
    return (
      <div className="flex flex-col gap-10 p-2 m-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonJobCard key={index} />
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

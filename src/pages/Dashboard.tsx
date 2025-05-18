import { useEffect, useState } from "react";
import JobCard from "../components/common/JobCard";
import SearchBar from "../components/common/SearchBar";
import { useJobStore } from "../store/useJobStore";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/common/SkeletonCard";
import { X } from "lucide-react";

type Job = {
  _id: string;
  title: string;
  description: string;
  budget: string;
  skillsRequired: string[];
  employer: {
    _id: string;
    profile: {
      name: string;
    }
  };
  status: "open" | "in progress" | "completed" | "cancelled";
  createdAt: string;
  employerName: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Job[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleApply = (jobId: string) => {
    navigate(`/jobDetails/${jobId}`);
    getJob(jobId);
  };

  const { isFetchingJobs, getJobs, jobs, getJob, searchJobs } = useJobStore();
  
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    const results = await searchJobs(query);
    setSearchResults(results);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchQuery("");
  };

  const displayJobs = searchResults || jobs;

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
            <SearchBar 
              placeholder="Search by title, skills, or employer" 
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      
      {searchResults !== null && (
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">
            Showing results for: <span className="text-primary">{searchQuery}</span>
          </p>
          <button
            onClick={handleClearSearch}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
            Clear search
          </button>
        </div>
      )}
      
      <div className="flex flex-col gap-4">
        {displayJobs && displayJobs.length > 0 ? (
          displayJobs.map((job) => (
            <JobCard
              key={job._id}
              jobs={job}
              onApply={() => handleApply(job._id)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import { Loader } from "lucide-react";
import JobCard from "../components/common/JobCard";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleApply = (jobId: string) => {
    navigate(`/jobDetails/${jobId}`);
    getJob(jobId);
  };

  const { isFetchingJobs, getJobs, jobs,getJob } = useJobStore();

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
    <div className="flex flex-col gap-10 p-2 m-4">
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

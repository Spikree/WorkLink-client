import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import JobCard from "../components/common/JobCard";

const Home = () => {
  const { getCreatedJobs, createdJobs } = useJobStore();

  useEffect(() => {
    getCreatedJobs();
  }, [getCreatedJobs]);

  const deleteJob = (jobId: string) => {
    alert(`job with id ${jobId} deleted`);
  };

  return (
    <div className="flex flex-col gap-10 p-2 m-4">
      {createdJobs?.map((job) => (
        <JobCard key={job._id} jobs={job} onDelete={() => deleteJob(job._id)} />
      ))}
    </div>
  );
};

export default Home;

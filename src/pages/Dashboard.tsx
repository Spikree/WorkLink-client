import { Loader } from "lucide-react";
import JobCard from "../components/common/JobCard";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";

const Dashboard = () => {
  const handleApply = () => {
    alert("Application submitted!");
  };

  const {isFetchingJobs,getJobs} = useJobStore();

  useEffect(() => {
    getJobs();
  },[getJobs])

  const jobData = {
    title: "Senior Frontend Developer",
    salary: "120,000 - 150,000",
    company: "Tech Innovators Inc.",
    postedDate: "2 days ago",
    description:
      "We're looking for an experienced Frontend Developer to join our dynamic team. The ideal candidate will have a strong foundation in modern web technologies and a passion for creating exceptional user experiences.",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Next.js" },
      { name: "GraphQL" },
    ],
  };

  if(isFetchingJobs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="mt-16 sm:mt-0">
      <JobCard {...jobData} onApply={handleApply} />
    </div>
  );
};

export default Dashboard;

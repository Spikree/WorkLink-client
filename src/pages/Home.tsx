import { useEffect, useState } from "react";
import { useJobStore } from "../store/useJobStore";
import JobCard from "../components/common/JobCard";
import DeleteModal from "../components/common/DeleteModal";
import { LayoutGrid, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { getCreatedJobs, createdJobs, deleteJob } = useJobStore();
  const [jobDeleteId, setJobDeleteId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const role = localStorage.getItem("user_role");
  const navigate = useNavigate();

  useEffect(() => {
    getCreatedJobs();
  }, [getCreatedJobs]);

  const deleteJobModal = () => {
    deleteJob(jobDeleteId);
    setShowDeleteModal(false);
    setJobDeleteId("");
  };

  const onDelete = (jobId: string) => {
    setShowDeleteModal(true);
    setJobDeleteId(jobId);
  };

  const onCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const navigateToJobDashboard = (jobId: string) => {
    if (role === "employer") {
      navigate(`/jobDashboard/${jobId}`);
    }
  };

  if (createdJobs?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">
        <div className="bg-gray-50 rounded-full p-6 mb-6">
          <LayoutGrid size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No jobs created yet
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          You haven't created any jobs. When you do, they'll appear here.
        </p>
        <Link to={"/postJob"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-2" />
            Create New Job
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-2 m-4">
      {createdJobs?.map((job) => (
        <JobCard
          key={job._id}
          jobs={job}
          onDelete={() => onDelete(job._id)}
          navigateToJobDashboard={navigateToJobDashboard}
        />
      ))}

      {showDeleteModal && (
        <DeleteModal
          onCancel={onCancelDelete}
          onDelete={deleteJobModal}
          title="job"
        />
      )}
    </div>
  );
};

export default Home;

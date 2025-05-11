import { useParams } from "react-router-dom";

const JobDashboard = () => {
  const { id: jobId } = useParams();

  return <div>JobDashboard {jobId}</div>;
};

export default JobDashboard;

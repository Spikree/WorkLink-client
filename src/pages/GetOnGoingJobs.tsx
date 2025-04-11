import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore"

const GetOnGoingJobs = () => {

  const {getOnGoingJobs,isFetchingJobs,onGoingJobs} = useJobStore();

  useEffect(() => {
    getOnGoingJobs();
  },[getOnGoingJobs]);

  if(isFetchingJobs) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {
        onGoingJobs.map((job) => (
          <div key={job._id}>
            <h2>{job.jobTitle}</h2>
            <p>{job.jobDescription}</p>
          </div>
        ))
      }
    </div>
  )
}

export default GetOnGoingJobs
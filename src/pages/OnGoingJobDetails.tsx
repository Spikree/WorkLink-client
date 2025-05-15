import { useParams } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";
import { useEffect } from "react";
import {
  DollarSign,
  Briefcase,
  FileText,
  Tag,
  User,
  Calendar,
} from "lucide-react";
import { useApplicationStore } from "../store/useApplicationStore";

const OnGoingJobDetails = () => {
  const { id: jobId } = useParams<{ id: string }>();

  const { getJob, job, isFetchingJobs } = useJobStore();
  const { getJobApplications } = useApplicationStore();

  useEffect(() => {
    if (jobId) {
      getJob(jobId);
    }

    if (jobId) {
      getJobApplications(jobId);
    }
  }, [getJob, getJobApplications, jobId]);

  if (isFetchingJobs) {
    return (
      <div className="h-full flex justify-center items-center bg-gradient-to-br pt-20 sm:pt-0">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="h-full flex justify-center items-center bg-gradient-to-br pt-20 sm:pt-0">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
          <p className="mt-2 text-gray-500">
            The job you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br p-4 sm:p-6 sm:pt-6">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Job Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Briefcase className="mr-3 text-blue-600 w-8 h-8" />
                {job.title}
              </h1>
              <span className="px-4 py-2 bg-[#e6e2ff] text-blue-800 rounded-full text-sm font-medium">
                {job.status}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Posted by</p>
                  <p className="font-medium text-gray-900">
                    {job.employerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <DollarSign className="w-5 h-5 mr-3 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-medium text-gray-900">${job.budget}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Posted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#e6e2ff] p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                  <FileText className="mr-3 text-blue-600" />
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                  <Tag className="mr-3 text-blue-600" />
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#e6e2ff] text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnGoingJobDetails;

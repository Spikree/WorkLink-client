import { useParams } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";
import { useEffect, useState } from "react";
import {
  DollarSign,
  Briefcase,
  FileText,
  Tag,
  User,
  Calendar,
  Check,
  ChevronDown,
} from "lucide-react";
import { useApplicationStore } from "../store/useApplicationStore";

const OnGoingJobDetails = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

  const { getJob, job, isFetchingJobs, editJobStatus } = useJobStore();
  const { getJobApplications } = useApplicationStore();

  useEffect(() => {
    if (jobId) {
      getJob(jobId);
    }

    if (jobId) {
      getJobApplications(jobId);
    }
  }, [getJob, getJobApplications, jobId]);

  const editStatusOfTheJob = (jobid: string, status: string) => {
    editJobStatus(jobid, status);
  };

  const status = [
    // { name: "Open", value: "open", color: "bg-blue-100 text-blue-800" },
    {
      name: "In Progress",
      value: "in progress",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Completed",
      value: "completed",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Cancelled",
      value: "cancelled",
      color: "bg-red-100 text-red-800",
    },
  ];

  const getStatusColor = (currentStatus: string) => {
    const statusItem = status.find(
      (s) => s.value === currentStatus.toLowerCase()
    );
    return statusItem?.color || "bg-gray-100 text-gray-800";
  };

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
            <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Briefcase className="mr-3 text-blue-600 w-8 h-8" />
                {job.title}
              </h1>
              <div className="py-1">
                <button
                  onClick={() => setShowStatusOptions(!showStatusOptions)}
                  className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-all duration-200 ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status || "Unknown"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showStatusOptions ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {showStatusOptions && (
                  <div>
                    {status.map((statusOption, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          editStatusOfTheJob(jobId || "", statusOption.value)
                        }
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          job.status.toLowerCase() === statusOption.value
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full ${statusOption.color}`}
                        >
                          {statusOption.name}
                        </span>
                        {job.status.toLowerCase() === statusOption.value && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

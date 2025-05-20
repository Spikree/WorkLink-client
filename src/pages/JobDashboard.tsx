import { useNavigate, useParams } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";
import { useEffect, useState } from "react";
import {
  DollarSign,
  Briefcase,
  FileText,
  Tag,
  User,
  Calendar,
  Clock,
  FileText as FileIcon,
  X,
  XCircle,
  CheckCircle,
  MessageCircle,
  UserCircle,
} from "lucide-react";
import { useApplicationStore } from "../store/useApplicationStore";

type JobApplications = {
  _id: string;
  job: string;
  freelancer: {
    _id: string,
    profile: {
      name: string
    }
  };
  bidAmount: string;
  coverLetter: string;
  submittedAt: string;
  status: string;
};

const JobDashboard = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const router = useNavigate();
  const { getJob, job, isFetchingJobs } = useJobStore();
  const { getJobApplications, jobApplications, acceptApplication } =
    useApplicationStore();
  const [isApplicationModalOpen, setIsApplicationModalOpen] =
    useState<boolean>(false);
  const [selectedApplication, setSelectedApplications] =
    useState<JobApplications | null>();

  const openApplicationModal = (application: JobApplications) => {
    setIsApplicationModalOpen(true);
    setSelectedApplications(application);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedApplications(null);
  };

  const acceptApplicationFunction = (jobId: string, applicationId: string) => {
    acceptApplication(jobId, applicationId);
    closeApplicationModal()
  };

  const openChat = (toChatId: string) => {
    router(`/chatRoom/${toChatId}`);
  };

  const viewProfile = (userId: string) => {
    router(`/userProfile/${userId}`)
  }

  useEffect(() => {
    if (jobId) {
      getJob(jobId);
    }

    if (jobId) {
      getJobApplications(jobId);
    }
  }, [getJob, getJobApplications, jobId]);

  useEffect(() => {
    if (isApplicationModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isApplicationModalOpen]);

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

        {/* Job Applications */}
        {job.status === "open" && jobApplications && jobApplications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Applications ({jobApplications.length})
              </h2>
              <div className="space-y-4">
                {jobApplications.map((application) => (
                  <div
                    key={application._id}
                    className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                          <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {application.bidAmount}
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="w-4 h-4" />
                            {application.status}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            openApplicationModal(application);
                          }}
                          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Open Application
                        </button>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="mr-2 w-4 h-4" />
                        Submitted on{" "}
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileIcon className="w-5 h-5 text-blue-600" />
                          Cover Letter
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                          {application.coverLetter}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(!jobApplications || jobApplications.length === 0) && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Applications Yet
              </h2>
              <p className="text-base text-gray-600">
                There are currently no applications for this job.
              </p>
            </div>
          </div>
        )}

        {isApplicationModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeApplicationModal}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
              <div
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-blue-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Application Details
                    </h3>
                    <button
                      onClick={closeApplicationModal}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-blue-100 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {selectedApplication?.bidAmount}
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedApplication?.status}
                    </span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Freelancer Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {selectedApplication?.freelancer?.profile?.name}
                          </h4>
                          <p className="text-sm text-gray-500">Freelancer</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openChat(selectedApplication?.freelancer?._id || "")}
                          className="inline-flex items-center px-4 py-2 bg-[#d2caff] text-[#6d28d2] rounded-lg font-medium hover:bg-purple-200 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </button>
                        <button onClick={() => {viewProfile(selectedApplication?.freelancer._id || "")}} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                          <UserCircle className="w-4 h-4 mr-2" />
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submission Time */}
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Submitted on {new Date(selectedApplication?.submittedAt || "").toLocaleString()}
                  </div>

                  {/* Cover Letter */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 flex items-center mb-4">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Cover Letter
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedApplication?.coverLetter}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        acceptApplicationFunction(
                          selectedApplication?.job || "",
                          selectedApplication?._id || ""
                        );
                      }}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 mr-2 hidden lg:block" />
                      Accept Application
                    </button>
                    <button className="inline-flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
                      <XCircle className="w-5 h-5 mr-2 hidden lg:block" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
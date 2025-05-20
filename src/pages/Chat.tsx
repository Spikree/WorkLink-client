import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../components/common/SkeletonCard";
// import { useAuthStore } from "../store/useAuthStore";

const Chat = () => {
  const { currentJobs, isFetchingJobs, getCurrentJobs } = useJobStore();
  // const { getUserDetails } = useAuthStore();
  const router = useNavigate();

  useEffect(() => {
    getCurrentJobs();
  }, [getCurrentJobs]);

  const openChat = (toChatId: string) => {
    router(`/chatRoom/${toChatId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-sm text-gray-600">
          Communicate with employers about your projects
        </p>
      </div>

      {isFetchingJobs ? (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : !currentJobs || currentJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No conversation history
            </h3>
            <p className="text-gray-500">
              Your active project conversations will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-medium text-gray-900">
                    {job.jobTitle}
                  </h2>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 my-4"></div>

                <p className="text-gray-600">
                  {job.jobDescription.length > 350
                    ? `${job.jobDescription.substring(0, 100)}...`
                    : job.jobDescription}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    client : {job?.employer?.profile?.name}
                  </div>
                  <Button
                    className="px-4 py-2 bg-primary hover:bg-purple-800"
                    onClick={() => openChat(job.employer?._id)}
                    disableStyles={false}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;

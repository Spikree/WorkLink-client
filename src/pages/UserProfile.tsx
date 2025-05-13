import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSkeleton from "../components/common/ProfileSkeleton";
import {
  Star,
  Link as LinkIcon,
  Mail,
  User,
  Briefcase,
  Calendar,
} from "lucide-react";

const UserProfile = () => {
  const { getUserProfile, userProfileView, isProfileLoading } = useAuthStore();
  const { id: userId } = useParams();

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId, getUserProfile]);

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  if (!userProfileView) {
    return <ProfileSkeleton />;
  }

  const { email, role, profile, averageRating, totalRatings, createdOn } =
    userProfileView.userDetails;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-8">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/5 to-danger/20 flex items-center justify-center">
                      <User className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <h1 className="mt-4 text-3xl font-bold text-white">
                    {profile.name}
                  </h1>
                  <div className="mt-2 flex items-center text-white/80">
                    <Briefcase className="h-4 w-4" />
                    <span className="ml-2 capitalize">{role}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-danger/20 rounded-xl">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-primary fill-current" />
                    <span className="ml-2 text-lg font-semibold">
                      {averageRating}
                    </span>
                  </div>
                  <span className="text-gray-600">{totalRatings} reviews</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5" />
                    <span className="ml-3">{email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="ml-3">Joined {formatDate(createdOn)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Portfolio
                  </h2>
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-danger/20 transition-colors duration-150"
                  >
                    <LinkIcon className="h-5 w-5 text-primary" />
                    <span className="ml-2 text-gray-700">{profile.portfolio}</span>
                  </a>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-primary/5 to-danger/20 text-primary rounded-xl text-sm font-medium"
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
    </div>
  );
};

export default UserProfile;
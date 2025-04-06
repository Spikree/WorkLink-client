import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Pencil,
  Star,
  Link as LinkIcon,
  Mail,
  User,
  Briefcase,
  Calendar,
  Loader,
} from "lucide-react";

const Profile = () => {
  const { getProfile, userProfile, isProfileLoading, editProfile } =
    useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bio: "",
    portfolio: "",
    skills: "",
    name: "",
  });
  const cancelEditButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (userProfile) {
      setEditForm({
        bio: userProfile.userDetails.profile.bio,
        portfolio: userProfile.userDetails.profile.portfolio,
        skills: userProfile.userDetails.profile.skills.join(", "),
        name: userProfile.userDetails.profile.name,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancelEditButtonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const { email, role, profile, averageRating, totalRatings, createdOn } =
    userProfile.userDetails;

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    editProfile(editForm);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="sm:mt-0 gap-4 sm:overflow-y-auto pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <User className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl mt-6 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-150"
                      placeholder="your name"
                    />
                  ) : (
                    <h1 className="mt-4 text-3xl font-bold text-white">
                      {profile.name}
                    </h1>
                  )}
                  <div className="mt-2 flex items-center text-blue-100">
                    <Briefcase className="h-4 w-4" />
                    <span className="ml-2 capitalize">{role}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
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

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {!isEditing ? (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        About
                      </h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition-colors duration-150"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Portfolio
                    </h2>
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                    >
                      <LinkIcon className="h-5 w-5 text-blue-600" />
                      <span className="ml-2 text-gray-700">
                        {profile.portfolio}
                      </span>
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
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      About
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-150"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="text"
                      value={editForm.portfolio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, portfolio: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-150"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={editForm.skills}
                      onChange={(e) =>
                        setEditForm({ ...editForm, skills: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-150"
                      placeholder="Enter skills separated by commas"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      ref={cancelEditButtonRef}
                      className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors duration-150"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

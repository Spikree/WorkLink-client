import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { getProfile, userProfile, isProfileLoading } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">No profile data available</div>
      </div>
    );
  }

  const { 
    email, 
    role, 
    profile,
    averageRating,
    totalRatings 
  } = userProfile.userDetails;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-50 p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
              <div className="flex items-center mt-1">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {role}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="text-right">
                <div className="flex items-center">
                  <div className="text-yellow-500 mr-1">★</div>
                  <span className="font-bold">{averageRating}</span>
                  <span className="text-gray-500 ml-1">({totalRatings} ratings)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Bio</h2>
                <p className="text-gray-600">{profile.bio || "No bio available"}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills[0].split(',').map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800 capitalize"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact</h2>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-20">Email:</span>
                    <span className="text-gray-800">{email}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-20">Portfolio:</span>
                    <a 
                      href={profile.portfolio.startsWith('http') ? profile.portfolio : `http://${profile.portfolio}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profile.portfolio}
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Info</h2>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-gray-500 w-20">Role:</span>
                    <span className="text-gray-800 capitalize">{role}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 w-20">Member since:</span>
                    <span className="text-gray-800">
                      {new Date(userProfile.userDetails.createdOn).toLocaleDateString()}
                    </span>
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

export default Profile;
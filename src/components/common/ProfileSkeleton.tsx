const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 overflow-hidden animate-pulse">
              {/* Profile header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-8">
                <div className="flex flex-col items-center">
                  {/* Avatar placeholder */}
                  <div className="h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/10 to-danger/30"></div>
                  </div>
                  {/* Name placeholder */}
                  <div className="mt-4 h-8 w-48 bg-white/30 rounded-lg"></div>
                  {/* Role placeholder */}
                  <div className="mt-2 flex items-center">
                    <div className="h-4 w-4 bg-white/30 rounded"></div>
                    <div className="ml-2 h-4 w-24 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Profile details */}
              <div className="px-6 py-6 space-y-4">
                {/* Rating card */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-danger/20 rounded-xl">
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="ml-2 h-6 w-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>

                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="ml-3 h-5 w-40 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="ml-3 h-5 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Main profile content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-8 animate-pulse">
              {/* About section */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                    <div className="h-9 w-32 bg-gray-200 rounded-lg"></div>
                  </div>
                  {/* Bio placeholders */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>

                {/* Portfolio section */}
                <div>
                  <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                  <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="ml-2 h-5 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Skills section */}
                <div>
                  <div className="h-8 w-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="h-9 w-20 bg-gradient-to-r from-primary/5 to-danger/20 rounded-xl"
                      ></div>
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

export default ProfileSkeleton;
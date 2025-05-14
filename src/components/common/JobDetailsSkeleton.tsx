const JobDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-6 sm:mt-0 mt-4">
      {/* Header skeleton */}
      <div className="bg-white border-b rounded-xl">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="w-full sm:w-2/3">
              {/* Title skeleton */}
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>
              <div className="flex flex-wrap items-center gap-4">
                {/* Company skeleton */}
                <div className="h-5 bg-gray-200 rounded-md w-40 animate-pulse"></div>
                {/* Date skeleton */}
                <div className="h-5 bg-gray-200 rounded-md w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              {/* Buttons skeleton */}
              <div className="h-10 bg-gray-200 rounded-lg w-24 sm:w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-24 sm:w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        <div className="md:col-span-2 space-y-4 sm:space-y-8">
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm">
            {/* Description title skeleton */}
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-6 animate-pulse"></div>
            {/* Description content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Job Overview skeleton */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded-md w-16 mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded-md w-20 mb-2 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded-md w-28 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Required Skills skeleton */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="h-6 bg-gray-200 rounded-md w-36 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded-md w-20 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded-md w-24 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded-md w-28 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;

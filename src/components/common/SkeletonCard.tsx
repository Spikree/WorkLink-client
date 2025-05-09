const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            {/* Job title with icon */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-6 w-48 sm:w-64 bg-gray-200 rounded"></div>
            </div>
            {/* Bid amount and date */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="hidden sm:block h-4 w-1 bg-gray-200 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          {/* Status badge */}
          <div className="px-3 py-1 w-20 sm:w-24 h-7 bg-gray-200 rounded-full self-start mt-2 sm:mt-0"></div>
        </div>

        {/* Cover letter */}
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full sm:w-2/3"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 sm:w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
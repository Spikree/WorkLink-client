const JobDashboardSkeleton = () => {
    const skeletonBox = "bg-gray-200 animate-pulse rounded";
  
    return (
      <div className="h-full overflow-y-auto bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 sm:pt-6">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Job Header Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div className={`${skeletonBox} h-8 w-2/3`} />
              <div className={`${skeletonBox} h-6 w-24`} />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`${skeletonBox} h-20 w-full`} />
              <div className={`${skeletonBox} h-20 w-full`} />
              <div className={`${skeletonBox} h-20 w-full`} />
            </div>
            <div className="space-y-4">
              <div className={`${skeletonBox} h-6 w-1/3`} />
              <div className={`${skeletonBox} h-24 w-full`} />
              <div className={`${skeletonBox} h-6 w-1/3`} />
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`${skeletonBox} h-8 w-24`} />
                ))}
              </div>
            </div>
          </div>
  
          {/* Applications Skeleton */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <div className={`${skeletonBox} h-6 w-1/3 mb-4`} />
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-100 bg-gray-50 rounded-xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className={`${skeletonBox} h-8 w-16`} />
                    <div className={`${skeletonBox} h-8 w-20`} />
                  </div>
                  <div className={`${skeletonBox} h-8 w-32`} />
                </div>
                <div className={`${skeletonBox} h-4 w-1/2`} />
                <div className={`${skeletonBox} h-16 w-full`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default JobDashboardSkeleton;
  
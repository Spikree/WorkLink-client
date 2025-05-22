import { useEffect, useState } from "react";
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
  X,
} from "lucide-react";
import { useReviewStore } from "../store/useReviewStore";
import Button from "../components/common/Button";

const UserProfile = () => {
  const { getUserProfile, userProfileView, isProfileLoading } = useAuthStore();
  const { postReview,getReview } = useReviewStore();
  const { id: userId } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const postReviewHandler = async (rating: number, review: string) => {
    if (userId) {
      postReview(rating, review, userId);
      setShowReviewModal(false);
      setRating(0);
      setReview("");
    }
  };

  const handleSubmitReview = () => {
    if (rating > 0 && review.trim()) {
      postReviewHandler(rating, review);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
      getReview(userId);
    }
  }, [userId, getUserProfile, getReview]);

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

                  <div>
                    <Button 
                      className="m-2" 
                      disableStyles={false}
                      onClick={() => setShowReviewModal(true)}
                    >
                      rate user
                    </Button>
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Rate User</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredStar || rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Write your review..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || !review.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Trash2Icon,
  Pencil,
} from "lucide-react";
import { useReviewStore } from "../store/useReviewStore";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";
import EditModal from "../components/common/EditModal";

const UserProfile = () => {
  const { getUserProfile, userProfileView, isProfileLoading } = useAuthStore();
  const {
    postReview,
    getReview,
    reviews,
    isFetchingReviews,
    hasReviewed,
    currentReview,
    deleteReview,
    editReview,
  } = useReviewStore();
  const { id: userId } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string>("");
  const [editReviewId, setEditReviewId] = useState<string>("");
  const navigate = useNavigate();

  const navigateToUserProfile = (userId: string) => {
    navigate(`/userProfile/${userId}`);
  };

  const deleteUserReview = () => {
    if (!userId) return;
    deleteReview(deleteReviewId, userId);
    if (userId) {
      getReview(userId);
      hasReviewed(userId);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const openEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const editUserReview = (newRating: number, newReview: string) => {
    if (!userId || !editReviewId) return;
    editReview(editReviewId, userId, newRating, newReview);
    setShowEditModal(false);
  };

  const postReviewHandler = useCallback(
    async (rating: number, review: string) => {
      if (userId) {
        postReview(rating, review, userId);
        setShowReviewModal(false);
        setRating(0);
        setReview("");
      }
    },
    [userId, postReview]
  );

  const handleSubmitReview = () => {
    if (rating > 0 && review.trim()) {
      postReviewHandler(rating, review);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
      getReview(userId);
      hasReviewed(userId);
    }
  }, [userId, getUserProfile, getReview, hasReviewed, postReviewHandler]);

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
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
                      disabled={currentReview?.userReview}
                    >
                      {currentReview?.userReview
                        ? "Already Reviewed"
                        : "Rate User"}
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
                  <p className="text-gray-600 leading-relaxed">{profile.bio ? profile?.bio : <p className="p-10 bg-gray-100 rounded-md text-center">No Bio Provided</p>}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {role === "freelancer" ? "Portfolio" : "Company Website"}
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
                    {role === "freelancer" && "Skill"}
                  </h2>
                  {role !== "employer" &&<div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-primary/5 to-danger/20 text-primary rounded-xl text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Separate Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-8 mt-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

            {/* Your Review Section */}
            {currentReview?.userReview ? (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Review
                </h3>
                <div className="p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-r from-primary/5 to-danger/20">
                  <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/5 to-danger/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {currentReview?.hasReviewed?.reviewer?.profile?.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Rating: {currentReview?.hasReviewed?.rating}/5
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(parseInt(currentReview?.hasReviewed?.rating))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {currentReview?.hasReviewed?.review}
                  </p>
                  <div className="flex">
                    <button
                      onClick={() => {
                        openDeleteModal();
                        setDeleteReviewId(currentReview?.hasReviewed?._id);
                      }}
                      className="size-10 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600 transition duration-200"
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditReviewId(currentReview?.hasReviewed?._id);
                        openEditModal();
                      }}
                      className="size-10 flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-600 transition duration-200"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-600 text-center">
                  No review by you yet
                </p>
              </div>
            )}

            {isFetchingReviews ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-danger/20 transition-colors duration-150"
                  >
                    <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/5 to-danger/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span
                          onClick={() => {
                            navigateToUserProfile(review?.reviewer?._id);
                          }}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {review?.reviewer?.profile?.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Rating: {review.rating}/5
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(parseInt(review.rating))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-primary/5 to-danger/20 rounded-lg p-6">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No reviews yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Be the first to leave a review!
                  </p>
                </div>
              </div>
            )}
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
      {showDeleteModal && (
        <DeleteModal
          onCancel={openDeleteModal}
          title="review"
          onDelete={() => {
            deleteUserReview();
            openDeleteModal();
          }}
        />
      )}

      {showEditModal && currentReview?.hasReviewed && (
        <EditModal
          onCancel={() => setShowEditModal(false)}
          title="Review"
          currentRating={parseInt(currentReview.hasReviewed.rating)}
          currentReview={currentReview.hasReviewed.review}
          onEdit={editUserReview}
        />
      )}
    </div>
  );
};

export default UserProfile;

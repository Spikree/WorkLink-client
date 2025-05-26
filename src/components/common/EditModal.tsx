import { Edit, X, Star } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onEdit: (rating: number, review: string) => void;
  onCancel: () => void;
  currentRating: number;
  currentReview: string;
  title?: string;
};

const EditModal = ({onEdit, onCancel, currentRating, currentReview, title}: Props) => {
  const [rating, setRating] = useState(currentRating);
  const [review, setReview] = useState(currentReview);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (rating > 0 && review.trim()) {
      onEdit(rating, review);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6 sm:px-0">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Edit size={20} className="text-blue-500 mr-2" />
            Edit {title}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6 space-y-4">
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
                  type="button"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Write your review..."
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || !review.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <Edit size={18} className="mr-2" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
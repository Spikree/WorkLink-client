import { FallbackProps } from "react-error-boundary";
import { FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto mt-24 p-8 text-center bg-white rounded-xl shadow-sm font-sans"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <FaExclamationTriangle className="text-primary text-2xl" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Something went wrong
      </h2>
      <pre className="text-gray-600 bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
        {error.message}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 mx-auto"
      >
        Try Again <FaArrowRight size={14} />
      </button>
    </div>
  );
};

export default ErrorFallBack;
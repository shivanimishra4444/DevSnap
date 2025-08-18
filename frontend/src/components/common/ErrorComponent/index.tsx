import React from 'react';
import Button from '@/components/common/Button';

export interface ErrorComponentProps {
  error?: Error | null;
  resetError?: () => void;
  title?: string;
  message?: string;
  showRetry?: boolean;
  retryAction?: () => void;
  className?: string;
}

const ErrorComponent = ({
  error,
  resetError,
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  showRetry = true,
  retryAction,
  className = ""
}: ErrorComponentProps) => {
  const handleRetry = () => {
    if (retryAction) {
      retryAction();
    } else if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-red-800">{title}</h3>
          <p className="text-red-600 mt-1">{message}</p>
          
          {import.meta.env.DEV && error && (
            <details className="mt-4">
              <summary className="text-sm text-red-700 cursor-pointer hover:text-red-800">
                Error Details
              </summary>
              <div className="mt-2 p-3 bg-red-100 rounded text-sm font-mono text-red-800">
                {error.message}
              </div>
            </details>
          )}
          
          {showRetry && (
            <div className="mt-4">
              <Button onClick={handleRetry} variant="danger" size="sm">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;

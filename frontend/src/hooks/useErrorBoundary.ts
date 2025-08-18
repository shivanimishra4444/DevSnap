import { useState, useCallback } from 'react';

export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const throwError = useCallback((error: Error) => {
    setError(error);
  }, []);

  return { error, resetError, throwError };
};

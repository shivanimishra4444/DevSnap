import React from 'react';

export interface DeleteConfirmationContentProps {
  itemName: string;
  itemType: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  showButtons?: boolean;
}

const DeleteConfirmationContent = ({
  itemName,
  itemType,
  onConfirm,
  onCancel,
  isLoading = false,
  showButtons = false,
}: DeleteConfirmationContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Delete {itemType}</h3>
          <p className="text-sm text-gray-500">Are you sure you want to delete this {itemType.toLowerCase()}? This action cannot be undone.</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Item to delete:</span> {itemName}
        </p>
      </div>

      {showButtons && onConfirm && onCancel && (
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </div>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmationContent;

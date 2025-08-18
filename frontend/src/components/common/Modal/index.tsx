import React, { useCallback, useEffect, useId, useMemo } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
} as const;



const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  footer,
}: ModalProps) => {
  const modalId = useId();

  // Memoize size class to prevent recalculation
  const sizeClass = useMemo(() => SIZE_CLASSES[size], [size]);

  // Memoize backdrop click handler
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Memoize close button handler
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle keyboard events and body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    // Calculate scrollbar width once
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply styles
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    };
  }, [isOpen, onClose]);

  // Early return for better performance
  if (!isOpen) return null;

  const hasHeader = title || showCloseButton;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${modalId}-title` : undefined}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClass} max-h-[90vh] overflow-y-auto`}>
        {hasHeader && (
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            {title && (
              <h2 id={`${modalId}-title`} className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={handleCloseClick}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                aria-label="Close modal"
              >
                <img 
                  src="/icons/close-icon.svg" 
                  alt="Close" 
                  className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" 
                />
            </button>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

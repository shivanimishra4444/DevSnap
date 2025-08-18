import React, { useState, useCallback } from 'react';
import Button from '@/components/common/Button';

export interface AIGenerationFieldProps {
  // Field configuration
  fieldName: string;
  fieldValue: string;
  onFieldChange: (value: string) => void;
  placeholder: string;
  rows?: number;
  
  // AI Generation configuration
  generateFunction: () => Promise<string>;
  generateButtonText: string;
  
  // UI customization
  className?: string;
  disabled?: boolean;
  error?: string | undefined;
}

const AIGenerationField = ({
  fieldName,
  fieldValue,
  onFieldChange,
  placeholder,
  rows = 3,
  generateFunction,
  generateButtonText,
  className = "",
  disabled = false,
  error
}: AIGenerationFieldProps) => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratedContent, setShowGeneratedContent] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      const content = await generateFunction();
      setGeneratedContent(content);
      setShowGeneratedContent(true);
    } catch (error) {
      console.error('Failed to generate content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [generateFunction]);

  const handleAccept = useCallback(() => {
    if (generatedContent) {
      onFieldChange(generatedContent);
      setShowGeneratedContent(false);
      setGeneratedContent('');
    }
  }, [generatedContent, onFieldChange]);

  const handleCancel = useCallback(() => {
    setShowGeneratedContent(false);
    setGeneratedContent('');
  }, []);

  return (
    <div className={className}>
      <textarea
        id={fieldName}
        rows={rows}
        value={fieldValue}
        onChange={(e) => onFieldChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {/* Generate AI Button */}
      {!showGeneratedContent && (
        <div className="mt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleGenerate}
            loading={isGenerating}
            loadingText="Generating..."
          >
            ✨ {generateButtonText}
          </Button>
        </div>
      )}

      {/* Generated Content Display */}
      {showGeneratedContent && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Generated Content:</h4>
          <p className="text-sm text-blue-800 mb-3 whitespace-pre-wrap">{generatedContent}</p>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleGenerate}
              loading={isGenerating}
              loadingText="Generating..."
            >
              Generate Another
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerationField;

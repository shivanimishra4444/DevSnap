import React, { useId, useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProject, useUpdateProject } from '@/hooks/useProject';
import { useAuth } from '@/contexts/AuthContext';
import AIGenerationField from '@/components/common/AIGenerationField';
import { useGenerateProjectSummary } from '@/hooks/useAI';
import { projectFormSchema, type ProjectFormData } from '@/schemas/validation';
import type { Project } from '@/types';

export interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ProjectForm = ({ project, onClose, onSuccess }: ProjectFormProps) => {
  const formId = useId();
  const [isPending, startTransition] = useTransition();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const generateSummaryMutation = useGenerateProjectSummary();
  const { user } = useAuth();
  
  const isEditing = !!project;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      tech_stack: project?.tech_stack?.join(', ') || '',
      github_link: project?.github_link || '',
      demo_link: project?.demo_link || '',
      summary: project?.summary || ''
    }
  });

  const handleGenerateSummary = useCallback(async (): Promise<string> => {
    const currentData = getValues();
    if (!currentData.title || !currentData.description) {
      throw new Error('Please provide project title and description first.');
    }

    const techStackArray = currentData.tech_stack 
      ? currentData.tech_stack.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech.length > 0)
      : [];

    const request = {
      title: currentData.title,
      description: currentData.description,
      tech_stack: techStackArray
    };

    const response = await generateSummaryMutation.mutateAsync(request);
    return response.content;
  }, [generateSummaryMutation, getValues]);



  const onSubmit = useCallback(async (data: ProjectFormData) => {
    startTransition(() => {
      const handleSubmission = async () => {
        try {
          // Convert tech_stack string to array
          const techStackArray = data.tech_stack 
            ? data.tech_stack.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
            : [];

          if (isEditing && project) {
            // Update existing project
            const updateData = {
              title: data.title,
              description: data.description,
              tech_stack: techStackArray,
              github_link: data.github_link || null,
              demo_link: data.demo_link || null,
              summary: data.summary || null
            };
            
            await updateProjectMutation.mutateAsync({ 
              projectId: project.id, 
              updateData 
            });
          } else {
            // Create new project
            const projectData = {
              user_id: user?.id || '',
              title: data.title,
              description: data.description,
              tech_stack: techStackArray,
              github_link: data.github_link || null,
              demo_link: data.demo_link || null,
              summary: data.summary || null
            };

            await createProjectMutation.mutateAsync(projectData);
          }
          
          onSuccess();
          reset();
        } catch (error) {
          console.error('Failed to save project:', error);
          alert('Failed to save project');
        }
      };
      handleSubmission();
    });
  }, [onSuccess, reset, createProjectMutation, updateProjectMutation, user?.id, isEditing, project]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId} noValidate>
      <div className="space-y-6">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Project Title *
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="input"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="form-error">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            className="input"
            placeholder="Describe your project"
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="form-group">
          <label htmlFor="tech_stack" className="form-label">
            Tech Stack
          </label>
          <input
            {...register('tech_stack')}
            type="text"
            id="tech_stack"
            className="input"
            placeholder="React, TypeScript, Node.js (comma separated)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate technologies with commas
          </p>
        </div>

        {/* GitHub Link */}
        <div className="form-group">
          <label htmlFor="github_link" className="form-label">
            GitHub Link
          </label>
          <input
            {...register('github_link')}
            type="url"
            id="github_link"
            className="input"
            placeholder="https://github.com/username/repo"
          />
          {errors.github_link && (
            <p className="form-error">{errors.github_link.message}</p>
          )}
        </div>

        {/* Demo Link */}
        <div className="form-group">
          <label htmlFor="demo_link" className="form-label">
            Demo Link
          </label>
          <input
            {...register('demo_link')}
            type="url"
            id="demo_link"
            className="input"
            placeholder="https://demo.example.com"
          />
          {errors.demo_link && (
            <p className="form-error">{errors.demo_link.message}</p>
          )}
        </div>

        </div>

      {/* Separated Summary Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Powered Summary Generation</h3>
          
          {/* Summary Field with AI Generation */}
          <AIGenerationField
            fieldName="Project Summary"
            fieldValue={watch('summary') || ''}
            onFieldChange={(value) => setValue('summary', value)}
            placeholder="Brief summary of your project"
            rows={3}
            generateFunction={handleGenerateSummary}
            generateButtonText="Generate Summary with AI"
            error={errors.summary?.message}
          />
        </div>
      </div>

      {/* Form Actions - Moved to Bottom */}
      <div className="flex justify-end space-x-3 pt-6 mt-8 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
        >
          {isPending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Project' : 'Create Project')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;

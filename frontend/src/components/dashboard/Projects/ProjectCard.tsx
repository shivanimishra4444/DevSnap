import React, { useMemo } from 'react';
import type { Project } from '@/types';
import Button from '@/components/common/Button';

export interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  className?: string;
}

const ProjectCard = ({
  project,
  onClick,
  onEdit,
  onDelete,
  className = ''
}: ProjectCardProps) => {
  // Memoize formatted date for performance
  const formattedDate = useMemo(() => {
    return new Date(project.updated_at).toLocaleDateString();
  }, [project.updated_at]);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
          <p className="text-sm">Project Image</p>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {project.title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              Updated {formattedDate}
            </span>
            <div className="flex space-x-1">
              {onEdit && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(project);
                  }}
                  variant="secondary"
                  size="sm"
                  className="p-1 text-gray-400 hover:text-blue-600"
                  title="Edit project"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                />
              )}
              {onDelete && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(project);
                  }}
                  variant="secondary"
                  size="sm"
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete project"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                />
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {project.summary && (
          <div className="mb-4 text-sm text-gray-600">
            {project.summary}
          </div>
        )}

        {/* Links */}
        {(project.github_link || project.demo_link) && (
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

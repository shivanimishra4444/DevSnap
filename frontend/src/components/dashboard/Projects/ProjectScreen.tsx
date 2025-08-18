import React, { useState, useTransition, useCallback } from 'react';
import { useCurrentUser } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Spinner from '@/components/common/Spinner';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import ErrorComponent from '@/components/common/ErrorComponent';
import ProjectCard from '@/components/dashboard/Projects/ProjectCard';
import ProjectForm from '@/components/dashboard/Projects/ProjectForm';
import type { Project } from '@/types';
import { useDeleteProject } from '@/hooks/useProject';
import DeleteConfirmationContent from '@/components/common/DeleteConfirmationContent';

const ProjectScreen = () => {
  const { data: currentUser, isLoading, error, refetch } = useCurrentUser();  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State management for modal
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Hooks
  const deleteProjectMutation = useDeleteProject();

  // Handlers for modal
  const handleAddProject = useCallback(() => {
    startTransition(() => {
      setEditingProject(null);
      setShowForm(true);
    });
  }, []);

  const handleEditProject = useCallback((project: Project) => {
    startTransition(() => {
      setEditingProject(project);
      setShowForm(true);
    });
  }, []);

  const handleCloseForm = useCallback(() => {
    startTransition(() => {
      setShowForm(false);
      setEditingProject(null);
    });
  }, []);

  const handleFormSuccess = useCallback(() => {
    handleCloseForm();
    refetch(); // Refresh the project list
  }, [handleCloseForm, refetch]);

  const handleDeleteProject = useCallback((project: Project) => {
    startTransition(() => {
      setDeletingProject(project);
      setShowDeleteModal(true);
    });
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    startTransition(() => {
      setShowDeleteModal(false);
      setDeletingProject(null);
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingProject) return;
    
    try {
      await deleteProjectMutation.mutateAsync(deletingProject.id);
      handleCloseDeleteModal();
      refetch(); // Refresh the project list
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  }, [deletingProject, deleteProjectMutation, handleCloseDeleteModal, refetch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={logout}
        title="Project Management"
        subtitle="Create and manage your portfolio projects"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleAddProject}
                loading={isPending}
                loadingText="Loading..."
              >
                + Add Project
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="secondary"
              >
                ← Back
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <ErrorComponent
              title="Error loading projects"
              message="Please try again later."
              showRetry={true}
              retryAction={() => refetch()}
              className="mb-6"
            />
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="py-12">
              <Spinner />
              <p className="text-center text-gray-600 mt-4">Loading projects...</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Existing Projects */}
            {currentUser?.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onClick={() => {
                  // TODO: Handle project click - view details
                  console.log('Project clicked:', project.title);
                }}
              />
            ))}


          </div>
        )}

        {/* Project Form Modal */}
        <Modal
          isOpen={showForm}
          onClose={handleCloseForm}
          title={editingProject ? "Edit Project" : "Create New Project"}
          size="2xl"
        >
          <ProjectForm 
            project={editingProject}
            onClose={handleCloseForm} 
            onSuccess={handleFormSuccess}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          title="Delete Project"
          size="md"
          showCloseButton={false}
          footer={
            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleCloseDeleteModal}
                disabled={deleteProjectMutation.isPending}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                disabled={deleteProjectMutation.isPending}
                variant="danger"
                size="sm"
                loading={deleteProjectMutation.isPending}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </div>
          }
        >
          {deletingProject && (
            <DeleteConfirmationContent 
              itemName={deletingProject.title}
              itemType="Project"
             />
          )}
        </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;

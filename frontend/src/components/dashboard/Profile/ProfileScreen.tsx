import React, { useTransition, useCallback, useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentUser } from '@/hooks/useAuth';
import { useUpdateUser } from '@/hooks/useUser';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import ErrorComponent from '@/components/common/ErrorComponent';
import AIGenerationField from '@/components/common/AIGenerationField';
import { useGenerateBio } from '@/hooks/useAI';
import { profileFormSchema, type ProfileFormData } from '@/schemas/validation';
import type { UserUpdate } from '@/types';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const { data: currentUser, isLoading, error, refetch } = useCurrentUser();
  const navigate = useNavigate();
  
  // React 18 hooks
  const formId = useId();
  const [isPending, startTransition] = useTransition();
  
  // Hooks
  const updateUserMutation = useUpdateUser();
  const generateBioMutation = useGenerateBio();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      github_username: currentUser?.github_username || '',
      bio: currentUser?.bio || '',
      github_url: `https://github.com/${currentUser?.github_username || ''}`,
      website_url: ''
    }
  });

  // Update form when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || '',
        email: currentUser.email || '',
        github_username: currentUser.github_username || '',
        bio: currentUser.bio || '',
        github_url: `https://github.com/${currentUser.github_username || ''}`,
        website_url: ''
      });
    }
  }, [currentUser, reset]);

  // Memoized profile image component
  const ProfileImage = useMemo(() => (
    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
      {currentUser?.profile_image ? (
        <img 
          src={currentUser.profile_image} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      ) : (
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}
    </div>
  ), [currentUser?.profile_image]);

  const handleGenerateBio = useCallback(async (): Promise<string> => {
    const currentData = watch();
    if (!currentData.name || !currentData.github_username) {
      throw new Error('Please provide your name and GitHub username first.');
    }

    const request = {
      name: currentData.name,
      current_role: 'Full-stack Developer',
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      tone_preference: 'Professional'
    };

    const response = await generateBioMutation.mutateAsync(request);
    return response.content;
  }, [watch, generateBioMutation]);

  const handleSaveChanges = useCallback((data: ProfileFormData) => {
    if (!currentUser) return;
    
    startTransition(() => {
      const updateData: UserUpdate = {
        name: data.name || null,
        email: data.email || null,
        github_username: data.github_username || null,
        bio: data.bio || null,
        // Note: profile_image and other fields would be handled separately
      };
      
      updateUserMutation.mutateAsync({ 
        userId: currentUser.id, 
        updateData 
      }).then(() => {
        alert('Profile updated successfully!');
      }).catch((error) => {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile');
      });
    });
  }, [currentUser, updateUserMutation]);



  // Memoized loading component
  const LoadingComponent = useMemo(() => (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={logout}
        title="Profile Settings"
        subtitle="Update your profile information"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    </div>
  ), [user, logout]);

  if (isLoading) {
    return LoadingComponent;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          onLogout={logout}
          title="Profile Settings"
          subtitle="Update your profile information"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorComponent
            title="Error loading profile"
            message="Please try again later."
            showRetry={true}
            retryAction={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={logout}
        title="Profile Settings"
        subtitle="Update your profile information"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Update your profile information</p>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="secondary"
            >
              ← Back
            </Button>
          </div>

          {/* Profile Form */}
          <div className="max-w-2xl">
            {/* Profile Photo Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex-shrink-0">
                {ProfileImage}
              </div>
            </div>

            {/* Form Fields */}
            <form id={formId} className="space-y-6" onSubmit={handleSubmit(handleSaveChanges)}>
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="input"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="input"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* GitHub Username and ID Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="github_username" className="form-label">
                    GitHub Username
                  </label>
                  <input
                    {...register('github_username')}
                    type="text"
                    id="github_username"
                    className="input"
                    placeholder="johndoe"
                  />
                  {errors.github_username && (
                    <p className="form-error">{errors.github_username.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="github_id" className="form-label">
                    GitHub ID
                  </label>
                  <input
                    type="text"
                    id="github_id"
                    value={currentUser?.github_id ? '****' : ''}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    placeholder="****"
                  />
                </div>
              </div>

              {/* Bio Section with AI Generation */}
              <AIGenerationField
                fieldName="Bio"
                fieldValue={watch('bio') || ''}
                onFieldChange={(value) => setValue('bio', value)}
                placeholder="Full-stack developer passionate about creating scalable web applications..."
                rows={4}
                generateFunction={handleGenerateBio}
                generateButtonText="Generate Bio with AI"
                error={errors.bio?.message}
              />

              {/* Social Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="github_url" className="form-label">
                    GitHub URL
                  </label>
                  <input
                    {...register('github_url')}
                    type="url"
                    id="github_url"
                    className="input"
                    placeholder="https://github.com/johndoe"
                  />
                  {errors.github_url && (
                    <p className="form-error">{errors.github_url.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="website_url" className="form-label">
                    Website URL
                  </label>
                  <input
                    {...register('website_url')}
                    type="url"
                    id="website_url"
                    className="input"
                    placeholder="https://johndoe.dev"
                  />
                  {errors.website_url && (
                    <p className="form-error">{errors.website_url.message}</p>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  loading={isPending || updateUserMutation.isPending}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProfileScreen;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useGetUser } from './useGetUser';
import { useGetApplications } from './useGetApplications';

export const useHeader = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { applications, isLoading: isApplicationsLoading } =
    useGetApplications();
  const { user, isLoading: isUserLoading, mutate } = useGetUser();

  const onSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      mutate(undefined);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (!(event.target as Element).closest('#dropdownDefaultButton')) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener('click', closeDropdown);
    }

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, [dropdownOpen]);

  const pendingApplications =
    applications?.filter(
      application =>
        application.jobs?.users?.id === user?.id && application.status === null
    ) || [];

  const isLoading = isUserLoading || isApplicationsLoading;

  return {
    user,
    isLoading,
    pendingApplications,
    isLoginModalOpen,
    isRecruitModalOpen,
    dropdownOpen,
    setIsLoginModalOpen,
    setIsRecruitModalOpen,
    setDropdownOpen,
    onSubmit,
  };
};

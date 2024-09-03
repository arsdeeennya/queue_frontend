'use client';
import React from 'react';
import Link from 'next/link';
import { TbBell } from 'react-icons/tb';
import { FiAlertCircle } from 'react-icons/fi';
import LoginModal from '../Modal/LoginModal';
import RecruitModal from '../Modal/RecruitModal';
import { useHeader } from '@/app/hooks/useHeader';

const Header = () => {
  const {
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
  } = useHeader();

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0">
        <Logo />
        <div>
          <div className="text-sm lg:flex-grow"></div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              {user ? (
                <AuthenticatedMenu
                  user={user}
                  pendingApplications={pendingApplications}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  setIsRecruitModalOpen={setIsRecruitModalOpen}
                  onSubmit={onSubmit}
                />
              ) : (
                <UnauthenticatedMenu
                  setIsLoginModalOpen={setIsLoginModalOpen}
                />
              )}
            </div>
          )}
        </div>
      </nav>
      <LoginModal
        isModalOpen={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
      />
      <RecruitModal
        isModalOpen={isRecruitModalOpen}
        setIsModalOpen={setIsRecruitModalOpen}
      />
    </>
  );
};

const Logo = () => (
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <svg
      className="fill-current h-8 w-8 mr-2"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
    </svg>
    <Link href="/">
      <span className="font-semibold text-xl tracking-tight">
        並び代行サービス
      </span>
    </Link>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center" aria-label="読み込み中">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

const AuthenticatedMenu = ({
  user,
  pendingApplications,
  dropdownOpen,
  setDropdownOpen,
  setIsRecruitModalOpen,
  onSubmit,
}: {
  user: any; // ユーザー型を適切に定義する必要があります
  pendingApplications: any[]; // 適切な型を定義する必要があります
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  setIsRecruitModalOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
}) => (
  <>
    <div className="flex justify-end">
      <RecruitButton setIsRecruitModalOpen={setIsRecruitModalOpen} />
      <NotificationIcon pendingApplications={pendingApplications} />
      <UserDropdown
        user={user}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />
    </div>
    {dropdownOpen && <DropdownMenu onSubmit={onSubmit} />}
  </>
);

const RecruitButton = ({
  setIsRecruitModalOpen,
}: {
  setIsRecruitModalOpen: (isOpen: boolean) => void;
}) => (
  <div
    onClick={() => setIsRecruitModalOpen(true)}
    className="cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 dark:focus:ring-blue-800 mr-4"
  >
    並べる人を募集する
  </div>
);

const NotificationIcon = ({
  pendingApplications,
}: {
  pendingApplications: any[];
}) => (
  <Link
    href="/notification"
    className="relative inline-flex items-center justify-center mr-5"
  >
    <TbBell
      size="30"
      fill={
        pendingApplications && pendingApplications.length > 0 ? 'red' : 'gray'
      }
    />
    {pendingApplications && pendingApplications.length > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        <FiAlertCircle size="14" />
      </span>
    )}
  </Link>
);

const UserDropdown = ({
  user,
  dropdownOpen,
  setDropdownOpen,
}: {
  user: any;
  dropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}) => (
  <button
    id="dropdownDefaultButton"
    data-dropdown-toggle="dropdown"
    className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border text-white hover:border-transparent hover:text-teal-500 hover:bg-white"
    type="button"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {user.nickName}
  </button>
);

const DropdownMenu = ({ onSubmit }: { onSubmit: () => void }) => (
  <div
    id="dropdown"
    className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-4 fixed right-4"
  >
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      <li>
        <div
          onClick={onSubmit}
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
        >
          ログアウト
        </div>
      </li>
    </ul>
  </div>
);

const UnauthenticatedMenu = ({
  setIsLoginModalOpen,
}: {
  setIsLoginModalOpen: (isOpen: boolean) => void;
}) => (
  <>
    <div
      onClick={() => setIsLoginModalOpen(true)}
      className="cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 dark:focus:ring-blue-800 mr-4"
    >
      並べる人を募集する
    </div>
    <div
      onClick={() => setIsLoginModalOpen(true)}
      className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border text-white hover:border-transparent hover:text-teal-500 hover:bg-white"
    >
      ログイン
    </div>
  </>
);

export default Header;

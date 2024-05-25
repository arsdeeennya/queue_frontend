'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from '../Modal/LoginModal';
import { useGetUser } from '@/app/hooks/useGetUser';
import RecruitModal from '../Modal/RecruitModal';
import { TbBell } from 'react-icons/tb';
import { TbBellPlus } from 'react-icons/tb';
import { FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useGetNotices } from '@/app/hooks/useGetNotices';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { notices, isError, isLoading: isNoticesLoading } = useGetNotices();
  const onSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      mutate(null);
      router.push('/');
    } catch (error) {}
  };
  const { user, isLoading: isUserLoading, mutate } = useGetUser();

  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (!event.target.closest('#dropdownDefaultButton')) {
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

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0">
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
              並び代行マッチングサービスあああああ
            </span>
          </Link>
        </div>

        <div>
          <div className="text-sm lg:flex-grow"></div>
          {isUserLoading || isNoticesLoading ? (
            <div
              className="flex justify-center items-center"
              aria-label="読み込み中"
            >
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <div>
              {user ? (
                <>
                  <div className="flex justify-end">
                    <div
                      onClick={() => setIsRecruitModalOpen(true)}
                      className="cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 dark:focus:ring-blue-800 mr-4"
                    >
                      並べる人を募集する
                    </div>
                    {notices.data.length > 0 ? (
                      <Link
                        href="/notice"
                        className="relative inline-flex items-center justify-center mr-5"
                      >
                        <TbBell size="30" fill="red" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                          <FiAlertCircle size="14" />
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href="/notice"
                        className="relative inline-flex items-center justify-center mr-5"
                      >
                        <TbBell size="30" fill="white" />
                      </Link>
                    )}

                    {/* <div
                      onClick={() => setIsLoginModalOpen(true)}
                      className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border text-white hover:border-transparent hover:text-teal-500 hover:bg-white"
                    >
                      ログイン
                    </div> */}
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border text-white hover:border-transparent hover:text-teal-500 hover:bg-white"
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {user.data.nickName}
                    </button>
                  </div>

                  {dropdownOpen && (
                    <div
                      id="dropdown"
                      className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-4 fixed right-4"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        {/* <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            通知
                          </a>
                        </li> */}
                        <li>
                          <div
                            onClick={onSubmit}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            ログアウト
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
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

export default Header;

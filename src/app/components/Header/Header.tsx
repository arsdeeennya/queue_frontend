import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from '../Modal/LoginModal';
import { useGetUser } from '@/app/hooks/useGetUser';
import RecruitModal from '../Modal/RecruitModal';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const onSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout');
    } catch (error) {}
  };
  const { user, isLoading } = useGetUser();
  console.log(user, 333333);

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
              並び代行マッチングサービス
            </span>
          </Link>
        </div>

        <div>
          <div className="text-sm lg:flex-grow"></div>
          <div>
            {user ? (
              <>
                <div className="flex justify-end">
                  <div
                    onClick={() => setIsRecruitModalOpen(true)}
                    className="text-white bg-gradient-to-r from-red-500 to-pink-400 hover:from-red-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:from-red-600 dark:to-pink-500 dark:hover:from-red-700 dark:hover:to-pink-600 dark:focus:ring-red-800 mr-4"
                  >
                    並べる人を募集する
                  </div>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          通知
                        </a>
                      </li>
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
                  className="text-white bg-gradient-to-r from-red-500 to-pink-400 hover:from-red-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:from-red-600 dark:to-pink-500 dark:hover:from-red-700 dark:hover:to-pink-600 dark:focus:ring-red-800 mr-4"
                >
                  並べる人を募集する
                </div>
                <div
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-block text-sm px-4 py-2 leading-none border text-white hover:border-transparent hover:text-teal-500 hover:bg-white"
                >
                  ログイン
                </div>
              </>
            )}
          </div>
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

import React, { useState } from 'react';

const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const [cookie, setCookie] = useState<any>();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75"
          onClick={() => setIsModalOpen(false)} // モーダルの外側をクリックしたときにモーダルを閉じる
        >
          <div
            className="relative w-full max-w-md p-4 h-auto"
            onClick={e => e.stopPropagation()} // モーダルの内容部分のクリックイベントが外側に伝播しないようにする
          >
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form
                className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                action="#"
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {isRegister ? '会員登録' : 'ログイン'}する
                </h3>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    パスワード
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required={true}
                  />
                </div>
                {isRegister && (
                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    >
                      ユーザー名
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="サービス内で利用する名前"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required={true}
                    />
                  </div>
                )}

                {/* <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                          required={true}
                        />
                      </div>
                      <div className="text-sm ml-3">
                        <label
                          htmlFor="remember"
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          パスワードを記憶
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                      パスワードを忘れた方はこちら
                    </a>
                  </div> */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isRegister ? '会員登録する' : 'ログインする'}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    {isRegister ? 'ログイン' : '会員登録'}はこちら
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

import { useGetJobs } from '@/app/hooks/useGetJobs';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const RecruitModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const { mutate } = useGetJobs();

  const onSubmit: SubmitHandler<any> = async data => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
        description: data.description,
        price: Number(data.price),
        location: data.location,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });
      // 募集成功後の処理をここに記述
      mutate();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="recruitment-modal"
          aria-hidden="true"
          className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md p-4 h-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="recruitment-modal"
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  並べる人を探す
                </h3>
                <div>
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    説明
                  </label>
                  <textarea
                    {...register('description', { required: true })}
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="説明を入力してください"
                    required={true}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    金額
                  </label>
                  <input
                    {...register('price', {
                      required: true,
                    })}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="金額を入力してください"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    場所
                  </label>
                  <input
                    {...register('location', { required: true })}
                    type="text"
                    name="location"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="場所を入力してください"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    並び始め日付時刻
                  </label>
                  <input
                    {...register('startDate', { required: true })}
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                  >
                    並び終わり日付時刻
                  </label>
                  <input
                    {...register('endDate', { required: true })}
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required={true}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  募集を投稿する
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitModal;

import useSWR from 'swr';
import axios from 'axios';
import { Applicants, Job, User } from '@prisma/client';

export type ApplicantsWithJob = Applicants & {
  job: Job & {
    user: User;
  };
};

export function useGetApplicants() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/applicant`);
  const fetcher = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/applicant`);
  return res;
  };
  const { data, error, isLoading, mutate } = useSWR<ApplicantsWithJob[]>(
    `/applicant`,
    async () => {
      const res = await fetcher();
      return res.data;
    }
  );

  return {
    applicants: data,
    isLoading,
    isError: error,
    mutate,
  };
}

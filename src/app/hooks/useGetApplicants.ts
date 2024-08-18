import useSWR from 'swr';
import axios from 'axios';
import { Applicants } from '@prisma/client';

export function useGetApplicants() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/applicant`);
  const fetcher = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/applicant`
    );
    return res;
  };
  const { data, error, isLoading, mutate } = useSWR<Applicants[]>(
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

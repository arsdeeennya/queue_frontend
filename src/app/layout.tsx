'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useGetUser } from '@/app/hooks/useGetUser';
import Header from './components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axios.defaults.withCredentials = true;
  const [cookie, setCookie] = useState<any>();
  const { user, isError, isLoading } = useGetUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      // ここでheaderにcsrf-tokenを設定する
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
    if (Cookies.get('access_token')) {
      setCookie(Cookies.get('access_token'));
    }
  }, []);

  const onSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    } catch (error) {}
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        {children}
      </body>
    </html>
  );
}

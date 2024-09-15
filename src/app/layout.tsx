'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from './components/Header/Header';

// 'Inter'フォントをGoogle Fontsからインポートし、'latin'サブセットを使用する設定を行っています。
// これにより、'inter.className'を使ってこのフォントを適用することができます。
// アプリケーション全体のフォントを設定するために使用されます。
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
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
        );
        // ここでheaderにcsrf-tokenを設定する
        axios.defaults.headers.common['csrf-token'] = data.csrfToken;
      } catch (error) {
        console.error('CSRFトークンの取得に失敗しました:', error);
      }
    };
    getCsrfToken();
    if (Cookies.get('access_token')) {
      setCookie(Cookies.get('access_token'));
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        {children}
      </body>
    </html>
  );
}

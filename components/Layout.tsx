import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children, isLoggedIn }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Connect` : 'Connect'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Navbar route={router.route} isLoggedIn={isLoggedIn} />
      <div className="mt-12 h-[calc(100vh-48px)]">{children}</div>
    </div>
  );
};

export default Layout;

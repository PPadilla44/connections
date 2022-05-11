import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Connect` : "Connect"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Navbar route={router.route} />
      <main className="mt-12 h-[calc(100vh-48px)] bg-darkBlue">{children}</main>
    </div>
  );
};

export default Layout;

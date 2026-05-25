import React from "react";
import SideNavBar from "./SideNavBar";
import Header from "./Header";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavBar />
      <main className="ml-64 min-h-screen">
        <Header />
        {children}
      </main>
    </>
  );
};

export default AppLayout;

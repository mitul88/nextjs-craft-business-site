import TopBar from "@/app/(components)/client/TopBar";
import React from "react";

const MasterLayout = ({ children }) => {
  return (
    <section>
      <TopBar />
      <div>{children}</div>
    </section>
  );
};

export default MasterLayout;

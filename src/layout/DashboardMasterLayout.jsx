import AdminTopbar from "@/app/(components)/admin/admin-topbar";
import React from "react";

const DashboardMasterLayout = ({ children }) => {
  return (
    <section>
      <AdminTopbar />
      <div className="flex">
        <div>left</div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default DashboardMasterLayout;

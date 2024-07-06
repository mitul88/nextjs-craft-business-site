import AdminSidebar from "@/app/(components)/admin/admin-sidebar";
import AdminTopbar from "@/app/(components)/admin/admin-topbar";
import React from "react";

const DashboardMasterLayout = ({ children }) => {
  return (
    <section className="w-full h-screen">
      <AdminTopbar />
      <div className="w-full h-full flex flex-row">
        <div className="w-96 h-full">
          <AdminSidebar />
        </div>
        <div className="">{children}</div>
      </div>
    </section>
  );
};

export default DashboardMasterLayout;

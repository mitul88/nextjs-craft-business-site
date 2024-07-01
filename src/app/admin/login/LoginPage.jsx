import AdminTopbar from "@/app/(components)/admin/admin-topbar";
import LoginForm from "@/app/(components)/login/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full">
      <AdminTopbar></AdminTopbar>
      <div className="flex justify-center items-center">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;

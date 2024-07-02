"use client";
import AdminTopbar from "@/app/(components)/admin/admin-topbar";
import LoginForm from "@/app/(components)/login/login-form";
import VerifyEmailForm from "@/app/(components)/login/verify-email-form";
import { useSearchParams } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("forgot");

  return (
    <div className="w-full h-screen">
      <AdminTopbar></AdminTopbar>
      <div className="flex flex-col justify-center items-center h-fit">
        {query === "true" ? <VerifyEmailForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default LoginPage;

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const VerifyEmailForm = () => {
  const router = useRouter();
  const back = () => {
    router.back();
  };
  return (
    <div className="rounded border border-[#407B3F] shadow-lg w-96 mt-24 px-2 py-5 flex flex-col justify-center items-center">
      <div className="w-full">
        <button onClick={() => back()} className="rounded-full p-2 bg-gray-50">
          <BiArrowBack />
        </button>
      </div>
      <h1 className="text-3xl">Verify Email</h1>
      <form>
        <div className="w-full">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="w-full rounded-xl border focus:outline-none focus:border-[#407B3F] px-3 py-2 mb-3"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <button
            type="submit"
            className="w-full bg-[#407B3F] text-white mt-2 p-2 rounded-xl border-0"
          >
            Next
          </button>
          <button onClick={() => back()} className="text-sm mt-2">
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailForm;

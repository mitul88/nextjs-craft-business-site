import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <div className="rounded border border-[#407B3F] shadow-lg w-96 mt-2 p-2 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Sign in</h1>
      <form>
        <div className="w-full">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="w-full rounded-xl border focus:outline-none focus:border-[#407B3F] px-3 py-2 mb-3"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="w-full rounded-xl border focus:outline-none focus:border-[#407B3F] px-3 py-2"
          />
        </div>
        <div className="mt-12 w-full flex flex-col">
          <div className="w-full flex flex-row-reverse">
            <Link href="/" className="text-sm">
              Forget password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-[#407B3F] text-white mt-2 p-2 rounded-xl border-0"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

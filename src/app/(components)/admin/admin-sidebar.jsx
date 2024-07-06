import Link from "next/link";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const AdminSidebar = () => {
  return (
    <div className="w-full bg-[#fff] py-10 px-5">
      <div>
        <h4 className="text-[#929292] mb-5">MAIN MENU</h4>
        <div className="flex flex-col">
          <Link
            href="/"
            className="flex items-center mb-2 p-2 px-3 rounded-xl hover:bg-[#407B3F] hover:text-[#fff] ease-in-out duration-500"
          >
            <MdDashboard className="mr-2" />
            Overview
          </Link>
          <Link
            href="/category"
            className="flex items-center mb-2 p-2 px-3 rounded-xl hover:bg-[#407B3F] hover:text-[#fff] ease-in-out duration-500"
          >
            <MdCategory className="mr-2" />
            Category
          </Link>
          <Link
            href="/product"
            className="flex items-center mb-2 p-2 px-3 rounded-xl hover:bg-[#407B3F] hover:text-[#fff] ease-in-out duration-500"
          >
            <MdShoppingBag className="mr-2" />
            Product
          </Link>
          <Link
            href="/banner"
            className="flex items-center mb-2 p-2 px-3 rounded-xl hover:bg-[#407B3F] hover:text-[#fff] ease-in-out duration-500"
          >
            <MdOutlinePlayCircleFilled className="mr-2" />
            Banner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

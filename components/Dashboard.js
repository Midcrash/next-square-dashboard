import React from "react";
import Overview from "./Overview";
import SaleList from "./SaleList";
import TopBar from "./TopBar";

function Dashboard() {
  return (
    <div className="w-full bg-slate-100" style={{ minHeight: "100vh" }}>
      <div className="container h-full px-12 pt-12 mx-auto">
        <div className="flex justify-between">
          <span className="flex">
            <p className="self-center text-2xl font-semibold">Hello Tyrae,</p>
          </span>
          <span className="flex w-1/6 px-2 py-1 bg-white rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="self-center w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="self-center px-2 text-gray-400">Search</p>
          </span>
        </div>
        <TopBar />
        {/* <Overview /> */}
        <SaleList />
      </div>
    </div>
  );
}

export default Dashboard;

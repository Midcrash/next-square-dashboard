import React from "react";

const TopBar = () => {
  const COUNT_ABBRS = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

  function formatCount(count, withAbbr = false, decimals = 2) {
    const i =
      0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
    let result = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
    if (withAbbr) {
      result += `${COUNT_ABBRS[i]}`;
    }
    return result;
  }

  const data = [
    {
      name: "Earning",
      total: 198000,
      color: "bg-green-200",
      strokeColor: "darkgreen",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Balance",
      total: 2400,
      color: "bg-blue-200",
      strokeColor: "darkblue",
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    },
    {
      name: "Total Sales",
      total: 89000,
      color: "bg-red-200",
      strokeColor: "darkred",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
  ];
  return (
    <div className="mt-6 h-[15%]">
      <div className="grid h-full grid-cols-3 bg-white divide-x rounded-2xl">
        {data.map((datas) => (
          <div className="flex justify-center" key={datas.name}>
            <span
              className={
                "flex px-4 rounded-full self-center py-4 " + datas.color
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={"self-center w-8 h-8 rounded-full  "}
                fill="none"
                viewBox="0 0 24 24"
                stroke={datas.strokeColor}
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={datas.icon}
                />
              </svg>
            </span>
            <div className="flex flex-col content-center justify-center mx-2">
              <p className="text-gray-400">{datas.name}</p>
              <p className="text-3xl font-semibold">
                ${formatCount(datas.total, true)}
              </p>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="self-center w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="green"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <p className="self-center text-sm font-bold text-green-600">
                  %37.8
                </p>
                <p className="self-center px-1 text-sm">this month</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;

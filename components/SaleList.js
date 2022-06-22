import React from "react";
import Image from "next/image";
import img from "../assets/imgs/food.jpg";

const SaleList = () => {
  const data = [
    {
      id: 1,
      image: "image",
      name: "Toast",
      price: "13",
      sales: "52",
      desc: "something about this product",
    },
    {
      id: 2,
      image: "image",
      name: "Borgir",
      price: "15",
      sales: "522",
      desc: "something about this product",
    },
    {
      id: 3,
      image: "image",
      name: "Latte",
      price: "8",
      sales: "532",
      desc: "something about this product",
    },
    {
      id: 4,
      image: "image",
      name: "Hot dogs",
      price: "2",
      sales: "452",
      desc: "something about this product",
    },
  ];
  return (
    <div className="h-[75%] mt-6 bg-white rounded-2xl">
      <div className="container p-6 mx-auto">
        <div className="flex justify-between">
          <span className="flex">
            <p className="self-center text-2xl font-semibold">Product Sold</p>
          </span>
          <div className="flex w-1/6 px-2 ">
            <span className="absolute self-center ">
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
            </span>
            <input
              className="self-center px-8 py-1 -mx-2 overflow-hidden text-black border-0 bg-slate-100 rounded-xl"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex w-full mt-4 text-gray-400">
          <p className="w-4/6">Product Name</p>
          <p className="w-1/6">Price</p>
          <p className="w-1/6">Total Sales</p>
        </div>
        <div className="flex flex-col ">
          {data.map((datas) => (
            <div className="flex w-full pt-6" key={datas.id}>
              <div className="flex w-4/6 ">
                <span className="relative w-1/6">
                  <img
                    src={img}
                    alt="item"
                    className="rounded-xl"
                    layout="responsive"
                    objectFit="fill"
                  />
                </span>
                <span className="flex flex-col justify-center w-2/3 px-6">
                  <p className="text-xl font-semibold">{datas.name}</p>
                  <p className="text-gray-400 text-md">{datas.desc}</p>
                </span>
              </div>
              <p className="w-1/6 font-semibold">${datas.price}</p>
              <p className="w-1/6">{datas.sales}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaleList;

import React from "react";

const Overview = () => {
  return (
    <div className="mt-6 h-[30%]">
      <div className="flex w-full h-full bg-white rounded-2xl">
        <div className="flex mx-6 my-6">
          <p>Overview</p>
          <select className="">
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">
              Coconut
            </option>
            <option value="mango">Mango</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Overview;

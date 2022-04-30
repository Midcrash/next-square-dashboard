import React from "react";

const Overview = () => {
  return (
    <div className="mt-6 h-[30%]">
      <div className="flex w-full h-full bg-white rounded-2xl">
        <div className="flex justify-between w-full mx-6 my-6">
          <p>Overview</p>
          <select className="self-start">
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option defaultValue={"Coconut"}>Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Overview;

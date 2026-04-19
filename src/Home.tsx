import { useState } from 'react'
import arthur from "././assets/arthur.jpg";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 grid-rows-6 gap-4">

      <div className="col-span-3 flex flex-col gap-3">
        <div className="border border-gray-300 p-4 rounded-md">
          <img
            src={arthur}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-200 mb-4"
          />
          <h2 className="font-semibold">Arthur Morgan</h2>
          <p className="text-sm text-gray-500">
            Professional Gunslinger <br/> Bounty Hunter <br/> Farm Hand <br/> 
            Van Der Linde Gang Executive
          </p>
        </div>
        <div className="border border-gray-300 p-3 rounded-md">
          <h3 className="font-semibold text-sm mb-2">
            Applications Status
          </h3>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Accepted: 0</span>
            <span className="text-red-500">Rejected: 378456</span>
          </div>
        </div>
      </div>

      <div className="col-span-6 border border-gray-300 p-3 rounded-md">
        <h2 className="font-semibold">Posts</h2>
      </div>

      <div className="col-span-3 border border-gray-300 p-3 rounded-md">
        <h2 className="font-semibold">News</h2>
      </div>

    </div>
  );
}

export default Home;

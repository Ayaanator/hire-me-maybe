import { useState } from 'react'


function Jobs() {

  return (
  <div className="max-w-6xl mx-auto grid grid-cols-12  bg-[#fff9ed] items-start">

    <div className="col-span-5 flex flex-col gap-3 bg-white p-2 border-1 border-gray-300 border-t-0 border-r-0">
      <h1 className="text-2xl font-semibold">Top job picks for you</h1>
      <h1 className="text-sm">Based on your profile, preferences, unpaid emotional labor, and your ability to click “I Agree” without reading anything</h1>
      <h1 className="text-sm">314 results</h1>
    </div>

    <div className="col-span-7 flex flex-col gap-3 bg-white p-2 border border-gray-300 border-t-0 border-l-0">
      <h1>This is job description!</h1>
    </div>
  </div>
  )
}

export default Jobs;

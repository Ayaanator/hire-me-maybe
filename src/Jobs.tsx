import { useState } from 'react'
import jobs from './jobs.json'

function Jobs() {

  return (
  <div className="max-w-6xl mx-auto grid grid-cols-12  bg-[#fff9ed] items-start">

    <div className="col-span-5 flex flex-col gap-3 bg-white  border-1 border-gray-300 border-t-0 border-r-0">
      <h1 className="text-2xl font-semibold p-2">Top job picks for you</h1>
      <h1 className="text-sm p-2">Based on your profile, preferences, unpaid emotional labor, and your ability to click “I Agree” without reading anything</h1>
      <h1 className="text-sm p-2">314 results</h1>

      <div>
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border-1 border-gray-300 p-2"
          >
            <div className="flex flex-row gap-3">
              <img
                src={job.profile}
                alt="profile"
                className="w-14 h-14 object-cover border border-gray-200"
              />
              <div>
                <h1>{job.title}</h1>
                <h2>{job.company}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="col-span-7 flex flex-col gap-3 bg-white p-2 border border-gray-300 border-t-0 border-l-0">
      <h1>This is job description!</h1>
    </div>
  </div>
  )
}

export default Jobs;

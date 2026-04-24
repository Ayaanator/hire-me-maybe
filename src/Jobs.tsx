import { useState } from 'react'
import jobs from './jobs.json'
import { useInteract, usePremium, useCredit } from './store.js'
import PremiumModal from './PremiumModal'
import CreditModal from './CreditModal'
import InteractModal from './InteractModal'

function Jobs() {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const selectedJob = jobs.find(job => job.id === selectedJobId);

  const setInteractState = useInteract((state) => state.setInteractState);

  return (
  <div className="max-w-6xl mx-auto grid grid-cols-12  bg-[#fff9ed] items-start">

    <div className="col-span-5 flex flex-col gap-3 bg-white  border-1 border-gray-300 border-t-0 border-r-0">
      <h1 className="text-2xl font-semibold p-2">Top job picks for you</h1>
      <h1 className="text-sm p-2">Based on your profile, preferences, unpaid emotional labor, and your ability to click “I Agree” without reading anything</h1>
      <h1 className="text-sm p-2">314 results</h1>

      <div>
        {jobs.map((job) => {
          const isSelected = selectedJobId === job.id;

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`relative border border-gray-300 p-2 cursor-pointer
                ${isSelected ? "bg-gray-100" : ""}
              `}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 h-full w-1 bg-black" />
              )}

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
          );
        })}
      </div>
    </div>

    <div className="col-span-7 flex flex-col gap-4 bg-white p-4 border border-gray-300 border-t-0 border-l-0">
      {!selectedJob ? (
        <h1 className="text-gray-500">Select a job to view details</h1>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">{selectedJob.title}</h1>
              <h2 className="text-gray-600">
                {selectedJob.company} • {selectedJob.location}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedJob.workType} • {selectedJob.employmentType}
              </p>
            </div>
            <button onClick={() => {setInteractState("Apply")}}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:cursor-pointer">
              Apply
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedJob.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-200 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold mb-2">About the job</h3>
          <p className="text-sm whitespace-pre-line">{selectedJob.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc list-inside text-sm">
              {selectedJob.responsibilities?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Basic Qualifications</h3>
            <ul className="list-disc list-inside text-sm">
              {selectedJob.qualifications?.basic?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold mt-2 mb-2">Preferred Qualifications</h3>
            <ul className="list-disc list-inside text-sm">
              {selectedJob.qualifications?.preferred?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
    
    <InteractModal/>
    <PremiumModal/>
    <CreditModal/>
  </div>
  
  )
}

export default Jobs;

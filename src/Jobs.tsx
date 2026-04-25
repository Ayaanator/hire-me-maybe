import { useEffect, useState } from 'react';
import jobs from './jobs.json'
import { useInteract, useJob, usePremium } from './store.js'
import PremiumModal from './PremiumModal'
import CreditModal from './CreditModal'
import InteractModal from './InteractModal'

function Jobs() {
  const jobState = useJob((s) => s.jobState);
  const setJobState = useJob((s) => s.setJobState);
  
  const selectedJob = jobs.find(job => job.id === jobState);
  const setInteractState = useInteract((state) => state.setInteractState);

  const setPremiumState = usePremium((state) => state.setPremiumState);


  const [jobMetrics, setJobMetrics] = useState(() => {
    const initial = {};

    jobs.forEach(job => {
      initial[job.id] = {
        seconds: Math.floor(Math.random() * 20),
        applicants: Math.floor(Math.random() * 201) + 900
      };
    });

    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJobMetrics(prev => {
        const updated = { ...prev };

        for (const id in updated) {
          updated[id] = {
            seconds: updated[id].seconds + 1,
            applicants:
              updated[id].applicants +
              Math.floor(Math.random() * 200) + 700
          };
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const metrics = selectedJob ? jobMetrics[selectedJob.id] : null;

  return (
  <div className="max-w-6xl mx-auto grid grid-cols-12  bg-[#fff9ed] items-start">

    <div className="col-span-5 flex flex-col gap-3 bg-white  border-1 border-gray-300 border-t-0 border-r-1">
      <h1 className="text-2xl font-semibold p-2">Top job picks for you</h1>
      <h1 className="text-sm p-2">Based on your profile, search history, preferences, unpaid emotional labor, and your ability to click “I Agree” without reading anything</h1>
      <h1 className="text-sm p-2">314 results</h1>

      <div>
        {jobs.map((job) => {
          const isSelected = jobState === job.id;

          return (
            <div
              key={job.id}
              onClick={() => setJobState(job.id)}
              className={`relative border border-gray-300 p-2 cursor-pointer border-r-0 
                ${job.id === 1 ? "border-t-1" : "border-t-0"}
                ${isSelected ? "bg-gray-100" : ""}
              `}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 h-full w-1 bg-black" />
              )}

              <div className="flex flex-row gap-3 group">
                <img
                  src={job.profile}
                  alt="profile"
                  className="w-16 h-16 object-cover border border-gray-200"
                />
                <div>
                  <h1 className="text-blue-600 group-hover:underline font-semibold">{job.title}</h1>
                  <h2>{job.company}</h2>
                  <h2 className="text-sm mt-3">{job.location}</h2>
                  <h2 className="text-sm text-gray-500">{job.salary}</h2>
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
      ) : selectedJob.description !== "PREMIUM_PAYWALL" ? (
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
              <p className="text-sm text-gray-500">
                {metrics?.seconds} seconds ago • Over {metrics?.applicants?.toLocaleString()} people clicked apply
              </p>
            </div>
            <button onClick={() => {
              const hasCaptchas = Object.keys(selectedJob.captchas).length > 0;

              setJobState(selectedJob.id);

              if (hasCaptchas) {
                window.open(`/apply/${selectedJob.id}`, "_blank");
              } else {
                setInteractState("Apply");
              }
            }}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:cursor-pointer">
              {Object.keys(selectedJob.captchas).length === 0 ? "" : "Free "} Apply
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

            <h3 className="font-semibold mt-2 mb-2">Salary</h3>
            <h1>{selectedJob.salary}</h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-xl font-semibold mb-2">
            Daily Job Search Limit Reached
          </h1>

          <p className="text-sm text-gray-600 mb-4">
            You’ve run out of free job searches for today. Upgrade to Premium to continue browsing opportunities without interruption.
          </p>

          <button onClick={() => setPremiumState("true")}
          className="bg-[#ffd76b] text-black px-5 py-2 text-sm font-semibold rounded-full hover:bg-[#daa000] transition cursor-pointer">
            Buy Premium
          </button>
        </div>
      )}
    </div>
    
    <InteractModal/>
    <PremiumModal/>
    <CreditModal/>
  </div>
  
  )
}

export default Jobs;

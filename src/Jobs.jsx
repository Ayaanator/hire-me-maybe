import { useEffect, useState } from 'react';
import jobs from './jobs.json'
import { useInteract, useJob, usePremium } from './store.js'
import PremiumModal from './PremiumModal.jsx'
import CreditModal from './CreditModal.jsx'
import InteractModal from './InteractModal.jsx'

function TermsModal({ jobId, onClose, onAgree }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const el = e.target;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (atBottom) setHasScrolledToBottom(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[580px] max-h-[80vh] rounded shadow-2xl flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Terms of Application Agreement</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Please read the entire document and scroll to the bottom to continue
          </p>
        </div>

        <div
          className="flex-1 overflow-y-auto px-6 py-4 text-xs leading-relaxed text-gray-800 space-y-3"
          onScroll={handleScroll}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">1. Acknowledgment of Futility</h3>
          <p>By clicking "Free Apply," you acknowledge that your application will enter a queue of approximately 1,400–2,800 other applicants, all of whom have slightly more experience than you, even the ones who lied. You further acknowledge that the job description was written by a committee in 2019, has since been updated seventeen times, and no longer reflects the actual role.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">2. Data Harvesting Rights</h3>
          <p>HireMeMaybe™ reserves the right to collect, analyze, sell, re-sell, lightly season, and distribute any and all data you provide, including but not limited to: your resume, your cover letter, the desperate energy you typed with, your screen resolution, the time of day you applied (which suggests things about you), and any audio captured by your microphone while you muttered "please, please, please" at the screen.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">3. The Resume Black Hole Clause</h3>
          <p>You understand and accept that your application may be reviewed by an ATS (Automated Tracking System) that will reject you because your resume used a table. You agree not to hold HireMeMaybe™ liable for this. You further agree that "rejected by a robot" is a perfectly valid and modern form of professional feedback.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">4. Ghosting Indemnification</h3>
          <p>The employer reserves the right to stop communicating with you at any point during the hiring process without notice, explanation, or the basic human courtesy of a "we've decided to move forward with other candidates" email. By applying, you pre-emptively forgive them. You waive all rights to closure.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">5. Salary Transparency Non-Transparency</h3>
          <p>The salary range listed is the range the employer is legally required to post in certain jurisdictions. The actual salary offered will be: "competitive," "DOE," somewhere south of your expectations, and will be revealed only after you have completed four rounds of interviews, a take-home project, and a personality assessment designed in 1987.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">6. The "Culture Fit" Provision</h3>
          <p>You acknowledge that "culture fit" is a legally meaningless phrase that means different things to different interviewers, all of whom have veto power. You agree that being told you are "not quite the right fit" does not entitle you to any further explanation, even if you gave them your best questions-for-the-interviewer and genuinely laughed at the CEO's joke about agile methodology.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">7. HireMeMaybe Engagement Requirements</h3>
          <p>To maximize your visibility, you agree to engage with at least three (3) posts per day from people you went to college with who now describe themselves as "storytellers" or "thought leaders." You further agree to occasionally post your own content, including but not limited to: celebrating a colleague's promotion, sharing a lesson you "learned the hard way," or posting a photo of your team's offsite with the caption "grateful."</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">8. AI Screening Consent</h3>
          <p>You consent to having your video interview analyzed by an AI trained on "successful candidates," a demographic that is demographically unrepresentative of you in ways we are unable to disclose due to ongoing litigation. The AI will assess your confidence, communication style, and "executive presence." Blinking too much is a negative signal. Blinking too little is also a negative signal.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">9. Emotional Labor Waiver</h3>
          <p>You agree to perform enthusiasm during all stages of the interview process, regardless of your genuine feelings. You further agree to describe your greatest weakness as "sometimes I work too hard" or "I care too much about the details," and to do so with a self-deprecating smile that communicates you are aware this is a meaningless ritual but are willing to perform it anyway.</p>

          <h3 className="text-xs font-bold uppercase tracking-widest mt-4">10. Final Provisions</h3>
          <p>This agreement is governed by the laws of whichever jurisdiction makes it hardest for you to seek recourse. Any disputes arising from your application, including feelings of inadequacy, career-related existential dread, or the lingering suspicion that the role was already filled internally, shall be resolved through binding arbitration conducted entirely via HireMeMaybe DM.</p>
        </div>

        <div className="px-6 py-3 border-t border-gray-200 flex items-center gap-3">
          <span className="text-xs text-gray-400 flex-1">
            {hasScrolledToBottom ? "✓ You have reached the end" : "Scroll to the bottom to enable Agree"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            disabled={!hasScrolledToBottom}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
}

function Jobs() {
  const jobState = useJob((s) => s.jobState);
  const setJobState = useJob((s) => s.setJobState);
  
  const selectedJob = jobs.find(job => job.id === jobState);  
  const setInteractState = useInteract((state) => state.setInteractState);
  const setPremiumState = usePremium((state) => state.setPremiumState);

  const [showTerms, setShowTerms] = useState(false);
  const [pendingJobId, setPendingJobId] = useState(null);

  const [jobMetrics, setJobMetrics] = useState(() => {
    const initial = {};
    jobs.forEach(job => {
      initial[job.id] = {
        seconds: Math.floor((Math.random() * 150)),
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
            applicants: updated[id].applicants + Math.floor(Math.random() * 200) + 700
          };
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = selectedJob ? jobMetrics[selectedJob.id] : null;

  const handleApplyClick = () => {
    const hasCaptchas = Object.keys(selectedJob.captchas).length > 0;
    setJobState(selectedJob.id);
    if (hasCaptchas) {
      setPendingJobId(selectedJob.id);
      setShowTerms(true);
    } else {
      setInteractState("Apply");
    }
  };

  const handleTermsAgree = () => {
    setShowTerms(false);
    window.open(`/apply/${pendingJobId}`, "_blank");
    setPendingJobId(null);
  };

  const handleTermsClose = () => {
    setShowTerms(false);
    setPendingJobId(null);
  };

  return (
  <div className="max-w-6xl mx-auto grid grid-cols-12 bg-[#fff9ed] items-start">

    <div className="col-span-5 flex flex-col gap-3 bg-white border-1 border-gray-300 border-t-0 border-r-1">
      <h1 className="text-2xl font-semibold p-2">Top job picks for you</h1>
      <h1 className="text-sm p-2 text-gray-600">Based on your profile, search history, preferences, unpaid emotional labor, and your ability to click "I Agree" without reading anything</h1>
      <h1 className="text-sm p-2">2077 results</h1>

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
        <div className="border border-dashed border-gray-300 p-4 bg-gray-100 flex flex-col gap-2">
          <h1 className="text-sm font-semibold text-gray-700">
            You've reached your daily job browsing limit
          </h1>
          <p className="text-xs text-gray-500">
            Free users can only view a limited number of opportunities per session.
            Upgrade to Premium to unlock unlimited access.
          </p>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => setPremiumState("true")}
              className="bg-[#ffd76b] text-black text-xs px-3 py-1 rounded-full hover:bg-[#daa000] transition cursor-pointer"
            >
              Upgrade
            </button>
          </div>
        </div>
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
            <button
              onClick={handleApplyClick}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:cursor-pointer"
            >
              {Object.keys(selectedJob.captchas).length === 0 ? "" : "Free "} Apply
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedJob.tags?.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
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
            <h1 className="text-gray-100">Compensation, equity, bonuses, pension, and vacation days not included</h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-xl font-semibold mb-2">
            Monthly Job Search Limit Reached
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            You've run out of free job searches for today. Upgrade to Premium to continue browsing opportunities without interruption.
          </p>
          <button
            onClick={() => setPremiumState("true")}
            className="bg-[#ffd76b] text-black px-5 py-2 text-sm font-semibold rounded-full hover:bg-[#daa000] transition cursor-pointer"
          >
            Buy Premium
          </button>
        </div>
      )}
    </div>
    
    {showTerms && (
      <TermsModal
        jobId={pendingJobId}
        onClose={handleTermsClose}
        onAgree={handleTermsAgree}
      />
    )}

    <InteractModal/>
    <PremiumModal/>
    <CreditModal/>
  </div>
  )
}

export default Jobs;
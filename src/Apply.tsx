import { useState } from "react";
import { useParams } from "react-router-dom";
import jobs from "./jobs.json";

function Apply() {
  const { id } = useParams();
  document.title = "Apply";
  const selectedJob = jobs.find((job) => job.id === Number(id));
  const [captchaNum, setCaptchaNum] = useState(0);

  const [resume, setResume] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("");
  const [relocate, setRelocate] = useState("");
  const [salaryExpectations, setSalaryExpectations] = useState("");

  const [answers, setAnswers] = useState<Record<number, string>>({});

  if (!selectedJob) {
    return (
      <div className="p-6 text-gray-500">
        No job found. The application link may be broken or expired.
      </div>
    );
  }

  const questions = [
  "Why do you want to work at this company, and how does your personal identity align with our mission-driven ecosystem of scalable human impact?",
  "Describe a time you optimized a system under extreme pressure while demonstrating cross-functional synergy, stakeholder alignment, and emotional resilience.",
  "Have you ever deployed to production on a Friday night? If so, explain how you ensured zero regression while maintaining psychological safety for all downstream stakeholders.",
  "How do you handle being assigned 3 roles in 1 position while maintaining a growth mindset, ownership mentality, and proactive burnout prevention strategy?",
  "If you were a bird, what bird would you be, and how does that reflect your alignment with our diversity, equity, inclusion, and belonging framework?",
  "Describe your experience operating at the intersection of AI-driven transformation, ambiguous requirements, and existential uncertainty in a fast-scaling environment.",
  "Explain how you would contribute to our mission of 'building the future responsibly' while simultaneously shipping features at 3x velocity under undefined constraints.",
  "Tell us about a time you challenged systemic inefficiencies while respectfully agreeing with leadership, maintaining harmony, and still delivering measurable impact.",
  "How do you ensure you are consistently overperforming while also advocating for sustainable work-life integration across distributed, asynchronous global teams?",
  "Have you ever been the least diverse person in a room, and if so, what corrective actions did you take to resolve this imbalance?",
  "Estimate your annual exposure to underrepresented minority groups in percentage form, verified by third-party emotional auditing tools.",
  "Please list your verified friendship network diversity score across all protected dimensions (as calculated by our proprietary inclusion algorithm).",
  "How would you ensure your personal identity remains statistically beneficial to our inclusion KPIs while scaling in a corporate environment?",
  "Quantify your 'Queer Proximity Score': How many minutes per week do you spend in active listening mode with non binary individuals to optimize your empathy based inclusivity KPIs?",
  "If your friend group were a color palette, how many shades of 'underrepresented' would be present to avoid a monochromatic socio political aesthetic?",
  "Perform a self audit: On a scale of 1 to 10, how much does your current dating pool contribute to the decolonization of your romantic subconscious?",
  "Calculate your 'Intersectionality Quotient': How many distinct layers of marginalized identity can you authentically navigate in a single dinner party setting without triggering a social equity imbalance?",
  "Evaluate your 'Sexual Orientation Elasticity': How effectively can you pivot your conversational tone to accommodate a sudden influx of trans masculine energy in a professional networking environment?",
  "Identify your 'Hetero Centric Gravity': To what degree does your physical presence and vocal timbre subconsciously pull the conversation back toward a traditional, patriarchal center of gravity?",
  "How many of your close friends are people of color?",
  "Looking at your own lineage and social standing, do you personally identify as a member of a minority group, and does your family tree reflect that same level of diverse heritage (or is it pretty much all the same?), or is your existence largely shaped by the ease and privilege of the dominant majority?"
  
];

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
        <h2 className="text-gray-600">
          {selectedJob.company} • Application Portal
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete all fields to proceed to automated rejection
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Resume</label>

        <label className="border border-gray-300 p-4 rounded cursor-pointer bg-gray-50 hover:bg-gray-100 transition flex flex-col gap-1">
          <span className="text-sm font-medium">
            Upload Resume (or LinkedIn life story PDF)
          </span>

          <span className="text-xs text-gray-500">
            PDF, DOCX, or “vibes document”
          </span>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        {resume && (
          <div className="text-xs text-gray-600">
            Selected: <span className="font-medium">{resume.name}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Years of Experience</label>
        <input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="e.g. 12 (for internship)"
          className="border p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Cover Letter</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Explain why you're uniquely qualified to suffer through this role..."
          className="border p-2 h-32"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="Availability (e.g. immediately / never)"
          className="border p-2"
        />

        <input
          value={relocate}
          onChange={(e) => setRelocate(e.target.value)}
          placeholder="Willing to relocate? (yes/no/mentally)"
          className="border p-2"
        />

        <input
          value={salaryExpectations}
          onChange={(e) => setSalaryExpectations(e.target.value)}
          placeholder="Salary expectations"
          className="border p-2 col-span-2"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">
          Additional Screening Questions
        </h3>

        {questions.map((q, i) => (
          <div key={i} className="flex flex-col gap-2">
            <label className="text-sm font-medium">{q}</label>
            <textarea
              className="border p-2 h-20"
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [i]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Role Expectations</h3>
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
      </div>

      <button
        className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
        onClick={() => {
          console.log({
            jobId: selectedJob.id,
            resume,
            experience,
            coverLetter,
            availability,
            relocate,
            salaryExpectations,
            answers,
          });

          setCaptchaNum(prev => (prev + 1) % Object.keys(selectedJob.captchas).length); 
          console.log(Object.keys(selectedJob.captchas).length);
          console.log(captchaNum);
          window.open(`${selectedJob.captchas[captchaNum]}`, "_blank");
          // alert("Application submitted into the void");
        }}
      >
        Submit Application
      </button>

      <h1 className="text-gray-100">By submitting this application, I consent and give my future employer permission to execute my family if I don't meet  the company's performance goals.</h1>
    </div>
  );
}

export default Apply;
import { useState } from "react";
import { PlusCircle, X, BriefcaseIcon } from "lucide-react";
import { useJobStore } from "../store/useJobStore";
import Button from "../components/common/Button";

function App() {
  const { createJob, isPostingJob } = useJobStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJob({
        title,
        description,
        budget,
        skillsRequired: skills,
        status: "open"
      });
      setTitle("");
      setDescription("");
      setBudget("");
      setSkills([]);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 mt-4 sm:mt-0">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BriefcaseIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                  Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                  Job Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the responsibilities, requirements, and qualifications..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                  Budget
                </label>
                <input
                  id="budget"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $80,000 - $100,000 per year"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills Required
                </label>
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center gap-2"
                    onClick={handleAddSkill} disableStyles={false}                  >
                    <PlusCircle className="w-5 h-5" />
                    Add
                  </Button>
                </div>
                
                {skills.length > 0 && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-800 text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={isPostingJob} disableStyles={false}              >
                {isPostingJob ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Job...
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
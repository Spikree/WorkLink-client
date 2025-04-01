import React from "react";
import { Calendar, Building2, DollarSign } from "lucide-react";
import Button from "./Button";

interface Skill {
  name: string;
}

interface JobCardProps {
  title: string;
  salary: string;
  company: string;
  postedDate: string;
  description: string;
  skills: Skill[];
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  salary,
  company,
  postedDate,
  description,
  skills,
  onApply,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{company}</span>
            </div>
          </div>
          <div className="flex items-center text-green-600 font-medium">
            <DollarSign className="w-4 h-4" />
            <span>{salary}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Posted {postedDate}</span>
        </div>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
            >
              {skill.name}
            </span>
          ))}
        </div>

        <Button
          onClick={onApply}
          disableStyles={false}
          className="w-full mt-4 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium 
                   hover:bg-blue-700 transition-colors duration-200 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;

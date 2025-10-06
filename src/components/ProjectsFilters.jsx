import { projectYears, getAllTechnologies } from "../data/projects";

const ProjectsFilters = ({
  selectedYear,
  selectedTechnologies,
  onYearChange,
  onTechnologyToggle,
  onClearTechnologies,
}) => {
  const technologies = getAllTechnologies();

  return (
    <div className="mb-12 fade-in-delay-1">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => onYearChange("all")}
          className={`px-3 py-1 text-sm font-medium transition-all duration-300 rounded-md border ${
            selectedYear === "all"
              ? "text-purple-300 bg-purple-900/20 border-purple-500/30"
              : "text-gray-300 hover:text-purple-300 hover:bg-gray-800/20 border-transparent"
          }`}
        >
          All Years
        </button>
        {projectYears.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-3 py-1 text-sm font-medium transition-all duration-300 rounded-md border ${
              selectedYear === year
                ? "text-purple-300 bg-purple-900/20 border-purple-500/30"
                : "text-gray-300 hover:text-purple-300 hover:bg-gray-800/20 border-transparent"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={onClearTechnologies}
          className={`px-3 py-1 text-sm font-medium transition-all duration-300 rounded-md border ${
            selectedTechnologies.length === 0
              ? "text-purple-300 bg-purple-900/20 border-purple-500/30"
              : "text-gray-300 hover:text-purple-300 hover:bg-gray-800/20 border-transparent"
          }`}
        >
          All Technologies
        </button>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => onTechnologyToggle(tech)}
            className={`px-3 py-1 text-sm font-medium transition-all duration-300 rounded-md border ${
              selectedTechnologies.includes(tech)
                ? "text-purple-300 bg-purple-900/20 border-purple-500/30"
                : "text-gray-300 hover:text-purple-300 hover:bg-gray-800/20 border-transparent"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsFilters;

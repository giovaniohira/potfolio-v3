import { useState, useEffect, useRef } from "react";
import { sortedProjectsData } from "../data/projects";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsGrid from "./ProjectsGrid";

const Projects = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const scrollPositionRef = useRef(0);
  const isFilteringRef = useRef(false);

  const toggleTechnology = (tech) => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.pageYOffset;
    isFilteringRef.current = true;
    
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleYearChange = (year) => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.pageYOffset;
    isFilteringRef.current = true;
    setSelectedYear(year);
  };

  const handleClearTechnologies = () => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.pageYOffset;
    isFilteringRef.current = true;
    setSelectedTechnologies([]);
  };

  const handleClearAllFilters = () => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.pageYOffset;
    isFilteringRef.current = true;
    setSelectedYear("all");
    setSelectedTechnologies([]);
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the individual project page
    window.location.href = `/projects/${projectId}`;
  };

  // Effect to restore scroll position after filtering
  useEffect(() => {
    if (isFilteringRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
        isFilteringRef.current = false;
      });
    }
  }, [selectedYear, selectedTechnologies]);

  const filteredProjects = sortedProjectsData.filter((project) => {
    const projectYear = new Date(project.date).getFullYear().toString();
    const yearMatch = selectedYear === "all" || projectYear === selectedYear;
    const techMatch =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.some((tech) => project.tags.includes(tech));
    return yearMatch && techMatch;
  });

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <ProjectsHeader />
        
        <ProjectsFilters
          selectedYear={selectedYear}
          selectedTechnologies={selectedTechnologies}
          onYearChange={handleYearChange}
          onTechnologyToggle={toggleTechnology}
          onClearTechnologies={handleClearTechnologies}
        />

        <ProjectsGrid
          filteredProjects={filteredProjects}
          onProjectClick={handleProjectClick}
          onClearAllFilters={handleClearAllFilters}
        />
      </div>
    </div>
  );
};

export default Projects;

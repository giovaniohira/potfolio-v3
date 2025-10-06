import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import NoProjectsFound from "./NoProjectsFound";

const ProjectsGrid = ({ 
  filteredProjects, 
  onProjectClick, 
  onClearAllFilters 
}) => {
  return (
    <AnimatePresence mode="wait">
      {filteredProjects.length === 0 ? (
        <NoProjectsFound onClearAllFilters={onClearAllFilters} />
      ) : (
        <motion.div
          key="projects-grid"
          layout
          className="space-y-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProjectClick={onProjectClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsGrid;

import { motion } from "framer-motion";
import ProjectLinkButton from "./ProjectLinkButton";

const ProjectCard = ({ project, onProjectClick }) => {
  return (
    <motion.div
      className="project-card card-hover h-64"
      onClick={() => onProjectClick(project.id)}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Project Image */}
        <div className="lg:w-1/3">
          <div className="aspect-video w-full h-48 lg:h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="lg:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-medium text-gray-100">
                {project.title}
              </h3>
              <span
                className={`text-xs font-medium ${
                  project.status === "completed"
                    ? "text-green-300"
                    : "text-yellow-300"
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-purple-300 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            {project.links && project.links.liveDemo && (
              <ProjectLinkButton
                type="demo"
                href={project.links.liveDemo}
                className="inline-flex items-center text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors w-auto px-0 py-0 border-0 hover:border-0"
                onClick={(e) => e.stopPropagation()}
              >
                View Project
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </ProjectLinkButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

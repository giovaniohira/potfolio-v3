import { motion } from "framer-motion";
import { getTimelineWithData } from "../data/timeline";
import { getFeaturedProjects } from "../data/projects";

const Home = () => {
  // Usar a nova função que retorna timeline com dados completos
  const mixedTimeline = getTimelineWithData();
  const featuredProjects = getFeaturedProjects();

  const renderTimelineCard = (item) => {
    if (item.type === "project") {
      // Dados do projeto já estão disponíveis em item.data
      const projectData = item.data;

      if (!projectData) {
        // Fallback if project not found
        return (
          <div className="p-5 timeline-card project-card bg-gray-800/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-purple-300 font-medium">
                PROJECT
              </span>
              <span className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              Projeto não encontrado
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Dados não disponíveis
            </p>
          </div>
        );
      }

      // Project card with link - using actual project data
      return (
        <div className="p-5 timeline-card project-card bg-gray-800/20 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-purple-300 font-medium">PROJECT</span>
            <span className="text-xs text-gray-400">
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">
            {projectData.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {projectData.description}
          </p>

          {/* Show project tags */}
          <div className="flex flex-wrap gap-1">
            {projectData.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs text-purple-300">
                {tag}
              </span>
            ))}
            {projectData.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-400 text-xs">
                +{projectData.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      );
    } else {
      // Fact card - dados do fato já estão disponíveis em item.data
      const factData = item.data;
      return (
        <div className="p-5 timeline-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-purple-300 font-medium">
              MILESTONE
            </span>
            <span className="text-xs text-gray-400">
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">
            {factData.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {factData.description}
          </p>
        </div>
      );
    }
  };

  const handleProjectClick = (item) => {
    if (item.type === "project" && item.referenceId) {
      // Navigate to the individual project page
      window.location.href = `/projects/${item.referenceId}`;
    }
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 fade-in">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-100">
            Hi, I'm <span className="accent-text">Giovani Ohira</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A passionate developer crafting digital experiences and turning
            ideas into reality.
          </p>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid lg:grid-cols-2 gap-24 mb-20">
          {/* About Me Section */}
          <section className="fade-in-delay-1 text-left">
            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6 text-gray-100 text-left">
                About <span className="accent-text">Me</span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-left">
                Get to know me better through my background and experience.
              </p>
            </div>

            <div className="space-y-12">
              {/* Personal Info */}
              <div className="text-left">
                <h3 className="text-lg font-medium mb-4 text-gray-100 text-left">
                  Personal Information
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="text-gray-300 text-left flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    21 years old
                  </li>
                  <li className="text-gray-300 text-left flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Curitiba, Brazil
                  </li>
                  <li className="text-gray-300 text-left flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Full-Stack Development
                  </li>
                  <li className="text-gray-300 text-left flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-purple-300 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex flex-col">
                      <p>1+ years of professional experience</p>
                      <p>5+ years of experience</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="text-left">
                <h3 className="text-lg font-medium mb-4 text-gray-100 text-left">
                  Who I Am
                </h3>
                <p className="text-gray-300 leading-relaxed text-left">
                  I'm a dedicated full-stack developer passionate about building
                  secure, scalable, and user-friendly applications. I wrote my
                  first code in 2020 and have been focused on web development
                  since 2022, constantly learning and evolving my skills through
                  personal projects and professional experience.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4 text-left">
                  I specialize in modern web technologies such as React,
                  Node.js, and TypeScript, with a strong focus on security and
                  performance. Beyond coding, I enjoy exploring new technologies
                  and sharing knowledge with the developer community.
                </p>
              </div>
            </div>
          </section>

          {/* Right Side - Featured Projects + Journey */}
          <div className="fade-in-delay-2">
            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-light mb-6 text-gray-100">
                  Featured <span className="text-purple-300">Projects</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Highlighted projects that showcase my skills and passion for
                  creating innovative solutions.
                </p>

                <div className="space-y-3">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-gray-800/10 rounded-lg p-3 cursor-pointer hover:bg-gray-800/20 transition-all duration-300 border border-gray-700/30"
                      onClick={() =>
                        (window.location.href = `/projects/${project.id}`)
                      }
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-medium text-gray-100">
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

                      <p className="text-gray-300 text-xs mb-2 leading-relaxed line-clamp-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-xs text-purple-300 bg-purple-900/20 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="px-1.5 py-0.5 text-gray-400 text-xs">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Journey Section */}
            <section>
              <div className="mb-12">
                <h2 className="text-2xl font-light mb-6 text-gray-100">
                  My <span className="accent-text">Journey</span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  A timeline of my development journey, including key milestones
                  and notable projects.
                </p>
              </div>

              <div className="space-y-8">
                {mixedTimeline.slice(0, 99).map((item, index) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="relative fade-in-delay-3"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div
                      onClick={() => handleProjectClick(item)}
                      className={
                        item.type === "project" ? "cursor-pointer" : ""
                      }
                    >
                      {renderTimelineCard(item)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

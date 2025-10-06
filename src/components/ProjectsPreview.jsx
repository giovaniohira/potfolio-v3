import { motion } from 'framer-motion'
import { sortedProjectsData } from '../data/projects'
import ProjectLinkButton from './ProjectLinkButton'

const ProjectsPreview = () => {
  // Get the 3 most recent projects
  const featuredProjects = sortedProjectsData.slice(0, 3)

  const handleProjectClick = (projectId) => {
    // Navigate to the individual project page
    window.location.href = `/projects/${projectId}`
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Here are some of my recent projects. Want to see more?
        </p>
        <motion.a
          href="/projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
        >
          View All Projects
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="glass-effect rounded-lg overflow-hidden project-card"
            onClick={() => handleProjectClick(project.id)}
          >
            {/* Project Image */}
            <div className="relative aspect-video h-48 image-container">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
            </div>
            
            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
              
              {project.links && project.links.liveDemo && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ProjectLinkButton
                    type="demo"
                    href={project.links.liveDemo}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors w-auto px-0 py-0 border-0 hover:border-0"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </ProjectLinkButton>
                </motion.div>
              )}
              
              {/* Click indicator */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="text-xs text-gray-400 font-medium flex items-center">
                  Click to view details
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPreview

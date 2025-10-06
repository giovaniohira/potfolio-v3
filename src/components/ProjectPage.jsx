import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { sortedProjectsData } from "../data/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import ProjectLinkButton from "./ProjectLinkButton";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the project by ID from the URL
  const project = sortedProjectsData.find((p) => p.id === projectId);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && selectedImage) {
        closeImageModal();
      }

      // Carousel navigation with arrow keys
      if (project.additionalImages && project.additionalImages.length > 1) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previousImage();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          nextImage();
        }
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (selectedImage) {
        document.body.style.overflow = "unset";
      }
    };
  }, [selectedImage, project.additionalImages]);

  if (!project) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-300">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleProjectClick = (item) => {
    if (item.source === "project" && item.projectId) {
      // Navigate to the individual project page
      window.location.href = `/projects/${item.projectId}`;
    }
  };

  const handleImageClick = (imageSrc, imageAlt) => {
    setImageLoading(true);
    setSelectedImage({ src: imageSrc, alt: imageAlt });

    // Simulate loading for better UX
    const img = new Image();
    img.onload = () => setImageLoading(false);
    img.src = imageSrc;
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (project.additionalImages) {
      setCurrentImageIndex((prev) =>
        prev === project.additionalImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (project.additionalImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.additionalImages.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <a
            href="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </a>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium ${
                project.status === "completed"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light mb-6 text-white">
            {project.title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div
            className="relative rounded-lg overflow-hidden aspect-video cursor-pointer transition-opacity duration-300 hover:opacity-90"
            onClick={() =>
              handleImageClick(
                project.image,
                `${project.title} - Main Screenshot`
              )
            }
          >
            <img
              src={project.image}
              className="w-full h-full object-cover"
              alt={project.title}
            />
          </div>

          {/* Technologies Used */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm text-gray-400 border border-gray-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Simple Separator */}
        <div className="border-t border-gray-800 my-16"></div>

        {/* Additional Images Gallery */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-white mb-2">
                Gallery
              </h3>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Main Carousel Image */}
              <div className="relative rounded-lg overflow-hidden aspect-video cursor-pointer transition-opacity duration-300 hover:opacity-90">
                <img
                  src={project.additionalImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onClick={() =>
                    handleImageClick(
                      project.additionalImages[currentImageIndex],
                      `${project.title} - Image ${currentImageIndex + 1}`
                    )
                  }
                />
              </div>

              {/* Navigation Arrows */}
              {project.additionalImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded p-2 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded p-2 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/30 text-white px-2 py-1 rounded text-sm">
                {currentImageIndex + 1} / {project.additionalImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {project.additionalImages.length > 1 && (
              <div className="mt-6">
                <div className="flex justify-center gap-2">
                  {project.additionalImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative rounded overflow-hidden aspect-video w-16 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "ring-2 ring-white/50"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-medium text-white">
              Details
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">Date:</span>
                <p className="text-white">
                  {project.date
                    ? new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "In Progress"}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <p
                  className={`capitalize ${
                    project.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {project.status}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-medium text-white">
              Links
            </h3>
            <div className="space-y-3">
              {/* Live Demo */}
              {project.links && project.links.liveDemo && (
                <ProjectLinkButton
                  type="demo"
                  href={project.links.liveDemo}
                />
              )}
              {/* View on GitHub */}
              {project.links && project.links.github && (
                <ProjectLinkButton
                  type="github"
                  href={project.links.github}
                />
              )}
              {/* View Article */}
              {project.links && project.links.article && (
                <ProjectLinkButton
                  type="article"
                  href={project.links.article}
                />
              )}
              {/* NPM Package */}
              {project.links && project.links.npm && (
                <ProjectLinkButton
                  type="npm"
                  href={project.links.npm}
                />
              )}
              {/* Fallback message if no actions available */}
              {(!project.links || Object.keys(project.links).length === 0) && (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-sm">
                    No external links available
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Features & Architecture */}
        {project.features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Features */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-white">
                  Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              {project.architecture && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-white">
                    Architecture
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(project.architecture).map(
                      ([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-400 text-sm capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <p className="text-white mt-1">{value}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-light text-white mb-8">
            About This Project
          </h2>
          <div className="space-y-6">
            {project.longDescription ? (
              <p className="text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            ) : (
              <p className="text-gray-300 leading-relaxed">
                This project represents a significant milestone in my
                development journey. It showcases my ability to work with modern
                technologies and deliver solutions that meet real-world
                requirements.
              </p>
            )}

            {project.id === 1 && (
              <>
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">Vault</strong> was born from my
                  passion for cybersecurity and my desire to create a truly
                  secure password management solution. Unlike traditional
                  password managers that rely on server-side encryption, Vault
                  ensures that your master password and sensitive data never
                  leave your browser. Every password, username, and TOTP secret
                  is encrypted using AES-GCM encryption before being transmitted
                  to the server.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This project demonstrates my commitment to security-first
                  development practices and my ability to create
                  enterprise-grade applications that prioritize user privacy and
                  data protection.
                </p>
              </>
            )}

            {!project.longDescription && project.id !== 1 && (
              <>
                <p className="text-gray-300 leading-relaxed">
                  The development process involved careful planning, iterative
                  design, and thorough testing to ensure a high-quality end
                  product. I learned valuable lessons about architecture, user
                  experience, and project management throughout this endeavor.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This project demonstrates my commitment to writing clean,
                  maintainable code and creating intuitive user interfaces that
                  provide exceptional user experiences.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-gray-700 hover:border-gray-600 text-white rounded transition-all duration-300"
          >
            <Globe className="w-4 h-4 mr-2" />
            View All Projects
          </a>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 rounded p-2 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative">
              {imageLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded">
                  <svg
                    className="animate-spin h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[90vh] object-contain rounded"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded p-3 text-white">
                <p className="text-sm">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectPage;

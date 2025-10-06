import { motion } from "framer-motion";

const NoProjectsFound = ({ onClearAllFilters }) => {
  return (
    <motion.div 
      key="no-projects"
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <p className="text-lg text-gray-300">
        No projects found with the selected filters.
      </p>
      <button
        onClick={onClearAllFilters}
        className="mt-4 text-purple-300 hover:text-purple-200 underline transition-colors"
      >
        Clear all filters
      </button>
    </motion.div>
  );
};

export default NoProjectsFound;

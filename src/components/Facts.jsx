import { motion } from 'framer-motion'
import { factsData } from '../data/facts'

const Facts = () => {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Here are some key facts about who I am and what drives me as a developer.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factsData.map((fact, index) => (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl mb-4">{fact.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-3">{fact.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{fact.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Facts

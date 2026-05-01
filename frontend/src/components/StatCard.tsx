import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: string
  trend?: string
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
      className="stat-card glass-card p-6 card-gaming"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-4xl ${color}`}>{icon}</div>
        {trend && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-sm font-semibold px-3 py-1 rounded-full ${
              trend.startsWith('+') 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {trend}
          </motion.span>
        )}
      </div>
      
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold gradient-text neon-text">{value}</p>
      
      <motion.div
        className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-gaming-primary/20 to-gaming-secondary/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export default StatCard

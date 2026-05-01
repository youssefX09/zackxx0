import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'

const Dashboard = () => {
  const stats = [
    { title: 'Total Items', value: '1,234', icon: '📦', color: 'text-gaming-primary', trend: '+12%' },
    { title: 'Total Sales', value: '$45,678', icon: '💰', color: 'text-gaming-success', trend: '+8%' },
    { title: 'Total Purchases', value: '$23,456', icon: '🛒', color: 'text-gaming-warning', trend: '-3%' },
    { title: 'Active Users', value: '89', icon: '👥', color: 'text-gaming-accent', trend: '+5%' },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="gradient-text text-4xl font-bold neon-text mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Welcome to Zack System - Gaming Mode</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 card-gaming"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gaming-primary to-gaming-secondary flex items-center justify-center text-xl">
                  🎯
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">Activity Item {i + 1}</p>
                  <p className="text-sm text-gray-400">Description of the activity goes here</p>
                </div>
                <span className="text-xs text-gray-500">{i + 1}h ago</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {['Add New Item', 'Record Sale', 'Record Purchase'].map((action, index) => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gaming glass-card p-6 card-gaming text-left"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {index === 0 ? '➕' : index === 1 ? '💵' : '🛍️'}
                </div>
                <div>
                  <h3 className="font-bold text-white">{action}</h3>
                  <p className="text-sm text-gray-400">Click to proceed</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard

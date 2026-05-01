import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Sidebar = () => {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/items', label: 'Items', icon: '📦' },
    { path: '/sales', label: 'Sales', icon: '💰' },
    { path: '/purchases', label: 'Purchases', icon: '🛒' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="sidebar-gaming fixed left-0 top-0 h-full w-72 z-50"
    >
      <div className="p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="gradient-text text-3xl font-bold neon-text">
            ZACK SYSTEM
          </h1>
          <p className="text-gray-400 text-sm mt-2">Gaming Mode</p>
        </motion.div>

        {user && (
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gaming-primary to-gaming-secondary flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <p className="font-semibold text-white">{user.username}</p>
                <p className="text-xs text-gaming-primary">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`nav-item-gaming flex items-center gap-3 ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-0 right-0 px-6"
        >
          <button
            onClick={logout}
            className="btn-gaming w-full py-3 rounded-xl bg-gradient-to-r from-gaming-danger to-red-600 text-white font-semibold"
          >
            Logout 🚪
          </button>
        </motion.div>
      </div>
    </motion.aside>
  )
}

export default Sidebar

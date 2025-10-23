import {
  NavLink,
  useOutlet,
  useLocation,
  ScrollRestoration
} from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

export default function Default() {
  const outlet = useOutlet()
  const location = useLocation()
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/tanstack">TanStack Query Test</NavLink>
      </header>
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute' }}
          transition={{ duration: 0.2 }}>
          {outlet}
        </motion.div>
      </AnimatePresence>
      <ScrollRestoration />
    </>
  )
}

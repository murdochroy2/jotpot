import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const AuthHeader = () => {
  const { isGuest, setLoggedIn } = useContext(AuthContext)
  const loggedIn = localStorage.getItem('token')
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setLoggedIn(false)
    navigate('/login')
  }

  return (
    <header className="auth-header">
      <Link to="/" className="auth-header-brand">
        <span className="auth-header-brand-icon">✍</span>
        <span>JotPot</span>
      </Link>
      <nav className="auth-header-nav">
        <Link to="/" className={`auth-header-link ${location.pathname === '/' ? 'active' : ''}`}>Notes</Link>
        <Link to="/about" className={`auth-header-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      </nav>
      <div className="auth-header-actions">
        {loggedIn && !isGuest() ? (
          <button className="auth-header-action-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            {location.pathname !== '/login' && (
              <Link to="/login" className="auth-header-action-btn outline">Sign In</Link>
            )}
            {location.pathname !== '/signup' && (
              <Link to="/signup" className="auth-header-action-btn">Sign Up</Link>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default AuthHeader

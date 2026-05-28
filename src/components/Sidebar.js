import React from 'react'
import { useNavigate } from 'react-router-dom'
import APP_NAME from '../config'

const Sidebar = ({ noteCount, tags, activeTag, onTagSelect, isGuest, onLogout }) => {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo-icon">✍</span>
        <span className="sidebar-logo">{APP_NAME}</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-nav-item ${!activeTag ? 'active' : ''}`}
          onClick={() => onTagSelect(null)}
        >
          <span className="nav-icon">📝</span>
          All Notes
          <span className="nav-count">{noteCount}</span>
        </button>
      </nav>

      {tags.length > 0 && (
        <div className="sidebar-tags">
          <div className="sidebar-section-label">Tags</div>
          {tags.map(tag => (
            <button
              key={tag}
              className={`tag-item ${activeTag === tag ? 'active' : ''}`}
              onClick={() => onTagSelect(activeTag === tag ? null : tag)}
            >
              <span className="tag-item-icon">#</span>
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="sidebar-footer">
        {isGuest ? (
          <>
            <div className="user-info-row">
              <div className="user-avatar">G</div>
              <span>Guest<span className="guest-badge">guest</span></span>
            </div>
            <button
              className="btn-sidebar-action sign-in"
              onClick={() => navigate('/login')}
            >
              <span className="nav-icon">🔐</span>
              Sign In
            </button>
          </>
        ) : (
          <button
            className="btn-sidebar-action logout"
            onClick={onLogout}
          >
            <span className="nav-icon">↩</span>
            Logout
          </button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar

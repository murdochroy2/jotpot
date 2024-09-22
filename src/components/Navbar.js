import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({guestMode, setGuestMode}) => {
  const inAbout = useLocation().pathname === '/about'
  const inHome = useLocation().pathname === '/'
  let location = useLocation();
  const loggedIn = localStorage.getItem('token')
  const navigate = useNavigate()
  React.useEffect(() => {
    // console.log(location)
  }, [location]);
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setGuestMode(false)
    navigate('/login')
  }
  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">JotPot ✍</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${inHome ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${inAbout ? 'active' : ''}`} to="/about">About</Link>
            </li>
          </ul>
          {loggedIn && !guestMode ?
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" role="button" onClick={handleLogout}>Logout</Link>
            </form> :
            <form className="d-flex" role="search">
              {guestMode && <Link className="btn btn-primary mx-1" to="/" role="button" onClick={handleLogout}>Guest Mode: Logout</Link>}
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>
          }
        </div>
      </div>
    </nav></div>
  )
}

export default Navbar
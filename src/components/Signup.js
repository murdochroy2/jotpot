import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import APP_NAME from '../config'

const Signup = (props) => {
  const port = process.env.REACT_APP_HOST_PORT
  const protocol = process.env.REACT_APP_HOST_PROTOCOL
  const host = `${protocol}://${process.env.REACT_APP_HOST}${port ? `:${port}` : ""}`
  const emptyCredentials = { name: "", email: "", password: "", cpassword: "" }
  const [credentials, setCredentials] = useState(emptyCredentials)
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(AuthContext)

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSignupFormSubmit = async (e) => {
    const { name, email, password } = credentials
    e.preventDefault()
    setCredentials(emptyCredentials)
    const url = `${host}/api/auth/createuser`
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      setLoggedIn(json.authToken)
      navigate("/")
      props.showAlert("success", "Account created successfully")
    } else {
      props.showAlert("danger", "Could not create account")
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-brand">✍ {APP_NAME}</div>
      <h2 className="auth-title">Create account</h2>
      <p className="auth-subtitle">Start taking notes in seconds</p>

      <form onSubmit={handleSignupFormSubmit}>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-name">Full name</label>
          <input
            type="text"
            className="auth-input"
            id="signup-name"
            name="name"
            placeholder="Your name"
            onChange={onChange}
            value={credentials.name}
            required
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-email">Email address</label>
          <input
            type="email"
            className="auth-input"
            id="signup-email"
            name="email"
            placeholder="you@example.com"
            onChange={onChange}
            value={credentials.email}
            required
          />
          <p className="auth-hint">We'll never share your email with anyone else.</p>
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-password">Password</label>
          <input
            type="password"
            className="auth-input"
            id="signup-password"
            name="password"
            placeholder="At least 5 characters"
            onChange={onChange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-cpassword">Confirm password</label>
          <input
            type="password"
            className="auth-input"
            id="signup-cpassword"
            name="cpassword"
            placeholder="Repeat your password"
            onChange={onChange}
            value={credentials.cpassword}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn-auth-submit">Create Account</button>
      </form>

      <p className="auth-footer-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default Signup

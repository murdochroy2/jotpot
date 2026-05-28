import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthHeader from './components/AuthHeader';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import AuthContextProvider from './context/AuthContextProvider';

function AppContent() {
  const [alert, setAlert] = useState({})
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => {
      setAlert({})
    }, 2500);
  }

  return (
    <>
      {!isHome && <AuthHeader />}
      <Alert alertType={alert.type} alertMessage={alert.message} toast={isHome || isAuthPage} />
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/about" element={<div className="auth-page"><div className="auth-card"><About /></div></div>} />
        <Route path="/login" element={<div className="auth-page"><Login showAlert={showAlert} /></div>} />
        <Route path="/signup" element={<div className="auth-page"><Signup showAlert={showAlert} /></div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <NoteState>
        <Router>
          <AppContent />
        </Router>
      </NoteState>
    </AuthContextProvider>
  );
}

export default App;

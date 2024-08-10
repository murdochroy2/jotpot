import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Items from './components/Items';
function App() {
  const [alert, setAlert] = useState({})
  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => {
      setAlert({})
    }, 1500);
  }
  const [bodyClass, setBodyClass] = useState('container')
  // Function to remove the class
  const removeBodyClass = () => {
    setBodyClass('');
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alertType={alert.type} alertMessage={alert.message}></Alert>
          <div className={`${bodyClass}`}>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}>
              </Route>
              <Route path="/about" element={<About />}>
              </Route>
              <Route path="/login" element={<Login showAlert={showAlert}/>}>
              </Route>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}>
              </Route>
              <Route path="/items" element={<Items removeBodyClass={removeBodyClass}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

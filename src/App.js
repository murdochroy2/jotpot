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
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert></Alert>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="/about" element={<About />}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

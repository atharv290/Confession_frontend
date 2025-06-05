import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import Home from './components/home';
import Post from'./components/post';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post-confession" element={<Post/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
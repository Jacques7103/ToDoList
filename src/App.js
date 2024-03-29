import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Reset from './components/Reset';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/reset" element={<Reset />}/>
          <Route exact path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

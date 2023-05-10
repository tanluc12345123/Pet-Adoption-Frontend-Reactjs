import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

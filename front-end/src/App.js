import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Add from './Add';
import Subtract from './Subtract';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      
      <div className="titles-container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/subtract" element={<Subtract/>} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

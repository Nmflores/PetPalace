import './App.css';
import {Routes, Route} from 'react-router-dom';

import {Home,Profile} from './pages';
import {Navbar,Footer} from './components';

function App() {
  return (
    <div>
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />          
        </Routes>
      </div>      
      <Footer />
    </div>
  );
}

export default App;

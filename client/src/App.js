import './App.css';
import {Routes, Route} from 'react-router-dom';

import {Home,Profile} from './pages';
import {Navbar,Footer} from './components';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='main'>
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

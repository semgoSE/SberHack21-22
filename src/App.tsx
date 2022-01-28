import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccountContext } from './context/Account';
import { Login } from './pages/Login';
import { Market } from './pages/Market';
import { Profile } from './pages/Profile';

function App() {
  const { user, wallet } = useContext(AccountContext);

  return (
    <div>
      <Router>
        <Routes>

          {user && 
            <>
              <Route path="/" element={<Market />} />
              <Route path="/myprofile" element={<Profile />} />
            </>
          }        
           <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { AccountContext } from './context/Account';
import { Item } from './pages/Item';
import { Login } from './pages/Login';
import { Market } from './pages/Market';
import { Profile } from './pages/Profile';
import { Registration } from './pages/Registration'
import { Test } from './pages/Test';

function App() {
  const { user, wallet } = useContext(AccountContext);

  return (
    <div>
      <Router>
        <CssBaseline />
        <Routes>
          {!user ?
            <>
              <Route path="/test" element={<Test />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<Login />} />
            </> :
            <>
              <Route path="/" element={<Market />} />
              <Route path="/item" element={<Item />} />
              <Route path="/myprofile" element={<Profile />} />
            </>
          }

        </Routes>
      </Router>
    </div>
  );
}

export default App;

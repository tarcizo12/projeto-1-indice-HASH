import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import InitialPage from './components/InitialPage';
import SecondPage from './components/SecondPage';
import './index.css';

function App() {
  const [redirectToSecondPage, setRedirectToSecondPage] = useState(false);

  const handleRedirect = () => {
    setRedirectToSecondPage(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<InitialPage handleClick={handleRedirect} />}
        />
        {redirectToSecondPage && <Navigate to="/second" />}
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;

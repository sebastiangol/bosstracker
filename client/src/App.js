import React from 'react';
import Home from './pages/Home';
import Playthrough from './pages/Playthrough';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlaythroughsContextProvider } from './context/PlaythroughsContext';

function App() {
  return (
    <PlaythroughsContextProvider>
      <div className="h-screen overflow-y-scroll m-0 p-0 scrollbar-hide md:scrollbar-default scrollbar-thin scrollbar-thumb-amber-400">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Playthrough />} />
          </Routes>
        </Router>
      </div>
    </PlaythroughsContextProvider>
  );
}

export default App;

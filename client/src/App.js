import React from 'react';
import Home from './pages/Home';
import Playthrough from './pages/Playthrough';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlaythroughsContextProvider } from './context/PlaythroughsContext';
import NewPlaythrough from './pages/NewPlaythrough';
import YourPlaythroughs from './pages/YourPlaythroughs';
import Register from './pages/Register';

function App() {
  return (
    <PlaythroughsContextProvider>
      <div className="h-screen overflow-y-scroll m-0 p-0 scrollbar-hide md:scrollbar-default scrollbar-thin scrollbar-thumb-amber-400">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Playthrough />} />
            <Route path="/newplaythrough" element={<NewPlaythrough />} />
            <Route path="/yourplaythroughs" element={<YourPlaythroughs />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </PlaythroughsContextProvider>
  );
}

export default App;

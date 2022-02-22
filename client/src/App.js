import React from 'react';
import Home from './pages/Home';
import Playthrough from './pages/Playthrough';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlaythroughsContextProvider } from './context/PlaythroughsContext';
import YourPlaythroughs from './pages/YourPlaythroughs';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <PlaythroughsContextProvider>
      <div className="h-screen overflow-y-scroll m-0 p-0 scrollbar-hide md:scrollbar-default scrollbar-thin scrollbar-thumb-amber-400">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profiles/:id" element={<Playthrough />} />
            <Route path="/profiles/user/:id" element={<YourPlaythroughs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </PlaythroughsContextProvider>
  );
}

export default App;

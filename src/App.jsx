import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Media from './pages/Media';
import OurStory from './pages/OurStory';
import Viewevents from './pages/Viewevents';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/viewevents" element={<Viewevents />} />
      </Routes>
      {/* {showSplash && <Splash onFinish={() => setShowSplash(false)} />} */}
    </Router>
  );
}

export default App;

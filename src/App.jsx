import React, { useState } from 'react';
import Home from './pages/Home';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Home />
     {/* {showSplash && <Splash onFinish={() => setShowSplash(false)} />} */}
    </>
  );
}

export default App;

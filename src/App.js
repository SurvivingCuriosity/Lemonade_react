import { React, useState, useEffect } from 'react'
import { HomePage } from './components/screens/home/HomePage'
import { ArtistMatchFinderPage } from './components/screens/tools/ArtistMatchFinderPage'
import { SongMatchFinderPage } from './components/screens/tools/SongMatchFinderPage'
import { ArtistKeyFinderPage } from './components/screens/tools/ArtistKeyFinderPage'
import { SongKeyFinderPage } from './components/screens/tools/SongKeyFinderPage'
import { TranslateButton } from './components/atoms/TranslateButton'
import { PageNotFound } from './components/screens/PageNotFound'
import { Footer } from './components/screens/home/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  // Online state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => { setIsOnline(navigator.onLine); };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <Router>
      {!isOnline && 
      <div className='aviso-error-internet'>
        <p>Whoops... no tienes conexión a internet</p>
        <p>Necesitas internet para usar Lemonade</p>
      </div>}

      <div className="footerStickTop">
        <Routes>
          <Route index exact path="/" element={<HomePage />} />
          <Route exact path="/ArtistMatchFinder" element={<ArtistMatchFinderPage />} />
          <Route exact path="/SongMatchFinder" element={<SongMatchFinderPage />} />
          <Route exact path="/ArtistKeyFinder" element={<ArtistKeyFinderPage />} />
          <Route exact path="/SongKeyFinder" element={<SongKeyFinderPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

import {HomePage} from './components/screens/home/HomePage'
import {ArtistMatchFinderPage} from './components/screens/ArtistMatchFinderPage'
import {SongMatchFinderPage} from './components/screens/SongMatchFinderPage'
import {ArtistKeyFinderPage} from './components/screens/ArtistKeyFinderPage'
import {SongKeyFinderPage} from './components/screens/SongKeyFinderPage'
import {Footer} from './components/screens/home/Footer'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="footerStickTop">
          <Routes>
            <Route index exact path="/" element={<HomePage />} />
            <Route exact path="/ArtistMatchFinder" element={<ArtistMatchFinderPage />} />
            <Route exact path="/SongMatchFinder" element={<SongMatchFinderPage />} />
            <Route exact path="/ArtistKeyFinder" element={<ArtistKeyFinderPage />} />
            <Route exact path="/SongKeyFinder" element={<SongKeyFinderPage />} />
          </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

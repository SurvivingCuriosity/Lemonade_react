import {Home} from './components/screens/Home'
import {ArtistMatchFinderPage} from './components/screens/ArtistMatchFinderPage'
import {SongMatchFinderPage} from './components/screens/SongMatchFinderPage'
import {ArtistKeyFinderPage} from './components/screens/ArtistKeyFinderPage'
import {SongKeyFinderPage} from './components/screens/SongKeyFinderPage'
import {Footer} from './components/big-containers/Footer'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="footerStickTop">
          <Routes>
            <Route index exact path="/" element={<Home />} />
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

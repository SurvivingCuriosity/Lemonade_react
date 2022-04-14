import {Home} from './components/routes-pages/Home'

import {ArtistMatchFinderPage} from './components/routes-pages/tools/ArtistMatchFinderPage'
import {SongMatchFinderPage} from './components/routes-pages/tools/SongMatchFinderPage'
import {ArtistKeyFinderPage} from './components/routes-pages/tools/ArtistKeyFinderPage'
import {SongKeyFinderPage} from './components/routes-pages/tools/SongKeyFinderPage'

import {Footer} from './components/big-containers/Footer'
import {FixedTopNav} from './components/navs/FixedTopNav'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <FixedTopNav />
      <div className="footerStickTop">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ArtistMatchFinder" element={<ArtistMatchFinderPage />} />
            <Route exact path="/SongMatchFinder" element={<SongMatchFinderPage />} />
            <Route exact path="/ArtistKeyFinder" element={<ArtistKeyFinderPage />} />
            <Route exact path="/SongKeyFinder" element={<SongKeyFinderPage />} />
            {/* <Route exact path="/login" element={<LoginPage />} /> */}
          </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

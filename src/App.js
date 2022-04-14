import {Home} from './components/routes-pages/Home'

import {ArtistMatchFinder} from './components/routes-pages/tools/ArtistMatchFinder'
import {SongMatchFinder} from './components/routes-pages/tools/SongMatchFinder'
import {ArtistKeyFinder} from './components/routes-pages/tools/ArtistKeyFinder'
import {SongKeyFinder} from './components/routes-pages/tools/SongKeyFinder'

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
            <Route exact path="/ArtistMatchFinder" element={<ArtistMatchFinder />} />
            <Route exact path="/SongMatchFinder" element={<SongMatchFinder />} />
            <Route exact path="/ArtistKeyFinder" element={<ArtistKeyFinder />} />
            <Route exact path="/SongKeyFinder" element={<SongKeyFinder />} />
            {/* <Route exact path="/login" element={<LoginPage />} /> */}
          </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

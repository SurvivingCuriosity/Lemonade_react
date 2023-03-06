import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/reset.css';
import './assets/style/base-styles.css';
import './assets/style/style.css';
import './assets/style/tarjetas.css';
import './assets/style/reproductor.css';
import './assets/style/progressBar.css';
import './assets/style/home.css';
import './assets/style/media-queries.css';
import App from './App';
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import {i18n} from './translations/i18n.config'

i18next.init(i18n)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

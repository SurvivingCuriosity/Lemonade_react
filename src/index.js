import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/reset.css';
import './style/style.css';
import './style/reproductor.css';
import './style/progressBar.css';
import App from './App';
// import reportWebVitals from './test/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// reportWebVitals(console.log);

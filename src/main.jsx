import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//atatus.config('1cdb7d6760df41cc836756b913328257').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
 );
 serviceWorkerRegistration.register();


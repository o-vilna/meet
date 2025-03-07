import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

//import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

//atatus.config('1cdb7d6760df41cc836756b913328257').install();

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
serviceWorkerRegistration.register();


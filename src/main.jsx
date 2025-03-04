import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as atatus from 'atatus-spa';

import './index.css'
import App from './App.jsx'

atatus.config('1cdb7d6760df41cc836756b913328257').install();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


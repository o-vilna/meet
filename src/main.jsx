import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import * as atatus from 'atatus-spa';
import { registerSW } from 'virtual:pwa-register';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// atatus.config('1b1ee5665eb943e3bdb71259beabe47a').install();

//NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1
});

// Додайте реєстрацію service worker через vite-plugin-pwa
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Update?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use');
  },
  immediate: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
   <App />
 </React.StrictMode>,
);
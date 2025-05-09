import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom";
import PlayerContextProvider from './components/Music/PlayerContext.jsx';

import Modal from 'react-modal';

// Fix for react-modal warning
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

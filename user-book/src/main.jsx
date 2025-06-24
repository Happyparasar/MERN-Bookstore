import { BrowserRouter } from 'react-router-dom'
import MyNav from './MyNav.jsx'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MyNav></MyNav>
    <App />
  </BrowserRouter>
 
  
)

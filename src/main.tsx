import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from './Components/Context/Auth.tsx'
import  ItemContextProvider  from './Components/Context/Item.tsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <ItemContextProvider>
  <AuthProvider>
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
  </AuthProvider>
  </ItemContextProvider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'
// import i18n (needs to be bundled ;))
import '@/utils/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

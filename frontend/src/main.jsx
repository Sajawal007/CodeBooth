import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Signup from './pages/SignupPage/Signup'
import FeedPage from './pages/FeedPage/FeedPage'
import Login from './pages/LoginPage/Login'
import { ProfileDetails } from './pages/ProfileDetails/ProfileDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/feed" element={<FeedPage />} />
        <Route exact path="/profiledetails" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

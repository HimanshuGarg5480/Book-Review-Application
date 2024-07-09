import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompleteProfile from './pages/CompleteProfile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/completeProfile" element={<CompleteProfile />}></Route>
        {/* <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<CartPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
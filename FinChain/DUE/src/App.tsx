import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Payment from './pages/Payment'
import Lending from './pages/Lending'
import RiskControl from './pages/RiskControl'
import Ledger from './pages/Ledger'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/risk" element={<RiskControl />} />
          <Route path="/ledger" element={<Ledger />} />
        </Route>
      </Route>
    </Routes>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import UiIcon from './UiIcon'

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>FinChain</h2>
        <small>DaNang</small>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          <UiIcon name="home" className="nav-icon" />
          Home
        </NavLink>
        <NavLink to="/payment" className={({ isActive }) => (isActive ? 'active' : '')}>
          <UiIcon name="payment" className="nav-icon" />
          Payments
        </NavLink>
        <NavLink to="/lending" className={({ isActive }) => (isActive ? 'active' : '')}>
          <UiIcon name="lending" className="nav-icon" />
          Lending
        </NavLink>
        <NavLink to="/risk" className={({ isActive }) => (isActive ? 'active' : '')}>
          <UiIcon name="risk" className="nav-icon" />
          Risk Control
        </NavLink>
        <NavLink to="/ledger" className={({ isActive }) => (isActive ? 'active' : '')}>
          <UiIcon name="ledger" className="nav-icon" />
          Ledger
        </NavLink>
      </nav>
      <div className="sidebar-meta">
        <div>DeFi MVP</div>
        <div>Smart contract simulation</div>
        <div>Blockchain ledger demo</div>
        <div style={{ marginTop: 12 }}>
          <strong>{user?.name ?? 'Guest user'}</strong>
          <div>{user?.role ?? 'no role selected'}</div>
        </div>
      </div>
    </aside>
  )
}

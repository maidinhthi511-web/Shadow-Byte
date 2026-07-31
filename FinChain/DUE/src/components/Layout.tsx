import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Sidebar from './Sidebar'
import UiIcon from './UiIcon'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-root">
      <Sidebar />
      <div className="content">
        <header className="header">
          <div className="header-left">
            <div>
              <h1>FinChain DaNang</h1>
              <p>DeFi operations console for MVP workflows</p>
            </div>
          </div>
          <div className="header-right">
            <div className="user-chip">
              <div className="user-avatar">{user?.name?.charAt(0) ?? 'F'}</div>
              <div>
                <div className="user-name">{user?.name ?? 'Guest'}</div>
                <div className="subtle">{user?.team ?? 'Not signed in'}</div>
              </div>
            </div>
            <button type="button" className="button ghost" onClick={handleSignOut}>
              <UiIcon name="logout" className="button-icon" />
              Sign out
            </button>
          </div>
        </header>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

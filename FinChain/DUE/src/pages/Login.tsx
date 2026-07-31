import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import UiIcon from '../components/UiIcon'

export default function Login() {
  const { users, signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? '')

  useEffect(() => {
    if (isAuthenticated) {
      navigate((location.state as { from?: string } | null)?.from ?? '/', { replace: true })
    }
  }, [isAuthenticated, location.state, navigate])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn(selectedUserId)
    navigate((location.state as { from?: string } | null)?.from ?? '/', { replace: true })
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <span className="tag">FinChain DaNang</span>
        <div className="login-hero-icon"><UiIcon name="ledger" className="login-hero-svg" /></div>
        <h1>Welcome back</h1>
        <p>Sign in with a mock user to explore payment, lending, risk, and ledger screens.</p>

        <form onSubmit={submit} className="form" style={{ marginTop: 24 }}>
          <label>
            Choose a user
            <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} · {user.role}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Sign in</button>
        </form>

        <div className="login-preview">
          <div className="subtle">Mock profiles</div>
          {users.map((user) => (
            <div key={user.id} className="login-user-row">
              <div>
                <strong>{user.name}</strong>
                <div className="subtle">{user.team}</div>
              </div>
              <span className={user.role === 'admin' ? 'status-pill warn' : 'status-pill good'}>
                <span className="status-dot" />
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockUsers, type AppUser } from '../data/mockData'

type AuthContextValue = {
  user: AppUser | null
  isAuthenticated: boolean
  signIn: (userId: string) => void
  signOut: () => void
  users: AppUser[]
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const STORAGE_KEY = 'finchain_auth_user_v1'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const next = mockUsers.find((candidate) => candidate.id === raw) ?? null
      setUser(next)
    } catch {
      setUser(null)
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: !!user,
      users: mockUsers,
      signIn: (userId: string) => {
        const next = mockUsers.find((candidate) => candidate.id === userId) ?? null
        setUser(next)
        if (next) {
          localStorage.setItem(STORAGE_KEY, next.id)
        }
      },
      signOut: () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

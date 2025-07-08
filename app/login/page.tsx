"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [redirectTo, setRedirectTo] = useState('/')
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next = params.get('next')
    if (next) setRedirectTo(next)
  }, [])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) {
      router.push(redirectTo)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  )
}

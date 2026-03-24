import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

interface User {
  name: string
  email: string
}

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputName && inputEmail) {
      setUser({ name: inputName, email: inputEmail })
      setInputName('')
      setInputEmail('')
    }
  }

  const handleClearUser = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Vibe Dream</h1>
          <p className="text-xl text-purple-100">React + Tailwind + TypeScript + localStorage</p>
        </div>

        {/* Counter Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Counter Demo</h2>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCount(c => c - 1)}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              -
            </button>
            <span className="text-5xl font-bold text-purple-600 w-20 text-center">{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setCount(0)}
            className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>

        {/* localStorage User Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile (Persisted)</h2>

          {/* Save Form */}
          <form onSubmit={handleSaveUser} className="mb-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 mb-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Save User
            </button>
          </form>

          {/* Display User */}
          {user ? (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-500 mt-2">✓ Saved to localStorage</p>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4 text-gray-500">
              No user data saved yet. Fill the form above to save.
            </div>
          )}

          {user && (
            <button
              onClick={handleClearUser}
              className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              Clear User
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white">
          <p className="text-sm">Refresh the page - your user data persists!</p>
        </div>
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react';
import { Search, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Search className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-cyan-500 text-lg font-semibold mb-2">Gadgetarian</h2>
          <h1 className="text-3xl font-bold text-gray-900">Form Login</h1>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan Username Teknisi..."
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Masukkan Password..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Login ini hanya diperuntukkan bagi Teknisi
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, User, Lock, Zap, CheckCircle, X } from 'lucide-react';
import { Technician } from '../data/technicianData';

interface LoginFormProps {
  onLogin: (username: string, password: string) => { success: boolean; technician: Technician | null };
  onBack: () => void;
}

interface LoginFormProps {
  onLogin: (username: string, password: string) => {
    success: boolean;
    technician: Technician | null;
  };
  onBack: () => void;
  onSuccessRedirect: () => void;
}

export default function LoginForm({
  onLogin,
  onSuccessRedirect,
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ show: boolean; technician: Technician | null }>({
    show: false,
    technician: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = onLogin(username, password);
    if (result.success && result.technician) {
      setSuccess({ show: true, technician: result.technician });
      setTimeout(() => {
        setIsLoading(false);
        onSuccessRedirect();
      }, 2000);
    } else {
      setIsLoading(false);
      setError('Username atau password salah! Hanya teknisi resmi yang dapat mengakses sistem ini.');
    }
  };

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    if (field === 'username') setUsername(value);
    else setPassword(value);

    if (error) setError('');
    if (success.show) setSuccess({ show: false, technician: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center px-4">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h2 className="text-cyan-500 text-base sm:text-lg font-semibold mb-2">Gadgetarian</h2>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Login Teknisi</h1>
          <p className="text-sm sm:text-base text-gray-600">Akses khusus untuk teknisi resmi</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 mx-2 sm:mx-0">

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="relative block w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="Masukkan Username Teknisi..."
                    disabled={isLoading || success.show}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="relative block w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="Masukkan Password..."
                    disabled={isLoading || success.show}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading || success.show}
                className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memverifikasi...</span>
                  </div>
                ) : success.show ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Login Berhasil!</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 bg-gray-100 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">
                Login ini hanya diperuntukkan bagi Teknisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
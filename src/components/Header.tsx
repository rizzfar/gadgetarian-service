import React from 'react';
import { ArrowLeft, Search, LogOut } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  showLogin?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isLoggedIn?: boolean;
  isCustomerView?: boolean;
}

export default function Header({ 
  showBack, 
  onBack, 
  showLogin, 
  onLogin,
  onLogout,
  showSearch,
  searchValue,
  onSearchChange,
  isLoggedIn,
  isCustomerView = false
}: HeaderProps) {
  return (
    <header className={`${isCustomerView ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-blue-600 to-blue-500'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {isCustomerView ? 'Kembali' : 'Kembali Ke Halaman Utama'}
                </span>
              </button>
            )}
            
            {!showBack && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold">Gadgetarian Tracking</h1>
              </div>
            )}
            
            {showBack && (
              <h1 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
                Gadgetarian Tracking
              </h1>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <span className="text-sm bg-blue-700 bg-opacity-50 px-3 py-1 rounded-full">
                Teknisi Login
              </span>
            )}
            
            {showLogin && (
              <button
                onClick={onLogin}
                className={`${isCustomerView ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-700 hover:bg-blue-800'} px-4 py-2 rounded-lg font-medium transition-colors`}
              >
                {isCustomerView ? 'Login Teknisi' : 'Login'}
              </button>
            )}
            
            {isLoggedIn && onLogout && (
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
        
        {showSearch && (
          <div className="pb-4">
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Cari Kode Servis..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-blue-400 focus:border-white focus:outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
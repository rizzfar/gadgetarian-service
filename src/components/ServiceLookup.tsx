import React, { useState } from 'react';
import { Search, Smartphone, Laptop, Monitor, AlertCircle, Zap, FileX, HelpCircle } from 'lucide-react';

interface ServiceLookupProps {
  onServiceFound: (serviceCode: string) => boolean;
}

export default function ServiceLookup({ onServiceFound }: ServiceLookupProps) {
  const [serviceCode, setServiceCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceCode.trim()) {
      setError('Mohon masukkan kode service');
      return;
    }

    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    const found = onServiceFound(serviceCode.trim());
    if (!found) {
      setError('Kode service tidak ditemukan. Pastikan kode yang Anda masukkan benar.');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceCode(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 shadow-2xl">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Cek Status Service
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 px-4">
            Masukkan kode service untuk melihat status perbaikan perangkat Anda
          </p>
          <p className="text-sm sm:text-base text-gray-500 px-4">
            Kode service dapat ditemukan pada struk atau email konfirmasi
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mx-2 sm:mx-0">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 sm:p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Lacak Service Anda</h2>
            <p className="opacity-90 text-sm sm:text-base">Dapatkan informasi real-time tentang status perbaikan</p>
          </div>
          
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="serviceCode" className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Kode Service
                </label>
                <div className="relative">
                  <input
                    id="serviceCode"
                    type="text"
                    value={serviceCode}
                    onChange={handleInputChange}
                    placeholder="Contoh: SVC-20250621-001"
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 rounded-xl sm:rounded-2xl transition-all duration-200 ${
                      error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    } focus:outline-none focus:ring-4`}
                    disabled={isLoading}
                  />
                  <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                {error && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800 mb-1">Service Tidak Ditemukan!</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mencari...</span>
                  </div>
                ) : (
                  'Cek Status Service'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Laptop className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">MacBook</h3>
            <p className="text-xs sm:text-sm text-gray-600">Service dan perbaikan MacBook semua series</p>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">iPhone</h3>
            <p className="text-xs sm:text-sm text-gray-600">Perbaikan iPhone dengan teknisi berpengalaman</p>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">iMac</h3>
            <p className="text-xs sm:text-sm text-gray-600">Service iMac dengan spare part original</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-sm sm:text-base text-gray-600">
            Butuh bantuan? Hubungi kami di{' '}
            <a href="tel:+6281234567890" className="text-blue-600 hover:text-blue-700 font-medium">
              +62 812-3456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
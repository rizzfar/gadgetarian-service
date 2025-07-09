import React, { useState } from 'react';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';
import { ServiceData } from '../data/mockData';
import { LogOut, Plus, Search } from 'lucide-react';

interface AdminDashboardProps {
  services: ServiceData[];
  onServiceUpdate: (services: ServiceData[]) => void;
  onLogout: () => void;
}

type AdminView = 'list' | 'form';

export default function AdminDashboard({ services, onServiceUpdate, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('list');
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (service: ServiceData) => {
    setEditingService(service);
    setCurrentView('form');
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus service ini?')) {
      const updatedServices = services.filter(service => service.id !== serviceId);
      onServiceUpdate(updatedServices);
    }
  };

  const handleAddNew = () => {
    setEditingService(null);
    setCurrentView('form');
  };

  const handleSaveService = (serviceData: ServiceData) => {
    let updatedServices;
    if (editingService) {
      // Update existing service
      updatedServices = services.map(service => 
        service.id === serviceData.id ? serviceData : service
      );
    } else {
      // Add new service
      updatedServices = [serviceData, ...services];
    }
    onServiceUpdate(updatedServices);
    setCurrentView('list');
    setEditingService(null);
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setEditingService(null);
  };

  return (
    <>
      {currentView === 'list' && (
        <>
          {/* Admin Header */}
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <h1 className="text-xl font-bold">Admin Dashboard - Gadgetarian</h1>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-blue-700 bg-opacity-50 px-3 py-1 rounded-full">
                    Teknisi Login
                  </span>
                  <button
                    onClick={onLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              
              <div className="pb-4">
                <div className="max-w-md">
                  <input
                    type="text"
                    placeholder="Cari Kode Servis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-blue-400 focus:border-white focus:outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </header>

          <ServiceList 
            services={services}
            onViewDetail={() => {}} // Not used in admin view
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
            searchTerm={searchTerm}
            isLoggedIn={true}
          />
        </>
      )}

      {currentView === 'form' && (
        <>
          {/* Form Header */}
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-bold">
                  {editingService ? 'Edit Service' : 'Tambah Service Baru'}
                </h1>
                <button
                  onClick={handleCancelForm}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Kembali
                </button>
              </div>
            </div>
          </header>

          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <ServiceForm
              service={editingService}
              onSave={handleSaveService}
              onCancel={handleCancelForm}
              isEdit={!!editingService}
            />
          </div>
        </>
      )}
    </>
  );
}
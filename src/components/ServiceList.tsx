import React from 'react';
import ServiceCard from './ServiceCard';
import { Plus } from 'lucide-react';

interface ServiceData {
  id: string;
  code: string;
  deviceName: string;
  category: string;
  categoryType: 'MacBook' | 'iPhone' | 'iMac';
  status: 'BELUM DIKERJAKAN' | 'SUDAH SELESAI' | 'Proses';
  entryDate: string;
  problem: string;
}

interface ServiceListProps {
  services: ServiceData[];
  onViewDetail: (service: ServiceData) => void;
  onEdit?: (service: ServiceData) => void;
  onDelete?: (serviceId: string) => void;
  onAddNew?: () => void;
  searchTerm: string;
  isLoggedIn?: boolean;
}

export default function ServiceList({ 
  services, 
  onViewDetail, 
  onEdit, 
  onDelete, 
  onAddNew, 
  searchTerm, 
  isLoggedIn 
}: ServiceListProps) {
  const filteredServices = services.filter(service => 
    service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">List Daftar Servis</h1>
            <p className="text-gray-600">Kelola dan pantau semua service perangkat</p>
          </div>
          
          {isLoggedIn && (
            <button
              onClick={onAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Service</span>
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada servis ditemukan</h3>
                <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
              </div>
            </div>
          ) : (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetail={onViewDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                isLoggedIn={isLoggedIn}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import { Laptop, Smartphone, Monitor, Edit, Trash2 } from 'lucide-react';

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

interface ServiceCardProps {
  service: ServiceData;
  onViewDetail: (service: ServiceData) => void;
  onEdit?: (service: ServiceData) => void;
  onDelete?: (serviceId: string) => void;
  isLoggedIn?: boolean;
}

const statusColors = {
  'BELUM DIKERJAKAN': 'bg-cyan-500 text-white',
  'SUDAH SELESAI': 'bg-green-500 text-white',
  'Proses': 'bg-blue-500 text-white'
};

const categoryColors = {
  'MacBook': 'bg-gradient-to-br from-cyan-400 to-cyan-600',
  'iPhone': 'bg-gradient-to-br from-orange-400 to-orange-600',
  'iMac': 'bg-gradient-to-br from-blue-400 to-blue-600'
};

const categoryIcons = {
  'MacBook': Laptop,
  'iPhone': Smartphone,
  'iMac': Monitor
};

export default function ServiceCard({ service, onViewDetail, onEdit, onDelete, isLoggedIn }: ServiceCardProps) {
  const Icon = categoryIcons[service.categoryType];
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-xl ${categoryColors[service.categoryType]} flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0`}>
            <Icon className="w-6 h-6 mb-1" />
            <div className="text-xs font-semibold text-center leading-tight">
              {service.categoryType}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900 truncate">{service.deviceName}</h3>
              <span className="text-sm font-medium text-gray-500 ml-2">{service.code}</span>
            </div>
            
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span className="text-sm text-gray-600">Kategori: {service.category}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[service.status]}`}>
                {service.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Masuk Service:</span> {service.entryDate}
            </p>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              <span className="font-medium">Masalah:</span> {service.problem}
            </p>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => onViewDetail(service)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Lihat Detail
              </button>
              
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit?.(service)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(service.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
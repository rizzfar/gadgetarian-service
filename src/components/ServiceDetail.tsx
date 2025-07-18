import { Laptop, Smartphone, Monitor, Calendar, User, Wrench, FileText, CheckCircle } from 'lucide-react';

interface ServiceData {
  id: string;
  code: string;
  deviceName: string;
  category: string;
  categoryType: 'MacBook' | 'iPhone' | 'iMac';
  status: 'BELUM DIKERJAKAN' | 'SUDAH SELESAI' | 'Proses';
  entryDate: string;
  problem: string;
  technician?: string;
  replacedComponent?: string;
  notes?: string;
}

interface ServiceDetailProps {
  service: ServiceData;
  isCustomerView?: boolean;
}

const statusColors = {
  'BELUM DIKERJAKAN': 'bg-cyan-500 text-white',
  'SUDAH SELESAI': 'bg-green-500 text-white',
  'Proses': 'bg-blue-500 text-white'
};

const categoryColors = {
  'MacBook': 'bg-gradient-to-br from-blue-500 to-purple-600',
  'iPhone': 'bg-gradient-to-br from-orange-400 to-orange-600',
  'iMac': 'bg-gradient-to-br from-blue-400 to-blue-600'
};

const categoryIcons = {
  'MacBook': Laptop,
  'iPhone': Smartphone,
  'iMac': Monitor
};

export default function ServiceDetail({ service, isCustomerView = false }: ServiceDetailProps) {
  const Icon = categoryIcons[service.categoryType];
  
  return (
    <div className={`min-h-screen ${isCustomerView ? 'bg-gradient-to-br from-blue-50 via-white to-cyan-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'} py-6 sm:py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {isCustomerView ? 'Status Service Anda' : 'Detail Service'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isCustomerView ? 'Informasi terkini mengenai perbaikan perangkat Anda' : 'Informasi lengkap mengenai service perangkat'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Device Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className={`${categoryColors[service.categoryType]} p-6 sm:p-8 text-center text-white`}>
                <Icon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{service.categoryType}</h2>
                <p className="text-base sm:text-lg opacity-90">Service</p>
                <div className="mt-4 flex items-center justify-center text-white text-opacity-90">
                  <span className="text-xs sm:text-sm font-medium">⚡ GADGETARIAN</span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{service.deviceName}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Kode Service</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 break-all">{service.code}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[service.status]}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                
                {isCustomerView && (
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-100">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl mb-2">
                        {service.status === 'SUDAH SELESAI' ? '✅' : service.status === 'Proses' ? '🔧' : '⏳'}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700">
                        {service.status === 'SUDAH SELESAI' 
                          ? 'Perangkat siap diambil!' 
                          : service.status === 'Proses' 
                          ? 'Sedang dalam perbaikan' 
                          : 'Menunggu antrian perbaikan'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className={`${isCustomerView ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-blue-600 to-blue-500'} p-4 sm:p-6 text-white`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Informasi Service</h3>
                <p className="opacity-90 text-sm sm:text-base">Detail lengkap proses service perangkat</p>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Nama Teknisi</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{service.technician || 'Rizky Al Farid Hafizh'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                        <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Komponen Diganti</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{service.replacedComponent || 'Casing'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Tanggal Masuk</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{service.entryDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Kategori</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{service.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Masalah</h4>
                        <p className="text-gray-700 text-sm sm:text-base">{service.problem}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6 sm:mt-8">
                  <div className={`${isCustomerView ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-cyan-500' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500'} rounded-lg sm:rounded-xl p-4 sm:p-6`}>
                    <div className="flex items-start space-x-3">
                      <div className={`${isCustomerView ? 'bg-cyan-500' : 'bg-blue-500'} p-2 rounded-lg flex-shrink-0`}>
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Catatan Teknisi</h4>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {service.notes || 'Mohon jangan hapus folder tugas, ada file bernama jangan_dihapus_bang.zip'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isCustomerView && (
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-200">
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Informasi Pengambilan</h4>
                      <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                        Silakan datang ke toko dengan membawa struk service untuk mengambil perangkat Anda.
                      </p>
                      <div className="text-xs sm:text-sm text-gray-600">
                        <p className="font-medium">Jam Operasional:</p>
                        <p>Senin - Sabtu: 09:00 - 18:00</p>
                        <p>Minggu: 10:00 - 16:00</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
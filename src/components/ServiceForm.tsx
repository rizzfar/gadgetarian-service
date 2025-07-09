import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

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

interface ServiceFormProps {
  service?: ServiceData;
  onSave: (service: ServiceData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function ServiceForm({ service, onSave, onCancel, isEdit = false }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceData>({
    id: service?.id || '',
    code: service?.code || '',
    deviceName: service?.deviceName || '',
    category: service?.category || '',
    categoryType: service?.categoryType || 'MacBook',
    status: service?.status || 'BELUM DIKERJAKAN',
    entryDate: service?.entryDate || new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    problem: service?.problem || '',
    technician: service?.technician || '',
    replacedComponent: service?.replacedComponent || '',
    notes: service?.notes || ''
  });

  const generateServiceCode = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 999) + 1;
    return `SVC-${year}${month}${day}-${String(random).padStart(3, '0')}`;
  };

  useEffect(() => {
    if (!isEdit && !formData.code) {
      setFormData(prev => ({ ...prev, code: generateServiceCode() }));
    }
  }, [isEdit, formData.code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      id: formData.id || Date.now().toString(),
      category: formData.categoryType
    };
    onSave(serviceData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {isEdit ? 'Edit Service' : 'Tambah Service Baru'}
            </h2>
            <button
              onClick={onCancel}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Service
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                readOnly={isEdit}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Perangkat
              </label>
              <input
                type="text"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                placeholder="Contoh: MacBook Air M2 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Perangkat
              </label>
              <select
                name="categoryType"
                value={formData.categoryType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="MacBook">MacBook</option>
                <option value="iPhone">iPhone</option>
                <option value="iMac">iMac</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="BELUM DIKERJAKAN">BELUM DIKERJAKAN</option>
                <option value="Proses">Proses</option>
                <option value="SUDAH SELESAI">SUDAH SELESAI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Teknisi
              </label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Nama teknisi yang menangani"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komponen Diganti
              </label>
              <input
                type="text"
                name="replacedComponent"
                value={formData.replacedComponent}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Komponen yang diganti"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Masalah
            </label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              placeholder="Deskripsikan masalah perangkat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Catatan tambahan..."
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isEdit ? 'Update' : 'Simpan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
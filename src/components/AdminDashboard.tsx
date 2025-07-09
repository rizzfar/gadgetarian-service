import React, { useState } from "react";
import ServiceList from "./ServiceList";
import ServiceForm from "./ServiceForm";
import { ServiceData } from "../data/mockData";
import { LogOut, Plus, Search } from "lucide-react";
import { Technician } from "../data/technicianData";
import ServiceDetail from "./ServiceDetail";

interface AdminDashboardProps {
  services: ServiceData[];
  onServiceUpdate: (services: ServiceData[]) => void;
  onLogout: () => void;
  currentTechnician: Technician | null;
}

type AdminView = "list" | "form" | "detail";

export default function AdminDashboard({
  services,
  onServiceUpdate,
  onLogout,
  currentTechnician,
}: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("list");
  const [editingService, setEditingService] = useState<ServiceData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );

  const handleEdit = (service: ServiceData) => {
    setEditingService(service);
    setCurrentView("form");
  };

  const handleViewDetail = (service: ServiceData) => {
    setSelectedService(service);
    setCurrentView("detail");
  };

  const handleDelete = (serviceId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus service ini?")) {
      const updatedServices = services.filter(
        (service) => service.id !== serviceId
      );
      onServiceUpdate(updatedServices);
    }
  };

  const handleAddNew = () => {
    setEditingService(null);
    setCurrentView("form");
  };

  const handleSaveService = (serviceData: ServiceData) => {
    let updatedServices;
    if (editingService) {
      updatedServices = services.map((service) =>
        service.id === serviceData.id ? serviceData : service
      );
    } else {
      updatedServices = [serviceData, ...services];
    }
    onServiceUpdate(updatedServices);
    setCurrentView("list");
    setEditingService(null);
  };

  const handleCancelForm = () => {
    setCurrentView("list");
    setEditingService(null);
  };

  return (
    <>
      {currentView === "list" && (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h1 className="text-sm sm:text-xl font-bold">
                    <span className="hidden sm:inline">
                      Admin Dashboard - Gadgetarian
                    </span>
                    <span className="sm:hidden">Admin - Gadgetarian</span>
                  </h1>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                  {currentTechnician && (
                    <div className="flex items-center space-x-2 bg-blue-700 bg-opacity-50 px-2 sm:px-3 py-1 rounded-full">
                      <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
                        {currentTechnician.avatar}
                      </div>
                      <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                        {currentTechnician.name}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={onLogout}
                    className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              <div className="pb-3 sm:pb-4">
                <div className="max-w-md">
                  <input
                    type="text"
                    placeholder="Cari Kode Servis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-400 focus:border-white focus:outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </header>

          <ServiceList
            services={services}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
            searchTerm={searchTerm}
            isLoggedIn={true}
          />
        </>
      )}

      {currentView === "form" && (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                <h1 className="text-base sm:text-xl font-bold">
                  {editingService ? "Edit Service" : "Tambah Service Baru"}
                </h1>
                <button
                  onClick={handleCancelForm}
                  className="text-white hover:text-gray-200 transition-colors text-sm sm:text-base"
                >
                  Kembali
                </button>
              </div>
            </div>
          </header>

          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8">
            <ServiceForm
              service={editingService ?? undefined}
              onSave={handleSaveService}
              onCancel={handleCancelForm}
              isEdit={!!editingService}
            />
          </div>
        </>
      )}

      {currentView === "detail" && selectedService && (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14 sm:h-16">
              <h1 className="text-base sm:text-xl font-bold">Detail Service</h1>
              <button
                onClick={() => setCurrentView("list")}
                className="text-white hover:text-gray-200 transition-colors text-sm sm:text-base"
              >
                Kembali
              </button>
            </div>
          </header>

          <ServiceDetail service={selectedService} isCustomerView={false} />
        </>
      )}
    </>
  );
}

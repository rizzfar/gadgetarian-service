import React, { useState } from 'react';
import Header from './components/Header';
import ServiceLookup from './components/ServiceLookup';
import ServiceDetail from './components/ServiceDetail';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import { mockServices, ServiceData } from './data/mockData';
import { authenticateTechnician, Technician } from './data/technicianData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type ViewState = 'lookup' | 'detail' | 'login' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('lookup');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState<ServiceData[]>(mockServices);
  const [currentTechnician, setCurrentTechnician] = useState<Technician | null>(null);


  const handleServiceLookup = (serviceCode: string) => {
    const service = services.find(s => s.code.toLowerCase() === serviceCode.toLowerCase());
    if (service) {
      setSelectedService(service);
      setCurrentView('detail');
      return true;
    }
    return false;
  };

const handleLogin = (username: string, password: string) => {
  const technician = authenticateTechnician(username, password);
  if (technician) {
    setCurrentTechnician(technician);
    setIsLoggedIn(true);
    setCurrentView('admin');
    toast.success(`Login berhasil! Selamat datang, ${technician.name}`);
    return { success: true, technician };
  }
  toast.error('Login gagal! Username atau password salah.');
  return { success: false, technician: null };
};


  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentTechnician(null);
    setCurrentView('lookup');
  };

  const handleBackToLookup = () => {
    setCurrentView('lookup');
    setSelectedService(null);
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleServiceUpdate = (updatedServices: ServiceData[]) => {
    setServices(updatedServices);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar className="fixed top-10"/>

      {currentView === 'lookup' && (
        <>
          <Header 
            showLogin={true}
            onLogin={handleShowLogin}
            isCustomerView={true}
          />
          <ServiceLookup onServiceFound={handleServiceLookup} />
        </>
      )}
      
      {currentView === 'detail' && selectedService && (
        <>
          <Header 
            showBack={true}
            onBack={handleBackToLookup}
            isCustomerView={true}
          />
          <ServiceDetail service={selectedService} isCustomerView={true} />
        </>
      )}

      {currentView === 'login' && (
        <>
          <Header 
            showBack={true}
            onBack={handleBackToLookup}
            isCustomerView={true}
          />
          <LoginForm 
            onLogin={handleLogin}
            onBack={handleBackToLookup}
            onSuccessRedirect={() => setCurrentView('admin')}
          />
        </>
      )}

      {currentView === 'admin' && isLoggedIn && (
        <AdminDashboard 
          services={services}
          onServiceUpdate={handleServiceUpdate}
          onLogout={handleLogout}
          currentTechnician={currentTechnician}
        />
      )}
    </div>
  );
}

export default App;
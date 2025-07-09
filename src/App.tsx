import React, { useState } from 'react';
import Header from './components/Header';
import ServiceLookup from './components/ServiceLookup';
import ServiceDetail from './components/ServiceDetail';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import { mockServices, ServiceData } from './data/mockData';

type ViewState = 'lookup' | 'detail' | 'login' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('lookup');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState<ServiceData[]>(mockServices);

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
    if (username && password) {
      setIsLoggedIn(true);
      setCurrentView('admin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
          <LoginForm onLogin={handleLogin} />
        </>
      )}

      {currentView === 'admin' && isLoggedIn && (
        <AdminDashboard 
          services={services}
          onServiceUpdate={handleServiceUpdate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
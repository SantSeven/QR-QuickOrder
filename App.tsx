
import React, { useState, useEffect } from 'react';
import { ViewMode, Order, OrderStatus } from './types';
import CustomerMenu from './components/CustomerMenu';
import KitchenDisplay from './components/KitchenDisplay';
import SplashView from './components/SplashView';

const orderChannel = new BroadcastChannel('restaurant_orders');

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('SPLASH');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('quickorder_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data;
      if (type === 'NEW_ORDER') {
        setOrders(prev => {
          const newOrders = [payload, ...prev];
          localStorage.setItem('quickorder_orders', JSON.stringify(newOrders));
          return newOrders;
        });
        
        // Notification sound for Kitchen
        if (view === 'KITCHEN') {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.play().catch(e => console.log('Audio blocked', e));
        }
      } else if (type === 'UPDATE_STATUS') {
        setOrders(prev => {
          const updated = prev.map(o => o.id === payload.id ? { ...o, status: payload.status } : o);
          localStorage.setItem('quickorder_orders', JSON.stringify(updated));
          return updated;
        });
      }
    };

    orderChannel.addEventListener('message', handleMessage);
    return () => orderChannel.removeEventListener('message', handleMessage);
  }, [view]);

  const placeOrder = (order: Order) => {
    orderChannel.postMessage({ type: 'NEW_ORDER', payload: order });
    setOrders(prev => {
      const newOrders = [order, ...prev];
      localStorage.setItem('quickorder_orders', JSON.stringify(newOrders));
      return newOrders;
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    orderChannel.postMessage({ type: 'UPDATE_STATUS', payload: { id: orderId, status } });
    setOrders(prev => {
      const updated = prev.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('quickorder_orders', JSON.stringify(updated));
      return updated;
    });
  };

  const clearOrders = () => {
    if (confirm("¿Estás seguro de que quieres limpiar todo el historial de pedidos?")) {
      setOrders([]);
      localStorage.removeItem('quickorder_orders');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {view === 'SPLASH' && (
        <SplashView onSelectView={setView} />
      )}
      
      {view === 'CUSTOMER' && (
        <CustomerMenu onPlaceOrder={placeOrder} onBack={() => setView('SPLASH')} />
      )}
      
      {view === 'KITCHEN' && (
        <KitchenDisplay 
          orders={orders} 
          updateStatus={updateOrderStatus} 
          onBack={() => setView('SPLASH')}
          onClear={clearOrders}
        />
      )}
    </div>
  );
};

export default App;

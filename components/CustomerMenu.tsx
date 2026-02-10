
import React, { useState } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../constants';
import { OrderItem, Order, OrderStatus } from '../types';
import { getSmartPairing } from '../services/geminiService';
import PaymentGateway from './PaymentGateway';

interface CustomerMenuProps {
  onPlaceOrder: (order: Order) => void;
  onBack: () => void;
}

const CustomerMenu: React.FC<CustomerMenuProps> = ({ onPlaceOrder, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [pairing, setPairing] = useState<Record<string, string>>({});
  const [tableNumber] = useState(() => Math.floor(Math.random() * 20 + 1).toString());

  const filteredItems = selectedCategory === 'Todos' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    if (!pairing[item.id]) {
      getSmartPairing(item.name).then(res => {
        setPairing(prev => ({ ...prev, [item.id]: res }));
      });
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentSuccess = (method: string) => {
    setShowPayment(false);
    setIsOrdering(true);
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber,
      items: [...cart],
      status: OrderStatus.PENDING,
      timestamp: Date.now(),
      total,
      paymentMethod: method
    };

    setTimeout(() => {
      onPlaceOrder(newOrder);
      setCart([]);
      setIsOrdering(false);
      alert("¡Pago exitoso! Tu pedido ha sido enviado a la cocina.");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <header className="bg-white px-4 py-3 border-b flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="font-bold text-lg text-slate-800">Mesa {tableNumber}</h2>
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Menú Digital</p>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="bg-white border-b px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-4 shadow-sm border border-slate-100 animate-in fade-in duration-500">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-100 flex-shrink-0" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm leading-tight">{item.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-black text-indigo-600">${item.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Agregar +
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {cart.length > 0 && (
        <div className="bg-white border-t p-4 pb-8 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)] rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              Tu Carrito 
              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">{cart.length}</span>
            </h4>
            <span className="font-black text-indigo-600 text-xl">${total.toFixed(2)}</span>
          </div>
          
          <div className="max-h-36 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-hide">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between animate-in slide-in-from-right-4">
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  {pairing[item.id] && (
                    <p className="text-[9px] text-indigo-500 italic mt-0.5">Sugerencia: {pairing[item.id]}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl px-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-500 font-bold hover:text-indigo-600">-</button>
                    <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 font-bold hover:text-indigo-600">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            disabled={isOrdering}
            onClick={() => setShowPayment(true)}
            className={`w-full py-4 rounded-2xl font-black text-white transition-all shadow-xl shadow-indigo-100 ${
              isOrdering ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
            }`}
          >
            {isOrdering ? 'PROCESANDO...' : 'PAGAR Y PEDIR'}
          </button>
        </div>
      )}

      {showPayment && (
        <PaymentGateway 
          total={total} 
          onSuccess={handlePaymentSuccess} 
          onCancel={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
};

export default CustomerMenu;

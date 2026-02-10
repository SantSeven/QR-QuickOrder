
import React from 'react';
import { Order, OrderStatus } from '../types';

interface KitchenDisplayProps {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
  onBack: () => void;
  onClear: () => void;
}

const KitchenDisplay: React.FC<KitchenDisplayProps> = ({ orders, updateStatus, onBack, onClear }) => {
  const activeOrders = orders.filter(o => o.status !== OrderStatus.DELIVERED);
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-amber-500 text-white border-transparent';
      case OrderStatus.PREPARING: return 'bg-blue-500 text-white border-transparent';
      case OrderStatus.READY: return 'bg-green-500 text-white border-transparent';
      default: return 'bg-slate-700 text-white border-transparent';
    }
  };

  const getNextLabel = (status: OrderStatus): string => {
    if (status === OrderStatus.PENDING) return 'EMPEZAR COCINA';
    if (status === OrderStatus.PREPARING) return 'MARCAR LISTO';
    if (status === OrderStatus.READY) return 'ENTREGAR';
    return '';
  };

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    if (status === OrderStatus.PENDING) return OrderStatus.PREPARING;
    if (status === OrderStatus.PREPARING) return OrderStatus.READY;
    if (status === OrderStatus.READY) return OrderStatus.DELIVERED;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
              SISTEMA DE COCINA (KDS)
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Monitor de Pedidos en Tiempo Real</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-white font-black text-xl leading-none">{activeOrders.length}</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase">Activos</p>
          </div>
          <button 
            onClick={onClear}
            className="bg-slate-800 hover:bg-red-600/20 text-slate-400 hover:text-red-500 text-[10px] font-black px-4 py-2 rounded-xl transition-all border border-slate-700 uppercase"
          >
            Limpiar Historial
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-x-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
        <div className="flex gap-6 h-full min-w-max">
          {activeOrders.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center text-slate-700 h-[60vh]">
              <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <p className="text-2xl font-bold">¡Todo listo! No hay pedidos pendientes.</p>
              <p className="text-slate-600 mt-2">Relájate un poco, te avisaremos cuando llegue uno.</p>
            </div>
          ) : (
            activeOrders.map(order => {
              const nextStatus = getNextStatus(order.status);
              const minutesAgo = Math.floor((Date.now() - order.timestamp) / 60000);
              
              return (
                <div key={order.id} className="w-80 bg-slate-900 rounded-3xl flex flex-col border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                  <div className={`p-5 flex justify-between items-start border-b border-slate-800/50 ${order.status === OrderStatus.PENDING && minutesAgo > 5 ? 'bg-red-950/20' : 'bg-slate-900'}`}>
                    <div>
                      <h3 className="text-white font-black text-3xl">MESA {order.tableNumber}</h3>
                      <p className="text-slate-500 text-[10px] font-mono tracking-tighter mt-1 uppercase">ID: {order.id}</p>
                      <p className="text-[10px] text-green-500 font-bold mt-1">✓ Pagado con {order.paymentMethod || 'Tarjeta'}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className={`text-sm mt-2 font-black font-mono ${minutesAgo > 10 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                        {minutesAgo}m
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/20 flex-shrink-0">
                          {item.quantity}
                        </span>
                        <div>
                          <p className="text-white font-bold text-lg leading-tight uppercase tracking-tight">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{item.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {nextStatus && (
                    <div className="p-4 bg-slate-900 border-t border-slate-800">
                      <button 
                        onClick={() => updateStatus(order.id, nextStatus)}
                        className={`w-full py-5 rounded-2xl font-black transition-all text-white flex items-center justify-center gap-3 shadow-xl ${
                          nextStatus === OrderStatus.PREPARING ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 
                          nextStatus === OrderStatus.READY ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 
                          'bg-green-600 hover:bg-green-700 shadow-green-600/20'
                        }`}
                      >
                        {getNextLabel(order.status)}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 p-4 text-center">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Los pedidos se sincronizan vía Local Broadcast • QuickOrder KDS v2.0</p>
      </footer>
    </div>
  );
};

export default KitchenDisplay;


import React from 'react';
import { ViewMode } from '../types';

interface SplashViewProps {
  onSelectView: (view: ViewMode) => void;
}

const SplashView: React.FC<SplashViewProps> = ({ onSelectView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-violet-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">QuickOrder</h1>
          <p className="text-indigo-100 text-lg">La nueva era del servicio en restaurantes.</p>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => onSelectView('CUSTOMER')}
            className="w-full bg-white text-indigo-700 font-bold py-5 rounded-2xl shadow-xl hover:bg-indigo-50 transition-all flex flex-col items-center gap-1 group"
          >
            <span className="text-xl">Ver Menú</span>
            <span className="text-sm font-normal text-indigo-500 opacity-80">(Simula escanear QR de mesa)</span>
          </button>

          <button
            onClick={() => onSelectView('KITCHEN')}
            className="w-full bg-indigo-500/20 border-2 border-white/20 text-white font-bold py-5 rounded-2xl hover:bg-indigo-500/30 transition-all flex flex-col items-center gap-1"
          >
            <span className="text-xl">Pantalla de Cocina</span>
            <span className="text-sm font-normal text-indigo-200 opacity-80">(Vista para el chef)</span>
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 mt-8">
          <p className="text-sm text-indigo-200">
            ¡Abre esta app en dos pestañas diferentes para ver la sincronización en tiempo real!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashView;

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Roulette } from '../features/roulette/Roulette';
import { Icon } from '@iconify/react';

export const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
            </div>

            <main className="relative pt-32 px-4 pb-12 flex flex-col items-center min-h-screen">
                <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto animate-[popIn_0.8s_ease-out]">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">
                        <Icon icon="ph:sparkle-fill" />
                        Decide tu destino
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-600 leading-tight drop-shadow-sm">
                        Ruleta de la <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Suerte</span>
                    </h1>
                    <p className="text-lg text-gray-400/80 max-w-lg mx-auto leading-relaxed">
                        ¿Indeciso? Deja que el azar tome el control. Personaliza tus opciones, gira la rueda y descubre tu próxima aventura.
                    </p>
                </div>

                <Roulette />
            </main>
        </div>
    );
};

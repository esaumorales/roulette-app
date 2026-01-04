import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Modal } from './Modal';
import { AuthForm } from './AuthForm';

export const Navbar: React.FC = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    const openAuth = (mode: 'login' | 'register') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4 bg-neutral-900/60 backdrop-blur-xl border-b border-white/5 shadow-2xl fixed w-full top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Icon icon="game-icons:roulette-wheel" width="24" height="24" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight">
                        RouletteApp
                    </span>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => openAuth('login')}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all hover:bg-white/5 rounded-lg active:scale-95"
                    >
                        <Icon icon="ph:sign-in-bold" width="20" />
                        <span>Iniciar Sesión</span>
                    </button>
                    <button
                        onClick={() => openAuth('register')}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                    >
                        <Icon icon="ph:user-plus-bold" width="20" />
                        <span>Registrarse</span>
                    </button>
                </div>
            </nav>

            <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
                <AuthForm initialMode={authMode} onClose={() => setIsAuthOpen(false)} />
            </Modal>
        </>
    );
};

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface AuthFormProps {
    initialMode?: 'login' | 'register';
    onClose: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ initialMode = 'login', onClose }) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onClose();
            // Here you would handle real auth
            alert(`¡${mode === 'login' ? 'Sesión iniciada' : 'Registro exitoso'}!`);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl">
                <button
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'login'
                            ? 'bg-white/10 text-white shadow-lg'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    Iniciar Sesión
                </button>
                <button
                    onClick={() => setMode('register')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'register'
                            ? 'bg-white/10 text-white shadow-lg'
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    Registrarse
                </button>
            </div>

            <div className="text-center">
                <h3 className="text-2xl font-black text-white mb-2">
                    {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                </h3>
                <p className="text-sm text-gray-400">
                    {mode === 'login'
                        ? 'Ingresa tus datos para continuar'
                        : 'Únete para guardar tus ruletas personalizadas'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === 'register' && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                        <div className="relative">
                            <Icon icon="ph:user-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                    <div className="relative">
                        <Icon icon="ph:envelope-simple-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            placeholder="ejemplo@correo.com"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Contraseña</label>
                    <div className="relative">
                        <Icon icon="ph:lock-key-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {loading ? <Icon icon="eos-icons:loading" /> : <Icon icon="ph:arrow-right-bold" />}
                    {mode === 'login' ? 'Entrar' : 'Registrarse'}
                </button>
            </form>

            <div className="flex items-center gap-4 my-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-gray-500 uppercase font-bold">O continúa con</span>
                <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="flex gap-4">
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center justify-center text-white transition-colors">
                    <Icon icon="flat-color-icons:google" width="24" />
                </button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl flex items-center justify-center text-white transition-colors">
                    <Icon icon="logos:github-icon" width="24" />
                </button>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface RouletteControlsProps {
    onAdd: (item: string) => void;
    onSpin: () => void;
    isSpinning: boolean;
}

export const RouletteControls: React.FC<RouletteControlsProps> = ({ onAdd, onSpin, isSpinning }) => {
    const [newValue, setNewValue] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newValue.trim()) {
            onAdd(newValue.trim());
            setNewValue('');
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full max-w-md bg-neutral-800/50 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
            <form onSubmit={handleAdd} className="flex gap-3 group">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                        <Icon icon="ph:pencil-simple-bold" />
                    </div>
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Añadir nueva opción..."
                        disabled={isSpinning}
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!newValue.trim() || isSpinning}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    <Icon icon="ph:plus-bold" width="20" />
                </button>
            </form>

            <button
                onClick={onSpin}
                disabled={isSpinning}
                className="group relative w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-purple-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed overflow-hidden"
            >
                <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSpinning ? (
                        <>
                            <Icon icon="eos-icons:loading" width="24" className="animate-spin" />
                            GIRANDO...
                        </>
                    ) : (
                        <>
                            <Icon icon="game-icons:perspective-dice-six-faces-random" width="28" className="group-hover:rotate-12 transition-transform" />
                            ¡GIRAR AHORA!
                        </>
                    )}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </button>
        </div>
    );
};

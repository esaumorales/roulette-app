import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { RouletteWheel } from './RouletteWheel';
import { RouletteControls } from './RouletteControls';

export const Roulette: React.FC = () => {
    const [items, setItems] = useState<string[]>(['Pizza', 'Hamburguesa', 'Sushi', 'Tacos', 'Ensalada']);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const handleAdd = (item: string) => {
        setItems(prev => [...prev, item]);
    };

    const handleRemove = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const spin = useCallback(() => {
        if (isSpinning || items.length < 2) return;

        setIsSpinning(true);
        setWinner(null);

        // Calculate random rotation (min 5 spins + random offset)
        const spins = 5;
        const randomOffset = Math.random() * 360;
        const newRotation = rotation + (spins * 360) + randomOffset;

        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);

            const normalizedRotation = newRotation % 360;
            let angleAtPointer = (270 - normalizedRotation) % 360;
            if (angleAtPointer < 0) angleAtPointer += 360;

            const anglePerSegment = 360 / items.length;
            const winnerIndex = Math.floor(angleAtPointer / anglePerSegment);

            setWinner(items[winnerIndex]);
        }, 5000); // 5s matches CSS transition
    }, [items, rotation, isSpinning]);

    return (
        <div className="flex flex-col items-center gap-12 w-full max-w-5xl mx-auto px-4">
            <div className="relative group perspective-1000">
                <RouletteWheel items={items} rotation={rotation} isSpinning={isSpinning} />
                {winner && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                        <div className="bg-neutral-900/95 backdrop-blur-xl text-white px-10 py-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center gap-3 animate-[popIn_0.6s_cubic-bezier(0.16,1,0.3,1)] border border-white/10 ring-4 ring-indigo-500/30">
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">El Ganador es</span>
                            <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-tr from-indigo-300 via-white to-purple-300 filter drop-shadow-lg text-center max-w-sm truncate leading-tight py-2">
                                {winner}
                            </span>
                            <button
                                onClick={() => setWinner(null)}
                                className="mt-4 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-white transition-all border border-white/5"
                            >
                                CERRAR
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 w-full items-start justify-center">
                <div className="flex-1 w-full md:max-w-md">
                    <RouletteControls onAdd={handleAdd} onSpin={spin} isSpinning={isSpinning} />
                </div>

                <div className="w-full md:max-w-xs bg-neutral-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-sm self-stretch">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white/60 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                            <Icon icon="ph:list-dashes-bold" width="16" />
                            Opciones ({items.length})
                        </h3>
                        {items.length > 0 && !isSpinning && (
                            <button
                                onClick={() => setItems([])}
                                className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
                            >
                                Borrar Todo
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {items.map((item, idx) => (
                            <span key={idx} className="group inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium text-gray-300 transition-all cursor-default animate-[popIn_0.3s_ease-out_backwards]" style={{ animationDelay: `${idx * 0.05}s` }}>
                                {item}
                                {!isSpinning && (
                                    <button
                                        onClick={() => handleRemove(idx)}
                                        className="size-5 flex items-center justify-center rounded hover:bg-red-500 text-gray-500 hover:text-white transition-all opacity-40 group-hover:opacity-100"
                                    >
                                        <Icon icon="ph:x-bold" width="12" />
                                    </button>
                                )}
                            </span>
                        ))}
                        {items.length === 0 && (
                            <div className="w-full py-8 text-center text-gray-600 text-sm italic">
                                No hay opciones. Añade alguna.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl p-6  animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                        {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
                        <button
                            onClick={onClose}
                            className="ml-auto text-gray-400 hover:text-white transition-colors"
                        >
                            <Icon icon="ph:x-bold" width="24" />
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

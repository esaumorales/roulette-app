import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';

interface RouletteWheelProps {
    items: string[];
    rotation: number;
    isSpinning: boolean;
    selectedParam?: number;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({ items, rotation, isSpinning }) => {
    const radius = 200;
    const diameter = radius * 2;
    const cx = radius;
    const cy = radius;

    const segments = useMemo(() => {
        const total = items.length;
        const anglePerSegment = 360 / total;

        return items.map((item, index) => {
            const startAngle = index * anglePerSegment;
            const endAngle = (index + 1) * anglePerSegment;

            const toRad = (deg: number) => (deg * Math.PI) / 180;

            const x1 = cx + radius * Math.cos(toRad(startAngle));
            const y1 = cy + radius * Math.sin(toRad(startAngle));
            const x2 = cx + radius * Math.cos(toRad(endAngle));
            const y2 = cy + radius * Math.sin(toRad(endAngle));

            const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

            const pathData = [
                `M ${cx} ${cy}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z',
            ].join(' ');

            const midAngle = startAngle + anglePerSegment / 2;
            const textRadius = radius * 0.65;
            const tx = cx + textRadius * Math.cos(toRad(midAngle));
            const ty = cy + textRadius * Math.sin(toRad(midAngle));

            return {
                pathData,
                color: `hsl(${(index * 360) / total}, 75%, 60%)`, // Vibrant colors
                text: item,
                tx,
                ty,
                midAngle,
                itemIndex: index
            };
        });
    }, [items, radius, cx, cy]);

    return (
        <div className="relative flex justify-center items-center py-10">
            {/* Pointer Container */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-2xl">
                <Icon icon="ph:caret-down-fill" width="56" height="56" className="text-white fill-current stroke-neutral-900 stroke-[4px]" />
            </div>

            {/* Wheel Container with Shadow */}
            <div className="relative rounded-full shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)] border-8 border-neutral-800/80 bg-neutral-900 p-2">
                <div
                    className="transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{
                        width: diameter,
                        height: diameter,
                        transform: `rotate(${rotation}deg)`,
                        transitionDuration: isSpinning ? '5s' : '0s'
                    }}
                >
                    <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} className="overflow-visible">
                        <defs>
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.5)" />
                            </filter>
                        </defs>
                        {segments.map((seg, i) => (
                            <g key={i}>
                                <path d={seg.pathData} fill={seg.color} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                                <text
                                    x={seg.tx}
                                    y={seg.ty}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="16"
                                    fontWeight="800"
                                    fontFamily="sans-serif"
                                    transform={`rotate(${seg.midAngle + 90}, ${seg.tx}, ${seg.ty})`}
                                    style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.4)" }}
                                >
                                    {seg.text.length > 14 ? seg.text.substring(0, 12) + '...' : seg.text}
                                </text>
                            </g>
                        ))}
                        {/* Center Cap */}
                        <circle cx={cx} cy={cy} r={28} fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle cx={cx} cy={cy} r={12} fill="#4f46e5" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

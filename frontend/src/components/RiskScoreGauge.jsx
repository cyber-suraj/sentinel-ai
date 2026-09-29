import { useEffect, useState } from 'react';

export default function RiskScoreGauge({ score }) {
  const [offset, setOffset] = useState(0);
  const size = 220;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // animate
    setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 100);
  }, [score, circumference]);

  const color = score <= 30 ? '#DC2626' : score <= 60 ? '#F59E0B' : '#059669';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={strokeWidth} className="dark:stroke-slate-800" />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} 
          strokeDasharray={circumference} strokeDashoffset={offset || circumference}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Trust Score</span>
      </div>
    </div>
  );
}

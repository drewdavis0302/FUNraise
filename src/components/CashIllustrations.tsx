import React from 'react';

/**
 * High-fidelity, laid-back SVG Cash & Money illustrations
 * Designed to look fun, money-focused, and friendly for younger crowds and teams.
 */

export const CashStackSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Stack of Cash"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="40" ry="8" fill="#14532d" fillOpacity="0.15" />
    
    {/* Bottom bill */}
    <g transform="translate(14, 56) rotate(-4)">
      <rect x="0" y="0" width="70" height="24" rx="4" fill="#166534" />
      <rect x="2" y="2" width="66" height="20" rx="3" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="35" cy="12" r="6" fill="#15803d" />
      <text x="35" y="15" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">$</text>
    </g>

    {/* Middle bill */}
    <g transform="translate(16, 42) rotate(3)">
      <rect x="0" y="0" width="70" height="24" rx="4" fill="#15803d" />
      <rect x="2" y="2" width="66" height="20" rx="3" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="35" cy="12" r="6" fill="#16a34a" />
      <text x="35" y="15" fill="#bbf7d0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">$</text>
    </g>

    {/* Top bill */}
    <g transform="translate(15, 28) rotate(-1)">
      <rect x="0" y="0" width="70" height="25" rx="4" fill="#22c55e" />
      <rect x="2" y="2" width="66" height="21" rx="3" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Corner numbers */}
      <text x="7" y="10" fill="#14532d" fontSize="6" fontWeight="900" fontFamily="system-ui">100</text>
      <text x="63" y="20" fill="#14532d" fontSize="6" fontWeight="900" fontFamily="system-ui">100</text>
      {/* Center seal */}
      <circle cx="35" cy="12.5" r="7.5" fill="#15803d" />
      <circle cx="35" cy="12.5" r="6" fill="#166534" />
      <text x="35" y="16" fill="#fef08a" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="system-ui">$</text>
      {/* Golden ribbon band */}
      <rect x="27" y="0" width="16" height="25" fill="#eab308" fillOpacity="0.9" />
      <rect x="29" y="0" width="12" height="25" fill="#fef08a" fillOpacity="0.4" />
      <text x="35" y="16" fill="#713f12" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="system-ui">★</text>
    </g>

    {/* Golden Coin near stack */}
    <g transform="translate(68, 64)">
      <ellipse cx="12" cy="12" rx="10" ry="10" fill="#ca8a04" />
      <ellipse cx="12" cy="11" rx="9" ry="9" fill="#eab308" />
      <ellipse cx="12" cy="11" rx="7" ry="7" fill="#facc15" stroke="#fef08a" strokeWidth="1" />
      <text x="12" y="14" fill="#713f12" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="system-ui">$</text>
    </g>
    
    {/* Cheerful sparkles */}
    <path d="M12 22L14 26L18 28L14 30L12 34L10 30L6 28L10 26Z" fill="#facc15" />
    <path d="M84 20L85.5 23L88.5 24.5L85.5 26L84 29L82.5 26L79.5 24.5L82.5 23Z" fill="#fef08a" />
  </svg>
);

export const FlyingMoneySvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Flying Money"
  >
    {/* Left Wing */}
    <path
      d="M26 42C16 32 10 38 4 34C1 32 0 42 8 46C14 49 20 48 26 47Z"
      fill="#e0f2fe"
      stroke="#38bdf8"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M8 40C14 43 20 44 26 44" stroke="#7dd3fc" strokeWidth="1" />

    {/* Right Wing */}
    <path
      d="M74 42C84 32 90 38 96 34C99 32 100 42 92 46C86 49 80 48 74 47Z"
      fill="#e0f2fe"
      stroke="#38bdf8"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M92 40C86 43 80 44 74 44" stroke="#7dd3fc" strokeWidth="1" />

    {/* Banknote Body */}
    <g transform="translate(20, 32)">
      <rect x="0" y="0" width="60" height="34" rx="5" fill="#16a34a" />
      <rect x="2" y="2" width="56" height="30" rx="3.5" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="30" cy="17" r="10" fill="#15803d" />
      <circle cx="30" cy="17" r="8" fill="#14532d" />
      <text x="30" y="22" fill="#fef08a" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="system-ui">$</text>
      <text x="6" y="11" fill="#bbf7d0" fontSize="7" fontWeight="bold" fontFamily="system-ui">100</text>
      <text x="46" y="28" fill="#bbf7d0" fontSize="7" fontWeight="bold" fontFamily="system-ui">100</text>
    </g>

    {/* Motion speed lines & sparkle */}
    <path d="M42 72L50 82L58 72" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
    <circle cx="18" cy="22" r="2.5" fill="#facc15" />
    <path d="M78 18L80 22L84 24L80 26L78 30L76 26L72 24L76 22Z" fill="#facc15" />
  </svg>
);

export const MoneyJarSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Money Jar & Savings"
  >
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="30" ry="6" fill="#14532d" fillOpacity="0.12" />

    {/* Glass Jar Body */}
    <path
      d="M30 36C30 32 34 30 50 30C66 30 70 32 70 36V78C70 85 64 88 50 88C36 88 30 85 30 78V36Z"
      fill="#f0fdf4"
      fillOpacity="0.8"
      stroke="#15803d"
      strokeWidth="2.5"
    />
    {/* Jar Neck and Rim */}
    <rect x="34" y="24" width="32" height="6" rx="2" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
    <ellipse cx="50" cy="24" rx="16" ry="3" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />

    {/* Money Bills and Coins inside jar */}
    <rect x="38" y="58" width="24" height="22" rx="3" fill="#22c55e" transform="rotate(-8 38 58)" />
    <circle cx="48" cy="68" r="4" fill="#15803d" />
    <rect x="42" y="50" width="22" height="24" rx="3" fill="#4ade80" transform="rotate(12 42 50)" />
    
    {/* Golden Coins Overflowing */}
    <ellipse cx="50" cy="38" rx="8" ry="7" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
    <text x="50" y="41" fill="#713f12" fontSize="8" fontWeight="bold" textAnchor="middle">$</text>

    <ellipse cx="58" cy="22" rx="7" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
    <text x="58" y="25" fill="#713f12" fontSize="7" fontWeight="bold" textAnchor="middle">$</text>

    <ellipse cx="40" cy="23" rx="7" ry="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
    <text x="40" y="26" fill="#713f12" fontSize="7" fontWeight="bold" textAnchor="middle">$</text>

    {/* Label on Jar */}
    <rect x="36" y="52" width="28" height="16" rx="2" fill="#ffffff" stroke="#166534" strokeWidth="1" />
    <text x="50" y="63" fill="#14532d" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="system-ui">PROFITS</text>

    {/* Sparkle */}
    <path d="M76 28L78 32L82 34L78 36L76 40L74 36L70 34L74 32Z" fill="#eab308" />
  </svg>
);

export const CoinBadgeSvg: React.FC<{ className?: string; text?: string }> = ({
  className = 'w-7 h-7',
  text = '$'
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
  >
    <circle cx="20" cy="20" r="18" fill="#ca8a04" />
    <circle cx="20" cy="19" r="16" fill="#eab308" />
    <circle cx="20" cy="19" r="13" fill="#facc15" stroke="#fef08a" strokeWidth="1.5" />
    <text x="20" y="24" fill="#713f12" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="system-ui">
      {text}
    </text>
  </svg>
);

/**
 * Friendly, laid-back cash badge with playful, stress-free micro-copy
 */
export const LaidBackCashChip: React.FC<{
  label?: string;
  sub?: string;
  variant?: 'green' | 'gold' | 'soft';
}> = ({
  label = 'Maximum Take-Home Cash',
  sub = 'Zero wasted budget',
  variant = 'green'
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/90 text-white border border-emerald-700/80 shadow-xs backdrop-blur-xs">
      <CashStackSvg className="w-5 h-5 shrink-0" />
      <div className="flex items-center gap-1.5 text-xs font-semibold">
        <span className="text-emerald-200">{label}</span>
        {sub && <span className="text-emerald-400/80 text-[10px] hidden sm:inline">• {sub}</span>}
      </div>
    </div>
  );
};

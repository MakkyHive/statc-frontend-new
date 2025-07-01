import React, { useEffect, useState } from 'react';
import { FaExchangeAlt, FaChartLine, FaUsers, FaClock } from 'react-icons/fa';

const statsData = [
  { value: 130000, label: 'Transactions', icon: <FaExchangeAlt />, suffix: '+' },
  { value: 300000, label: 'Trading Volume', icon: <FaChartLine />, prefix: '$', suffix: '+' },
  { value: 10000, label: 'Users on Platform', icon: <FaUsers />, suffix: '+' },
  { value: 99.9, label: 'Uptime', icon: <FaClock />, suffix: '%' }
];

const StatCard = ({ value, label, icon, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1200;
    const incrementTime = 30;
    const increment = (end / duration) * incrementTime;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Number(start.toFixed(0)));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center text-center" title={label}>
      <div className="text-3xl text-[#4FACFE] mb-2">{icon}</div>
      <span className="text-4xl font-extrabold bg-gradient-to-r from-[#836EF9] to-[#4FACFE] bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-white/70 mt-2 uppercase tracking-wide">{label}</span>
    </div>
  );
};

const PlatformStats = () => {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default PlatformStats;

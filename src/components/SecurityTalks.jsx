import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const segments = [
  {
    title: 'Security & Trust',
    icon: '🛡️',
    items: [
      'Contracts are verified',
      'Trusted and secured'
    ]
  },
  {
    title: 'Speed & Reliability',
    icon: '⚡',
    items: [
      'Fast and smart trades',
      'No trade failures or loss of funds'
    ]
  },
  {
    title: 'Profit & Rates',
    icon: '💰',
    items: [
      'Highly profitable',
      'Best trade rates at your grasp'
    ]
  }
];

const TrustHighlights = () => {
  return (
    <section className="py-20 px-6 text-white bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-3 md:gap-12 md:space-y-0 space-y-12 relative">
        {segments.map((seg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="text-center px-6 relative"
          >
            <div className="text-4xl mb-4">{seg.icon}</div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] bg-clip-text text-transparent">
              {seg.title}
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              {seg.items.map((item, j) => (
                <li key={j} className="flex items-center justify-center gap-2">
                  <FaCheck className="text-[#4FACFE]" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Horizontal line for mobile */}
            {i < segments.length - 1 && (
              <div className="block md:hidden mt-10 h-[2px] w-2/3 mx-auto bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded-full" />
            )}
            {/* Vertical line for desktop */}
            {i < segments.length - 1 && (
              <div className="hidden md:block absolute top-1/4 right-0 h-2/4 w-[2px] bg-gradient-to-b from-[#836EF9] to-[#4FACFE] rounded-full" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustHighlights;

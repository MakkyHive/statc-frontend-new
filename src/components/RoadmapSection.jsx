import React from 'react';

const phases = [
  {
    icon: 'fas fa-check',
    title: 'Completed Milestones',
    status: 'Completed',
    statusClass: 'bg-[rgba(46,204,113,0.2)] text-[#2ecc71] border border-[rgba(46,204,113,0.4)]',
    items: [
      'Built the website',
      'Developed the smart contract',
      'Live on testnet',
      'Integrated most major DEXes into aggregation',
      'UI upgrades',
    ],
  },
  {
    icon: 'fas fa-tools',
    title: 'Pre-Mainnet',
    status: 'In Progress',
    statusClass: 'bg-[rgba(241,196,15,0.2)] text-[#f1c40f] border border-[rgba(241,196,15,0.4)]',
    items: [
      'Final Testnet Refinements - Optimize smart contract for gas efficiency, test edge cases for multi-DEX execution (Privately)',
      'Community & Marketing Initiatives - Pre-sale preparation (whitelist, terms, and allocations), TGE strategy, Airdrop campaign execution',
      'Mainnet Deployment Preparation - Ensure liquidity availability on launch, prepare initial incentives for early adopters (trading rewards, others incentives), Beta launch with selective users for early feedback',
    ],
  },
  {
    icon: 'fas fa-rocket',
    title: 'Post-Mainnet: Expansion & Growth',
    status: 'Future',
    statusClass: 'bg-[rgba(52,152,219,0.2)] text-[#3498db] border border-[rgba(52,152,219,0.4)]',
    items: [
      'Feature Enhancements - Multi-router split support, Balancer V2/V3, Uniswap V3 support, UI V2 upgrade',
      'Advanced Aggregation & Optimization - Implement MEV protection, optimize gas for cross-DEX swaps',
      'Growth & Adoption - Airdrop, CEX listing discussions, Referral & staking rewards, Expansion into new chains',
    ],
  },
];

const Roadmap = () => (
  <section className="section-spacing py-24 px-4 max-w-6xl mx-auto" id="roadmap">
    <h3 className="text-4xl font-bold text-center mb-16 text-white relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:rounded after:bg-gradient-to-r after:from-[#836EF9] after:to-[#4FACFE] after:mx-auto after:mt-4">
      Project Roadmap
    </h3>
    <div className="flex flex-col gap-10">
      {phases.map(({ icon, title, status, statusClass, items }, idx) => (
        <React.Fragment key={title}>
          <div className="bg-[rgba(32,0,82,0.4)] border border-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl relative overflow-hidden hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded-t-2xl" />
            <h4 className="text-2xl font-semibold flex items-center gap-4 text-white mb-6">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#836EF9] to-[#4FACFE]">
                <i className={icon}></i>
              </span>
              {title}
              <span className={`ml-auto px-4 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
                {status}
              </span>
            </h4>
            <ul className="mt-4 space-y-3 pl-6 list-disc text-sm">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
          {idx < phases.length - 1 && (
            <div className="w-1 h-12 bg-gradient-to-b from-[#836EF9] to-transparent mx-auto" />
          )}
        </React.Fragment>
      ))}
    </div>
  </section>
);

export default Roadmap;

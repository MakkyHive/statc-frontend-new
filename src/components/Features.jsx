export default function Features() {
  const features = [
    {
       title: "Remove Liquidity",
      icon: "fa-water",
      items: [
        "Select DEX and pair",
        "Import custom tokens if needed",
        "View LP balance and pool status",
        "Withdraw from the pool",
      ]
      
    },
    {
      title: "Add Liquidity",
      icon: "fa-droplet",
      items: [
        "Select from integrated DEXs",
        "Choose token pair (auto-create if new)",
        "Import custom tokens if needed",
        "System calculates optimal ratios",
        "Distribute across pool automatically"
      ]
    },
    {
      title: "Swap Aggregation",
      icon: "fa-right-left",
      items: [
        "Multi-DEX rate comparison",
        "0.1% optimal routing fee",
        "Single transaction execution",
        "Real-time price protection",
      ]
    },
    {
      title: "Mon Vest (Tool)",
      icon: "fa-chart-line",
      items: [
        "Efficient token distribution to a large user base",
        "Supports both linear and monthly vesting",
        "CSV upload functionality for seamless allocation",
        "Users can track and claim vested tokens",
        "Stress-tested with 100K allocations",
        "Transparent process with no hidden fees",
      ]
    },
  ];

  return (
    <section id="features" className="section-spacing py-16 px-4 max-w-7xl mx-auto">
      <h3 className="text-white text-3xl sm:text-4xl text-center mb-12 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:rounded after:mt-3 after:mx-auto after:bg-gradient-to-r after:from-[#836EF9] after:to-[#4FACFE]">
        How It Works
      </h3>

      {/* Grid Layout */}
    <div className="grid gap-6 md:grid-cols-3">
  {features.slice(0, 3).map((feature, idx) => (
    <div
      key={idx}
      className={`relative bg-[rgba(32,0,82,0.4)] p-5 sm:p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-md transition-all hover:-translate-y-1.5 hover:shadow-xl flex flex-col
        ${idx === 1 ? 'md:row-span-2' : ''}`}
      style={idx === 1 ? { height: '100%' } : {}}
    >
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded-t-xl" />
      <h4 className="text-[#836EF9] text-lg font-semibold mb-4 flex items-center gap-2">
        <i className={`fa-solid ${feature.icon} text-[#4FACFE]`} />
        {feature.title}
      </h4>
      <ul className="space-y-2 text-white/90 text-sm leading-relaxed mt-auto">
        {feature.items.map((item, i) => (
          <li key={i} className="relative pl-6">
            <i className="fa-solid fa-check absolute left-0 top-0.5 text-[#4FACFE] text-xs" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>


      {/* Full-width final card */}
      <div className="mt-8">
  <div className="max-w-[900px] mx-auto relative bg-[rgba(32,0,82,0.4)] p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg transition-all hover:-translate-y-1.5 hover:shadow-xl">
    <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#836EF9] to-[#4FACFE] rounded-t-xl" />
    <h4 className="text-[#836EF9] text-xl font-semibold mb-5 flex items-center gap-2">
      <i className="fa-solid fa-chart-line text-[#4FACFE]" />
      {features[3].title}
    </h4>
    <ul className="space-y-3 text-white/90 text-sm leading-relaxed">
      {features[3].items.map((item, i) => (
        <li key={i} className="relative pl-6">
          <i className="fa-solid fa-check absolute left-0 top-0.5 text-[#4FACFE] text-xs" />
          {item}
        </li>
      ))}
    </ul>
  </div>
</div>

    </section>
  );
}

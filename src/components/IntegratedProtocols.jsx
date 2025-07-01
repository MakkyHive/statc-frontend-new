import React from 'react';

const protocols = [
  {
    name: 'Mon Bridge Dex',
    href: '/Swap',
    img: 'mbd101010-2_1.png',
  },
  {
    name: 'Bean Swap',
    href: 'https://bean.exchange/',
    img: 'https://perp.bean.exchange/images/logo.png',
  },
  {
    name: 'Taya Finance',
    href: 'https://taya.fi/',
    img: 'https://taya.fi/tayalogo/taya-mark.png',
  },
  {
    name: 'Octo Swap',
    href: 'https://octo.exchange/',
    img: 'https://octo.exchange/assets/img/logo/logo.png',
  },
  {
    name: 'Madness Finance',
    href: 'https://madness.finance/',
    img: 'https://i.ibb.co/hxHk3xKg/madness.png',
  },
  {
    name: 'Uniswap',
    href: 'https://app.uniswap.org/',
    img: 'https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/uniswap.jpg/public',
  },
  {
    name: 'Pancakeswap',
    href: 'https://pancakeswap.finance/',
    img: 'https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/pancake.png/public',
  },
  {
    name: 'Purps Dex',
    href: 'https://www.purps.xyz/',
    img: 'https://pbs.twimg.com/profile_images/1898733671798157312/SKe2XB43_400x400.jpg',
  },
  {
    name: 'Atlantis',
    href: 'https://app.atlantisdex.xyz/',
    img: 'https://i.ibb.co.com/pBhfp9d8/2-KI7e-Xdp-400x400.jpg',
  },
  {
    name: 'Zkswap',
    href: 'https://zkswap.finance/',
    img: 'https://raw.githubusercontent.com/ZkSwapFinance/brand-kit/refs/heads/main/512x512.png',
  },
];

const IntegratedProtocols = () => (
  <section className="py-24 px-4 max-w-7xl mx-auto text-center">
    <h3 className="text-4xl font-bold text-white mb-12 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-gradient-to-r after:from-[#836EF9] after:to-[#4FACFE] after:mx-auto after:mt-4">
      Integrated Protocols
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
      {protocols.map(({ name, href, img }) => (
        <a
          key={name}
          href={href}
          className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl p-6 transition-all shadow-lg hover:scale-105 hover:border-[#836EF9] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(131,110,249,0.1),transparent)] opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <img src={img} alt={name} className="max-w-[100px] rounded-lg mb-4 object-contain" />
          <span className="font-semibold text-base text-gray-100 text-center">{name}</span>
        </a>
      ))}
    </div>
  </section>
);

export default IntegratedProtocols;

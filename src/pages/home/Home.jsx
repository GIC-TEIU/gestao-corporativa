import React from 'react';
const colorPalette = [
  { name: 'Brand Blue Vivid', className: 'bg-brand-blue-vivid', hex: '#1A5BB1' },
  { name: 'Brand Cyan', className: 'bg-brand-cyan', hex: '#33748B' },
  { name: 'Brand Teal Dark', className: 'bg-brand-teal-dark', hex: '#275667' },
  { name: 'Brand Blue Dark', className: 'bg-brand-blue-dark', hex: '#2A454E' },
  { name: 'Brand Green', className: 'bg-brand-green', hex: '#2F7429' },
  { name: 'Brand Green Dark', className: 'bg-brand-green-dark', hex: '#165507' },
  { name: 'Brand Orange', className: 'bg-brand-orange', hex: '#AA5500' },
  { name: 'Brand Orange Dark', className: 'bg-brand-orange-dark', hex: '#A15305' },
  { name: 'Brand Gray Stone', className: 'bg-brand-gray-stone', hex: '#7C7C7C' },
  { name: 'Brand Gray Dark', className: 'bg-brand-gray-dark', hex: '#939393' },
  { name: 'Brand Gray Medium', className: 'bg-brand-gray-medium', hex: '#9E9E9E' },
  { name: 'Brand Gray Steel', className: 'bg-brand-gray-steel', hex: '#A3A3A3' },
  { name: 'Brand Gray Concrete', className: 'bg-brand-gray-concrete', hex: '#D8D6D6' },
  { name: 'Brand Gray Light', className: 'bg-brand-gray-light', hex: '#D9D9D9' },
  { name: 'Brand Ice Blue', className: 'bg-brand-ice-blue', hex: '#DFE9ED' },
  { name: 'Brand Off White', className: 'bg-brand-off-white', hex: '#EEF1F1' },
  { name: 'Brand Black', className: 'bg-brand-black', hex: '#000000' },
  { name: 'Brand White', className: 'bg-brand-white', hex: '#FFFFFF', hasBorder: true },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-brand-off-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue-dark">Paleta de Cores</h1>
          <p className="text-brand-gray-medium mt-2">Guia de referência visual para o projeto.</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {colorPalette.map((color) => (
            <div key={color.name} className="bg-brand-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div
                className={`h-32 w-full ${color.className} ${color.hasBorder ? 'border-b border-brand-gray-light' : ''}`}
              ></div>
              <div className="p-4">
                <h2 className="font-bold text-brand-blue-dark truncate">{color.name}</h2>
                <p className="text-sm text-brand-gray-medium">{color.hex}</p>
                <code className="text-xs text-brand-orange-dark bg-brand-off-white p-1 rounded mt-2 inline-block w-full truncate">
                  {color.className}
                </code>
              </div>
            </div>
          ))}

          <div className="bg-brand-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="h-32 w-full relative bg-cover bg-[url('https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070&auto=format&fit=crop')]">
                <div className="absolute inset-0 bg-brand-green/20 flex items-center justify-center text-brand-white font-bold text-lg backdrop-blur-sm">
                    20% Opacidade
                </div>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-brand-blue-dark">Opacidade (20%)</h2>
              <p className="text-sm text-brand-gray-medium">Exemplo de uso</p>
              <code className="text-xs text-brand-orange-dark bg-brand-off-white p-1 rounded mt-2 inline-block w-full truncate">
                bg-brand-green/20
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
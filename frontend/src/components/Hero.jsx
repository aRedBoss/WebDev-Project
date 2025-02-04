import bgImage from '../assets/barber-logo.png';

const Hero = () => {
  return (
      <section className="flex flex-col h-screen w-full bg-cover justify-center bg-gray-100 text-center py-20 relative" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-green-950 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-white opacity-20 z-0"></div>
        
        {/* Content */}
        <div className="flex max-w-7xl justify-center mt-8">
        <div className="relative z-10 text-left">
        <h1 className="text-8xl text-white font-bold mb-4 ">
          Musa barber shop
        </h1>
        <p className="text-3xl mb-8 text-white">Elevate your grooming with style</p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-white text-black rounded hover:bg-lime-50">
            VIEW SERVICES
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-400">
            BOOK NOW
          </button>
        </div>
        </div>
        </div>
      </section>
  );
};

export default Hero;

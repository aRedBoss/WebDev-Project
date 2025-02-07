import bgImage from "../../assets/barber-logo.png"; // Replace with your image path

const Hero = () => {
  return (
    <section
      className="flex z-0 flex-col h-screen w-full bg-cover justify-center bg-gray-100 text-center py-20 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 bg-green-950 opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-white opacity-20 z-0"></div>

      {/* Content */}
      <div className="flex justify-center max-w-7xl mt-8 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="relative z-10 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold mb-4">
            Musa barber shop
          </h1>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-white">
            Elevate your grooming with style
          </h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
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

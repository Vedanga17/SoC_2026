export default function Hero() {
  return (
    <div className="relative w-full h-72 bg-gray-100 flex flex-col justify-center items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80")' }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 text-center bg-white/70 px-12 py-6 rounded-2xl shadow-sm backdrop-blur-md">
        <div className="w-10 h-10 mx-auto mb-3 bg-amber-600 rounded-full"></div>
        <h2 className="text-4xl font-semibold mb-3 tracking-wide">Product Comparison</h2>
        <p className="text-sm font-medium text-gray-700">
          <span className="font-bold text-black">Home</span> <span className="mx-2 text-gray-400">&gt;</span> Comparison
        </p>
      </div>
    </div>
  );
}
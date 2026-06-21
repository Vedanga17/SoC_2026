export default function Footer() {
  return (
    <footer className="px-12 pt-20 pb-10 bg-white">
      <div className="grid grid-cols-4 gap-8 mb-16">
        <div className="flex flex-col gap-6 pr-12">
          <h2 className="text-2xl font-bold font-serif tracking-wide">Furniro.</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            400 University Drive Suite 200 Coral<br/>Gables,<br/>FL 33134 USA
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <h4 className="text-gray-400 font-semibold mb-2">Links</h4>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Home</a>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Shop</a>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">About</a>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Contact</a>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-gray-400 font-semibold mb-2">Help</h4>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Payment Options</a>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Returns</a>
          <a href="#" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">Privacy Policies</a>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-gray-400 font-semibold mb-2">Newsletter</h4>
          <div className="flex gap-3">
            <input 
              type="email" 
              placeholder="Enter Your Email Address" 
              className="border-b border-gray-300 py-1 outline-none text-sm w-full focus:border-amber-600 transition-colors text-gray-800"
            />
            <button className="border-b-2 border-gray-900 py-1 font-bold text-sm hover:text-amber-600 hover:border-amber-600 transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-8 mt-4">
        <p className="text-gray-500 text-sm font-medium">2023 furniro. All rights reserved</p>
      </div>
    </footer>
  );
}
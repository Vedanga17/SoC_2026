import { comparisonData } from '../data/comparisonData';

export default function ComparisonTable() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-14">
      <div className="grid grid-cols-4 gap-8 mb-12 border-b border-gray-100 pb-10">
        <div className="flex flex-col justify-start pt-4">
          <h3 className="text-2xl font-semibold mb-4 leading-tight">Go to Product<br/>page for more<br/>Products</h3>
          <a href="#" className="text-gray-500 border-b-2 border-amber-600 w-fit pb-1 hover:text-amber-700 transition-colors font-medium">
            View More
          </a>
        </div>
        
        <div className="group cursor-pointer">
          <div className="bg-orange-50 h-52 mb-5 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
            <span className="text-amber-800/40 font-medium">Asgaard Sofa Image</span>
          </div>
          <h4 className="text-xl font-semibold text-gray-900">Asgaard Sofa</h4>
          <p className="font-medium text-gray-700 mb-2">Rs. 250,000.00</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">4.7</span>
            <span className="text-amber-500">★★★★<span className="text-gray-200">★</span></span>
            <span className="text-gray-400 border-l border-gray-300 pl-2">204 Reviews</span>
          </div>
        </div>

        <div className="group cursor-pointer">
          <div className="bg-orange-50 h-52 mb-5 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1">
             <span className="text-amber-800/40 font-medium">Outdoor Sofa Image</span>
          </div>
          <h4 className="text-xl font-semibold text-gray-900">Outdoor Sofa Set</h4>
          <p className="font-medium text-gray-700 mb-2">Rs. 224,000.00</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">4.2</span>
            <span className="text-amber-500">★★★★<span className="text-gray-200">★</span></span>
            <span className="text-gray-400 border-l border-gray-300 pl-2">145 Reviews</span>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add A Product</h3>
          <select className="w-full bg-amber-600 text-white p-4 rounded-xl font-medium outline-none cursor-pointer shadow-sm hover:bg-amber-700 transition-colors appearance-none">
            <option>Choose a Product</option>
          </select>
        </div>
      </div>

      {/* Comparison Rows */}
      {Object.entries(comparisonData).map(([section, rows]) => (
        <div key={section} className="mb-14">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900">{section}</h3>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-4 grid grid-cols-4 gap-8 border-b border-gray-100 pb-8 relative">
              <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-gray-100"></div>
              <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gray-100"></div>
              <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-gray-100"></div>

              <div className="flex flex-col gap-8 pr-8">
                {rows.map((row, i) => <p key={i} className="text-gray-900 font-medium">{row.label}</p>)}
              </div>
              <div className="flex flex-col gap-8 px-8">
                {rows.map((row, i) => <p key={i} className="text-gray-600">{row.p1}</p>)}
              </div>
              <div className="flex flex-col gap-8 px-8">
                {rows.map((row, i) => <p key={i} className="text-gray-600">{row.p2}</p>)}
              </div>
              <div className="px-8"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Add To Cart Buttons */}
      <div className="grid grid-cols-4 gap-8 pt-6">
        <div></div>
        <div className="px-8">
          <button className="bg-amber-600 text-white px-8 py-3.5 rounded-full font-medium w-full shadow-md hover:bg-amber-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Add To Cart
          </button>
        </div>
        <div className="px-8">
          <button className="bg-amber-600 text-white px-8 py-3.5 rounded-full font-medium w-full shadow-md hover:bg-amber-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Add To Cart
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
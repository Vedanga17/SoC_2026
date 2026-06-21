import { Search, Heart, ShoppingCart, UserCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-12 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-600 rounded-md shadow-sm"></div>
        <h1 className="text-2xl font-bold font-serif tracking-wide">Furniro</h1>
      </div>
      <nav className="flex gap-10 font-medium text-gray-700">
        <a href="#" className="hover:text-amber-600 transition-colors">Home</a>
        <a href="#" className="hover:text-amber-600 transition-colors">Shop</a>
        <a href="#" className="hover:text-amber-600 transition-colors">About</a>
        <a href="#" className="hover:text-amber-600 transition-colors">Contact</a>
      </nav>
      <div className="flex gap-6 text-gray-800">
        <UserCheck className="w-5 h-5 cursor-pointer hover:text-amber-600 transition-colors" />
        <Search className="w-5 h-5 cursor-pointer hover:text-amber-600 transition-colors" />
        <Heart className="w-5 h-5 cursor-pointer hover:text-amber-600 transition-colors" />
        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-amber-600 transition-colors" />
      </div>
    </header>
  );
}
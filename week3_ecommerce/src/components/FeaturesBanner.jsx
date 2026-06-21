import { Trophy, ShieldCheck, Truck, HeadphonesIcon } from 'lucide-react';

export default function FeaturesBanner() {
  const features = [
    { icon: <Trophy className="w-7 h-7 text-amber-700" />, title: "High Quality", desc: "Crafted from top materials" },
    { icon: <ShieldCheck className="w-7 h-7 text-amber-700" />, title: "Warranty Protection", desc: "Over 2 years" },
    { icon: <Truck className="w-7 h-7 text-amber-700" />, title: "Free Shipping", desc: "Orders over $150" },
    { icon: <HeadphonesIcon className="w-7 h-7 text-amber-700" />, title: "24 / 7 Support", desc: "Dedicated support" },
  ];

  return (
    <div className="bg-orange-50/70 border-y border-orange-100 py-16 px-12 flex justify-between items-center mt-16">
      {features.map((item, idx) => (
        <div key={idx} className="flex items-center gap-5">
          <div className="bg-white p-4 rounded-full shadow-sm">
            {item.icon}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-0.5">{item.title}</h4>
            <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
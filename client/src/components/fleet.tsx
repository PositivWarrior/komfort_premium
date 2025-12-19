import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import interiorImg from "@assets/generated_images/luxury_van_interior_vip.png";
import chauffeurImg from "@assets/generated_images/chauffeur_opening_car_door.png";
import sedanImg from "@assets/generated_images/luxury_black_sedan_at_airport_twilight.png";
import vClassExterior from "@assets/generated_images/mercedes_v-class_exterior_black.png";
import sClassInterior from "@assets/generated_images/mercedes_s-class_luxury_interior.png";
import weddingDetail from "@assets/generated_images/wedding_car_detail.png";

export default function Fleet() {
  const { t } = useLanguage();

  const cars = [
    {
      name: "Mercedes-Benz S-Class",
      image: sedanImg,
      ...t.fleet.cars.sClass,
      features: ["Heated/Cooled Seats", "Massage Function", "Burmester Sound", "Free Wi-Fi"]
    },
    {
      name: "S-Class Interior",
      image: sClassInterior,
      ...t.fleet.cars.sClassInterior,
      features: ["Reclining Seats", "Ambient Lighting", "Privacy Shades", "Tablets"]
    },
    {
      name: "Mercedes-Benz V-Class",
      image: vClassExterior,
      ...t.fleet.cars.vClass,
      features: ["Conference Seating", "Privacy Glass", "Extra Luggage Space", "Table Setup"]
    },
    {
      name: "V-Class Interior",
      image: interiorImg,
      ...t.fleet.cars.vClassInterior,
      features: ["Leather Seats", "Climate Control", "USB Ports", "Drinks Cooler"]
    },
    {
      name: "Event Transport",
      image: weddingDetail,
      ...t.fleet.cars.event,
      features: ["Decorative Ribbons", "Champagne Service", "White Glove Driver", "Red Carpet"]
    },
    {
      name: "Mercedes-Benz E-Class",
      image: chauffeurImg, 
      ...t.fleet.cars.eClass,
      features: ["Leather Interior", "Climate Control", "Phone Charging", "Bottled Water"]
    }
  ];

  return (
    <section id="fleet" className="py-24 bg-zinc-900/50">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.fleet.header.eyebrow}</h2>
            <h3 className="text-4xl font-serif text-white font-medium">{t.fleet.header.title}</h3>
          </div>
          <p className="text-muted-foreground max-w-md text-right md:text-left">
            {t.fleet.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-sm bg-black"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 flex flex-col justify-end">
                <span className="text-primary text-xs font-bold tracking-wider uppercase mb-2">{car.category}</span>
                <h4 className="text-2xl font-serif text-white mb-2">{car.name}</h4>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {car.description}
                </p>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  {car.features.slice(0, 2).map((f, i) => (
                    <span key={i} className="text-[10px] border border-white/20 px-2 py-1 text-white/80">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

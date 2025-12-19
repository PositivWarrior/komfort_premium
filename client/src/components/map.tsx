import mapImg from "@assets/generated_images/dark_mode_stylized_map_of_poznan.png";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Map() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[500px] w-full bg-black overflow-hidden flex items-center justify-center group">
      {/* Background Map Image */}
      <img 
        src={mapImg} 
        alt="Map of Poznan" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      {/* Center Marker Card */}
      <div className="relative z-10 bg-black/80 backdrop-blur-md border border-primary/30 p-8 max-w-sm text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          <MapPin className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">{t.map.title}</h3>
        <p className="text-muted-foreground mb-4">
          {t.map.description}
        </p>
        <div className="text-xs text-primary uppercase tracking-widest font-bold">
          {t.map.availability}
        </div>
      </div>
    </section>
  );
}

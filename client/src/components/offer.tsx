import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import corporateImg from "@assets/generated_images/corporate_fleet_line_up.png";
import conciergeImg from "@assets/generated_images/concierge_service_champagne.png";
import weddingImg from "@assets/generated_images/wedding_car_detail.png";

export default function Offer() {
  const { t } = useLanguage();

  const offers = [
    {
      image: corporateImg,
      ...t.offer.cards.corporate
    },
    {
      image: weddingImg,
      ...t.offer.cards.events
    },
    {
      image: conciergeImg,
      ...t.offer.cards.concierge
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24">
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.offer.header.eyebrow}</h2>
            <h3 className="text-4xl font-serif text-white font-medium mb-8">{t.offer.header.title}</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t.offer.header.description}
            </p>
          </div>

          <div className="grid gap-8">
            {offers.map((offer, index) => (
              <div key={index} className="group relative bg-zinc-900/50 border border-white/5 rounded-sm hover:border-primary/30 transition-colors overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                </div>
                
                <div className="relative z-10 p-8">
                  <h4 className="text-2xl font-serif text-white mb-6 group-hover:text-primary transition-colors">{offer.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {offer.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

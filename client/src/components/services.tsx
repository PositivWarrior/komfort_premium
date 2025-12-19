import { Plane, Briefcase, Star, Clock, Shield, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import airportImg from "@assets/generated_images/private_jet_transfer_luxury_car.png";
import businessImg from "@assets/generated_images/business_meeting_executive_transport.png";
import vipImg from "@assets/generated_images/concierge_service_champagne.png";
import highwayImg from "@assets/generated_images/intercity_highway_travel_luxury.png";
import weddingImg from "@assets/generated_images/wedding_couple_entering_luxury_car.png";
import fleetImg from "@assets/generated_images/corporate_fleet_line_up.png";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Plane,
      image: airportImg,
      ...t.services.cards.airport
    },
    {
      icon: Briefcase,
      image: businessImg,
      ...t.services.cards.business
    },
    {
      icon: Star,
      image: vipImg,
      ...t.services.cards.vip
    },
    {
      icon: Clock,
      image: fleetImg,
      ...t.services.cards.hourly
    },
    {
      icon: Shield,
      image: weddingImg,
      ...t.services.cards.event
    },
    {
      icon: MapPin,
      image: highwayImg,
      ...t.services.cards.intercity
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.services.header.eyebrow}</h2>
          <h3 className="text-4xl font-serif text-white font-medium">{t.services.header.title}</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card/50 border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-black" />
                </div>
              </div>
              <CardHeader className="pt-6">
                <CardTitle className="text-xl text-white font-serif">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

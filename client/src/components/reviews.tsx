import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Reviews() {
  const { t } = useLanguage();

  const reviews = [
    {
      name: "James Wilson",
      rating: 5,
      ...t.reviews.items[0]
    },
    {
      name: "Anna Kowalska",
      rating: 5,
      ...t.reviews.items[1]
    },
    {
      name: "Robert Schmidt",
      rating: 5,
      ...t.reviews.items[2]
    },
    {
      name: "Sarah Jenkins",
      rating: 5,
      ...t.reviews.items[3]
    }
  ];

  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.reviews.header.eyebrow}</h2>
          <h3 className="text-4xl font-serif text-white font-medium">{t.reviews.header.title}</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="bg-black border-white/10 h-full min-h-[250px] relative group hover:border-primary/30 transition-colors">
                    <CardContent className="flex flex-col p-8 h-full">
                      <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
                      <p className="text-muted-foreground mb-6 flex-grow italic">"{review.text}"</p>
                      
                      <div className="mt-auto">
                        <div className="flex mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                          ))}
                        </div>
                        <h4 className="text-white font-serif font-bold">{review.name}</h4>
                        <p className="text-xs text-white/50 uppercase tracking-wider">{review.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-black border-white/10 text-white hover:bg-primary hover:text-black" />
          <CarouselNext className="hidden md:flex bg-black border-white/10 text-white hover:bg-primary hover:text-black" />
        </Carousel>
      </div>
    </section>
  );
}

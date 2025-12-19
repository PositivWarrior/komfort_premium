import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/language-context";

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.faq.header.eyebrow}</h2>
          <h3 className="text-4xl font-serif text-white font-medium">{t.faq.header.title}</h3>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {t.faq.items.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-white hover:text-primary text-lg font-serif">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

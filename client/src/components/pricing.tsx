import { useLanguage } from "@/lib/language-context";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.pricing.header.eyebrow}</h2>
          <h3 className="text-4xl font-serif text-white font-medium">{t.pricing.header.title}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            {t.pricing.header.description}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-8" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            {t.pricing.locations.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center justify-between p-6 bg-zinc-900/50 border border-white/5 rounded-lg hover:border-primary/50 hover:bg-zinc-900 transition-all cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-white group-hover:text-primary transition-colors">{item.city}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Check className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Mercedes V-Class</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-2">
                    <span className="text-2xl font-bold text-white">{item.price}</span>
                    <span className="text-sm text-primary font-medium">{t.pricing.currency.split(' ')[0]}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t.pricing.currency.split(' ')[1]}
                    {item.toll && ` • ${t.pricing.disclaimer.replace('* ', '')}`}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

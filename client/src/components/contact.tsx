import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Loader2 } from "lucide-react";
import contactBg from "@assets/generated_images/abstract_gold_night_city_bokeh.png";

export default function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }
      
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 flex items-center">
      <div className="absolute inset-0 z-0">
         <img src={contactBg} alt="Background" className="w-full h-full object-cover opacity-20" />
         <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">{t.contact.header.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white font-medium mb-6">{t.contact.header.title}</h3>
            <p className="text-lg text-muted-foreground mb-8">
              {t.contact.header.description}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xl">📞</span>
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg">Phone</h4>
                  <p className="text-muted-foreground">+48 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xl">✉️</span>
                </div>
                <div>
                  <h4 className="text-white font-serif text-lg">Email</h4>
                  <p className="text-muted-foreground">booking@komfortpremium.pl</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-black/50 border-primary/20 p-8 backdrop-blur-md">
            {submitted ? (
              <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-2" data-testid="success-message">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-3xl">✓</span>
                </div>
                <h4 className="text-white font-serif text-2xl mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">{t.contact.form.name}</label>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-white/5 border-white/10 text-white focus:border-primary/50" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">{t.contact.form.phone}</label>
                    <Input 
                      placeholder="+48..." 
                      className="bg-white/5 border-white/10 text-white focus:border-primary/50" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-contact-phone"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t.contact.form.email}</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white/5 border-white/10 text-white focus:border-primary/50" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-contact-email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/80">{t.contact.form.message}</label>
                  <Textarea 
                    placeholder="" 
                    className="bg-white/5 border-white/10 text-white min-h-[120px] focus:border-primary/50" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    data-testid="input-contact-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-black hover:bg-primary/90 py-6 text-lg" 
                  disabled={loading}
                  data-testid="button-contact-submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    t.contact.form.submit
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

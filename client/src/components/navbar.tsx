import { Link } from "wouter";
import { Phone, Menu, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/language-context";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-primary/20" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-white tracking-wider cursor-pointer">
          KOMFORT <span className="text-primary">PREMIUM</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer">{t.navbar.services}</a>
          <a href="#fleet" className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer">{t.navbar.fleet}</a>
          <a href="#pricing" className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer">{t.navbar.pricing}</a>
          <a href="#contact" className="text-sm font-medium text-white/80 hover:text-primary transition-colors cursor-pointer">{t.navbar.contact}</a>
          
          <Button 
            variant="ghost" 
            className="text-white hover:text-primary font-medium"
            onClick={toggleLanguage}
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'en' ? 'PL' : 'EN'}
          </Button>

          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black transition-all">
            <Phone className="w-4 h-4 mr-2" />
            +48 123 456 789
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:text-primary font-medium"
            onClick={toggleLanguage}
          >
            {language === 'en' ? 'PL' : 'EN'}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/95 border-primary/20 text-white">
              <div className="flex flex-col gap-8 mt-10 items-center">
                <a href="#services" className="text-xl font-serif hover:text-primary">{t.navbar.services}</a>
                <a href="#fleet" className="text-xl font-serif hover:text-primary">{t.navbar.fleet}</a>
                <a href="#pricing" className="text-xl font-serif hover:text-primary">{t.navbar.pricing}</a>
                <a href="#contact" className="text-xl font-serif hover:text-primary">{t.navbar.contact}</a>
                <Button className="w-full bg-primary text-black hover:bg-primary/90">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.navbar.callNow}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Offer from "@/components/offer";
import Pricing from "@/components/pricing";
import Booking from "@/components/booking";
import Fleet from "@/components/fleet";
import Reviews from "@/components/reviews";
import Map from "@/components/map";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Offer />
      <Services />
      <Pricing />
      <Booking />
      <Fleet />
      <Reviews />
      <Map />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

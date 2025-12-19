import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-serif text-white font-bold tracking-wider mb-2">
              KOMFORT <span className="text-primary">PREMIUM</span>
            </h2>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-8">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-white/60 hover:text-primary transition-colors cursor-pointer">{t.footer.privacy}</button>
              </DialogTrigger>
              <DialogContent className="max-w-md md:max-w-2xl bg-zinc-900 border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif mb-4">Privacy Policy</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4 text-muted-foreground">
                    <p><strong>Last Updated: December 2025</strong></p>
                    <p>At Komfort Premium, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
                    
                    <h3 className="text-white font-bold mt-4">1. Information We Collect</h3>
                    <p>We collect information necessary to provide our luxury transport services, including:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Contact details (Name, Email, Phone Number)</li>
                      <li>Booking details (Pickup/Drop-off locations, Flight numbers)</li>
                      <li>Payment information (processed securely via third-party providers)</li>
                    </ul>

                    <h3 className="text-white font-bold mt-4">2. How We Use Your Information</h3>
                    <p>Your data is used solely for:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Processing and confirming your bookings</li>
                      <li>Communicating with you regarding your service</li>
                      <li>Improving our customer service standards</li>
                      <li>Legal compliance and safety requirements</li>
                    </ul>

                    <h3 className="text-white font-bold mt-4">3. Data Protection</h3>
                    <p>We implement strict security measures to protect your personal data from unauthorized access, alteration, or disclosure. We do not sell your data to third parties.</p>

                    <h3 className="text-white font-bold mt-4">4. Contact Us</h3>
                    <p>If you have any questions about this policy, please contact us at booking@komfortpremium.pl.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-white/60 hover:text-primary transition-colors cursor-pointer">{t.footer.terms}</button>
              </DialogTrigger>
              <DialogContent className="max-w-md md:max-w-2xl bg-zinc-900 border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif mb-4">Terms & Conditions</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4 text-muted-foreground">
                    <p><strong>Effective Date: December 2025</strong></p>
                    <p>Welcome to Komfort Premium. By booking our services, you agree to the following terms and conditions.</p>
                    
                    <h3 className="text-white font-bold mt-4">1. Booking & Cancellations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Bookings must be made at least 24 hours in advance for guaranteed availability.</li>
                      <li>Cancellations made less than 12 hours before the scheduled pickup time may incur a 50% cancellation fee.</li>
                      <li>No-shows will be charged the full amount of the booking.</li>
                    </ul>

                    <h3 className="text-white font-bold mt-4">2. Passenger Conduct</h3>
                    <p>We reserve the right to refuse service to any passenger who is intoxicated, abusive, or poses a threat to the safety of our chauffeurs or vehicle. Smoking is strictly prohibited in all vehicles.</p>

                    <h3 className="text-white font-bold mt-4">3. Luggage & Belongings</h3>
                    <p>Passengers are responsible for their personal belongings. Komfort Premium is not liable for lost or damaged items left in the vehicle, though we will make every reasonable effort to return found items.</p>

                    <h3 className="text-white font-bold mt-4">4. Flight Delays</h3>
                    <p>For airport transfers, we monitor flight statuses. The first 60 minutes of waiting time after the flight lands is complimentary. Additional waiting time may be charged at our standard hourly rate.</p>

                    <h3 className="text-white font-bold mt-4">5. Liability</h3>
                    <p>Komfort Premium is not liable for delays caused by circumstances beyond our control, such as severe weather, road accidents, or unforeseen traffic closures.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Facebook</a>
            <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/25">
            Developed by{" "}
            <a 
              href="https://kacpermargol.eu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              Kacper Margol
            </a>
            <span className="mx-2">·</span>
            <a 
              href="https://www.linkedin.com/in/kacper-margol-545493195/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              LinkedIn
            </a>
            <span className="mx-2">·</span>
            <a 
              href="https://github.com/PositivWarrior" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

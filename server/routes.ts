import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingRequestSchema, insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Google Maps API Key (set via environment variable)
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";

// Base pricing from Poznań (matching website prices)
// Price includes: professional chauffeur, Mercedes V-Class, highway tolls
const PRICE_PER_KM = 4.5; // PLN per km for unknown routes
const BASE_FEE = 150; // Base fee for any trip

// Known route prices (distance in km from Poznań, fixed price in PLN)
// These match the official website pricing
const knownRoutes: Record<string, { distance: number; price: number; aliases: string[] }> = {
  // ===== OFFICIAL WEBSITE PRICES =====
  warsaw: { distance: 310, price: 1890, aliases: ['warszawa', 'varsovia'] },
  berlin: { distance: 270, price: 1490, aliases: ['berlín', 'berlim'] },
  gdansk: { distance: 310, price: 1890, aliases: ['gdańsk', 'danzig'] },
  wroclaw: { distance: 180, price: 1200, aliases: ['wrocław', 'breslau'] },
  krakow: { distance: 460, price: 2690, aliases: ['kraków', 'cracow', 'krakau'] },
  
  // ===== POLAND - Major Cities (calculated from Poznań) =====
  lodz: { distance: 210, price: 1290, aliases: ['łódź'] },
  szczecin: { distance: 260, price: 1490, aliases: [] },
  bydgoszcz: { distance: 130, price: 790, aliases: [] },
  lublin: { distance: 450, price: 2590, aliases: [] },
  bialystok: { distance: 470, price: 2690, aliases: ['białystok'] },
  katowice: { distance: 350, price: 1990, aliases: [] },
  gdynia: { distance: 320, price: 1890, aliases: [] },
  czestochowa: { distance: 280, price: 1590, aliases: ['częstochowa'] },
  radom: { distance: 340, price: 1890, aliases: [] },
  torun: { distance: 150, price: 890, aliases: ['toruń', 'thorn'] },
  rzeszow: { distance: 520, price: 2990, aliases: ['rzeszów'] },
  kielce: { distance: 380, price: 2190, aliases: [] },
  olsztyn: { distance: 290, price: 1690, aliases: [] },
  opole: { distance: 230, price: 1390, aliases: [] },
  gorzow: { distance: 140, price: 850, aliases: ['gorzów'] },
  zielona: { distance: 160, price: 950, aliases: [] },
  koszalin: { distance: 250, price: 1490, aliases: [] },
  kalisz: { distance: 110, price: 690, aliases: [] },
  legnica: { distance: 170, price: 990, aliases: [] },
  pila: { distance: 90, price: 590, aliases: ['piła'] },
  konin: { distance: 100, price: 650, aliases: [] },
  leszno: { distance: 70, price: 490, aliases: [] },
  gniezno: { distance: 50, price: 390, aliases: [] },
  wrzesnia: { distance: 45, price: 350, aliases: ['września'] },
  swarzedz: { distance: 12, price: 190, aliases: ['swarzędz'] },
  lubon: { distance: 8, price: 150, aliases: ['luboń'] },
  
  // Polish airports
  lawica: { distance: 7, price: 120, aliases: ['ławica', 'poz'] },
  okecie: { distance: 310, price: 1890, aliases: ['okęcie', 'chopin', 'waw'] },
  modlin: { distance: 280, price: 1690, aliases: [] },
  balice: { distance: 460, price: 2690, aliases: ['krk'] },
  
  // ===== GERMANY =====
  hamburg: { distance: 460, price: 2490, aliases: [] },
  munich: { distance: 680, price: 3690, aliases: ['münchen', 'munchen', 'monachium'] },
  frankfurt: { distance: 540, price: 2990, aliases: [] },
  cologne: { distance: 580, price: 3190, aliases: ['köln', 'koln', 'kolonia'] },
  dresden: { distance: 280, price: 1590, aliases: ['drezno'] },
  leipzig: { distance: 240, price: 1390, aliases: ['lipsk'] },
  hanover: { distance: 320, price: 1790, aliases: ['hannover'] },
  dortmund: { distance: 470, price: 2590, aliases: [] },
  dusseldorf: { distance: 530, price: 2890, aliases: ['düsseldorf'] },
  stuttgart: { distance: 650, price: 3490, aliases: [] },
  nuremberg: { distance: 500, price: 2790, aliases: ['nürnberg', 'nurnberg', 'norymberga'] },
  bremen: { distance: 390, price: 2190, aliases: ['brema'] },
  rostock: { distance: 350, price: 1990, aliases: [] },
  
  // ===== CZECH REPUBLIC =====
  prague: { distance: 350, price: 1990, aliases: ['praha', 'praga', 'prag'] },
  brno: { distance: 400, price: 2290, aliases: [] },
  ostrava: { distance: 380, price: 2190, aliases: [] },
  
  // ===== SLOVAKIA =====
  bratislava: { distance: 520, price: 2890, aliases: [] },
  kosice: { distance: 580, price: 3190, aliases: ['košice'] },
  
  // ===== AUSTRIA =====
  vienna: { distance: 560, price: 3090, aliases: ['wien', 'wiedeń', 'wieden'] },
  salzburg: { distance: 620, price: 3390, aliases: [] },
  graz: { distance: 680, price: 3690, aliases: [] },
  
  // ===== LITHUANIA =====
  vilnius: { distance: 680, price: 3690, aliases: ['wilno'] },
  kaunas: { distance: 620, price: 3390, aliases: ['kowno'] },
  
  // ===== UKRAINE =====
  lviv: { distance: 650, price: 3490, aliases: ['lwów', 'lwow'] },
  kyiv: { distance: 1100, price: 5490, aliases: ['kiev', 'kijów', 'kijow'] },
  
  // ===== BELARUS =====
  minsk: { distance: 750, price: 3990, aliases: ['mińsk'] },
  brest: { distance: 480, price: 2690, aliases: ['brześć', 'brzesc'] },
  
  // ===== HUNGARY =====
  budapest: { distance: 680, price: 3690, aliases: ['budapeszt'] },
  
  // ===== NETHERLANDS =====
  amsterdam: { distance: 680, price: 3690, aliases: [] },
  rotterdam: { distance: 710, price: 3790, aliases: [] },
  
  // ===== BELGIUM =====
  brussels: { distance: 740, price: 3990, aliases: ['bruksela', 'bruxelles'] },
  
  // ===== DENMARK =====
  copenhagen: { distance: 560, price: 3090, aliases: ['kopenhaga', 'københavn'] },
  
  // ===== SWEDEN =====
  stockholm: { distance: 1100, price: 5490, aliases: ['sztokholm'] },
  malmo: { distance: 580, price: 3190, aliases: ['malmö'] },
  
  // ===== FRANCE =====
  paris: { distance: 1050, price: 5290, aliases: ['paryż', 'paryz'] },
  strasbourg: { distance: 620, price: 3390, aliases: ['strasburg'] },
  
  // ===== SWITZERLAND =====
  zurich: { distance: 820, price: 4390, aliases: ['zürich', 'zurych'] },
  
  // ===== ITALY =====
  milan: { distance: 1050, price: 5290, aliases: ['milano', 'mediolan'] },
  rome: { distance: 1450, price: 6990, aliases: ['roma', 'rzym'] },
  venice: { distance: 900, price: 4790, aliases: ['venezia', 'wenecja'] },
};

// Helper to normalize city names for matching
function normalizeCity(city: string): string {
  return city.toLowerCase().trim()
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ą/g, 'a')
    .replace(/ę/g, 'e')
    .replace(/ś/g, 's')
    .replace(/ć/g, 'c')
    .replace(/ó/g, 'o')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ä/g, 'a')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a');
}

// Find matching route
function findRoute(destination: string): { key: string; route: typeof knownRoutes[string] } | null {
  const normalized = normalizeCity(destination);
  
  for (const [key, route] of Object.entries(knownRoutes)) {
    // Check main key
    if (normalized.includes(key)) {
      return { key, route };
    }
    // Check aliases
    for (const alias of route.aliases) {
      if (normalized.includes(normalizeCity(alias))) {
        return { key, route };
      }
    }
  }
  return null;
}

// Estimate distance based on city coordinates (rough haversine)
const cityCoords: Record<string, [number, number]> = {
  poznan: [52.4064, 16.9252],
  // Add major reference points for distance calculation
  warsaw: [52.2297, 21.0122],
  berlin: [52.52, 13.405],
  prague: [50.0755, 14.4378],
  vienna: [48.2082, 16.3738],
};

function estimateDistance(from: string, to: string): number {
  // Default estimate based on string analysis
  const normalized = normalizeCity(to);
  
  // Rough estimates based on country detection
  if (normalized.includes('poland') || /[łżźćńąęó]/.test(to.toLowerCase())) {
    return 250; // Average Polish city
  }
  if (normalized.includes('germany') || normalized.includes('deutschland')) {
    return 450;
  }
  if (normalized.includes('czech') || normalized.includes('cesk')) {
    return 400;
  }
  if (normalized.includes('austria') || normalized.includes('österreich')) {
    return 600;
  }
  if (normalized.includes('france') || normalized.includes('frankreich')) {
    return 1000;
  }
  if (normalized.includes('italy') || normalized.includes('italia')) {
    return 1200;
  }
  if (normalized.includes('spain') || normalized.includes('espana')) {
    return 2000;
  }
  if (normalized.includes('uk') || normalized.includes('england') || normalized.includes('london')) {
    return 1400;
  }
  
  // Default for unknown
  return 350;
}

// Calculate price based on destination
function calculatePrice(from: string, to: string, passengers: number): { 
  min: number; 
  max: number; 
  route?: string;
  distance?: number;
  isEstimate: boolean;
} {
  // Try to find known route
  const found = findRoute(to);
  
  if (found) {
    const { key, route } = found;
    // Fixed prices have small variance (±5%)
    const variance = Math.round(route.price * 0.05);
    return { 
      min: route.price - variance, 
      max: route.price + variance,
      route: key,
      distance: route.distance,
      isEstimate: false
    };
  }
  
  // Calculate estimate for unknown routes
  const estimatedDistance = estimateDistance(from, to);
  const basePrice = BASE_FEE + (estimatedDistance * PRICE_PER_KM);
  
  // Round to nearest 50 PLN
  const roundedPrice = Math.round(basePrice / 50) * 50;
  
  // 15% variance for estimates
  const variance = Math.round(roundedPrice * 0.15);
  
  return {
    min: roundedPrice - variance,
    max: roundedPrice + variance,
    distance: estimatedDistance,
    isEstimate: true
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Calculate booking estimate
  app.post("/api/booking/estimate", async (req, res) => {
    try {
      const validation = insertBookingRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromZodError(validation.error).toString() 
        });
      }
      
      const data = validation.data;
      const { from, to, passengers } = data;
      
      // Calculate price
      const priceResult = calculatePrice(from, to, passengers);
      const estimatedPrice = `${priceResult.min} - ${priceResult.max}`;
      
      // Store the booking request
      const bookingRequest = await storage.createBookingRequest({
        ...data,
        estimatedPrice
      });
      
      res.json({
        id: bookingRequest.id,
        estimatedPrice,
        priceRange: {
          min: priceResult.min,
          max: priceResult.max
        },
        route: priceResult.route,
        distance: priceResult.distance,
        isEstimate: priceResult.isEstimate
      });
      
    } catch (error) {
      console.error("Booking estimate error:", error);
      res.status(500).json({ error: "Failed to calculate estimate" });
    }
  });
  
  // Get route from Google Maps Directions API
  app.get("/api/directions", async (req, res) => {
    try {
      const { origin, destination } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
      }
      
      if (!GOOGLE_MAPS_API_KEY) {
        return res.status(503).json({ 
          error: "Google Maps API key not configured",
          message: "Set GOOGLE_MAPS_API_KEY environment variable"
        });
      }
      
      const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
      url.searchParams.set("origin", origin as string);
      url.searchParams.set("destination", destination as string);
      url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
      url.searchParams.set("mode", "driving");
      
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (data.status !== "OK") {
        return res.status(400).json({ 
          error: "Could not find route",
          status: data.status,
          message: data.error_message
        });
      }
      
      const route = data.routes[0];
      const leg = route.legs[0];
      
      res.json({
        origin: {
          address: leg.start_address,
          lat: leg.start_location.lat,
          lng: leg.start_location.lng
        },
        destination: {
          address: leg.end_address,
          lat: leg.end_location.lat,
          lng: leg.end_location.lng
        },
        distance: {
          text: leg.distance.text,
          meters: leg.distance.value
        },
        duration: {
          text: leg.duration.text,
          seconds: leg.duration.value
        },
        polyline: route.overview_polyline.points,
        bounds: route.bounds
      });
      
    } catch (error) {
      console.error("Directions API error:", error);
      res.status(500).json({ error: "Failed to get directions" });
    }
  });
  
  // Geocode a location using Google Maps
  app.get("/api/geocode", async (req, res) => {
    try {
      const { address } = req.query;
      
      if (!address) {
        return res.status(400).json({ error: "Address is required" });
      }
      
      if (!GOOGLE_MAPS_API_KEY) {
        return res.status(503).json({ 
          error: "Google Maps API key not configured"
        });
      }
      
      const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
      url.searchParams.set("address", address as string);
      url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
      
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (data.status !== "OK" || !data.results.length) {
        return res.status(400).json({ 
          error: "Could not geocode address",
          status: data.status
        });
      }
      
      const result = data.results[0];
      
      res.json({
        address: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        placeId: result.place_id
      });
      
    } catch (error) {
      console.error("Geocoding error:", error);
      res.status(500).json({ error: "Failed to geocode address" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validation = insertContactMessageSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromZodError(validation.error).toString() 
        });
      }
      
      const message = await storage.createContactMessage(validation.data);
      
      res.json({
        id: message.id,
        success: true,
        message: "Contact form submitted successfully"
      });
      
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  return httpServer;
}

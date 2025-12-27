// Client-side pricing calculation for static hosting
// This mirrors the server-side logic for when API is not available

const PRICE_PER_KM = 4.5;
const BASE_FEE = 150;

// Known routes with fixed prices (from Poznań)
const knownRoutes: Record<string, { distance: number; price: number; aliases: string[] }> = {
  // Official website prices
  warsaw: { distance: 310, price: 1890, aliases: ['warszawa', 'varsovia'] },
  berlin: { distance: 270, price: 1490, aliases: ['berlín', 'berlim'] },
  gdansk: { distance: 310, price: 1890, aliases: ['gdańsk', 'danzig'] },
  wroclaw: { distance: 180, price: 1200, aliases: ['wrocław', 'breslau'] },
  krakow: { distance: 460, price: 2690, aliases: ['kraków', 'cracow', 'krakau'] },
  
  // Poland
  lodz: { distance: 210, price: 1290, aliases: ['łódź'] },
  szczecin: { distance: 260, price: 1490, aliases: [] },
  bydgoszcz: { distance: 130, price: 790, aliases: [] },
  lublin: { distance: 450, price: 2590, aliases: [] },
  bialystok: { distance: 470, price: 2690, aliases: ['białystok'] },
  katowice: { distance: 350, price: 1990, aliases: [] },
  gdynia: { distance: 320, price: 1890, aliases: [] },
  czestochowa: { distance: 280, price: 1590, aliases: ['częstochowa'] },
  torun: { distance: 150, price: 890, aliases: ['toruń'] },
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
  gniezno: { distance: 50, price: 390, aliases: [] },
  
  // Airports
  lawica: { distance: 7, price: 120, aliases: ['ławica', 'poz'] },
  okecie: { distance: 310, price: 1890, aliases: ['okęcie', 'chopin', 'waw'] },
  modlin: { distance: 280, price: 1690, aliases: [] },
  balice: { distance: 460, price: 2690, aliases: ['krk'] },
  
  // Germany
  hamburg: { distance: 460, price: 2490, aliases: [] },
  munich: { distance: 680, price: 3690, aliases: ['münchen', 'monachium'] },
  frankfurt: { distance: 540, price: 2990, aliases: [] },
  cologne: { distance: 580, price: 3190, aliases: ['köln', 'kolonia'] },
  dresden: { distance: 280, price: 1590, aliases: ['drezno'] },
  leipzig: { distance: 240, price: 1390, aliases: ['lipsk'] },
  hanover: { distance: 320, price: 1790, aliases: ['hannover'] },
  dortmund: { distance: 470, price: 2590, aliases: [] },
  stuttgart: { distance: 650, price: 3490, aliases: [] },
  nuremberg: { distance: 500, price: 2790, aliases: ['nürnberg', 'norymberga'] },
  bremen: { distance: 390, price: 2190, aliases: ['brema'] },
  
  // Czech Republic
  prague: { distance: 350, price: 1990, aliases: ['praha', 'praga'] },
  brno: { distance: 400, price: 2290, aliases: [] },
  
  // Austria
  vienna: { distance: 560, price: 3090, aliases: ['wien', 'wiedeń'] },
  salzburg: { distance: 620, price: 3390, aliases: [] },
  
  // Other countries
  bratislava: { distance: 520, price: 2890, aliases: [] },
  budapest: { distance: 680, price: 3690, aliases: ['budapeszt'] },
  amsterdam: { distance: 680, price: 3690, aliases: [] },
  copenhagen: { distance: 560, price: 3090, aliases: ['kopenhaga'] },
  paris: { distance: 1050, price: 5290, aliases: ['paryż'] },
  vilnius: { distance: 680, price: 3690, aliases: ['wilno'] },
  lviv: { distance: 650, price: 3490, aliases: ['lwów'] },
  minsk: { distance: 750, price: 3990, aliases: ['mińsk'] },
};

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
    .replace(/ä/g, 'a');
}

function findRoute(destination: string): { key: string; route: typeof knownRoutes[string] } | null {
  const normalized = normalizeCity(destination);
  
  for (const [key, route] of Object.entries(knownRoutes)) {
    if (normalized.includes(key)) {
      return { key, route };
    }
    for (const alias of route.aliases) {
      if (normalized.includes(normalizeCity(alias))) {
        return { key, route };
      }
    }
  }
  return null;
}

function estimateDistance(to: string): number {
  const normalized = normalizeCity(to);
  
  if (normalized.includes('poland') || /[łżźćńąęó]/.test(to.toLowerCase())) {
    return 250;
  }
  if (normalized.includes('germany') || normalized.includes('deutschland')) {
    return 450;
  }
  if (normalized.includes('czech')) {
    return 400;
  }
  if (normalized.includes('austria')) {
    return 600;
  }
  if (normalized.includes('france')) {
    return 1000;
  }
  if (normalized.includes('italy')) {
    return 1200;
  }
  
  return 350;
}

export function calculatePriceClient(destination: string): { 
  min: number; 
  max: number; 
  route?: string;
  distance?: number;
  isEstimate: boolean;
} {
  const found = findRoute(destination);
  
  if (found) {
    const { key, route } = found;
    const variance = Math.round(route.price * 0.05);
    return { 
      min: route.price - variance, 
      max: route.price + variance,
      route: key,
      distance: route.distance,
      isEstimate: false
    };
  }
  
  const estimatedDistance = estimateDistance(destination);
  const basePrice = BASE_FEE + (estimatedDistance * PRICE_PER_KM);
  const roundedPrice = Math.round(basePrice / 50) * 50;
  const variance = Math.round(roundedPrice * 0.15);
  
  return {
    min: roundedPrice - variance,
    max: roundedPrice + variance,
    distance: estimatedDistance,
    isEstimate: true
  };
}


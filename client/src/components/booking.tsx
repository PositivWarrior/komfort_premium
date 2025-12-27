import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/language-context';
import { calculatePriceClient } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import {
	Calendar as CalendarIcon,
	MapPin,
	Users,
	Clock,
	Loader2,
	Navigation,
	Car,
	Timer,
} from 'lucide-react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
	useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Gold marker for destination
const GoldIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	className: 'gold-marker',
});

// Decode Google Maps polyline
function decodePolyline(encoded: string): [number, number][] {
	const points: [number, number][] = [];
	let index = 0;
	let lat = 0;
	let lng = 0;

	while (index < encoded.length) {
		let shift = 0;
		let result = 0;
		let byte: number;

		do {
			byte = encoded.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		const dlat = result & 1 ? ~(result >> 1) : result >> 1;
		lat += dlat;

		shift = 0;
		result = 0;

		do {
			byte = encoded.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		const dlng = result & 1 ? ~(result >> 1) : result >> 1;
		lng += dlng;

		points.push([lat / 1e5, lng / 1e5]);
	}

	return points;
}

// Fallback city coordinates for when Google API is not available
const fallbackCoordinates: Record<string, [number, number]> = {
	// ===== POLAND - Major Cities =====
	poznań: [52.4064, 16.9252],
	poznan: [52.4064, 16.9252],
	warszawa: [52.2297, 21.0122],
	warsaw: [52.2297, 21.0122],
	kraków: [50.0647, 19.945],
	krakow: [50.0647, 19.945],
	cracow: [50.0647, 19.945],
	wrocław: [51.1079, 17.0385],
	wroclaw: [51.1079, 17.0385],
	gdańsk: [54.352, 18.6466],
	gdansk: [54.352, 18.6466],
	łódź: [51.7592, 19.456],
	lodz: [51.7592, 19.456],
	szczecin: [53.4285, 14.5528],
	bydgoszcz: [53.1235, 18.0084],
	lublin: [51.2465, 22.5684],
	białystok: [53.1325, 23.1688],
	bialystok: [53.1325, 23.1688],
	katowice: [50.2649, 19.0238],
	gdynia: [54.5189, 18.5305],
	częstochowa: [50.8118, 19.1203],
	czestochowa: [50.8118, 19.1203],
	radom: [51.4027, 21.1471],
	toruń: [53.0138, 18.5984],
	torun: [53.0138, 18.5984],
	sosnowiec: [50.2863, 19.1041],
	rzeszów: [50.0412, 21.9991],
	rzeszow: [50.0412, 21.9991],
	kielce: [50.8661, 20.6286],
	gliwice: [50.2945, 18.6714],
	zabrze: [50.3249, 18.7857],
	olsztyn: [53.7784, 20.4801],
	bielsko: [49.8224, 19.0444],
	bytom: [50.3484, 18.9156],
	zielona: [51.9356, 15.5062],
	rybnik: [50.1022, 18.5463],
	ruda: [50.2558, 18.8555],
	tychy: [50.1308, 18.9984],
	opole: [50.6751, 17.9213],
	gorzów: [52.7368, 15.2288],
	gorzow: [52.7368, 15.2288],
	elbląg: [54.1522, 19.4044],
	elblag: [54.1522, 19.4044],
	płock: [52.5463, 19.7065],
	plock: [52.5463, 19.7065],
	wałbrzych: [50.7714, 16.2843],
	walbrzych: [50.7714, 16.2843],
	włocławek: [52.6483, 19.0677],
	wloclawek: [52.6483, 19.0677],
	tarnów: [50.0121, 20.9858],
	tarnow: [50.0121, 20.9858],
	chorzów: [50.2974, 18.9545],
	chorzow: [50.2974, 18.9545],
	koszalin: [54.1943, 16.1714],
	kalisz: [51.7577, 18.0853],
	legnica: [51.207, 16.1619],
	grudziądz: [53.4837, 18.7536],
	grudziadz: [53.4837, 18.7536],
	jaworzno: [50.2056, 19.2749],
	słupsk: [54.4641, 17.0285],
	slupsk: [54.4641, 17.0285],
	jastrzębie: [49.9505, 18.5962],
	jastrzebie: [49.9505, 18.5962],
	nowy: [49.6249, 20.6889],
	jelenia: [50.9044, 15.7197],
	konin: [52.223, 18.2511],
	siedlce: [52.1676, 22.2902],
	piotrków: [51.4053, 19.7031],
	piotrkow: [51.4053, 19.7031],
	inowrocław: [52.7936, 18.2611],
	inowroclaw: [52.7936, 18.2611],
	lubin: [51.401, 16.2015],
	ostrów: [51.655, 17.8067],
	ostrow: [51.655, 17.8067],
	suwałki: [54.1116, 22.9308],
	suwalki: [54.1116, 22.9308],
	stargard: [53.3364, 15.0504],
	gniezno: [52.5348, 17.5826],
	sopot: [54.4418, 18.5601],
	zakopane: [49.2992, 19.9496],

	// ===== GERMANY =====
	berlin: [52.52, 13.405],
	hamburg: [53.5511, 9.9937],
	munich: [48.1351, 11.582],
	münchen: [48.1351, 11.582],
	munchen: [48.1351, 11.582],
	monachium: [48.1351, 11.582],
	cologne: [50.9375, 6.9603],
	köln: [50.9375, 6.9603],
	koln: [50.9375, 6.9603],
	kolonia: [50.9375, 6.9603],
	frankfurt: [50.1109, 8.6821],
	stuttgart: [48.7758, 9.1829],
	düsseldorf: [51.2277, 6.7735],
	dusseldorf: [51.2277, 6.7735],
	leipzig: [51.3397, 12.3731],
	lipsk: [51.3397, 12.3731],
	dresden: [51.0504, 13.7373],
	drezno: [51.0504, 13.7373],
	hanover: [52.3759, 9.732],
	hannover: [52.3759, 9.732],
	nuremberg: [49.4521, 11.0767],
	nürnberg: [49.4521, 11.0767],
	nurnberg: [49.4521, 11.0767],
	norymberga: [49.4521, 11.0767],
	bremen: [53.0793, 8.8017],
	brema: [53.0793, 8.8017],
	dortmund: [51.5136, 7.4653],
	essen: [51.4556, 7.0116],
	duisburg: [51.4344, 6.7623],
	bochum: [51.4818, 7.2162],
	wuppertal: [51.2562, 7.1508],
	bielefeld: [52.0302, 8.5325],
	bonn: [50.7374, 7.0982],
	mannheim: [49.4875, 8.466],
	karlsruhe: [49.0069, 8.4037],
	augsburg: [48.3705, 10.8978],
	wiesbaden: [50.0782, 8.2398],
	rostock: [54.0924, 12.0991],

	// ===== CZECH REPUBLIC =====
	prague: [50.0755, 14.4378],
	praha: [50.0755, 14.4378],
	praga: [50.0755, 14.4378],
	brno: [49.1951, 16.6068],
	ostrava: [49.8209, 18.2625],
	pilsen: [49.7384, 13.3736],
	plzeň: [49.7384, 13.3736],
	plzen: [49.7384, 13.3736],
	liberec: [50.7663, 15.0543],
	olomouc: [49.5938, 17.2509],
	hradec: [50.2104, 15.8252],
	české: [48.9745, 14.4743],
	ceske: [48.9745, 14.4743],
	pardubice: [50.0343, 15.7812],
	zlín: [49.2331, 17.667],
	zlin: [49.2331, 17.667],

	// ===== SLOVAKIA =====
	bratislava: [48.1486, 17.1077],
	košice: [48.7164, 21.2611],
	kosice: [48.7164, 21.2611],
	prešov: [48.9986, 21.2391],
	presov: [48.9986, 21.2391],
	žilina: [49.2231, 18.7394],
	zilina: [49.2231, 18.7394],
	nitra: [48.3069, 18.0864],
	banská: [48.736, 19.1461],
	banska: [48.736, 19.1461],
	trnava: [48.3774, 17.5883],
	trenčín: [48.8945, 18.0444],
	trencin: [48.8945, 18.0444],

	// ===== AUSTRIA =====
	vienna: [48.2082, 16.3738],
	wien: [48.2082, 16.3738],
	wiedeń: [48.2082, 16.3738],
	wieden: [48.2082, 16.3738],
	graz: [47.0707, 15.4395],
	linz: [48.3069, 14.2858],
	salzburg: [47.8095, 13.055],
	innsbruck: [47.2692, 11.4041],
	klagenfurt: [46.6249, 14.305],

	// ===== LITHUANIA =====
	vilnius: [54.6872, 25.2797],
	wilno: [54.6872, 25.2797],
	kaunas: [54.8985, 23.9036],
	kowno: [54.8985, 23.9036],
	klaipėda: [55.7033, 21.1443],
	klaipeda: [55.7033, 21.1443],
	kłajpeda: [55.7033, 21.1443],
	šiauliai: [55.9349, 23.3137],
	siauliai: [55.9349, 23.3137],
	panevėžys: [55.7348, 24.3575],
	panevezys: [55.7348, 24.3575],

	// ===== UKRAINE =====
	kyiv: [50.4501, 30.5234],
	kiev: [50.4501, 30.5234],
	kijów: [50.4501, 30.5234],
	kijow: [50.4501, 30.5234],
	lviv: [49.8397, 24.0297],
	lwów: [49.8397, 24.0297],
	lwow: [49.8397, 24.0297],
	kharkiv: [49.9935, 36.2304],
	charków: [49.9935, 36.2304],
	charkow: [49.9935, 36.2304],
	odesa: [46.4825, 30.7233],
	odessa: [46.4825, 30.7233],
	dnipro: [48.4647, 35.0462],
	zaporizhzhia: [47.8388, 35.1396],
	kropyvnytskyi: [48.5079, 32.2623],

	// ===== BELARUS =====
	minsk: [53.9006, 27.559],
	mińsk: [53.9006, 27.559],
	gomel: [52.4345, 30.9754],
	homel: [52.4345, 30.9754],
	mogilev: [53.9168, 30.3449],
	vitebsk: [55.1904, 30.2049],
	grodno: [53.6884, 23.8258],
	brest: [52.0976, 23.6877],
	brześć: [52.0976, 23.6877],
	brzesc: [52.0976, 23.6877],

	// ===== HUNGARY =====
	budapest: [47.4979, 19.0402],
	budapeszt: [47.4979, 19.0402],
	debrecen: [47.5316, 21.6273],
	szeged: [46.253, 20.1414],
	miskolc: [48.1035, 20.7784],
	pécs: [46.0727, 18.2323],
	pecs: [46.0727, 18.2323],
	győr: [47.6875, 17.6504],
	gyor: [47.6875, 17.6504],

	// ===== NETHERLANDS =====
	amsterdam: [52.3676, 4.9041],
	rotterdam: [51.9244, 4.4777],
	hague: [52.0705, 4.3007],
	haga: [52.0705, 4.3007],
	utrecht: [52.0907, 5.1214],
	eindhoven: [51.4416, 5.4697],

	// ===== BELGIUM =====
	brussels: [50.8503, 4.3517],
	bruksela: [50.8503, 4.3517],
	antwerp: [51.2194, 4.4025],
	antwerpia: [51.2194, 4.4025],
	ghent: [51.0543, 3.7174],
	gandawa: [51.0543, 3.7174],
	bruges: [51.2093, 3.2247],
	brugia: [51.2093, 3.2247],
	liège: [50.6326, 5.5797],
	liege: [50.6326, 5.5797],

	// ===== DENMARK =====
	copenhagen: [55.6761, 12.5683],
	kopenhaga: [55.6761, 12.5683],
	aarhus: [56.1629, 10.2039],
	odense: [55.4038, 10.4024],

	// ===== SWEDEN =====
	stockholm: [59.3293, 18.0686],
	sztokholm: [59.3293, 18.0686],
	gothenburg: [57.7089, 11.9746],
	göteborg: [57.7089, 11.9746],
	goteborg: [57.7089, 11.9746],
	malmö: [55.605, 13.0038],
	malmo: [55.605, 13.0038],

	// ===== FRANCE =====
	paris: [48.8566, 2.3522],
	paryż: [48.8566, 2.3522],
	paryz: [48.8566, 2.3522],
	marseille: [43.2965, 5.3698],
	marsylia: [43.2965, 5.3698],
	lyon: [45.764, 4.8357],
	strasbourg: [48.5734, 7.7521],
	strasburg: [48.5734, 7.7521],

	// ===== SWITZERLAND =====
	zurich: [47.3769, 8.5417],
	zürich: [47.3769, 8.5417],
	zurych: [47.3769, 8.5417],
	geneva: [46.2044, 6.1432],
	genewa: [46.2044, 6.1432],
	bern: [46.948, 7.4474],
	basel: [47.5596, 7.5886],
	bazylea: [47.5596, 7.5886],

	// ===== ITALY =====
	rome: [41.9028, 12.4964],
	roma: [41.9028, 12.4964],
	rzym: [41.9028, 12.4964],
	milan: [45.4642, 9.19],
	milano: [45.4642, 9.19],
	mediolan: [45.4642, 9.19],
	venice: [45.4408, 12.3155],
	venezia: [45.4408, 12.3155],
	wenecja: [45.4408, 12.3155],
	florence: [43.7696, 11.2558],
	firenze: [43.7696, 11.2558],
	florencja: [43.7696, 11.2558],

	// ===== AIRPORTS (Poland) =====
	ławica: [52.421, 16.8263],
	lawica: [52.421, 16.8263],
	okęcie: [52.1657, 20.9671],
	okecie: [52.1657, 20.9671],
	chopin: [52.1657, 20.9671],
	modlin: [52.4511, 20.6518],
	balice: [50.0777, 19.7848],
};

function getFallbackCoords(city: string): [number, number] | null {
	const normalized = city.toLowerCase().trim();
	for (const [key, coords] of Object.entries(fallbackCoordinates)) {
		if (normalized.includes(key)) return coords;
	}
	return null;
}

interface RouteData {
	origin: { address: string; lat: number; lng: number };
	destination: { address: string; lat: number; lng: number };
	distance: { text: string; meters: number };
	duration: { text: string; seconds: number };
	polyline: string;
}

// Component to fit map bounds to route
function MapBoundsUpdater({
	routePoints,
}: {
	routePoints: [number, number][] | null;
}) {
	const map = useMap();

	useEffect(() => {
		if (routePoints && routePoints.length > 0) {
			const bounds = L.latLngBounds(routePoints);
			map.fitBounds(bounds, { padding: [40, 40] });
		}
	}, [routePoints, map]);

	return null;
}

// Time picker hours and minutes
const hours = Array.from({ length: 24 }, (_, i) =>
	i.toString().padStart(2, '0'),
);
const minutes = ['00', '15', '30', '45'];

export default function Booking() {
	const { t } = useLanguage();
	const [date, setDate] = useState<Date>();
	const [loading, setLoading] = useState(false);
	const [routeLoading, setRouteLoading] = useState(false);
	const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
	const [selectedHour, setSelectedHour] = useState<string>('');
	const [selectedMinute, setSelectedMinute] = useState<string>('');
	const [routeData, setRouteData] = useState<RouteData | null>(null);
	const [routePoints, setRoutePoints] = useState<[number, number][] | null>(
		null,
	);
	const [routeError, setRouteError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		from: 'Poznań',
		to: '',
		passengers: 1,
	});

	// Debounced route fetching
	const fetchRoute = useCallback(
		async (origin: string, destination: string) => {
			if (!origin.trim() || !destination.trim()) {
				setRouteData(null);
				setRoutePoints(null);
				return;
			}

			setRouteLoading(true);
			setRouteError(null);

			try {
				const response = await fetch(
					`/api/directions?origin=${encodeURIComponent(
						origin,
					)}&destination=${encodeURIComponent(destination)}`,
				);

				if (!response.ok) {
					const data = await response.json();
					// Fallback to straight line if Google API not configured
					if (response.status === 503) {
						const fromCoords = getFallbackCoords(origin);
						const toCoords = getFallbackCoords(destination);
						if (fromCoords && toCoords) {
							setRoutePoints([fromCoords, toCoords]);
							setRouteData(null);
							setRouteError(
								'Using approximate route (Google Maps API not configured)',
							);
						} else {
							setRouteError(
								'Enter a supported city or configure Google Maps API',
							);
						}
						return;
					}
					throw new Error(data.error || 'Failed to get route');
				}

				const data: RouteData = await response.json();
				setRouteData(data);

				// Decode the polyline for the actual road path
				const decodedPoints = decodePolyline(data.polyline);
				setRoutePoints(decodedPoints);
			} catch (error) {
				console.error('Route fetch error:', error);
				// Try fallback
				const fromCoords = getFallbackCoords(origin);
				const toCoords = getFallbackCoords(destination);
				if (fromCoords && toCoords) {
					setRoutePoints([fromCoords, toCoords]);
					setRouteError('Using approximate route');
				} else {
					setRouteError('Could not calculate route');
				}
			} finally {
				setRouteLoading(false);
			}
		},
		[],
	);

	// Fetch route when locations change (debounced)
	useEffect(() => {
		const timer = setTimeout(() => {
			if (formData.from && formData.to) {
				fetchRoute(formData.from, formData.to);
			}
		}, 800);

		return () => clearTimeout(timer);
	}, [formData.from, formData.to, fetchRoute]);

	const handleEstimate = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const time =
			selectedHour && selectedMinute
				? `${selectedHour}:${selectedMinute}`
				: undefined;

		try {
			const response = await fetch('/api/booking/estimate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: formData.from,
					to: formData.to,
					date: date ? format(date, 'yyyy-MM-dd') : undefined,
					time,
					passengers: formData.passengers,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to calculate estimate');
			}

			const data = await response.json();
			setEstimatedPrice(data.estimatedPrice);
		} catch (error) {
			// Fallback to client-side calculation when API is not available
			console.log('Using client-side price calculation');
			const priceResult = calculatePriceClient(formData.to);
			setEstimatedPrice(`${priceResult.min} - ${priceResult.max}`);
		} finally {
			setLoading(false);
		}
	};

	// Get origin/destination markers
	const originCoords: [number, number] | null = routeData
		? [routeData.origin.lat, routeData.origin.lng]
		: routePoints?.[0] || null;

	const destCoords: [number, number] | null = routeData
		? [routeData.destination.lat, routeData.destination.lng]
		: routePoints?.[routePoints.length - 1] || null;

	return (
		<section id="booking" className="py-24 bg-black relative">
			<div className="container px-6 mx-auto">
				<div className="flex flex-col md:flex-row gap-12 items-start">
					{/* Form Section */}
					<div className="w-full md:w-1/2">
						<div className="mb-8">
							<h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-3">
								{t.booking.header.eyebrow}
							</h2>
							<h3 className="text-4xl font-serif text-white font-medium">
								{t.booking.header.title}
							</h3>
							<p className="text-muted-foreground mt-4">
								{t.booking.header.description}
							</p>
						</div>

						<form
							onSubmit={handleEstimate}
							className="space-y-6 bg-zinc-900/50 p-8 border border-white/5 rounded-lg"
						>
							<div className="space-y-2">
								<Label className="text-white">
									{t.booking.form.from}
								</Label>
								<div className="relative">
									<MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										className="pl-10 bg-black/50 border-white/10 text-white focus:border-primary/50"
										placeholder="Poznań, Poland"
										value={formData.from}
										onChange={(e) =>
											setFormData({
												...formData,
												from: e.target.value,
											})
										}
										required
										data-testid="input-from"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-white">
									{t.booking.form.to}
								</Label>
								<div className="relative">
									<MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
									<Input
										className="pl-10 bg-black/50 border-white/10 text-white focus:border-primary/50"
										placeholder="Berlin, Germany"
										value={formData.to}
										onChange={(e) =>
											setFormData({
												...formData,
												to: e.target.value,
											})
										}
										required
										data-testid="input-to"
									/>
									{routeLoading && (
										<Loader2 className="absolute right-3 top-3 h-4 w-4 text-primary animate-spin" />
									)}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label className="text-white">
										{t.booking.form.date}
									</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={`w-full justify-start text-left font-normal bg-black/50 border-white/10 text-white hover:bg-black hover:text-primary ${
													!date &&
													'text-muted-foreground'
												}`}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{date ? (
													format(date, 'PPP')
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10 text-white">
											<Calendar
												mode="single"
												selected={date}
												onSelect={setDate}
												initialFocus
												className="bg-zinc-900 text-white"
											/>
										</PopoverContent>
									</Popover>
								</div>

								{/* Improved Time Picker */}
								<div className="space-y-2">
									<Label className="text-white">
										{t.booking.form.time}
									</Label>
									<div className="flex gap-2">
										<Select
											value={selectedHour}
											onValueChange={setSelectedHour}
										>
											<SelectTrigger className="flex-1 bg-black/50 border-white/10 text-white hover:bg-black hover:border-primary/50">
												<Clock className="mr-2 h-4 w-4 text-muted-foreground" />
												<SelectValue placeholder="Hour" />
											</SelectTrigger>
											<SelectContent className="bg-zinc-900 border-white/10 max-h-60">
												{hours.map((hour) => (
													<SelectItem
														key={hour}
														value={hour}
														className="text-white hover:bg-primary/20 focus:bg-primary/20 focus:text-white"
													>
														{hour}:00
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<Select
											value={selectedMinute}
											onValueChange={setSelectedMinute}
										>
											<SelectTrigger className="w-24 bg-black/50 border-white/10 text-white hover:bg-black hover:border-primary/50">
												<SelectValue placeholder="Min" />
											</SelectTrigger>
											<SelectContent className="bg-zinc-900 border-white/10">
												{minutes.map((minute) => (
													<SelectItem
														key={minute}
														value={minute}
														className="text-white hover:bg-primary/20 focus:bg-primary/20 focus:text-white"
													>
														:{minute}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									{selectedHour && selectedMinute && (
										<p className="text-xs text-primary mt-1">
											{selectedHour}:{selectedMinute}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-white">
									{t.booking.form.passengers}
								</Label>
								<div className="relative">
									<Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										type="number"
										min="1"
										max="7"
										className="pl-10 bg-black/50 border-white/10 text-white focus:border-primary/50"
										value={formData.passengers}
										onChange={(e) =>
											setFormData({
												...formData,
												passengers:
													parseInt(e.target.value) ||
													1,
											})
										}
										data-testid="input-passengers"
									/>
								</div>
							</div>

							<Button
								type="submit"
								className="w-full bg-primary text-black hover:bg-primary/90 h-12 text-lg"
								disabled={loading}
								data-testid="button-estimate"
							>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{t.booking.form.calculating}
									</>
								) : (
									t.booking.form.estimate
								)}
							</Button>

							{estimatedPrice && (
								<div
									className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2"
									data-testid="result-price"
								>
									<p className="text-sm text-primary uppercase tracking-widest font-bold mb-1">
										{t.booking.form.result}
									</p>
									<p
										className="text-3xl font-serif text-white"
										data-testid="text-estimated-price"
									>
										{estimatedPrice} PLN
									</p>
									<Button
										variant="link"
										className="text-white/60 hover:text-primary mt-2 h-auto p-0"
										data-testid="button-book"
									>
										{t.booking.form.book}
									</Button>
								</div>
							)}
						</form>
					</div>

					{/* Map Section with Route */}
					<div className="w-full md:w-1/2 h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-white/10 relative">
						<div className="absolute top-4 left-4 z-[400] bg-black/80 backdrop-blur px-3 py-1 rounded text-xs text-white border border-white/10 flex items-center gap-2">
							<Navigation className="w-3 h-3 text-primary" />
							{t.booking.map}
							{routeLoading && (
								<Loader2 className="w-3 h-3 animate-spin" />
							)}
						</div>

						{/* Route info overlay */}
						{(routeData || routePoints) && (
							<div className="absolute top-4 right-4 z-[400] bg-black/90 backdrop-blur-md px-4 py-3 rounded-lg border border-primary/30 text-white min-w-[200px]">
								<div className="flex items-center gap-2 mb-2">
									<Car className="w-4 h-4 text-primary" />
									<span className="text-sm font-medium truncate max-w-[180px]">
										{formData.from} → {formData.to}
									</span>
								</div>

								{routeData ? (
									<>
										<div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
											<span className="flex items-center gap-1">
												<Navigation className="w-3 h-3" />
												{routeData.distance.text}
											</span>
											<span className="flex items-center gap-1">
												<Timer className="w-3 h-3" />
												{routeData.duration.text}
											</span>
										</div>
										<div className="text-[10px] text-muted-foreground/70">
											via Google Maps
										</div>
									</>
								) : (
									routeError && (
										<p className="text-[10px] text-amber-400/80">
											{routeError}
										</p>
									)
								)}

								{estimatedPrice && (
									<div className="mt-2 pt-2 border-t border-white/10">
										<p className="text-lg font-serif text-primary">
											{estimatedPrice} PLN
										</p>
									</div>
								)}
							</div>
						)}

						<MapContainer
							center={[52.4064, 16.9252]}
							zoom={6}
							scrollWheelZoom={false}
							className="w-full h-full"
							style={{ background: '#0a0a0a' }}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
								url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
							/>

							{/* Update map bounds when route changes */}
							<MapBoundsUpdater routePoints={routePoints} />

							{/* Origin marker */}
							{originCoords && (
								<Marker position={originCoords}>
									<Popup className="custom-popup">
										<div className="font-medium">
											{routeData?.origin.address ||
												formData.from}
										</div>
										<div className="text-xs text-gray-500">
											Pickup Location
										</div>
									</Popup>
								</Marker>
							)}

							{/* Destination marker */}
							{destCoords && (
								<Marker position={destCoords} icon={GoldIcon}>
									<Popup className="custom-popup">
										<div className="font-medium">
											{routeData?.destination.address ||
												formData.to}
										</div>
										<div className="text-xs text-gray-500">
											Destination
										</div>
										{routeData && (
											<div className="mt-1 text-xs">
												{routeData.distance.text} •{' '}
												{routeData.duration.text}
											</div>
										)}
										{estimatedPrice && (
											<div className="mt-1 font-bold text-amber-600">
												{estimatedPrice} PLN
											</div>
										)}
									</Popup>
								</Marker>
							)}

							{/* Route polyline - actual road path */}
							{routePoints && routePoints.length > 0 && (
								<Polyline
									positions={routePoints}
									pathOptions={{
										color: '#d4af37',
										weight: 4,
										opacity: 0.9,
									}}
								/>
							)}
						</MapContainer>
					</div>
				</div>
			</div>

			{/* Custom styles for gold marker */}
			<style>{`
        .gold-marker {
          filter: hue-rotate(35deg) saturate(2) brightness(1.2);
        }
      `}</style>
		</section>
	);
}

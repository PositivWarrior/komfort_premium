export const translations = {
  pl: {
    navbar: {
      services: "USŁUGI",
      fleet: "FLOTA",
      pricing: "CENNIK",
      contact: "KONTAKT",
      callNow: "Zadzwoń",
    },
    pricing: {
      header: {
        eyebrow: "Przejrzyste Ceny",
        title: "Cennik Tras",
        description: "Stałe ceny na najpopularniejsze trasy z Poznania. W cenie profesjonalny kierowca i luksusowy Mercedes V-Klasa."
      },
      disclaimer: "* w cenie opłaty autostradowe",
      currency: "zł brutto",
      locations: [
        { city: "Warszawa", price: "1890", toll: true },
        { city: "Berlin", price: "1490", toll: true },
        { city: "Gdańsk", price: "1890", toll: true },
        { city: "Wrocław", price: "1200", toll: false },
        { city: "Kraków", price: "2690", toll: true }
      ]
    },
    booking: {
      header: {
        eyebrow: "Zaplanuj Podróż",
        title: "Sprawdź Cenę",
        description: "Oblicz orientacyjny koszt przejazdu. Jeśli masz szczególne wymagania, skontaktuj się z nami bezpośrednio."
      },
      form: {
        from: "Skąd",
        to: "Dokąd",
        date: "Data",
        time: "Godzina",
        passengers: "Liczba osób",
        estimate: "Oblicz cenę",
        calculating: "Obliczam...",
        result: "Orientacyjna cena",
        book: "Zarezerwuj ten przejazd"
      },
      map: "Podgląd trasy"
    },
    hero: {
      slide1: {
        subtitle: "Transport Grupowy Premium",
        title: "Mercedes V-Klasa",
        description: "Przestronny komfort dla grup biznesowych i rodzin. Podróżuj razem w najlepszym stylu."
      },
      slide2: {
        subtitle: "Podróże Służbowe",
        title: "Dla Wymagających Klientów",
        description: "Niezawodny transport na spotkania, konferencje i eventy. Skup się na biznesie — my zajmiemy się resztą."
      },
      slide3: {
        subtitle: "Wesela i Uroczystości",
        title: "Przyjedź z Klasą",
        description: "Niech ten dzień będzie wyjątkowy. Nasza flota premium i profesjonalna obsługa zadbają o każdy szczegół."
      },
      bookRide: "Zarezerwuj",
      viewFleet: "Zobacz Flotę",
    },
    services: {
      header: {
        eyebrow: "Nasza Oferta",
        title: "Zakres Usług",
      },
      cards: {
        airport: {
          title: "Transfery Lotniskowe",
          description: "Punktualny odbiór i dowóz na lotnisko Poznań-Ławica. Monitorujemy Twój lot — jesteśmy na miejscu, gdy wylądujesz."
        },
        business: {
          title: "Podróże Służbowe",
          description: "Transport dla kadry zarządzającej na spotkania, konferencje i wydarzenia firmowe. Wi-Fi na pokładzie i pełen komfort."
        },
        vip: {
          title: "Obsługa VIP",
          description: "Dyskretna obsługa gości specjalnych, celebrytów i dyplomatów. Najwyższy poziom profesjonalizmu."
        },
        hourly: {
          title: "Wynajem Godzinowy",
          description: "Kierowca do Twojej dyspozycji na kilka godzin. Idealne na zakupy, zwiedzanie lub serię spotkań."
        },
        event: {
          title: "Obsługa Eventów",
          description: "Wesela, gale, imprezy firmowe — zadbamy o logistykę transportową. Przyjedźcie z klasą."
        },
        intercity: {
          title: "Trasy Międzymiastowe",
          description: "Wygodne przejazdy po Polsce i Europie. Doskonała alternatywa dla pociągu czy samolotu."
        }
      }
    },
    offer: {
      header: {
        eyebrow: "Pakiety",
        title: "Rozwiązania Dopasowane do Potrzeb",
        description: "Oferujemy znacznie więcej niż zwykły transport. Nasze pakiety są tworzone z myślą o firmach, organizatorach wydarzeń i klientach indywidualnych oczekujących najwyższej jakości."
      },
      cards: {
        corporate: {
          title: "Dla Firm",
          items: ["Rozliczenia miesięczne", "Rezerwacje priorytetowe", "Dedykowany opiekun", "Monitoring lotów"]
        },
        events: {
          title: "Wesela i Eventy",
          items: ["Koordynacja kolumny pojazdów", "Dekoracje okolicznościowe", "Serwis szampana", "Czerwony dywan"]
        },
        concierge: {
          title: "Concierge",
          items: ["Rezerwacje hoteli", "Rezerwacje restauracji", "Wycieczki po mieście", "Ochrona osobista"]
        }
      }
    },
    fleet: {
      header: {
        eyebrow: "Nasza Flota",
        title: "Komfort i Elegancja",
        description: "Nasze pojazdy są perfekcyjnie utrzymane, objęte całkowitym zakazem palenia i wyposażone w udogodnienia premium."
      },
      cars: {
        sClass: {
          category: "Klasa S",
          description: "Szczyt luksusu i prestiżu. Dla VIP-ów i najważniejszych gości."
        },
        sClassInterior: {
          category: "Wnętrze Premium",
          description: "Najwyższy komfort podróżowania z fotelami klasy executive."
        },
        vClass: {
          category: "V-Klasa",
          description: "Przestronny komfort dla grup do 7 osób. Mobilne biuro w podróży."
        },
        vClassInterior: {
          category: "Podróże Grupowe",
          description: "Idealny na wyjazdy firmowe lub rodzinne transfery lotniskowe."
        },
        event: {
          category: "Uroczystości",
          description: "Eleganckie detale na wesela i wyjątkowe okazje."
        },
        eClass: {
          category: "Klasa E",
          description: "Standard podróży biznesowych. Elegancja, komfort i niezawodność."
        }
      }
    },
    reviews: {
      header: {
        eyebrow: "Opinie Klientów",
        title: "Zaufali Nam"
      },
      items: [
        {
          text: "Najbardziej profesjonalna firma transportowa, z jaką współpracowałem. Samochód był perfekcyjnie przygotowany, kierowca punktualny i niezwykle uprzejmy.",
          role: "Prezes, TechGlobal"
        },
        {
          text: "Zleciliśmy Komfort Premium obsługę transportową naszego wesela. Wszystko przebiegło bez zarzutu. Vany były luksusowe i niezwykle wygodne.",
          role: "Organizator wesel"
        },
        {
          text: "Dyskrecja i bezpieczeństwo były dla mnie kluczowe. Firma spełniła oba te wymagania w 100%. Polecam do podróży służbowych.",
          role: "Dyplomata"
        },
        {
          text: "Pierwszorzędna obsługa od odbioru z lotniska po hotel. Kierowca świetnie znał miasto i zaproponował ciekawe miejsca.",
          role: "Bloger podróżniczy"
        }
      ]
    },
    map: {
      title: "Poznań i Cała Polska",
      description: "Baza: Lotnisko Poznań-Ławica (POZ). Realizujemy transfery w całej Polsce i Europie.",
      availability: "Dostępni całą dobę"
    },
    faq: {
      header: {
        eyebrow: "Pytania i Odpowiedzi",
        title: "FAQ"
      },
      items: [
        {
          q: "Jak mogę zarezerwować przejazd?",
          a: "Rezerwacji można dokonać przez formularz na stronie, telefonicznie lub mailowo. Zalecamy kontakt z co najmniej 24-godzinnym wyprzedzeniem, aby zagwarantować dostępność."
        },
        {
          q: "Czy ceny transferów lotniskowych są stałe?",
          a: "Tak, oferujemy stałe ceny za transfery na lotnisko Poznań-Ławica i z powrotem. Nie ma dodatkowych opłat za opóźnienia lotu czy korki."
        },
        {
          q: "Czy kierowcy mówią po angielsku?",
          a: "Tak, wszyscy nasi kierowcy posługują się językiem angielskim i są przeszkoleni do obsługi gości zagranicznych."
        },
        {
          q: "Jakie formy płatności akceptujecie?",
          a: "Akceptujemy karty płatnicze (Visa, Mastercard, Amex) oraz przelewy bankowe dla klientów firmowych."
        },
        {
          q: "Czy zapewniacie foteliki dla dzieci?",
          a: "Tak, bezpieczeństwo to nasz priorytet. Przy rezerwacji prosimy o podanie wieku i wagi dziecka — fotelik zapewniamy bezpłatnie."
        }
      ]
    },
    contact: {
      header: {
        eyebrow: "Kontakt",
        title: "Zarezerwuj Przejazd",
        description: "Wypełnij formularz lub zadzwoń. Jesteśmy do Twojej dyspozycji przez całą dobę."
      },
      form: {
        name: "Imię i nazwisko",
        phone: "Telefon",
        email: "Email",
        message: "Wiadomość / Szczegóły przejazdu",
        submit: "Wyślij zapytanie"
      }
    },
    footer: {
      privacy: "Polityka Prywatności",
      terms: "Regulamin"
    }
  },
  en: {
    navbar: {
      services: "SERVICES",
      fleet: "FLEET",
      pricing: "PRICING",
      contact: "CONTACT",
      callNow: "Call Now",
    },
    pricing: {
      header: {
        eyebrow: "Transparent Pricing",
        title: "Fixed Rates",
        description: "Competitive rates for popular routes from Poznań. All prices include professional chauffeur and luxury Mercedes V-Class."
      },
      disclaimer: "* highway tolls included",
      currency: "PLN gross",
      locations: [
        { city: "Warsaw", price: "1890", toll: true },
        { city: "Berlin", price: "1490", toll: true },
        { city: "Gdańsk", price: "1890", toll: true },
        { city: "Wrocław", price: "1200", toll: false },
        { city: "Kraków", price: "2690", toll: true }
      ]
    },
    booking: {
      header: {
        eyebrow: "Plan Your Journey",
        title: "Get an Estimate",
        description: "Calculate the estimated cost of your trip. For specific requirements, please contact us directly."
      },
      form: {
        from: "Pickup Location",
        to: "Destination",
        date: "Date",
        time: "Time",
        passengers: "Passengers",
        estimate: "Get Price Estimate",
        calculating: "Calculating...",
        result: "Estimated Price",
        book: "Book This Trip"
      },
      map: "Route Preview"
    },
    hero: {
      slide1: {
        subtitle: "Premium Group Transport",
        title: "Mercedes V-Class",
        description: "Spacious comfort for business groups and families. Travel together in style."
      },
      slide2: {
        subtitle: "Executive Business Travel",
        title: "For Demanding Clients",
        description: "Reliable transport for meetings, conferences, and events. Focus on your business — we handle the rest."
      },
      slide3: {
        subtitle: "Weddings & Special Events",
        title: "Arrive in Style",
        description: "Make your special day unforgettable. Our premium fleet and professional service will take care of every detail."
      },
      bookRide: "Book Now",
      viewFleet: "View Fleet",
    },
    services: {
      header: {
        eyebrow: "Our Services",
        title: "What We Offer",
      },
      cards: {
        airport: {
          title: "Airport Transfers",
          description: "Punctual pickup and drop-off at Poznań-Ławica Airport. We track your flight — we're there when you land."
        },
        business: {
          title: "Business Travel",
          description: "Executive transport for meetings, conferences, and corporate events. Onboard Wi-Fi and full comfort."
        },
        vip: {
          title: "VIP Service",
          description: "Discreet service for special guests, celebrities, and diplomats. The highest level of professionalism."
        },
        hourly: {
          title: "Hourly Rental",
          description: "A chauffeur at your disposal for several hours. Perfect for shopping, sightseeing, or multiple meetings."
        },
        event: {
          title: "Event Transport",
          description: "Weddings, galas, corporate events — we handle the transport logistics. Arrive with class."
        },
        intercity: {
          title: "Intercity Routes",
          description: "Comfortable journeys across Poland and Europe. An excellent alternative to trains or flights."
        }
      }
    },
    offer: {
      header: {
        eyebrow: "Packages",
        title: "Tailored Solutions",
        description: "We offer much more than just transport. Our packages are designed for corporations, event organizers, and individuals who expect the highest quality."
      },
      cards: {
        corporate: {
          title: "Corporate",
          items: ["Monthly billing", "Priority booking", "Dedicated account manager", "Flight monitoring"]
        },
        events: {
          title: "Weddings & Events",
          items: ["Vehicle convoy coordination", "Decorative ribbons", "Champagne service", "Red carpet arrival"]
        },
        concierge: {
          title: "Concierge",
          items: ["Hotel reservations", "Restaurant bookings", "City tours", "Personal security"]
        }
      }
    },
    fleet: {
      header: {
        eyebrow: "Our Fleet",
        title: "Comfort & Elegance",
        description: "Our vehicles are meticulously maintained, strictly non-smoking, and equipped with premium amenities."
      },
      cars: {
        sClass: {
          category: "S-Class",
          description: "The pinnacle of luxury and prestige. For VIPs and distinguished guests."
        },
        sClassInterior: {
          category: "Premium Interior",
          description: "The highest standard of travel comfort with executive seating."
        },
        vClass: {
          category: "V-Class",
          description: "Spacious comfort for groups of up to 7. A mobile office on the move."
        },
        vClassInterior: {
          category: "Group Travel",
          description: "Perfect for corporate trips or family airport transfers."
        },
        event: {
          category: "Special Occasions",
          description: "Elegant details for weddings and exceptional events."
        },
        eClass: {
          category: "E-Class",
          description: "The standard for business travel. Elegance, comfort, and reliability."
        }
      }
    },
    reviews: {
      header: {
        eyebrow: "Client Reviews",
        title: "Trusted by Many"
      },
      items: [
        {
          text: "The most professional transport company I've worked with. The car was perfectly prepared, the driver punctual and extremely courteous.",
          role: "CEO, TechGlobal"
        },
        {
          text: "We hired Komfort Premium for our wedding transport. Everything went flawlessly. The vans were luxurious and extremely comfortable.",
          role: "Wedding Planner"
        },
        {
          text: "Discretion and safety were key for me. The company delivered on both counts 100%. Highly recommended for business travel.",
          role: "Diplomat"
        },
        {
          text: "First-class service from airport pickup to hotel drop-off. The driver knew the city well and suggested interesting places.",
          role: "Travel Blogger"
        }
      ]
    },
    map: {
      title: "Poznań & All of Poland",
      description: "Base: Poznań-Ławica Airport (POZ). Transfers available throughout Poland and Europe.",
      availability: "Available 24/7"
    },
    faq: {
      header: {
        eyebrow: "Questions & Answers",
        title: "FAQ"
      },
      items: [
        {
          q: "How can I book a ride?",
          a: "You can book via the form on our website, by phone, or by email. We recommend contacting us at least 24 hours in advance to guarantee availability."
        },
        {
          q: "Are airport transfer prices fixed?",
          a: "Yes, we offer fixed prices for transfers to and from Poznań-Ławica Airport. No extra charges for flight delays or traffic."
        },
        {
          q: "Do your drivers speak English?",
          a: "Yes, all our drivers speak English and are trained to serve international guests."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept payment cards (Visa, Mastercard, Amex) and bank transfers for corporate clients."
        },
        {
          q: "Do you provide child seats?",
          a: "Yes, safety is our priority. When booking, please provide the child's age and weight — we provide the seat free of charge."
        }
      ]
    },
    contact: {
      header: {
        eyebrow: "Contact",
        title: "Book Your Ride",
        description: "Fill out the form or give us a call. We're at your service around the clock."
      },
      form: {
        name: "Full Name",
        phone: "Phone",
        email: "Email",
        message: "Message / Trip Details",
        submit: "Send Request"
      }
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  }
};

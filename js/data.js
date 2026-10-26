/**
 * Sri Lanka Travel & Tour Guide - Authentic Data Store
 * Real destinations, curated tour packages, itineraries, and travel intelligence.
 */

const SRI_LANKA_DATA = {
  currencies: {
    USD: { code: 'USD', symbol: '$', rate: 1.0, format: (val) => `$${Math.round(val).toLocaleString()}` },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, format: (val) => `€${Math.round(val * 0.92).toLocaleString()}` },
    GBP: { code: 'GBP', symbol: '£', rate: 0.79, format: (val) => `£${Math.round(val * 0.79).toLocaleString()}` },
    LKR: { code: 'LKR', symbol: 'Rs', rate: 305.0, format: (val) => `Rs ${(Math.round(val * 305)).toLocaleString()}` }
  },

  destinations: [
    {
      id: 'sigiriya',
      name: 'Sigiriya Rock Fortress',
      sinhalaName: 'සීගිරිය',
      region: 'Cultural Triangle',
      province: 'Central Province',
      category: 'heritage',
      image: 'assets/images/sigiriya.jpg',
      tagline: 'The 5th Century Citadel in the Clouds (UNESCO)',
      shortDesc: 'A dramatic 200m monolithic granite column rising above emerald canopy, crowned by King Kashyapa\'s ancient sky palace.',
      fullDesc: 'Sigiriya is an archaeological masterpiece dating back to 477 AD. Climb the historic iron staircases flanked by colossal lion paws, admire world-famous 1,500-year-old colorful frescoes of celestial nymphs, and marvel at the Mirror Wall. At the summit, panoramic 360-degree views stretch over royal water gardens, boulder ramparts, and endless tropical forest.',
      bestTimeToVisit: 'December to April (Dry & Sunny)',
      duration: 'Half Day (3–4 hours)',
      travelTimeFromColombo: '3.5 Hours via Central Expressway',
      entryFee: '$36 USD (Foreign Adult)',
      highlights: [
        'Lion Paw Gateway & Royal Citadel ruins',
        'Mirror Wall with ancient Sinhala graffiti',
        'Sigiriya Apsara frescoes preserved in natural rock caves',
        'Geometric Royal Water Gardens with working gravity fountains'
      ],
      insiderTip: 'Start your ascent at 6:30 AM before the tropical heat peaks and crowds arrive, or climb Pidurangala Rock opposite Sigiriya for sunrise!'
    },
    {
      id: 'ella',
      name: 'Ella & Nine Arch Bridge',
      sinhalaName: 'ඇල්ල',
      region: 'Central Highlands',
      province: 'Uva Province',
      category: 'nature',
      image: 'assets/images/ella-train.jpg',
      tagline: 'Misty Peaks, Tea Trails & The Iconic Blue Train',
      shortDesc: 'A breezy mountain hideaway surrounded by rolling Ceylon tea estates, dramatic gorges, and the architectural wonder of Demodara.',
      fullDesc: 'Nestled deep in the central spine of Sri Lanka at 1,041m elevation, Ella offers cooler mountain climes, vibrant traveler cafes, and spectacular hiking. The legendary Nine Arch Bridge—built entirely of brick, stone, and cement without steel during WWI—is world-famous as the bright blue train weaves gracefully through mist-draped tea valleys.',
      bestTimeToVisit: 'January to May & August to September',
      duration: '2 to 3 Days',
      travelTimeFromColombo: '5.5 Hours (or 6h scenic train from Kandy)',
      entryFee: 'Free (Train tickets approx $3–$10)',
      highlights: [
        'Iconic Nine Arch Bridge train crossing photography',
        'Sunrise hike up Little Adam\'s Peak (easy 45-min trek)',
        'Ravana Falls & mystical Ravana Cave exploration',
        'Lipton\'s Seat panoramic viewpoint overlooking 7 provinces'
      ],
      insiderTip: 'Train times change occasionally; check with your local guide to be at the Nine Arch Bridge around 9:30 AM or 11:45 AM when the main express trains cross.'
    },
    {
      id: 'galle',
      name: 'Galle Dutch Fort',
      sinhalaName: 'ගාල්ල කොටුව',
      region: 'Southern Coast',
      province: 'Southern Province',
      category: 'coast',
      image: 'assets/images/galle-fort.jpg',
      tagline: 'Living 17th Century UNESCO Colonial Wonder',
      shortDesc: 'Cobblestone streets, Dutch-colonial ramparts, boutique gem merchants, and an iconic white lighthouse on the Indian Ocean.',
      fullDesc: 'Built first by the Portuguese in 1588 and extensively fortified by the Dutch VOC in the 17th century, Galle Fort is South Asia\'s best-preserved European sea fortress. Still vibrant and inhabited today, its alleys are lined with terracotta-roofed villas converted into boutique hotels, artisan jewelry studios, spice fragrance boutiques, and trendy seaside cafes.',
      bestTimeToVisit: 'November to April',
      duration: '1 to 2 Days',
      travelTimeFromColombo: '2 Hours via Southern Expressway',
      entryFee: 'Free Access to Fort & Ramparts',
      highlights: [
        'Sunset promenade along the stone ramparts & Flag Rock',
        'Galle Lighthouse overlooking palm-fringed turquoise bays',
        'Dutch Reformed Church (1755) with gravestone floor',
        'High-end Ceylon sapphire jewelry and artisanal shopping'
      ],
      insiderTip: 'Walk the perimeter ramparts at 5:30 PM to watch local cliff-divers jump into the ocean while the sunset paints the sky in pastel lilac.'
    },
    {
      id: 'kandy',
      name: 'Sacred City of Kandy',
      sinhalaName: 'මහනුවර',
      region: 'Central Highlands',
      province: 'Central Province',
      category: 'heritage',
      image: 'assets/images/kandy-temple.jpg',
      tagline: 'Spiritual Heart of Sri Lanka & The Tooth Relic',
      shortDesc: 'The last royal kingdom of Ceylon, encircled by mist-veiled mountains and centered around the sacred tranquil Kandy Lake.',
      fullDesc: 'Kandy was the final capital of the ancient Sinhalese kings until 1815. Today, it remains the spiritual epicenter of Theravada Buddhism, home to Sri Dalada Maligawa (Temple of the Sacred Tooth Relic). Surrounding the tranquil lake are lush rainforest reserves like Udawattakele, colonial-era heritage hotels, and the renowned Royal Botanical Gardens of Peradeniya.',
      bestTimeToVisit: 'December to April & July/August (Esala Perahera Festival)',
      duration: '1 to 2 Days',
      travelTimeFromColombo: '3 Hours by road or scenic express train',
      entryFee: 'LKR 2,000 (~$6.50 USD) for Dalada Maligawa',
      highlights: [
        'Temple of the Sacred Tooth Relic (Theva ritual drumming)',
        'Peradeniya Royal Botanical Gardens with 4,000+ plant species',
        'Scenic evening walk along the perimeter of Kandy Lake',
        'Traditional Kandyan cultural dance & fire-walking performance'
      ],
      insiderTip: 'Dress modestly when visiting the temple: shoulders and knees must be covered, and white attire is appreciated as a sign of respect.'
    },
    {
      id: 'yala',
      name: 'Yala National Park',
      sinhalaName: 'යාල ජාතික වනෝද්‍යානය',
      region: 'Wildlife & Safari',
      province: 'Southern & Uva Provinces',
      category: 'wildlife',
      image: 'assets/images/yala-leopard.jpg',
      tagline: 'World’s Highest Leopard Density & Wild Safari',
      shortDesc: 'A vast coastal sanctuary where leopards roam granite boulders, wild elephants bathe in lagoons, and sloth bears forage.',
      fullDesc: 'Bordering the wild Indian Ocean, Yala National Park spans 979 sq km of thorny scrubland, brackish lagoons, and dramatic monolithic rock outcrops. Block 1 hosts one of the highest known population densities of leopards anywhere on Earth (Panthera pardus kotiya). Alongside big cats, spot herds of wild Asian elephants, mugger crocodiles, and over 215 bird species.',
      bestTimeToVisit: 'February to July (Dry season brings wildlife to waterholes)',
      duration: 'Full Day or 2 Game Drives',
      travelTimeFromColombo: '4.5 Hours via Southern Expressway',
      entryFee: 'Approx $35–$45 USD (incl. tracker & park permits)',
      highlights: [
        'Dawn 4x4 open-top safari for Sri Lankan leopard tracking',
        'Wild Asian elephant families crossing the tracks',
        'Sloth bears, spotted deer, jackals & wild water buffalo',
        'Coastal sand dunes and pristine marine bird lagoons'
      ],
      insiderTip: 'Book a luxury tented safari camp on the park buffer zone for nighttime campfire dinners under southern hemisphere constellations.'
    },
    {
      id: 'mirissa',
      name: 'Mirissa & Southern Beaches',
      sinhalaName: 'මිරිස්ස',
      region: 'Southern Coast',
      province: 'Southern Province',
      category: 'coast',
      image: 'assets/images/mirissa-beach.jpg',
      tagline: 'Blue Whales, Coconut Groves & Golden Surf',
      shortDesc: 'A crescent-shaped tropical bay famous for ethical blue whale watching, iconic palm-tree lookouts, and beachfront seafood grills.',
      fullDesc: 'Mirissa is the quintessential tropical paradise. Just a few nautical miles offshore, the continental shelf drops thousands of meters into the deep ocean trenches where majestic Blue Whales—the largest animals to ever exist—and pods of spinner dolphins migrate. On land, climb Coconut Tree Hill for the quintessential postcard shot and dine barefoot on grilled catch-of-the-day.',
      bestTimeToVisit: 'November to April (Calm seas & peak whale migration)',
      duration: '2 to 4 Days',
      travelTimeFromColombo: '2.5 Hours via Expressway',
      entryFee: 'Whale Watching Cruise: ~$50–$65 USD per person',
      highlights: [
        'Morning blue whale and dolphin watching ocean safari',
        'Sunset panorama from iconic Coconut Tree Hill',
        'Surfing gentle reef breaks at Weligama bay (ideal for beginners)',
        'Candlelit beachfront seafood dining with toes in the sand'
      ],
      insiderTip: 'Choose a responsible whale-watching operator that respects marine wildlife separation guidelines and avoids crowding the animals.'
    }
  ],

  packages: [
    {
      id: 'classic-ceylon',
      title: 'The Classic Ceylon Heritage & Wildlife',
      durationDays: 7,
      durationNights: 6,
      badge: 'Best Seller',
      rating: 4.96,
      reviewsCount: 142,
      basePriceUSD: 1180,
      image: 'assets/images/sigiriya.jpg',
      category: 'heritage',
      summary: 'The definitive Sri Lanka circuit covering ancient UNESCO royal capitals, misty highlands, wild leopard safaris, and Dutch colonial fortresses.',
      route: 'Colombo → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle → Colombo',
      inclusions: [
        'Dedicated English-speaking private chauffeur & luxury AC vehicle',
        '6 Nights in handpicked 4-star boutique hotels & eco-lodges',
        'Daily gourmet breakfasts and selected traditional dinners',
        'Sigiriya Rock Fortress VIP entry tickets',
        'Temple of the Tooth Relic guided visit',
        '4x4 open-top private safari jeep in Yala National Park',
        'All government taxes, highway tolls, and fuel'
      ],
      exclusions: [
        'International airfare',
        'Sri Lanka ETA Tourist Visa',
        'Alcoholic beverages and optional personal gratuities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival at Bandaranaike Airport & Transfer to Sigiriya',
          description: 'Ayubowan! Meet your private chauffeur guide at Colombo Airport. Travel through coconut estates and lush countryside to the cultural heartland of Habarana/Sigiriya. Check in to your forest eco-resort and enjoy an authentic welcome king coconut drink.',
          hotel: 'Aliya Resort & Spa / Cinnamon Lodge',
          meals: 'Dinner included'
        },
        {
          day: 2,
          title: 'Conquering the Sigiriya Lion Rock & Ancient Polonnaruwa',
          description: 'Early morning ascent of Sigiriya before the sun gets strong. Marvel at the mirror wall, celestial frescoes, and summit ruins. In the afternoon, explore the medieval capital of Polonnaruwa by bicycle, witnessing giant Buddha statues carved into granite cliffs at Gal Vihara.',
          hotel: 'Aliya Resort & Spa',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Dambulla Golden Cave Temple & The Hill Capital of Kandy',
          description: 'Visit the 2,000-year-old rock cave temples of Dambulla containing 153 gilded Buddha statues. Drive south into the verdant Matale spice gardens to learn about Ceylon cinnamon, cardamom, and vanilla. Arrive in royal Kandy, stroll the lake, and witness the evening tooth relic ceremony.',
          hotel: 'Earl\'s Regency / The Grand Kandyan',
          meals: 'Breakfast & Traditional Kandyan Dinner'
        },
        {
          day: 4,
          title: 'Scenic Tea Plantations & Nuwara Eliya "Little England"',
          description: 'Ascend into misty mountains covered in emerald tea carpets. Visit Ramboda Waterfalls and a working 150-year-old Ceylon tea estate where master pluckers demonstrate artisanal processing. Tour Nuwara Eliya\'s Tudor-style post office, Lake Gregory, and colonial clubhouse.',
          hotel: 'Grand Hotel Nuwara Eliya / Jetwing St. Andrew\'s',
          meals: 'Breakfast & High Tea'
        },
        {
          day: 5,
          title: 'Highlands to The Wild Plains of Yala Safari',
          description: 'Descend through the Ella gap with stunning mountain vistas. Arrive on the southern plains of Yala. In the afternoon, embark on an exhilarating 4-hour open jeep safari in search of leopards, wild elephant herds, sloth bears, and crocodiles.',
          hotel: 'Cinnamon Wild Yala / Jetwing Yala',
          meals: 'Breakfast & Campfire BBQ Dinner'
        },
        {
          day: 6,
          title: 'Coastal Drive to Galle Dutch Fort & Sunset Ramparts',
          description: 'Follow the scenic southern coastline, stopping to observe traditional stilt fishermen in Koggala. Check into your heritage property in Galle Fort. Take a guided walking tour along Dutch ramparts, watch cliff divers, and explore artisan boutiques.',
          hotel: 'Fort Bazaar / The Galle Fort Hotel',
          meals: 'Breakfast & Seafood Dinner'
        },
        {
          day: 7,
          title: 'Bentota Turtle Sanctuary & Colombo Departure',
          description: 'Visit a marine sea turtle conservation project in Kosgoda. Drive north along the expressway to Colombo for a quick panoramic city tour (Independence Square, Old Parliament) before your airport drop-off with unforgettable memories.',
          hotel: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },
    {
      id: 'highland-train-adventure',
      title: 'Highland Serenity & Scenic Rail Adventure',
      durationDays: 5,
      durationNights: 4,
      badge: 'Scenic Highlight',
      rating: 4.98,
      reviewsCount: 98,
      basePriceUSD: 850,
      image: 'assets/images/ella-train.jpg',
      category: 'nature',
      summary: 'Journey aboard the world\'s most scenic blue train through misty tea gardens, conquer Little Adam\'s Peak, and wake up to mountain views.',
      route: 'Colombo → Kandy → Nuwara Eliya → Ella → Colombo',
      inclusions: [
        'Reserved First/Second Class observation train tickets',
        'Private chauffeur with luggage transfer during your train ride',
        '4 Nights in panoramic boutique mountain lodges',
        'Guided hike to Little Adam\'s Peak & Nine Arch Bridge',
        'Artisanal Ceylon Tea tasting masterclass'
      ],
      exclusions: ['International flights', 'Personal travel insurance', 'Gratuities'],
      itinerary: [
        {
          day: 1,
          title: 'Colombo to The Royal Kingdom of Kandy',
          description: 'Scenic drive from the coast into the central foothills. Visit the sacred Temple of the Tooth Relic, stroll Kandy Lake at golden hour, and stay at a hillside boutique hotel overlooking the Mahaweli River.',
          hotel: 'Theva Residency / Amaya Hills',
          meals: 'Dinner included'
        },
        {
          day: 2,
          title: 'Board The Iconic Blue Train to Nanu Oya & Tea Trails',
          description: 'Board the world-famous blue train as it chugs through eucalyptus forests, misty cloud gaps, and cascading waterfalls. Arrive in Nuwara Eliya, tour Mackwoods or Pedro tea factory, and savor fresh strawberry treats.',
          hotel: 'Heritance Tea Factory',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Horton Plains & World\'s End to Mountain Ella',
          description: 'Dawn trek through Horton Plains National Park to the jaw-dropping 880m sheer drop of World\'s End and Baker\'s Falls. Continue to the bohemian mountain town of Ella for evening craft cocktails and live acoustic music.',
          hotel: '98 Acres Resort & Spa / EKHO Ella',
          meals: 'Breakfast'
        },
        {
          day: 4,
          title: 'Nine Arch Bridge Crossing & Sunrise at Little Adam\'s Peak',
          description: 'Catch the sunrise over Ella Rock from Little Adam\'s Peak. Walk along the lush jungle path to wait beneath the Nine Arch Bridge for the midday express train to thunder overhead across the stone arches. Relax at an infinity pool.',
          hotel: '98 Acres Resort & Spa',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Ravana Falls & Return to Colombo via Southern Highway',
          description: 'Stop at roaring Ravana Falls for morning photographs before your smooth chauffeured transfer back to Colombo or Bandaranaike International Airport.',
          hotel: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },
    {
      id: 'tropical-coastal-safari',
      title: 'Tropical Waves, Whales & Coastal Chill',
      durationDays: 6,
      durationNights: 5,
      badge: 'Ocean & Sun',
      rating: 4.93,
      reviewsCount: 114,
      basePriceUSD: 990,
      image: 'assets/images/mirissa-beach.jpg',
      category: 'coast',
      summary: 'Whale watching cruises, golden palm-fringed surf bays, turtle sanctuaries, and candlelit seafood dinners along the sparkling southern sea.',
      route: 'Colombo → Bentota → Galle Fort → Mirissa → Weligama → Colombo',
      inclusions: [
        'Private AC vehicle with dedicated English-speaking tour leader',
        '5 Nights in luxury beachfront boutique resorts',
        'Private morning Blue Whale & Dolphin ocean cruise in Mirissa',
        'Madu River boat safari through mangrove tunnels & cinnamon island',
        'Beginner surf lesson at Weligama Bay'
      ],
      exclusions: ['International flights', 'Extra water sports not listed', 'Visa fees'],
      itinerary: [
        {
          day: 1,
          title: 'Welcome to Sri Lanka & Sunset in Bentota',
          description: 'Arrive in Colombo and head down the golden southern coast to Bentota. Relax on the uncrowded beaches and enjoy a tropical cocktail while watching the Indian Ocean sunset.',
          hotel: 'Cinnamon Bentota Beach / Avani Bentota',
          meals: 'Dinner included'
        },
        {
          day: 2,
          title: 'Madu River Mangrove Safari & Galle Dutch Ramparts',
          description: 'Speedboat cruise through the rich biodiversity of Madu Ganga mangrove wetlands. Visit Cinnamon Island to see peeled Ceylon quill processing. Proceed to Galle Fort for an evening architectural stroll.',
          hotel: 'The Fortress Resort & Spa / Le Grand Galle',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Mirissa Blue Whale Safari & Coconut Tree Hill',
          description: 'Early departure into the Indian Ocean with certified marine naturalists. Spot the giant Blue Whale and playful spinner dolphins. Afternoon sunset visit to picturesque Coconut Tree Hill.',
          hotel: 'Triple O Six / Mirissa Hills',
          meals: 'Breakfast & Ocean Dinner'
        },
        {
          day: 4,
          title: 'Surf Session in Weligama & Sea Turtle Rescue Center',
          description: 'Catch gentle rolling waves with an expert instructor at Weligama. Visit a non-profit sea turtle conservation hatchery in Habaraduwa to see baby green turtles released into the ocean.',
          hotel: 'W15 Weligama / Cape Weligama',
          meals: 'Breakfast'
        },
        {
          day: 5,
          title: 'Coastal Relaxation & Authentic Ayurvedic Spa Massage',
          description: 'Spend the day unwinding by the pool or enjoying an authentic 90-minute Ayurvedic herbal oil massage treatment using ancient Sinhala medicinal traditions.',
          hotel: 'Cape Weligama / Fortress Resort',
          meals: 'Breakfast & Farewell Dinner'
        },
        {
          day: 6,
          title: 'Scenic Return to Colombo & Departure',
          description: 'Enjoy a leisurely breakfast before your chauffeur transfers you via the expressway directly to the airport for your flight home.',
          hotel: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },
    {
      id: 'grand-island-odyssey',
      title: 'Grand Island Odyssey: The Ultimate Sri Lanka',
      durationDays: 10,
      durationNights: 9,
      badge: 'Complete Experience',
      rating: 4.99,
      reviewsCount: 167,
      basePriceUSD: 1750,
      image: 'assets/images/yala-leopard.jpg',
      category: 'grand',
      summary: 'The all-inclusive island voyage spanning UNESCO ancient wonders, misty highland tea country, scenic train, Yala leopard safari, and tropical beach bliss.',
      route: 'Colombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya → Ella → Yala → Mirissa → Galle → Colombo',
      inclusions: [
        'All luxury accommodations (5-star & boutique heritage properties)',
        'Private chauffeur guide throughout with luxury SUV/Van',
        'All national park entrance fees, safari jeeps, and train tickets',
        'Daily gourmet breakfasts and chef-curated dining',
        'Sigiriya, Dambulla, Dalada Maligawa & Yala VIP access'
      ],
      exclusions: ['International flights', 'Sri Lanka tourist visa', 'Personal souvenirs'],
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Colombo Heritage Highlights',
          description: 'Welcome reception at airport. Brief tour of Colombo\'s colonial quarter, Gangaramaya Temple, and Lotus Tower before a restful evening.',
          hotel: 'Galle Face Hotel Colombo',
          meals: 'Welcome Dinner'
        },
        {
          day: 2,
          title: 'Sigiriya Rock Fortress Sunrise & Village Experience',
          description: 'Climb Sigiriya Fortress early in the morning. Afternoon bullock-cart and catamaran ride through a traditional dry-zone farming village with an authentic clay-pot curry feast.',
          hotel: 'Heritance Kandalama',
          meals: 'Breakfast & Traditional Lunch'
        },
        {
          day: 3,
          title: 'Polonnaruwa Medieval Ruins & Minneriya Elephant Gathering',
          description: 'Bicycle through Polonnaruwa ancient royal palaces. In the afternoon, head into Minneriya National Park to witness hundreds of wild elephants gathering around the ancient reservoir.',
          hotel: 'Heritance Kandalama',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Dambulla Caves to The Holy City of Kandy',
          description: 'Ascend to the cave monasteries of Dambulla. Explore Matale aromatic spice gardens and arrive in Kandy to attend the evening relic drum ceremony.',
          hotel: 'Kings Pavilion Kandy',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Royal Botanical Gardens & Misty Nuwara Eliya',
          description: 'Walk through Peradeniya Royal Botanical Gardens. Drive up the misty hills past Ramboda Falls to Nuwara Eliya. High tea at the Grand Hotel.',
          hotel: 'The Grand Hotel Nuwara Eliya',
          meals: 'Breakfast & High Tea'
        },
        {
          day: 6,
          title: 'Blue Train Ride to Ella & Nine Arch Bridge',
          description: 'Board the panoramic mountain train to Ella. Hike to Little Adam\'s Peak and Nine Arch Bridge to watch the evening train snake through the tea plantations.',
          hotel: '98 Acres Resort & Spa',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 7,
          title: 'Ella Gap to Yala Leopard Safari',
          description: 'Descend to Yala National Park for an afternoon 4x4 safari expedition into Block 1, the world\'s prime territory for wild Ceylon leopards.',
          hotel: 'Cinnamon Wild Yala',
          meals: 'Breakfast & Campfire Dinner'
        },
        {
          day: 8,
          title: 'Yala to Mirissa & Whale Watching Waters',
          description: 'Morning coastal drive to Mirissa. Relax along the turquoise waters, climb Coconut Tree Hill, and enjoy sunset cocktails on the beach.',
          hotel: 'Cape Weligama',
          meals: 'Breakfast & Seafood BBQ'
        },
        {
          day: 9,
          title: 'Galle Dutch Fort UNESCO Exploration',
          description: 'Discover the living 17th-century ramparts of Galle Fort, browse boutique jewelers, and enjoy a romantic final island dinner at an oceanfront veranda.',
          hotel: 'Fort Bazaar Galle',
          meals: 'Breakfast & Gala Dinner'
        },
        {
          day: 10,
          title: 'Farewell Sri Lanka & Airport Transfer',
          description: 'Expressway drive to Colombo Airport for your departure flight with hearts full of tropical memories.',
          hotel: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },
    {
      id: 'luxury-honeymoon-escape',
      title: 'Romantic Ceylon Luxury & Private Villas',
      durationDays: 8,
      durationNights: 7,
      badge: 'Luxury & Romance',
      rating: 5.0,
      reviewsCount: 84,
      basePriceUSD: 2390,
      image: 'assets/images/kandy-temple.jpg',
      category: 'luxury',
      summary: 'Private plunge pool villas, candlelit beach dinners, seaplane transfer options, and personalized butler service for couples.',
      route: 'Colombo → Sigiriya (Kandalama) → Tea Country → Tangalle & Galle',
      inclusions: [
        'Private luxury Mercedes-Benz chauffeur vehicle',
        '7 Nights in presidential pool villas (Heritance Kandalama, Ceylon Tea Trails, Amanwella)',
        'Private candlelit 5-course dinners with fine wine pairings',
        'Couples traditional Ayurvedic rejuvenation spa treatment',
        'Scenic seaplane or helicopter transfer upgrade available'
      ],
      exclusions: ['International flights', 'Personal shopping expenses'],
      itinerary: [
        {
          day: 1,
          title: 'Champagne Welcome & Transfer to Heritance Kandalama',
          description: 'Arrive in Sri Lanka with VIP Fast-Track airport clearance. Private chauffeur escort to Geoffrey Bawa\'s architectural masterwork nestled into the cliffside overlooking Kandalama lake.',
          hotel: 'Heritance Kandalama (Luxury Jacuzzi Suite)',
          meals: 'Champagne & Chef\'s Welcome Dinner'
        },
        {
          day: 2,
          title: 'Private Champagne Breakfast & Sigiriya VIP Tour',
          description: 'Ascend Sigiriya Lion Rock with a private senior archaeologist guide. Return to your resort for an afternoon couple’s massage and infinity pool relaxation.',
          hotel: 'Heritance Kandalama',
          meals: 'Breakfast & Lakefront Dinner'
        },
        {
          day: 3,
          title: 'Journey to the Iconic Ceylon Tea Trails',
          description: 'Travel into the golden valleys of Hatton to stay in an authentic restored British colonial tea planter bungalow with a dedicated private butler and lawn croquet.',
          hotel: 'Ceylon Tea Trails (Relais & Châteaux)',
          meals: 'All-inclusive gourmet dining & wines'
        },
        {
          day: 4,
          title: 'Private Tea Master Experience & Lake Kayaking',
          description: 'Trek through manicured tea hills with the resident planter. Savor rare single-origin Ceylon teas followed by gentle kayaking across Castlereagh reservoir.',
          hotel: 'Ceylon Tea Trails (Relais & Châteaux)',
          meals: 'All-inclusive gourmet dining'
        },
        {
          day: 5,
          title: 'South Coast Romance in Tangalle Ocean Sanctuary',
          description: 'Transfer south to a secluded oceanfront coconut grove. Unwind in your private plunge pool villa looking out over the turquoise waves.',
          hotel: 'Amanwella / Anantara Peace Haven Tangalle',
          meals: 'Breakfast & Candlelight Beach Dinner'
        },
        {
          day: 6,
          title: 'Private Catamaran Sail & Sunset Dolphin Cruise',
          description: 'Board a private luxury catamaran charter along the south coast bays. Enjoy swimming, paddleboarding, and canapes at sunset.',
          hotel: 'Amanwella Tangalle',
          meals: 'Breakfast & Seafood Feast'
        },
        {
          day: 7,
          title: 'Galle Fort Heritage Villa & Fine Dining',
          description: 'Private guided walking tour of Galle Fort with entry to private colonial mansions. Conclude with an exclusive wine-pairing dinner in the fort.',
          hotel: 'Amangalla / Fort Bazaar',
          meals: 'Breakfast & Farewell Dinner'
        },
        {
          day: 8,
          title: 'VIP Chauffeur Transfer to Airport',
          description: 'Enjoy a leisurely breakfast and private transfer to Colombo airport for departure.',
          hotel: 'Departure',
          meals: 'Breakfast'
        }
      ]
    }
  ],

  experiences: [
    {
      id: 'tea-tasting',
      title: 'Ceylon High-Grown Tea Tasting',
      icon: 'fa-mug-hot',
      description: 'Pluck tender two leaves and a bud with local tea harvesters and discover single-estate broken orange pekoes.',
      tag: 'Highlands'
    },
    {
      id: 'blue-train',
      title: 'The Legendary Kandy–Ella Rail',
      icon: 'fa-train',
      description: 'Voted the most scenic train journey on earth, snaking through mountain mists and pine-scented tea valleys.',
      tag: 'Iconic Travel'
    },
    {
      id: 'leopard-safari',
      title: 'Leopard & Elephant Safaris',
      icon: 'fa-paw',
      description: 'Track the majestic Panthera pardus kotiya in Yala and witness the Gathering of 300+ elephants in Minneriya.',
      tag: 'Wildlife'
    },
    {
      id: 'ayurveda-wellness',
      title: '5,000-Year-Old Ayurvedic Healing',
      icon: 'fa-spa',
      description: 'Revitalize mind and body with herbal steam baths, Shirodhara warm oil therapy, and natural medicinal herbs.',
      tag: 'Wellness'
    },
    {
      id: 'culinary-spices',
      title: 'Authentic Spice Gardens & Kottu',
      icon: 'fa-utensils',
      description: 'Savor fragrant Ceylon cinnamon, pepper, coconut sambol, hoppers, and the rhythmic beat of street food Kottu.',
      tag: 'Gastronomy'
    },
    {
      id: 'whale-surf',
      title: 'Blue Whales & Southern Surf Breaks',
      icon: 'fa-water',
      description: 'Encounter the colossal ocean giants of Mirissa and ride warm tropical reef breaks in Weligama and Arugam Bay.',
      tag: 'Ocean'
    }
  ],

  practicalInfo: [
    {
      title: 'Visa (ETA) Requirements',
      icon: 'fa-passport',
      desc: 'Most international travelers require an Electronic Travel Authorization (ETA) easily acquired online at eta.gov.lk before arrival. Valid for 30 days with 6 months passport validity.'
    },
    {
      title: 'Best Weather & Seasons',
      icon: 'fa-cloud-sun',
      desc: 'Sri Lanka has two distinct monsoon patterns, making it a true year-round destination: West/South coasts & Hill country are prime from Dec to April; East Coast (Trincomalee/Arugam Bay) shines from May to September.'
    },
    {
      title: 'Currency & Payments',
      icon: 'fa-money-bill-wave',
      desc: 'Local currency is Sri Lankan Rupee (LKR). Credit cards (Visa/Mastercard) are widely accepted in hotels, upscale restaurants, and major towns. Keep cash for rural stalls and tuk-tuks.'
    },
    {
      title: 'Health & Connectivity',
      icon: 'fa-wifi',
      desc: 'High-speed 4G/5G tourist SIM cards (Dialog / Mobitel) are available at Colombo Airport for ~$10 USD with generous 30GB+ data. No special malaria vaccination is required for standard tourist routes.'
    }
  ],

  faqs: [
    {
      q: 'Is Sri Lanka safe for solo, female, and family travelers?',
      a: 'Yes, absolutely. Sri Lanka is world-renowned for its warm hospitality, gentle culture, and safety. Millions of travelers visit every year. With our licensed private chauffeurs and 24/7 on-island concierge, you will enjoy effortless peace of mind.'
    },
    {
      q: 'Can all tour packages be customized to our preferences?',
      a: '100% yes! Every itinerary listed can be personalized. You can extend days, upgrade to presidential pool villas, add hot-air ballooning over Sigiriya, or tailor activities to your pace. Use our Custom Trip Builder below or contact our travel specialists.'
    },
    {
      q: 'What is included in the private chauffeur service?',
      a: 'Your tour includes a dedicated, English-speaking professional chauffeur guide licensed by the Sri Lanka Tourism Development Authority (SLTDA). It covers all fuel, expressway tolls, parking fees, and the chauffeur’s own meals and lodging.'
    },
    {
      q: 'What is the etiquette when visiting sacred temples in Sri Lanka?',
      a: 'When visiting Buddhist and Hindu temples (like Kandy Tooth Temple or Dambulla Caves), visitors should cover their shoulders and knees, remove shoes and hats before entering, and never take photos with their backs turned directly to Buddha statues.'
    },
    {
      q: 'How does the booking and payment process work?',
      a: 'You can submit an inquiry or book online through our platform. A travel designer confirms all hotel allocations and customized requests, followed by a secure 20% deposit to lock in dates. The remaining balance can be settled 14 days before arrival or upon landing.'
    }
  ]
};

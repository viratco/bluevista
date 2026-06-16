import { useState, useEffect } from 'react';
import './index.css';

// Google Ads conversion tracking helper
const fireGtagConversion = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { 'send_to': 'AW-16789293166/GY7rCO-j5owaEO6Q4cU-' });
  }
};

const DownArrow = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px' }}>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#d8c3a5" style={{ marginRight: '4px' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const roomsData = [
  {
    id: 1,
    name: 'Grand Deluxe Suite',
    tag: 'RECOMMENDED',
    price: 12500,
    size: '55 m²',
    capacity: '4 Guests',
    bed: '2 King Beds',
    bath: '2 Bathrooms',
    desc: 'Breathtaking views of the Ansal Golf Links valley. Combines modern warmth with contemporary Greater Noida boutique charm. Includes a fully stocked minibar, Nespresso coffee maker, and standard toiletries.',
    image: '/loft.png',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Coffee Machine', 'Room Service']
  },
  {
    id: 2,
    name: 'Prestige Suite',
    tag: 'POPULAR',
    price: 24000,
    size: '200 m²',
    capacity: '6 Guests',
    bed: '3 King Beds',
    bath: '3 Bathrooms',
    desc: 'Our flagship prestige residency. Ultimate spacious layout including separate living room, dining zone, and massive master bedrooms. Perfect for elite travelers or family gatherings.',
    image: '/testimonial_img.png',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Living Room', 'Mini Bar', 'Kitchenette', 'Private Balcony']
  },
  {
    id: 3,
    name: 'Signature Suite',
    tag: 'EXECUTIVE',
    price: 15000,
    size: '60 m²',
    capacity: '4 Guests',
    bed: '2 King Beds',
    bath: '1 Bathroom',
    desc: 'Specially designed suite featuring exquisite teakwood furnishings, warm mood lighting, and modern workspace. Ideal for premium corporate guests.',
    image: '/blue_vista_bed.png',
    features: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Work Desk', 'Mini Bar', 'Premium Toiletries']
  }
];

const menuData = {
  bakery: [
    { name: 'Warm Almond Croissant', price: 350, desc: 'House-made buttery pastry loaded with rich frangipane and toasted almond flakes.', veg: true },
    { name: 'Avocado Toast & Poached Eggs', price: 550, desc: 'Smashed organic Hass avocado, cherry tomatoes, and organic poached eggs on toasted artisanal sourdough.', veg: false },
    { name: 'Truffle Scrambled Brioche', price: 600, desc: 'Creamy slow-cooked eggs, shavings of black summer truffle, served on toasted buttery brioche.', veg: true }
  ],
  allday: [
    { name: 'Blue Vista Dal Bukhara', price: 850, desc: 'Our signature slow-cooked black lentils, simmered for 24 hours with vine-ripened tomatoes, cream, and organic butter.', veg: true, special: true },
    { name: 'Awadhi Paneer Lababdar', price: 750, desc: 'Cubes of fresh cottage cheese cooked in a rich, creamy tomato and cashew gravy flavored with green cardamom.', veg: true },
    { name: 'Bistro Gourmet Roast Chicken', price: 950, desc: 'Free-range half-chicken brined in fresh herbs, slow-roasted, and served with truffle mash and red wine jus.', veg: false },
    { name: 'Charred Salmon Steak', price: 1450, desc: 'Pan-seared Atlantic salmon served with green asparagus, heirloom tomatoes, and creamy lemon-butter sauce.', veg: false }
  ],
  drinks: [
    { name: 'Vistra Signature Cold Brew', price: 320, desc: 'Single-origin Arabica beans steeped for 18 hours, infused with pure vanilla bean extracts.', veg: true },
    { name: 'Rose & Elderflower Elixir', price: 420, desc: 'Artisanal mocktail with cold-pressed rose nectar, sparkling elderflower syrup, lime, and fresh mint.', veg: true, special: true },
    { name: 'Royal Kesaria Chai', price: 280, desc: 'Traditional slow-brewed Indian tea infused with premium Kashmiri saffron, cardamom, and fresh ginger.', veg: true }
  ]
};

function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/privacy-policy') {
      return 'privacy-policy';
    }
    return 'home';
  }); // 'home', 'availability', 'checkout', 'success', 'dining', 'amenities', 'privacy-policy'
  const [checkIn, setCheckIn] = useState('2026-05-17');
  const [checkOut, setCheckOut] = useState('2026-05-18');
  const [guests, setGuests] = useState('2 Adults, 0 Children');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [menuTab, setMenuTab] = useState('bakery');
  
  const [inquiryStatus, setInquiryStatus] = useState(''); // '', 'submitting', 'success', 'error'

  const handleInquirySubmit = async (e) => {
    if (e) e.preventDefault();
    setInquiryStatus('submitting');
    try {
      const formData = new FormData(e.target);
      // Web3Forms – reliable CORS-friendly form service (replaces formsubmit.co)
      // Get your free key at https://web3forms.com → enter thebluevista@gmail.com
      formData.append('access_key', 'ca1ea479-59ef-465d-9647-94a23a7ed025');
      formData.append('subject', 'New Inquiry – The Blue Vista Hotel');
      formData.append('from_name', 'The Blue Vista Website');
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setInquiryStatus('success');
        fireGtagConversion(); // Fire conversion on successful inquiry submission
      } else {
        setInquiryStatus('error');
      }
    } catch (err) {
      setInquiryStatus('error');
    }
  };

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/privacy-policy') {
        setView('privacy-policy');
      } else {
        setView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL pathname with view state
  useEffect(() => {
    if (view === 'privacy-policy') {
      if (window.location.pathname !== '/privacy-policy') {
        window.history.pushState(null, '', '/privacy-policy');
      }
    } else {
      if (window.location.pathname === '/privacy-policy') {
        window.history.pushState(null, '', '/');
      }
    }
  }, [view]);

  // Auto-scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const getNightsCount = (inDate, outDate) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return isNaN(diffDays) || diffDays <= 0 ? 1 : diffDays;
  };

  const nights = getNightsCount(checkIn, checkOut);

  const handleCheckAvailability = (e) => {
    if (e) e.preventDefault();
    setView('availability');
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* GLOBAL NAVBAR / HEADER */}
      <div className={`hero-container ${view !== 'home' ? 'subpage-header' : ''}`} style={{ minHeight: view === 'home' ? '100vh' : 'auto', height: view === 'home' ? 'auto' : '150px' }}>
        <div className="top-bar">
          <div className="top-left">CB-008, Omega 1, Block C, Ansal Golf Links 1, Greater Noida, UP 201310</div>
          <div className="top-right">
            <span>TEL: +91 85278 47888</span>
            <span>THEBLUEVISTA@GMAIL.COM</span>
          </div>
        </div>

        <header className="navbar">
          <div className="nav-left">
            <div className="hamburger" onClick={() => setView('home')}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="nav-links">
              <span className={view === 'home' ? 'active-tab' : ''} onClick={() => setView('home')}>HOME <DownArrow /></span>
              <span className={view === 'availability' ? 'active-tab' : ''} onClick={() => setView('availability')}>ROOMS <DownArrow /></span>
              <span className={view === 'dining' ? 'active-tab' : ''} onClick={() => setView('dining')}>DINING (VISTRA BISTRO) <DownArrow /></span>
              <span className={view === 'amenities' ? 'active-tab' : ''} onClick={() => setView('amenities')}>AMENITIES <DownArrow /></span>
              <span className={view === 'travel-tours' ? 'active-tab' : ''} onClick={() => setView('travel-tours')}>TRAVEL & TOURS <DownArrow /></span>
            </div>
          </div>

          <div className="logo-container" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
            <h1 className="logo-text" style={{ fontSize: '1.2rem', letterSpacing: '0.15em' }}>THE BLUE VISTA</h1>
            <div className="stars">★★★★★</div>
          </div>

          <div className="nav-right">
            <span className="lang-toggle">EN / FR</span>
            <div className="nav-dropdown">
              <button className="nav-btn">Book Online</button>
              <div className="nav-dropdown-content">
                <a 
                  href="https://www.makemytrip.com/hotels/the_blue_vista-details-greater_noida.html?cmp=SEM%7CD%7CDH%7CG%7CDSA%7CDH_DSA_Mobile%7CPmax&gad_source=1&gad_campaignid=21268867335&gbraid=0AAAAAD5Az1TapmHCvoV9CcpHhTNPxP2C5&gclid=CjwKCAjw6MPRBhBTEiwAd-7Mrwam3BnLZQJ750wnUv8WbhsIZ_OWnxy5nIAraTFxByjwQ5FvPG53OhoCkUUQAvD_BwE"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fireGtagConversion}
                >
                  MakeMyTrip
                </a>
                <a 
                  href="https://www.agoda.com/en-in/the-blue-vista/hotel/new-delhi-and-ncr-in.html?countryId=35&finalPriceView=1&isShowMobileAppPrice=false&cid=1922866&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2026-06-25&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=INR&isFreeOccSearch=false&tag=dd2e710e-88c4-4639-9c69-76f32ba50e6b&los=1&searchrequestid=1cb9b50e-af2b-4137-ab68-21355b4a5b2c&ds=Uf0OZ3yYg%2F%2B%2F%2Fs%2BW"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={fireGtagConversion}
                >
                  Agoda
                </a>
              </div>
            </div>
          </div>
        </header>

        {view === 'home' && (
          <main className="main-content">
            <p className="welcome-text">WELCOME TO THE BLUE VISTA HOTEL, A LUXURY EXPERIENCE</p>
            <h2 className="main-heading">YOUR NEXT BOUTIQUE<br />APARTMENTS</h2>

            <form onSubmit={handleCheckAvailability} className="booking-bar">
              <div className="booking-item">
                <span className="label">Check In</span>
                <input 
                  type="date" 
                  value={checkIn} 
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckIn(e.target.value)} 
                  className="booking-input-field" 
                  required
                />
              </div>
              <div className="booking-item">
                <span className="label">Check Out</span>
                <input 
                  type="date" 
                  value={checkOut} 
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)} 
                  className="booking-input-field" 
                  required
                />
              </div>
              <div className="booking-item">
                <span className="label">Guests</span>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  className="booking-input-field select-field"
                >
                  <option value="1 Adult, 0 Children">1 Adult</option>
                  <option value="2 Adults, 0 Children">2 Adults</option>
                  <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                  <option value="4 Adults, 2 Children">4 Guests</option>
                  <option value="6 Guests Max">6 Guests Max</option>
                </select>
              </div>
              <div className="booking-item check-avail-container">
                <button type="submit" className="check-avail-btn">Check Availability</button>
              </div>
            </form>
          </main>
        )}
      </div>

      {/* VIEW: HOME VIEW (REMAINDER OF HOMEPAGE) */}
      {view === 'home' && (
        <>
          <section className="about-section">
            <div className="about-images">
              <img src="/blue_vista_bed.png" alt="Boutique Luxury Suite" className="img-main" />
              <img src="/blue_vista_img2.png" alt="Guest Suite Corridor" className="img-overlay" />
            </div>
            <div className="about-content">
              <p className="subtitle">STAY IN THE HEART OF GREATER NOIDA</p>
              <h2 className="about-heading">Luxury furnished<br/>rooms & suites<br/>at Blue Vista</h2>
              <p className="about-desc">
                With over 17 years of experience in the hospitality industry, The Blue Vista Hotel is dedicated to delivering exceptional service and creating memorable stays. The hotel offers a blend of modern elegance and traditional warmth, making it a preferred choice for both business and leisure travelers. We proudly offer a full range of complimentary amenities and services that provide you with everything you need for an inspiring stay.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('availability')}>Start Exploring</button>
            </div>
          </section>

          <section className="dining-section">
            <div className="dining-left">
              <img src="/blue_vista_img3.png" alt="Vistra Bistro Gastronomy" className="dining-main-img" />
            </div>
            <div className="dining-right">
              <div className="dining-content">
                <p className="subtitle">CULINARY EXCELLENCE AT BLUE VISTA</p>
                <h2 className="dining-heading">A taste of luxury with our signature dining</h2>
                <p className="dining-desc">
                  Indulge in a diverse array of culinary delights prepared by our master chefs. Our on-site restaurant and artisanal cafe, <strong>Vistra Bistro</strong>, offers a vibrant mix of authentic local Indian flavors and exquisite international cuisines. Whether you are enjoying a lavish buffet breakfast, a business lunch, or an intimate dinner, every meal is crafted to perfection.
                </p>
                <button className="start-exploring-btn" onClick={() => setView('dining')}>Start Exploring</button>
              </div>
              <img src="/food.png" alt="Gourmet Dish" className="dining-food-img" />
            </div>
          </section>

          <section className="services-section">
            <div className="services-content">
              <p className="subtitle">PREMIUM SERVICES & AMENITIES</p>
              <h2 className="services-heading">Everything you need for<br/>a comfortable stay.</h2>
              <p className="services-desc">
                Our property is designed with your utmost comfort in mind. Enjoy high-speed<br/>
                complimentary Wi-Fi, 24/7 room service, secure parking, fully air-conditioned rooms, and<br/>
                our dedicated staff ready to assist you around the clock.
              </p>
            </div>
          </section>

          <section className="facilities-grid">
            <div className="grid-item img-item">
              <img src="/blue_vista_img1.png" alt="Celebration at Blue Vista Banquet" />
            </div>
            <div className="grid-item text-item">
              <p className="subtitle">BANQUETS & CELEBRATIONS</p>
              <h3 className="grid-heading">Elegant Banquet Hall</h3>
              <p className="grid-desc">
                Our stunning banquet hall provides the perfect space for family reunions, milestone birthdays, corporate awards, and luxury social gatherings in Greater Noida.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>

            <div className="grid-item text-item">
              <p className="subtitle">OUTDOOR LIVING</p>
              <h3 className="grid-heading">Lush Garden Terrace</h3>
              <p className="grid-desc">
                Unwind on our beautifully landscaped outdoor garden terrace and patio. The perfect spot to enjoy high tea, read, or catch a tranquil sunset over the Ansal Golf Links valley.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>
            <div className="grid-item img-item">
              <img src="/blue_vista_terrace.png" alt="Lush Garden Terrace and Outdoor Lounge" />
            </div>

            <div className="grid-item img-item">
              <img src="/blue_vista_lounge.png" alt="Modern Business Lounge Workstation" />
            </div>
            <div className="grid-item text-item">
              <p className="subtitle">EXECUTIVE SPACE</p>
              <h3 className="grid-heading">Modern Business Lounge</h3>
              <p className="grid-desc">
                A quiet, professional workspace equipped with secure high-speed Wi-Fi, elegant wooden furnishings, and complete business services to ensure seamless productivity.
              </p>
              <button className="start-exploring-btn" onClick={() => setView('amenities')}>Discover More</button>
            </div>
          </section>

          <section className="hospitality-section">
            <div className="hospitality-container">
              <div className="hospitality-content">
                <p className="subtitle">HIGH STANDARDS OF HOSPITALITY</p>
                <h2 className="hospitality-heading">
                  We strive to provide our<br />
                  guests with luxury, comfort<br />
                  & tailor-made service.
                </h2>
              </div>
            </div>
          </section>

          <section className="testimonial-section">
            <div className="testimonial-left">
              <img src="/testimonial_img.png" alt="Stylish interior with armchair" />
            </div>
            <div className="testimonial-right">
              <div className="testimonial-right-content">
                <div className="testimonial-stars">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
                <p className="testimonial-text">
                  "Brilliant staff and exceptional customer service. The place is fantastic. Great facilities and atmosphere. Buffet breakfast daily is very generous."
                </p>
                <div className="testimonial-author">
                  <p className="author-name">Luna Wayne</p>
                  <p className="author-source">TRIPADVISOR</p>
                </div>
                <div className="testimonial-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </section>

          <section className="discover-section">
            <div className="discover-header">
              <p className="subtitle">EXPLORE GREATER NOIDA</p>
              <h2 className="discover-heading">Discover The Surroundings</h2>
              <p className="discover-desc">
                The Blue Vista Hotel is strategically located near major business hubs and attractions. Immerse yourself in the local culture, attend events at the Expo Mart, or enjoy a relaxing stroll.
              </p>
            </div>

            <div className="discover-grid">
              <div className="discover-card">
                <div className="card-badge">RECOMMENDED</div>
                <div className="card-img-wrapper">
                  <img src="/expomart_actual.jpg" alt="India Expo Centre Greater Noida" />
                </div>
                <div className="card-content">
                  <p className="subtitle">BUSINESS & EVENTS</p>
                  <h3 className="card-heading">India Expo Centre</h3>
                  <p className="card-desc">
                    Located just a short drive away, the India Expo Centre and Mart is the premier venue for international exhibitions, trade fairs, and large-scale corporate events.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>

              <div className="discover-card offset-card">
                <div className="card-img-wrapper">
                  <img src="/park.png" alt="Nearby Parks" />
                </div>
                <div className="card-content">
                  <p className="subtitle">LOCAL ATTRACTIONS</p>
                  <h3 className="card-heading">Pari Chowk</h3>
                  <p className="card-desc">
                    The iconic Pari Chowk is the heart of Greater Noida. Enjoy the beautifully landscaped surroundings and seamless connectivity to shopping malls and entertainment zones.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>

              <div className="discover-card">
                <div className="card-img-wrapper">
                  <img src="/food_tour.png" alt="Local Food Tour" />
                </div>
                <div className="card-content">
                  <p className="subtitle">DINING EXPERIENCES</p>
                  <h3 className="card-heading">Local Flavors</h3>
                  <p className="card-desc">
                    Discover the rich culinary heritage of Uttar Pradesh. From bustling local street food markets to upscale dining near Ansal Golf Links, there is something to satisfy every palate.
                  </p>
                  <a href="#" className="card-link">DISCOVER MORE &gt;</a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* VIEW: AVAILABILITY ROOM SEARCH RESULTS */}
      {view === 'availability' && (
        <div className="availability-page animate-fade-in">

          <div className="availability-layout">
            {/* Rooms List Column */}
            <div className="rooms-list-column">
              <h2 className="section-title">Available Accommodations</h2>
              <p className="section-subtitle">Choose from our premium selected rooms & suites below</p>
              
              <div className="rooms-search-grid">
                {roomsData.map(room => (
                  <div key={room.id} className={`room-search-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}>
                    {room.tag && <span className="room-card-tag">{room.tag}</span>}
                    <div className="room-card-img">
                      <img src={room.image} alt={room.name} />
                    </div>
                    <div className="room-card-body">
                      <div className="room-card-header">
                        <h3>{room.name}</h3>
                      </div>
                      
                      <div className="room-card-specs">
                        <span><strong>Size:</strong> {room.size}</span>
                        <span><strong>Capacity:</strong> {room.capacity}</span>
                        <span><strong>Beds:</strong> {room.bed}</span>
                        <span><strong>Baths:</strong> {room.bath}</span>
                      </div>
                      
                      <p className="room-card-desc">{room.desc}</p>
                      
                      <div className="room-card-features">
                        {room.features.slice(0, 4).map((f, i) => (
                          <span key={i} className="feature-pill">{f}</span>
                        ))}
                      </div>

                      <div className="room-card-footer">
                        <button 
                          className={`select-room-btn ${selectedRoom?.id === room.id ? 'active' : ''}`}
                          onClick={() => handleRoomSelect(room)}
                        >
                          {selectedRoom?.id === room.id ? 'Selected ✓' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar Reservation Details */}
            <div className="reservation-sidebar">
              <div className="sticky-sidebar-card">
                <h3>Your Reservation</h3>
                <div className="divider"></div>
                
                <div className="res-details">
                  <div className="res-row">
                    <span className="label">Check In:</span>
                    <span className="val">{checkIn}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Check Out:</span>
                    <span className="val">{checkOut}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Duration:</span>
                    <span className="val">{nights} {nights > 1 ? 'Nights' : 'Night'}</span>
                  </div>
                  <div className="res-row">
                    <span className="label">Guests:</span>
                    <span className="val">{guests}</span>
                  </div>
                </div>

                {selectedRoom ? (
                  <div className="selected-room-pricing">
                    <div className="divider"></div>
                    <div className="selected-room-info">
                      <h4>{selectedRoom.name}</h4>
                    </div>
                    
                    <div className="divider"></div>
                    <h4 style={{ fontSize: '0.75rem', color: '#a0a0a0', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Book Online</h4>
                    
                    <a 
                      href="https://www.makemytrip.com/hotels/the_blue_vista-details-greater_noida.html?cmp=SEM%7CD%7CDH%7CG%7CDSA%7CDH_DSA_Mobile%7CPmax&gad_source=1&gad_campaignid=21268867335&gbraid=0AAAAAD5Az1TapmHCvoV9CcpHhTNPxP2C5&gclid=CjwKCAjw6MPRBhBTEiwAd-7Mrwam3BnLZQJ750wnUv8WbhsIZ_OWnxy5nIAraTFxByjwQ5FvPG53OhoCkUUQAvD_BwE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proceed-checkout-btn"
                      onClick={fireGtagConversion}
                      style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', padding: 0, marginTop: '0.5rem' }}
                    >
                      Book via MakeMyTrip
                    </a>
                    
                    <a 
                      href="https://www.agoda.com/en-in/the-blue-vista/hotel/new-delhi-and-ncr-in.html?countryId=35&finalPriceView=1&isShowMobileAppPrice=false&cid=1922866&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2026-06-25&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=-1&showReviewSubmissionEntry=false&currencyCode=INR&isFreeOccSearch=false&tag=dd2e710e-88c4-4639-9c69-76f32ba50e6b&los=1&searchrequestid=1cb9b50e-af2b-4137-ab68-21355b4a5b2c&ds=Uf0OZ3yYg%2F%2B%2F%2Fs%2BW"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proceed-checkout-btn"
                      onClick={fireGtagConversion}
                      style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', padding: 0, marginTop: '0.75rem', background: 'transparent', border: '1px solid #d8c3a5', color: '#d8c3a5' }}
                    >
                      Book via Agoda
                    </a>

                    <div className="divider" style={{ margin: '1.5rem 0 1rem 0' }}></div>
                    <h4 style={{ fontSize: '0.75rem', color: '#a0a0a0', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Direct Inquiry</h4>
                    
                    <a 
                      href={`mailto:thebluevista@gmail.com?subject=Booking Inquiry for ${selectedRoom.name}&body=Hello Blue Vista Concierge,%0D%0A%0D%0AI would like to inquire about booking the ${selectedRoom.name} for the following dates:%0D%0ACheck-In: ${checkIn}%0D%0ACheck-Out: ${checkOut}%0D%0AGuests: ${guests}%0D%0A%0D%0APlease let me know availability and booking details.`}
                      className="checkout-back-btn"
                      onClick={fireGtagConversion}
                      style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', padding: 0, border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Inquire via Email
                    </a>
                    
                    <a 
                      href={`https://wa.me/918527847888?text=Hello%20Blue%20Vista%20Concierge!%20I%20would%20like%20to%20inquire%20about%20booking%20the%20${encodeURIComponent(selectedRoom.name)}%20from%20${checkIn}%20to%20${checkOut}%20for%20${encodeURIComponent(guests)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="checkout-back-btn"
                      onClick={fireGtagConversion}
                      style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', marginTop: '0.75rem', padding: 0, border: '1px solid #25D366', color: '#25D366', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Inquire via WhatsApp
                    </a>
                  </div>
                ) : (
                  <div className="no-room-selected">
                    <div className="divider"></div>
                    <p>Please select a room from the list to proceed with booking.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED DINING PAGE (VISTRA BISTRO) */}
      {view === 'dining' && (
        <div className="dining-page animate-fade-in">
          {/* Subpage Hero Banner */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0.95)), url("/restaurant.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">ARTISANAL CAFE & FINE DINING</p>
              <h1 className="subpage-title">Vistra Bistro</h1>
              <p className="hero-desc">Indulge in a sensory journey of rich single-origin coffees, handcrafted confectionery, and local gourmet masterworks at Greater Noida's signature culinary sanctuary.</p>
            </div>
          </div>

          <div className="dining-main-layout">
            <div className="menu-selection-section">
              <div className="menu-header">
                <h2>Our Gastronomy Menu</h2>
                <p>Meticulously curated options spanning breakfast delicacies, rich entrees, and cold craft brews.</p>
                
                {/* Custom Tab Toggles */}
                <div className="menu-tabs">
                  <button className={menuTab === 'bakery' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('bakery')}>Breakfast & Patisserie</button>
                  <button className={menuTab === 'allday' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('allday')}>All-Day Fine Dining</button>
                  <button className={menuTab === 'drinks' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMenuTab('drinks')}>Brews & Mocktails</button>
                </div>
              </div>

              {/* Menu Grid Listings */}
              <div className="menu-grid">
                {menuData[menuTab].map((item, idx) => (
                  <div key={idx} className="menu-card">
                    <div className="menu-card-top">
                      <div className="item-title-row">
                        <h4>{item.name}</h4>
                        {item.veg ? <span className="diet-indicator veg" title="Vegetarian">●</span> : <span className="diet-indicator non-veg" title="Non-Vegetarian">▲</span>}
                        {item.special && <span className="menu-badge">CHEF SPECIAL</span>}
                      </div>
                      <span className="item-price">{formatPrice(item.price)}</span>
                    </div>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Reservation Info Section */}
            <div className="table-reservation-section">
              <div className="sticky-sidebar-card glass-morphic">
                <h3>Vistra Bistro Dining</h3>
                <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>Secure your sitting room or garden terrace overlook table at Vistra Bistro.</p>
                <div className="divider"></div>
                
                <div className="dining-info-details" style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#cccccc' }}>
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#d8c3a5' }}>HOURS:</span>
                    <span>07:00 AM - 11:30 PM</span>
                  </div>
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#d8c3a5' }}>CUISINE:</span>
                    <span>Local Indian & International Gourmet</span>
                  </div>
                  <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{ color: '#d8c3a5' }}>DRESS CODE:</span>
                    <span>Smart Casual</span>
                  </div>
                  
                  <div className="divider" style={{ margin: '1.5rem 0' }}></div>
                  
                  <h4 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '0.75rem' }}>Table Reservations</h4>
                  <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>
                    We welcome walk-ins, but highly recommend securing a table in advance, especially for dinner and weekend brunches.
                  </p>
                  
                  <a href="tel:+918527847888" className="proceed-checkout-btn" onClick={fireGtagConversion} style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', padding: 0 }}>
                    Call Concierge to Reserve
                  </a>
                  
                  <a href="mailto:thebluevista@gmail.com?subject=Vistra Bistro Table Reservation Inquiry" className="checkout-back-btn" onClick={fireGtagConversion} style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', marginTop: '0.75rem', padding: 0 }}>
                    Inquire via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED AMENITIES PAGE (SPA, Event Rooms, Gym) */}
      {view === 'amenities' && (
        <div className="amenities-page animate-fade-in">
          {/* Subpage Hero */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.6), rgba(5, 5, 5, 0.95)), url("/blue_vista_terrace.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">LUXURY AMENITIES & MEETING HALLS</p>
              <h1 className="subpage-title">Facilities & Experiences</h1>
              <p className="hero-desc">Experience our tailored services. From high tea on our lush garden terrace patio to modern meeting boardrooms and standard business lounge hubs.</p>
            </div>
          </div>

          <div className="amenities-layout-grid">
            {/* Left Content detailing Spa, Gym, Events */}
            <div className="amenities-cards-column">
              
              {/* Card 1: Lush Garden Terrace & Patio */}
              <div className="amenity-detail-card">
                <img src="/blue_vista_terrace.png" alt="Lush Garden Terrace and Outdoor Lounge" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">OUTDOOR LIVING</span>
                  <h2>Lush Garden Terrace & Patio</h2>
                  <p className="card-lead">Unwind on our beautifully landscaped outdoor garden terrace and patio.</p>
                  <p className="card-body-text">
                    Nestled overlooking the scenic Ansal Golf Links valley, our lush garden terrace offers a refreshing escape under the open Greater Noida sky. Enjoy single-origin cold brews or traditional slow-brewed kesaria chai from Vistra Bistro in a tranquil outdoor setting, perfect for reading, casual meetings, or watching the sunset.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Hours:</strong> 06:00 AM - 11:00 PM</span>
                    <span><strong>Services:</strong> High Tea, Sunset View, Outdoor Seating</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Modern Meeting Spaces */}
              <div className="amenity-detail-card">
                <img src="/blue_vista_img1.png" alt="Celebration at Blue Vista Banquet" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">BUSINESS & CELEBRATIONS</span>
                  <h2>Boutique Boardrooms & Event Halls</h2>
                  <p className="card-lead">Seamless coordination and contemporary aesthetics for events of distinction.</p>
                  <p className="card-body-text">
                    Equipped with high-performance digital displays, professional acoustic lining, and ultra-high-speed Wi-Fi, our business hubs are tailored to meet executive demands. Accommodates boardroom workshops, corporate negotiations, and private evening banquets featuring gourmet catering directly from <strong>Vistra Bistro</strong>.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Capacity:</strong> Up to 150 Delegates</span>
                    <span><strong>Equipped:</strong> HD Projectors, Hybrid Meet Hubs, Custom Catering</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Modern Business Lounge */}
              <div className="amenity-detail-card">
                <img src="/blue_vista_lounge.png" alt="Modern Business Lounge Workstation" className="amenity-card-hero-img" />
                <div className="amenity-card-content">
                  <span className="card-tag">EXECUTIVE SERVICES</span>
                  <h2>Modern Business Lounge</h2>
                  <p className="card-lead">Maintain seamless professional productivity with our standard business lounge workstation.</p>
                  <p className="card-body-text">
                    Equipped with ergonomic seating, secure high-speed Wi-Fi, and standard workstations, our business lounge provides a quiet environment to focus. Perfect for business travelers who require photocopying, document printing, or quick executive standups.
                  </p>
                  <div className="amenity-specs">
                    <span><strong>Hours:</strong> 24 Hours (Residents)</span>
                    <span><strong>Equipped:</strong> Secure Wi-Fi, Workstations, Printing/Scanning</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Booking / Inquiries Column */}
            <div className="amenities-inquiry-column">
              <div className="sticky-sidebar-card glass-morphic">
                <h3>Private Bookings</h3>
                <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>Schedule boardrooms, host private events, or request custom terrace catering layouts.</p>
                <div className="divider"></div>

                <div className="amenities-info-details" style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#cccccc' }}>
                  <h4 style={{ color: '#d8c3a5', fontFamily: "'Playfair Display', serif", fontSize: '1rem', marginBottom: '0.5rem' }}>Boardroom Bookings</h4>
                  <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.25rem' }}>
                    Boardrooms are available for hourly or full-day bookings. High-speed fiber internet and custom Vistra Bistro catering are fully included upon request.
                  </p>

                  <h4 style={{ color: '#d8c3a5', fontFamily: "'Playfair Display', serif", fontSize: '1rem', marginBottom: '0.5rem' }}>Terrace Gatherings</h4>
                  <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '1.5rem' }}>
                    The outdoor Garden Terrace patio can be reserved for private high tea gatherings or elegant evening cocktails of up to 40 guests.
                  </p>

                  <div className="divider" style={{ margin: '1.5rem 0' }}></div>

                  <a href="tel:+918527847888" className="proceed-checkout-btn" onClick={fireGtagConversion} style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', padding: 0 }}>
                    Contact Tours & Events
                  </a>

                  <a href="mailto:thebluevista@gmail.com?subject=Private Event & Boardroom Booking Inquiry" className="checkout-back-btn" onClick={fireGtagConversion} style={{ display: 'block', textDecoration: 'none', textAlign: 'center', lineHeight: '45px', height: '45px', marginTop: '0.75rem', padding: 0 }}>
                    Send Booking Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DEDICATED TRAVEL & TOURS SUPPORT HUB */}
      {view === 'travel-tours' && (
        <div className="support-page animate-fade-in">
          {/* Subpage Hero Banner */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.65), rgba(5, 5, 5, 0.95)), url("/hospitality_bg.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">EXCEPTIONAL GUEST SERVICES</p>
              <h1 className="subpage-title">Travel & Tours</h1>
              <p className="hero-desc">Elevate your stay at The Blue Vista with our dedicated on-site travel logistics assistance and curated local heritage sightseeing excursions.</p>
            </div>
          </div>

          <div className="support-pillars">
            {/* Pillar 1: Travel & Tour Assistance */}
            <div className="support-pillar-card">
              <span className="subtitle">LOGISTICS RESOURCE</span>
              <h2>Transit & Logistics</h2>
              <p className="pillar-lead">Hassle-free airport transfers, private chauffeur services, and local luxury transits.</p>
              <p className="pillar-body-text">
                Explore Greater Noida and the NCR region with peace of mind. Our travel desk helps active residents book high-end private transits, procure immediate event passes for the nearby India Expo Centre, and hire curated day transits.
              </p>
              <ul className="support-benefits-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Seamless airport pickups & drop-offs
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Private luxury chauffeur hire & luxury transits
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  India Expo Centre priority transport slots
                </li>
              </ul>
              <div className="pillar-footer-info">
                <span>HOURS: 24/7 CONCIERGE</span>
                <span>DESK EXTENSION: 104</span>
              </div>
            </div>

            {/* Pillar 2: Tours & Sightseeing */}
            <div className="support-pillar-card">
              <span className="subtitle">EXCURSIONS & GUIDES</span>
              <h2>Tours & Sightseeing</h2>
              <p className="pillar-lead">Curated local day trips, heritage monument tours, and multilingual private guides.</p>
              <p className="pillar-body-text">
                Discover the rich heritage and vibrant culture surrounding Greater Noida, Agra, Mathura, Vrindavan, and Delhi. Our dedicated tours desk organizes customized itineraries, secures priority monument entries, and pairs you with certified local storytelling experts.
              </p>
              <ul className="support-benefits-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Taj Mahal & Agra Fort express private day tours
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Mathura & Vrindavan holy temple heritage excursions
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Certified multilingual guides & priority entries
                </li>
              </ul>
              <div className="pillar-footer-info">
                <span>HOURS: 07:00 AM - 11:00 PM</span>
                <span>DESK EXTENSION: 109</span>
              </div>
            </div>
          </div>

          {/* Excursions & Experience Showcase */}
          <section className="gear-showcase-section">
            <div className="showcase-title-area">
              <p className="subtitle">EXPLORE & DISCOVER</p>
              <h2>Curated Tours & Sightseeing</h2>
              <p>Select from our popular tailored excursions and tour bookings, organized directly by our expert hospitality team.</p>
            </div>
            
            <div className="gear-logo-grid">
              <div className="gear-logo-card">
                <div className="logo-symbol">🛕</div>
                <h3>Mathura Heritage</h3>
                <span>Krishna Janmabhoomi Tour</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">🦚</div>
                <h3>Vrindavan Spiritual</h3>
                <span>Holy Temples Trail</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">🕌</div>
                <h3>Agra & Taj Mahal</h3>
                <span>Wonder of the World Tour</span>
              </div>
              <div className="gear-logo-card">
                <div className="logo-symbol">🏢</div>
                <h3>Expo Mart Express</h3>
                <span>Priority Passes & Shuttle</span>
              </div>
            </div>
          </section>

          {/* Call to Action Support Request Banner */}
          <section className="support-cta-banner">
            <div className="cta-banner-content">
              <p className="subtitle">DIRECT CONCIERGE ASSISTANCE</p>
              <h2>Need Travel Assistance or Tour Bookings?</h2>
              <p>Active residents can request premium airport transfers, book certified tour guides, day excursions, or secure priority Expo Mart passes instantly. Our concierge team will organize your custom itinerary immediately.</p>
              
              <a href="tel:+918527847888" className="start-exploring-btn" onClick={fireGtagConversion} style={{ display: 'inline-block', textDecoration: 'none', marginRight: '1rem', lineHeight: '45px', height: '45px', padding: '0 2.5rem' }}>
                Call Travel Desk
              </a>
              
              <a href="mailto:thebluevista@gmail.com?subject=Travel & Tour Concierge Inquiry" className="start-exploring-btn" onClick={fireGtagConversion} style={{ display: 'inline-block', textDecoration: 'none', lineHeight: '45px', height: '45px', padding: '0 2.5rem', background: 'transparent', border: '1px solid #d8c3a5', color: '#d8c3a5' }}>
                Email Travel Desk
              </a>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: PRIVACY POLICY */}
      {view === 'privacy-policy' && (
        <div className="privacy-page animate-fade-in" style={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
          {/* Subpage Hero Banner */}
          <div className="subpage-hero" style={{ backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.7), rgba(5, 5, 5, 0.95)), url("/hospitality_bg.png")' }}>
            <div className="hero-inner">
              <p className="subtitle">LEGAL INFORMATION</p>
              <h1 className="subpage-title" style={{ fontSize: '3rem' }}>Privacy Policy</h1>
              <p className="hero-desc">UD Hospitality</p>
            </div>
          </div>

          <div className="privacy-content-layout" style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem', lineHeight: '1.8', color: '#cccccc' }}>
            <p style={{ color: '#d8c3a5', fontSize: '0.9rem', marginBottom: '2rem' }}>Last Updated: June 3, 2026</p>
            
            <p style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
              At UD Hospitality, we respect your privacy and are committed to protecting the personal information of our guests, website visitors, and customers. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, contact us, or book our services.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>1. Information We Collect</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Postal address</li>
              <li>Booking and reservation details</li>
              <li>Payment-related information</li>
              <li>Identification details required during check-in</li>
              <li>Information voluntarily provided through contact forms or inquiries</li>
            </ul>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>2. How We Use Your Information</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>Process hotel reservations and bookings</li>
              <li>Provide hospitality and accommodation services</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Send booking confirmations and service-related communications</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>3. Sharing of Information</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              UD Hospitality does not sell, rent, or trade personal information to third parties.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>4. Data Security</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              We implement reasonable technical and organizational security measures to protect personal information from unauthorized access, disclosure, alteration, or destruction.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>5. Cookies and Website Analytics</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              Our website may use cookies and similar technologies to improve functionality, analyze traffic, and enhance user experience.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>6. Data Retention</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              We retain customer information only for as long as necessary to provide services and comply with legal obligations.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>7. Third-Party Links</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>8. Your Rights</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion where legally permissible</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>9. Children's Privacy</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              Our services are not intended for children under the age of 18 without parental supervision.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>10. Changes to This Privacy Policy</h2>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
              We may update this Privacy Policy from time to time.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.6rem', marginTop: '3rem', marginBottom: '1rem', fontWeight: '400' }}>11. Contact Us</h2>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <strong>UD Hospitality</strong><br />
              CB-0008, Golf Link-I, Greater Noida,<br />
              Gautam Buddha Nagar, Uttar Pradesh, India
            </p>
          </div>
        </div>
      )}

      {/* GLOBAL FOOTER */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2 className="footer-logo" style={{ fontSize: '1.8rem' }}>The Blue Vista</h2>
              <p className="footer-desc">
                With over 17 years of experience in the hospitality industry, The Blue Vista Hotel is dedicated to delivering exceptional service and creating memorable stays.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-title">Explore</h3>
              <ul>
                <li onClick={() => setView('availability')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('availability'); }}>Our Rooms</a></li>
                <li onClick={() => setView('dining')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('dining'); }}>Dining Experiences</a></li>
                <li onClick={() => setView('amenities')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('amenities'); }}>Wellness & Spa</a></li>
                <li onClick={() => setView('travel-tours')} style={{ cursor: 'pointer' }}><a onClick={(e) => { e.preventDefault(); setView('travel-tours'); }}>Travel & Tours Support</a></li>
                <li><a href="#">Local Tours</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-title">Contact</h3>
              <p>CB-008, Omega 1, Block C<br/>Ansal Golf Links 1, Greater Noida, UP 201310</p>
              <p className="contact-detail"><span>T:</span> +91 85278 47888</p>
              <p className="contact-detail"><span>E:</span> thebluevista@gmail.com</p>
            </div>
            
            <div className="footer-inquiry">
              <h3 className="footer-title">Quick Inquiry</h3>
              {inquiryStatus === 'success' ? (
                <div className="inquiry-success-message animate-fade-in" style={{ padding: '1.5rem', background: 'rgba(216, 195, 165, 0.08)', border: '1px solid rgba(216, 195, 165, 0.3)', color: '#d8c3a5', borderRadius: '4px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>✓ Inquiry Sent</p>
                  <p style={{ fontSize: '0.8rem', color: '#a0a0a0', margin: 0 }}>We will contact you shortly. Thank you!</p>
                  <button 
                    onClick={() => setInquiryStatus('')} 
                    className="submit-inquiry-btn" 
                    style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.75rem', width: 'auto', display: 'inline-block' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <p>Drop us your number and inquiry. We will contact you shortly.</p>
                  <form onSubmit={handleInquirySubmit} className="footer-inquiry-form">
                    <div className="form-group">
                      <input 
                        type="tel" 
                        name="number" 
                        placeholder="Phone Number (e.g., +91 98765...)" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <textarea 
                        name="inquiry" 
                        placeholder="How can we help you?" 
                        rows="3" 
                        required 
                      ></textarea>
                    </div>
                    {inquiryStatus === 'error' && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.75rem', marginBottom: '1rem' }}>⚠ Error sending inquiry. Please try again.</p>
                    )}
                    <button type="submit" className="submit-inquiry-btn" disabled={inquiryStatus === 'submitting'}>
                      {inquiryStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} The Blue Vista Hotel. All rights reserved.</p>
            <div className="legal-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setView('privacy-policy'); }}>Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <button className="scroll-top-btn" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="12" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </>
  );
}

export default App;

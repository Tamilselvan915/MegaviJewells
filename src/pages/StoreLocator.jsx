import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  Search,
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';
import { STORES } from '../data/stores';
import { useToast } from '../context/ToastContext';

export default function StoreLocator() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAppointmentStore, setActiveAppointmentStore] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM'
  });
  const [isBooked, setIsBooked] = useState(false);
  const { addToast } = useToast();

  const cities = ['All', ...new Set(STORES.map((s) => s.city))];

  const filteredStores = useMemo(() => {
    return STORES.filter((store) => {
      const matchCity = selectedCity === 'All' || store.city === selectedCity;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        store.name.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.pincode.includes(q);
      return matchCity && matchQuery;
    });
  }, [selectedCity, searchQuery]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!appointmentData.name || !appointmentData.phone || !appointmentData.date) {
      addToast('Please fill in your name, phone and preferred date.', 'error');
      return;
    }
    setIsBooked(true);
    addToast('Appointment reserved! Our boutique manager will confirm via SMS.', 'success');
  };

  const closeAppointmentModal = () => {
    setActiveAppointmentStore(null);
    setIsBooked(false);
    setAppointmentData({ name: '', phone: '', date: '', time: '11:00 AM' });
  };

  return (
    <div className="store-locator-page">
      {/* Hero Header */}
      <section className="store-locator-hero">
        <div className="container text-center">
          <span className="subheading-section">EXPERIENCE LUXURY IN PERSON</span>
          <h1 className="heading-section mb-2">Find an Aurelia Boutique</h1>
          <p className="text-secondary" style={{ maxWidth: '640px', margin: '0 auto 2rem' }}>
            Visit our state-of-the-art flagship boutiques across India for private VIP viewing, certified Karatmeter purity testing, and personalized bridal trousseau consultations.
          </p>

          {/* Search & City Filter Controls */}
          <div className="store-filter-card card-luxury">
            <div className="store-search-box">
              <Search size={18} className="store-search-icon" />
              <input
                type="search"
                placeholder="Search by city, area, or PIN code (e.g. Bandra, 400050)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="store-search-input"
              />
            </div>

            <div className="city-pills-row custom-scroll">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`city-pill ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Store Results Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="flex-between mb-4">
            <span className="store-results-count">
              Showing <strong>{filteredStores.length}</strong> Flagship Showrooms
            </span>
            <Link to="/consultation" className="btn btn-outline-gold btn-sm">
              <Sparkles size={14} /> Prefer a Virtual Video Call?
            </Link>
          </div>

          {filteredStores.length === 0 ? (
            <div className="store-empty-card card-luxury text-center">
              <MapPin size={48} color="#C5A059" />
              <h3>No boutique found matching your search</h3>
              <p className="text-secondary mt-2">
                Try selecting "All" cities or searching with a different locality or PIN code.
              </p>
              <button
                type="button"
                className="btn btn-gold btn-sm mt-3"
                onClick={() => {
                  setSelectedCity('All');
                  setSearchQuery('');
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="store-cards-grid">
              {filteredStores.map((store) => (
                <div key={store.id} className="store-card card-luxury">
                  <div className="store-card-media">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="store-card-img"
                      loading="lazy"
                    />
                    <span className="store-city-badge">{store.city}</span>
                  </div>

                  <div className="store-card-body">
                    <h3 className="store-title">{store.name}</h3>

                    <div className="store-detail-row">
                      <MapPin size={16} className="store-icon" />
                      <p className="store-address">{store.address}</p>
                    </div>

                    <div className="store-detail-row">
                      <Clock size={16} className="store-icon" />
                      <span>{store.hours}</span>
                    </div>

                    <div className="store-detail-row">
                      <Phone size={16} className="store-icon" />
                      <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="store-phone-link">
                        {store.phone}
                      </a>
                    </div>

                    {/* Store Services / Amenities */}
                    {store.services && (
                      <div className="store-services-chips mt-3">
                        {store.services.map((srv, idx) => (
                          <span key={idx} className="store-srv-chip">
                            ✓ {srv}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="store-card-actions mt-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${store.name} ${store.address}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm flex-1"
                      >
                        <Navigation size={14} /> Get Directions
                      </a>
                      <button
                        type="button"
                        className="btn btn-gold btn-sm flex-1"
                        onClick={() => setActiveAppointmentStore(store)}
                      >
                        <Calendar size={14} /> Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* In-Store Appointment Booking Modal */}
      {activeAppointmentStore && (
        <div className="modal-overlay animate-fade" onClick={closeAppointmentModal}>
          <div className="appointment-modal card-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex-between mb-3">
              <div>
                <span className="subheading-section" style={{ textAlign: 'left' }}>
                  VIP RESERVATION
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                  Book Boutique Visit
                </h3>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={closeAppointmentModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-secondary text-sm mb-4">
              Reserve dedicated consultation time at{' '}
              <strong>{activeAppointmentStore.name}</strong>. Enjoy personalized guidance from our senior stylists in our private VIP viewing lounge.
            </p>

            {isBooked ? (
              <div className="appointment-success-state text-center py-4">
                <CheckCircle2 size={44} color="#1D5C42" style={{ margin: '0 auto 1rem' }} />
                <h4>Appointment Successfully Reserved!</h4>
                <p className="text-secondary text-sm mt-2">
                  We look forward to hosting you on <strong>{appointmentData.date}</strong> at{' '}
                  <strong>{appointmentData.time}</strong>. An SMS confirmation with your boutique concierge contact has been dispatched.
                </p>
                <button
                  type="button"
                  className="btn btn-gold btn-sm mt-4"
                  onClick={closeAppointmentModal}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="appointment-form">
                <div className="form-group mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Kapoor"
                    value={appointmentData.name}
                    onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-grid-2 mb-3">
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot *</label>
                    <select
                      value={appointmentData.time}
                      onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                      className="form-control"
                    >
                      <option value="11:00 AM">11:00 AM - 12:30 PM</option>
                      <option value="02:00 PM">02:00 PM - 03:30 PM</option>
                      <option value="04:30 PM">04:30 PM - 06:00 PM</option>
                      <option value="06:30 PM">06:30 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-gold btn-full mt-3">
                  Confirm In-Store Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import the decoder
import api from '../config/api';
import Sidebar from '../components/Sidebar';
import EventCard from '../components/EventCard';
import BookingModal from '../components/BookingModal';
import EnrolledEventCard from '../components/EnrolledEventCard';
import ExploreEventCard from '../components/ExploreEventCard';
const Dashboard = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
const [bookingLoading, setBookingLoading] = useState(false);
const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Backend tokens usually store the name in 'name' or 'username'
        setUserData(decoded); 
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetching My Bookings and Global Events in parallel
      const [bookingsRes, eventsRes] = await Promise.all([
        api.get('/bookings/my'),
        api.get('/events/?page=1&limit=5')
      ]);
      
      setMyBookings(bookingsRes.data);
      // Assuming events API returns an array or an object with a 'data' property
      setAllEvents(eventsRes.data.events || eventsRes.data); 
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

 const handleConfirmBooking = async (eventId, seats) => {
  setBookingLoading(true);
  try {
    await api.post('/bookings/', {
      eventId: eventId,
      seats: seats // Standardizing key name
    });
    setSelectedEvent(null);
    alert("Tickets booked successfully!");
    fetchDashboardData(); 
  } catch (err) {
    alert(err.response?.data?.message || "Booking failed");
  } finally {
    setBookingLoading(false);
  }
};

  return (
    <div className="flex min-h-screen">
      <Sidebar user={userData}/>
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
        {/* Header (Search & Notifs) ... Same as before */}
        
        <div className="p-6 lg:p-10 space-y-10">
          {/* Section: My Enrolled Events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">My Enrolled Events</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
              {myBookings.length > 0 ? (
                myBookings.map((booking) => (
                    <EnrolledEventCard
    key={booking._id}
    ticketId={booking._id}
    title={booking.event.title}
    date={booking.event.date}
    seatsBooked={booking.seatsBooked}
  />

                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No events booked yet.</p>
              )}
            </div>
          </section>

          {/* Section: Explore Global Events */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-8">Explore Global Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {allEvents.map((event) => (
       <ExploreEventCard
    key={event._id}
    {...event}
    onBook={() => setSelectedEvent(event)}
  />
    ))}
    {selectedEvent && (
      <BookingModal 
        event={selectedEvent}
        loading={bookingLoading}
        onClose={() => setSelectedEvent(null)}
        onConfirm={handleConfirmBooking}
      />
    )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
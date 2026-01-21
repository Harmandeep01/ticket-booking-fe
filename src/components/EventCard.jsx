import React from 'react';

const EventCard = ({ title, date, isEnrolled, seatsBooked, ticketId, onBook, price }) => {
  // Helper to format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`${isEnrolled ? 'min-w-[340px]' : 'w-full'} group bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300`}>
      <div className="h-44 relative bg-primary/10 flex items-center justify-center">
        {/* Visual indicator for enrolled tickets */}
        {isEnrolled ? (
          <span className="material-symbols-outlined text-6xl text-primary/20 select-none">confirmation_number</span>
        ) : (
          <div className="absolute inset-0 bg-slate-200 dark:bg-gray-800" />
        )}
        
        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {isEnrolled ? 'Confirmed' : 'Available'}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors truncate">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-sm">event</span>
            <span className="text-xs font-medium">{formatDate(date)}</span>
          </div>
        </div>

        {isEnrolled && (
          <div className="flex items-center justify-between py-3 border-y border-dashed border-gray-100 dark:border-gray-800">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400">Seats</span>
              <span className="text-sm font-bold text-primary">{seatsBooked} {seatsBooked > 1 ? 'People' : 'Person'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold text-gray-400">Ticket ID</span>
              <span className="text-[10px] font-mono text-gray-500">#{ticketId.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        )}

        <button 
          onClick={!isEnrolled ? onBook : undefined}
          className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 
            ${isEnrolled 
              ? 'bg-secondary-teal/10 text-secondary-teal' 
              : 'bg-primary text-white hover:bg-primary/90 shadow-md'}`}
        >
          <span className="material-symbols-outlined text-lg">
            {isEnrolled ? 'qr_code_2' : 'add_shopping_cart'}
          </span>
          {isEnrolled ? 'View Digital Ticket' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
import React from "react";

const EventCard = ({
  title,
  description,
  date,
  isEnrolled,
  seatsBooked,
  ticketId,
  onBook,
  availableSeats,
  totalSeats,
}) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const seatsFilled = totalSeats - availableSeats;
  const fillPercent = Math.round((seatsFilled / totalSeats) * 100);
  const isSoldOut = availableSeats === 0;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Header */}
      <div className="h-40 relative bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-primary/20 select-none">
          {isEnrolled ? "confirmation_number" : "event"}
        </span>

        <div
          className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider
            ${isEnrolled
              ? "bg-secondary-teal text-white"
              : isSoldOut
              ? "bg-red-500 text-white"
              : "bg-primary text-white"}`}
        >
          {isEnrolled ? "Confirmed" : isSoldOut ? "Sold Out" : "Available"}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Title + Date */}
        <div>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-sm">event</span>
            <span className="text-xs font-medium">{formatDate(date)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Seats Info (not for enrolled users) */}
        {!isEnrolled && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-500">Seats</span>
              <span
                className={
                  isSoldOut ? "text-red-500" : "text-green-600"
                }
              >
                {availableSeats}/{totalSeats} available
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500
                  ${fillPercent > 80 ? "bg-red-500" : "bg-primary"}`}
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Enrolled Info */}
        {isEnrolled && (
          <div className="flex items-center justify-between py-3 border-y border-dashed border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Seats Booked
              </span>
              <div className="text-sm font-bold text-primary">
                {seatsBooked} {seatsBooked > 1 ? "People" : "Person"}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Ticket ID
              </span>
              <div className="text-[10px] font-mono text-gray-500">
                #{ticketId?.slice(-6).toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Action */}
        <button
          onClick={!isEnrolled && !isSoldOut ? onBook : undefined}
          disabled={!isEnrolled && isSoldOut}
          className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all
            ${isEnrolled
              ? "bg-secondary-teal/10 text-secondary-teal"
              : isSoldOut
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90 shadow-md"}`}
        >
          <span className="material-symbols-outlined text-lg">
            {isEnrolled ? "qr_code_2" : "add_shopping_cart"}
          </span>
          {isEnrolled ? "View Digital Ticket" : isSoldOut ? "Sold Out" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;

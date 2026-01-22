const EnrolledEventCard = ({ title, date, seatsBooked, ticketId }) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-w-[280px] bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      <div className="relative h-32 bg-gradient-to-br from-secondary-teal/20 to-secondary-teal/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-secondary-teal/40">
          confirmation_number
        </span>

        <span className="absolute top-3 left-3 bg-secondary-teal text-white text-[10px] font-bold px-3 py-1 rounded-full">
          CONFIRMED
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-sm leading-snug">{title}</h3>

        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">event</span>
          {formatDate(date)}
        </div>

        <div className="flex justify-between text-xs border-t pt-3">
          <div>
            <div className="text-gray-400 uppercase text-[10px]">Seats</div>
            <div className="font-semibold">{seatsBooked} People</div>
          </div>

          <div className="text-right">
            <div className="text-gray-400 uppercase text-[10px]">Ticket</div>
            <div className="font-mono text-[11px]">
              #{ticketId.slice(-6).toUpperCase()}
            </div>
          </div>
        </div>

        <button className="w-full mt-2 bg-secondary-teal/10 text-secondary-teal font-semibold text-sm py-2 rounded-lg flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">qr_code_2</span>
          View Digital Ticket
        </button>
      </div>
    </div>
  );
};

export default EnrolledEventCard;
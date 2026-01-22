const ExploreEventCard = ({
  title,
  description,
  date,
  availableSeats,
  totalSeats,
  onBook,
}) => {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filled = totalSeats - availableSeats;
  const percent = Math.round((filled / totalSeats) * 100);
  const soldOut = availableSeats === 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all overflow-hidden">
      
      <div className="h-36 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-primary/30">
          event
        </span>

        <span className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full
          ${soldOut ? "bg-red-500 text-white" : "bg-primary text-white"}`}>
          {soldOut ? "SOLD OUT" : "AVAILABLE"}
        </span>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">event</span>
          {formatDate(date)}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span>Seats</span>
            <span className={soldOut ? "text-red-500" : "text-green-600"}>
              {availableSeats}/{totalSeats} available
            </span>
          </div>

          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${percent > 80 ? "bg-red-500" : "bg-primary"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <button
          disabled={soldOut}
          onClick={!soldOut ? onBook : undefined}
          className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2
            ${soldOut
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"}`}
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
          {soldOut ? "Sold Out" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default ExploreEventCard;
import React, { useState } from 'react';
import Button from './Button';

const BookingModal = ({ event, onClose, onConfirm, loading }) => {
  const [seats, setSeats] = useState(1);
  // Parse price from string "$15.00" to number 15
  const unitPrice = parseFloat(event.price?.replace(/[^0-9.]/g, '') || 0);
  const totalPrice = (unitPrice * seats).toFixed(2);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1d233e] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Select Seats</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <div>
              <p className="font-bold text-sm">{event.title}</p>
              <p className="text-xs text-gray-500">{event.price} per seat</p>
            </div>
            
            {/* Counter UI */}
            <div className="flex items-center gap-4 bg-white dark:bg-gray-900 px-3 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <button 
                disabled={seats <= 1}
                onClick={() => setSeats(s => s - 1)}
                className="text-primary disabled:opacity-30"
              >
                <span className="material-symbols-outlined font-bold">remove</span>
              </button>
              <span className="font-bold min-w-[20px] text-center">{seats}</span>
              <button 
                onClick={() => setSeats(s => s + 1)}
                className="text-primary"
              >
                <span className="material-symbols-outlined font-bold">add</span>
              </button>
            </div>
          </div>

          {/* Total Calculation */}
          <div className="flex justify-between items-end border-t border-dashed border-gray-200 dark:border-gray-700 pt-6">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Amount</div>
            <div className="text-3xl font-black text-primary dark:text-white">
              <span className="text-sm font-bold mr-1">$</span>
              {totalPrice}
            </div>
          </div>

          <Button 
            onClick={() => onConfirm(event._id, seats)}
            disabled={loading}
            className="w-full !h-14 !rounded-2xl shadow-lg shadow-primary/30"
          >
            {loading ? 'Processing...' : `Confirm Booking (${seats} Seats)`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
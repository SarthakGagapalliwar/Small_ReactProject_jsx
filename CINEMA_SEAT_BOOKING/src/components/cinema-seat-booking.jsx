import React, { useMemo, useState } from "react";

const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 6,
  },
  seatTypes = {
    regular: {
      name: "Regular",
      price: 150,
      rows: [0, 1, 2],
      color: "bg-blue-500",
    },
    premium: {
      name: "Premium",
      price: 250,
      rows: [3, 4, 5],
      color: "bg-green-500",
    },
    vip: {
      name: "VIP",
      price: 350,
      rows: [6, 7],
      color: "bg-purple-500",
    },
  },
  bookedSeats = ["A1", "A2", "B3", "C5"],
  currency = "₹",
  onBookingComplete = () => {},
  title = "Cinema Hall Booking",
  subtitle = "Select your preferred seats",
}) => {
  // Get seat type based on row
  const getSeatType = (row) => {
    for (const [type, info] of Object.entries(seatTypes)) {
      if (info.rows.includes(row)) {
        return { type, ...info };
      }
    }
    return { type: "regular", ...seatTypes.regular };
  };

  // Initialize seats
  const initializedSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for (let seat = 0; seat < layout.seatsPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo.type,
          price: seatTypeInfo.price,
          color: seatTypeInfo.color,
          status: bookedSeats.includes(seatId) ? "booked" : "available",
          selected: false,
        });
      }
      seats.push(seatRow);
    }
    return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializedSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  // Calculate seat counts
  const seatCounts = useMemo(() => {
    let available = 0;
    let selected = 0;
    let booked = 0;
    let total = 0;

    seats.forEach((row) => {
      row.forEach((seat) => {
        total++;
        switch (seat.status) {
          case "available":
            available++;
            break;
          case "selected":
            selected++;
            break;
          case "booked":
            booked++;
            break;
        }
      });
    });

    return { available, selected, booked, total };
  }, [seats]);

  // Handle seat click
  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seats[rowIndex][seatIndex];
    if (seat.status === "booked") return;

    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((row) => [...row]); // Deep copy
      const currentSeat = newSeats[rowIndex][seatIndex];
      currentSeat.selected = !currentSeat.selected;
      currentSeat.status = currentSeat.selected ? "selected" : "available";
      return newSeats;
    });

    setSelectedSeats((prev) => {
      const seatId = seat.id;
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  // ✅ Fix: use type color when available
  const getSeatClassName = (seat) => {
    let baseClass =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-bold transform hover:scale-105 ";

    switch (seat.status) {
      case "booked":
        return (
          baseClass +
          "bg-red-500 border-red-700 text-white cursor-not-allowed shadow-md"
        );
      case "selected":
        return (
          baseClass +
          "bg-blue-500 border-yellow-400 text-white shadow-lg ring-2 ring-yellow-300"
        );
      default:
        // Show seat type color (Regular/Premium/VIP)
        return (
          baseClass +
          `${seat.color} border-gray-300 text-white hover:opacity-80`
        );
    }
  };

  // Render seat section
  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return (
      <div className="flex">
        {seatRow.slice(startIndex, endIndex).map((seat, index) => (
          <div
            className={getSeatClassName(seat)}
            key={seat.id}
            title={`${seat.id} - ${getSeatType(seat.row).name} - ${currency}${
              seat.price
            }`}
            onClick={() => handleSeatClick(seat.row, startIndex + index)}
          >
            {startIndex + index + 1}
          </div>
        ))}
      </div>
    );
  };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const [row, seatNum] = [
      seatId.charCodeAt(0) - 65,
      parseInt(seatId.slice(1)) - 1,
    ];
    const seat = seats[row]?.[seatNum];
    return total + (seat?.price || 0);
  }, 0);

  // Handle booking
  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const bookingDetails = {
      seats: selectedSeats,
      totalPrice,
      timestamp: new Date().toISOString(),
      seatDetails: selectedSeats.map((seatId) => {
        const [row, seatNum] = [
          seatId.charCodeAt(0) - 65,
          parseInt(seatId.slice(1)) - 1,
        ];
        return seats[row][seatNum];
      }),
    };

    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((row) => [...row]); // Deep copy
      selectedSeats.forEach((seatId) => {
        const [row, seatNum] = [
          seatId.charCodeAt(0) - 65,
          parseInt(seatId.slice(1)) - 1,
        ];
        if (newSeats[row] && newSeats[row][seatNum]) {
          newSeats[row][seatNum].status = "booked";
          newSeats[row][seatNum].selected = false;
        }
      });
      return newSeats;
    });

    setSelectedSeats([]);
    setBookingHistory((prev) => [...prev, bookingDetails]);
    onBookingComplete(bookingDetails);

    alert(
      `Successfully booked ${selectedSeats.length} seat(s)!\nTotal: ${currency}${totalPrice}`
    );
  };

  // Reset all selections
  const resetSelection = () => {
    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) => ({
          ...seat,
          selected: false,
          status: seat.status === "selected" ? "available" : seat.status,
        }))
      )
    );
    setSelectedSeats([]);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        {/* Seat Count Statistics */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-3 text-center">
            Seat Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-gray-800">
                {seatCounts.total}
              </div>
              <div className="text-sm text-gray-600">Total Seats</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">
                {seatCounts.available}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">
                {seatCounts.selected}
              </div>
              <div className="text-sm text-gray-600">Selected</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">
                {seatCounts.booked}
              </div>
              <div className="text-sm text-gray-600">Booked</div>
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="mb-8">
          <div className="w-full h-6 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 rounded-lg mb-3 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>
          <p className="text-center text-sm text-gray-600 font-bold tracking-wider">
            ◄ SCREEN ►
          </p>
        </div>

        {/* Seat Map */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-max p-4 bg-gray-50 rounded-lg">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center mb-3">
                <span className="w-10 text-center font-bold text-gray-700 mr-6 text-lg">
                  {String.fromCharCode(65 + rowIndex)}
                </span>

                {/* Left section */}
                {renderSeatSection(row, 0, layout.aislePosition)}

                {/* Aisle gap */}
                <div className="w-12 flex justify-center">
                  <div className="w-1 h-8 bg-gray-300 rounded"></div>
                </div>

                {/* Right section */}
                {renderSeatSection(
                  row,
                  layout.aislePosition,
                  layout.seatsPerRow
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4">Legend</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 border-2 border-gray-300 rounded-t-lg mr-2"></div>
              <span className="text-sm text-gray-700 font-medium">
                Available ({seatCounts.available})
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-blue-500 border-2 border-yellow-400 rounded-t-lg mr-2 ring-1 ring-yellow-300"></div>
              <span className="text-sm text-gray-700 font-medium">
                Selected ({seatCounts.selected})
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-500 border-2 border-red-700 rounded-t-lg mr-2"></div>
              <span className="text-sm text-gray-700 font-medium">
                Booked ({seatCounts.booked})
              </span>
            </div>
            {Object.entries(seatTypes).map(([type, info]) => (
              <div key={type} className="flex items-center">
                <div
                  className={`w-5 h-5 ${info.color} rounded-t-lg mr-2 border border-gray-300`}
                ></div>
                <span className="text-sm text-gray-700 font-medium">
                  {info.name} ({currency}
                  {info.price})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedSeats.length > 0 && (
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-md">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">
              🎟️ Booking Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-blue-700">
                  <span className="font-semibold">Selected Seats:</span>
                  <span className="ml-2 font-bold text-blue-900">
                    {selectedSeats.join(", ")}
                  </span>
                </p>
                <p className="text-blue-700 mt-1">
                  <span className="font-semibold">Number of Seats:</span>
                  <span className="ml-2 font-bold text-blue-900">
                    {selectedSeats.length}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-700">
                  <span className="font-semibold">Total Amount:</span>
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {currency}
                  {totalPrice}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              selectedSeats.length > 0
                ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedSeats.length > 0
              ? `🎫 Book ${selectedSeats.length} Seat${
                  selectedSeats.length > 1 ? "s" : ""
                } - ${currency}${totalPrice}`
              : "Select Seats to Book"}
          </button>

          {selectedSeats.length > 0 && (
            <button
              onClick={resetSelection}
              className="px-6 py-4 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
            >
              🔄 Reset Selection
            </button>
          )}
        </div>

        {/* Booking History */}
        {bookingHistory.length > 0 && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800 mb-3">✅ Recent Bookings</h3>
            <div className="space-y-2">
              {bookingHistory.slice(-3).map((booking, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white rounded border"
                >
                  <span className="text-sm text-gray-700">
                    {booking.seats.join(", ")}
                  </span>
                  <span className="font-semibold text-green-700">
                    {currency}
                    {booking.totalPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaSeatBooking;

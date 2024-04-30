// This array holds data about available rooms
let roomData = [
  {
    room_id: 1,
    room_name: "Diplomatic Suite",
    room_status: "available",
    amenities: "TV, A/C, Laundry, Jaccuzi, WiFi, Private Swimming Pool",
    seats: 5,
    price_per_hour: 7000,
  },
  {
    room_id: 2,
    room_name: "Luxe Suite",
    room_status: "available",
    amenities: "TV, A/C, Laundry, Jaccuzi, WiFi, Swimming Pool",
    seats: 4,
    price_per_hour: 5000,
  },
  {
    room_id: 3,
    room_name: "Deluxe Suite",
    room_status: "available",
    amenities: "TV, A/C, Laundry, WiFi",
    seats: 3,
    price_per_hour: 3000,
  },
  {
    room_id: 4,
    room_name: "Couple Suite",
    room_status: "available",
    amenities: "TV, A/C, WiFi",
    seats: 2,
    price_per_hour: 2000,
  },
  {
    room_id: 5,
    room_name: "Solo Suite",
    room_status: "available",
    amenities: "TV, A/C, WiFi",
    seats: 1,
    price_per_hour: 1000,
  },
];

// This array holds data about booked rooms
let BookingRoom = [];

// Function to get details of all rooms
export const getRoomDetail = (req, res) => {
  // Responds with all room details
  res
    .status(200)
    .json({ message: "Fetched All Rooms successfully!", All_Rooms: roomData });
};

// Function to create a new room
export const CreateNewRoom = (req, res) => {
  // Creates a new room and adds it to roomData array
  const { room_name, room_status, amenities, seats, price_per_hour } = req.body;
  const NewRoomData = {
    room_id: roomData.length + 1,
    room_name: room_name,
    room_status: room_status,
    amenities: amenities,
    seats: seats,
    price_per_hour: price_per_hour,
  };
  roomData.push(NewRoomData);
  res
    .status(200)
    .json({ message: "New Room Added Successfully!", Room: roomData });
};

// Function to book a room
export const BookRoom = (req, res) => {
  // Books a room for a customer if it's available and not already booked for the specified date
  const { customer_name, date, start_time, end_time, roomID } = req.body;

  let room = roomData.filter(
    (e) => e.room_status === "available" && e.room_id == roomID
  );

  if (!room) {
    return res.status(400).json({
      message: "Room is not Available",
    });
  } else {
    let BookingRoomsdate = BookingRoom.filter(
      (room) => room.booking_date === date
    );

    if (BookingRoomsdate.length > 0) {
      return res.status(400).json({
        message: "Room is Already Booked",
      });
    } else {
      let booking = {
        roomID: BookingRoom.length + 1,
        customer_name,
        start_time,
        end_time,
        Date: date,
        booking_id: BookingRoom.length + 1,
        booking_date: date,
        status: "Booked",
      };
      BookingRoom.push(booking);
      return res.status(200).json({
        message: "Room is Booked Successfully",
        RoomBooked: BookingRoom,
      });
    }
  }
};

// Function to get data of all booked rooms
export const BookedRoomData = (req, res) => {
  // Responds with data of all booked rooms
  res.status(200).json({
    message: "Successfully Fetched All Rooms Data",
    BookingRoom,
  });
};

// Function to get data of all customers with booked room details
export const AllCustomersBookedData = (req, res) => {
  // Responds with data of all customers along with their booked room details
  const customerdata = BookingRoom.map((booking) => {
    const Room = roomData.find((i) => i.room_id === booking.roomID);
    return {
      Room_id: booking.roomID,
      Customer_Name: booking.customer_name,
      Room_Name: Room ? roomData.room_name : "Room",
      Date: booking.Date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    };
  });
  res.status(200).json({
    message: "Successfully Fetched All Customers with Booked Room Details",
    customerdata,
  });
};

// Function to get booking details for each customer along with booking count
export const CustomerBookingDetails = (req, res) => {
  // Responds with booking details for each customer along with booking count
  const customerBookings = {};

  // Iterate through BookingRoom array
  BookingRoom.forEach((booking) => {
    const {
      roomID,
      customer_name,
      booking_date,
      start_time,
      end_time,
      booking_id,
      status,
    } = booking;

    // If customer_name is not already in the customerBookings object, add it
    if (!customerBookings[customer_name]) {
      customerBookings[customer_name] = [];
    }

    // Add booking details to the customer's bookings array
    customerBookings[customer_name].push({
      roomID,
      booking_date,
      start_time,
      end_time,
      booking_id,
      status,
    });
  });

  // Format data to include booking count for each customer
  const customerData = Object.keys(customerBookings).map((customer_name) => {
    const bookings = customerBookings[customer_name];
    const bookingCount = bookings.length;
    return { customer_name, bookings, bookingCount };
  });

  res.status(200).json({
    message: "Successfully Fetched Customer Booked Count Details",
    customerData,
  });
};

import mongoose from "mongoose";

const bookingschema = booking.mongoose ({
    clientName : {type :string , require : true},
    serviceType : {type :string , require : null},
    email : {type :string , require : true},
    phoneNumber : {type : string , require : true},
    barberName : {type : string , require : true | null},
    BookingTime : {type : string , require : true}
});

const Booking = mongoose.model ('booking' , bookingschema)

module.exports = booking;

import express from "express";
import {
  AllCustomersBookedData,
  BookRoom,
  BookedRoomData,
  CreateNewRoom,
  CustomerBookingDetails,
  getRoomDetail,
} from "../Controllers/hallBooking.Controller.js";

const router = express.Router();

router.get("/roominfo", getRoomDetail);
router.post("/createroom", CreateNewRoom);
router.post("/bookroom", BookRoom);
router.get("/bookedroomdata", BookedRoomData);
router.get("/customersbookeddata", AllCustomersBookedData);
router.get("/customerbookingcount", CustomerBookingDetails);

export default router;

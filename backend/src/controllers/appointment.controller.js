import appointmentModel from '../models/appointment.model.js';
import doctorModel from '../models/doctor.model.js';
import userModel from '../models/user.model.js';

// Assuming docId, userId, slotDate, and slotTime are passed correctly

export const bookAppointment = async (req, res) => {
    const { userId, docId, slotDate, slotTime } = req.body;
  
    try {
      // Find doctor and user
      const doctor = await doctorModel.findById(docId);
      const user = await userModel.findById(userId);
  
      if (!doctor || !user) {
        return res.status(404).json({ success: false, message: "Doctor or user not found" });
      }
  
      // Check if the slotDate exists in slotsBooked, if not, initialize it
      if (!doctor.slotsBooked[slotDate]) {
        doctor.slotsBooked[slotDate] = [];  // Initialize the date slot array if not present
      }
  
      // Check if the slotTime is already booked for the given slotDate
      if (doctor.slotsBooked[slotDate].includes(slotTime)) {
        return res.status(400).json({ success: false, message: "Slot already booked" });
      }
  
      // Add the new slotTime to the slotsBooked array for the specific slotDate
      doctor.slotsBooked[slotDate].push(slotTime);
      await doctor.save();  // Save the updated doctor document
  
      // Create the appointment
      const appointment = new appointmentModel({
        userId,
        docId,
        slotDate,
        slotTime,
        userData: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        docData: {
          _id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          speciality: doctor.speciality,
        },
        amount: doctor.fee || 0,
        date: Date.now(),
        cancelled: false,
        payment: false,
        isCompleted: false,
      });
  
      await appointment.save();
  
      return res.status(200).json({ success: true, message: "Appointment booked successfully", appointment });
  
    } catch (err) {
      console.error("Booking error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  
  
  
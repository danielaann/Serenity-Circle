import appointmentModel from '../models/appointment.model.js';
import doctorModel from '../models/doctor.model.js';
import User from '../models/user.model.js';


export const bookApointment = async (req, res) => {
    try {
        const {userId, docId, slotDate, slotTime} = req.body;

        if (!docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const docData = await doctorModel.findById(docId).select('-password')
         
        if(!docData.available){
            return req.json({success: false, message:"Doctor not available"})
        }

        let slotsbooked = docData.slotsBooked

        // check if slot available
        if (slotsbooked[slotDate]) {
            if(slotsbooked[slotDate].included(slotTime)){
                return req.json({success: false, message:"Slot not available"})
            }else{
                slotsbooked[slotDate].push(slotTime)
            }
        }else{
            slotsbooked[slotDate]=[];
            slotsbooked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')

        delete docData.slotsBooked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fee,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save new slots data in doctors data
        await doctorModel.findByIdAndUpdate(docId,{slotsbooked})
        res.json({success:true, message:"Appointmnet booked" })

    } catch (error) {
        console.error("Error in bookAppointment:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }    
}
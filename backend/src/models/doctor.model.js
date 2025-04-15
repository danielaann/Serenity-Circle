import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        _id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        
        name: {
            type : String,
            required: true,
        },

        image: {
            type : String,
            default:""
        },

        speciality: {
            type : String,
            required: true
        },

        degree: {
            type : String,
            required: true
        },

        experience: {
            type : String,
            required: true
        },

        about: {
            type : String,
            required: true
        },

        available: {
            type : Boolean,
            required: true,
            default: true
        },

        fee: {
            type : Number,
            required: true
        },

        address: {
            type : Object,
            required: true
        },

        date:{
            type: Date,
            default: Date.now,
        },

        slotsBooked: {
            type : Object,
            default:{}
        },
    },{minimize: false} //can use empty obj as default 
);

const doctorModel = mongoose.model('doctor', doctorSchema);
export default doctorModel; 
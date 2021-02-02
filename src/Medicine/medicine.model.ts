import * as mongoose from 'mongoose';
export const MedicineSchema = new mongoose.Schema({
    _id: {type: String, required : true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});



export interface Medicine extends mongoose.Document{
         id: string;
         title: string;
         description: string;
         price: number;
}

//export interface UserDocument extends MedicineInterface, mongoose.Document {}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { title } from "process";
import { Medicine } from "./medicine.model";

@Injectable()
export class MedicineService {

    medicines: Medicine[] = [];

    constructor(@InjectModel("Medicine") private readonly medicineModel: Model<Medicine>) { }

    async insertMedicine(medicine: Medicine) {

        const newMedicine = new this.medicineModel({
            _id: "M"+Date.now(),
            title: medicine.title,
            description: medicine.description,
            price: medicine.price
        });

        const result = await newMedicine.save();
        console.log(result);

        return result as Medicine;
    }

    async getAllMedicine(){
        const medicines = await this.medicineModel.find().exec();
        return medicines.map(newMedicine=> ({
            id: newMedicine.id,
             title: newMedicine.title,
              description: newMedicine.description,
               price: newMedicine.price
        }));
        //return medicines as Medicine[];
    }

  async  getSingleMedicine(id: string){
        const medicine = await this.findMedicine(id);
        return {id: medicine.id, title: medicine.title, description: medicine.description, price: medicine.price};
    }


    async updateMedicine(medicineId: string, medicine: Medicine): Promise<Medicine>{
        const updatedMedicine  = await this.findMedicine(medicineId);

        if(medicine.title){
            updatedMedicine.title = medicine.title;
        }
        if(medicine.description){
            updatedMedicine.description = medicine.description;
        }
        if(medicine.price){
            updatedMedicine.price = medicine.price;
        }
        updatedMedicine.save();
        return updatedMedicine as Medicine;
    }


    async deleteMedicine(medicineId: string) {
        const result =  await this.medicineModel.deleteOne({_id: medicineId}).exec();
        console.log(result);
        
        if(result.n===0){
            throw new NotFoundException("Could not find medicine.");
        }

    }


    private async findMedicine(id: string):Promise<Medicine>{
        let medicine;
        try{
            medicine = await this.medicineModel.findById(id);
        }catch(error){
            throw new NotFoundException("Could not find medicine.");
        }
        console.log(id);
        if (!medicine) {
            throw new NotFoundException("Could not find medicine.");
        }
        return medicine as Medicine;
    }

}
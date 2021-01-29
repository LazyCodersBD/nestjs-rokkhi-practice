import { Injectable, NotFoundException } from "@nestjs/common";
import { Medicine } from "./medicine.model";

@Injectable()
export class MedicineService{

    medicines: Medicine[] = [];

    insertMedicine(medicine: Medicine): number{
        this.medicines.push(medicine);
        return medicine.id;
    }

    getAllMedicine(): Medicine[] {
    return [...this.medicines];
    }

    getSingleMedicine(id: number): Medicine{
        const medicine = this.findMedicine(id)[0];
        return {...medicine};
    }


    updateMedicine(medicineId: number, medicine: Medicine): Medicine{
        const [currentMedicineData, index] = this.findMedicine(medicineId);
    
        const updatedMedicineData = {...currentMedicineData};

        if(medicine.title){
            updatedMedicineData.title = medicine.title;
        }
        if(medicine.description){
            updatedMedicineData.description = medicine.description;
        }
        if(medicine.price){
            updatedMedicineData.price = medicine.price;
        }
        this.medicines[index] = updatedMedicineData
        return {...this.medicines[index]};
    }


    deleteMedicine(medicineId: number): Medicine[]{
        const index = this.findMedicine(medicineId)[1];
        this.medicines.splice(index, 1);
        return this.medicines;
    }


    private findMedicine(id: number):[Medicine, number]{
        const medicineIndex = this.medicines.findIndex( data => data.id===id);
        const medicine = this.medicines[medicineIndex];
        if(!medicine){
            throw new NotFoundException("Could not found medicine.")
        }
        return [medicine, medicineIndex];
    }

}
import { Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { Medicine } from "./medicine.model";
import { MedicineService } from "./medicine.service";

@Controller("medicine")
export class MedicineController{

    constructor(private readonly medicineService: MedicineService){}

    @Post()
    async addMedicine(@Body('medicine') medicine: Medicine) {
         const result =await this.medicineService.insertMedicine(medicine);
        return {id: result.id};
    }

    @Get()
    async getAllMedicine() {
        const medicines = await this.medicineService.getAllMedicine();
        return {medicines: medicines};
    }

    @Get(':id')
    async getSingleMedicine( @Param('id') medicineId : string ) {
        const medicine =await this.medicineService.getSingleMedicine(medicineId);
       return medicine;
    }

    @Patch(':id')
    async updateMedicine( @Param('id') medicineId : string, @Body('medicine') medicine: Medicine) {
       const updatedMedicine =await this.medicineService.updateMedicine( medicineId, medicine);
       return {medicine: updatedMedicine};
    }

    @Delete(':id')
    async deleteMedicine( @Param('id') medicineId : string) {
       await this.medicineService.deleteMedicine(medicineId);
       return null;
    }
}
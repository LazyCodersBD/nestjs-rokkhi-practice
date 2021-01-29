import { Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { Medicine } from "./medicine.model";
import { MedicineService } from "./medicine.service";

@Controller("medicine")
export class MedicineController{

    constructor(private readonly medicineService: MedicineService){}

    @Post()
    addMedicine(@Body('medicine') medicine: Medicine) {
        this.medicineService.insertMedicine(medicine);
        return {id: medicine.id};
    }

    @Get()
    getAllMedicine() {
        const medicines = this.medicineService.getAllMedicine();
        return {medicines: medicines};
    }

    @Get(':id')
    getSingleMedicine( @Param('id') medicineId : number ) {
        const medicine = this.medicineService.getSingleMedicine(medicineId);
        return {medicine: medicine};
    }

    @Patch(':id')
    updateMedicine( @Param('id') medicineId : number, @Body('medicine') medicine: Medicine) {
        const updatedMedicine = this.medicineService.updateMedicine( medicineId, medicine);
        return {medicine: updatedMedicine};
    }

    @Delete(':id')
    deleteMedicine( @Param('id') medicineId : number) {
        const newMedicineList = this.medicineService.deleteMedicine(medicineId);
        return {medicines: newMedicineList};
    }
}
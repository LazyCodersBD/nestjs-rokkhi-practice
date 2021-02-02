import { Module } from "@nestjs/common";
import { MedicineController } from "./medicine.controller";
import { MedicineService } from "./medicine.service";
import {MongooseModule} from "@nestjs/mongoose"
import { MedicineSchema } from "./medicine.model";


@Module({
    imports: [
        MongooseModule.forFeature([{name: "Medicine", schema: MedicineSchema}])
    ],
    controllers: [MedicineController],
    providers: [MedicineService],
})
export class MedicineModule{}
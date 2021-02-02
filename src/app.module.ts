import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './Medicine/medicine.module';

@Module({
  imports: [MedicineModule, MongooseModule.forRoot("mongodb+srv://rokkhi:rokkhi@cluster0.p4fnz.mongodb.net/practice?retryWrites=true&w=majority")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

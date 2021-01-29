import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './Medicine/medicine.module';

@Module({
  imports: [MedicineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

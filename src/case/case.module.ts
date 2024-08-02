import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entity/case.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Case]),
    UserModule
  ],
  providers: [CaseService],
  controllers: [CaseController]
})
export class CaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseModule } from './case/case.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
  }),
    CaseModule,
    UserModule,
    PassportModule,
    MailModule
  ],
})
export class AppModule {}

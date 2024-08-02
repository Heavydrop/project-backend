import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entity/case.entity';
import { JwtModule } from '@nestjs/jwt';
import { Serve } from './entity/serve.entity';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Case, Serve]),
    UserModule,
    MailModule,
    JwtModule.register({
      secret: 'topSecret51',  // Use a more secure secret in production
      signOptions: {
        expiresIn: 3600,  // Token expiration time in seconds
      },
    }),
  ],
  providers: [CaseService],
  controllers: [CaseController]
})
export class CaseModule {}

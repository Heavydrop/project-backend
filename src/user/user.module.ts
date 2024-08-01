import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/config/jwt.strategy';
import { User } from './enitity/user.entity';

// const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',  // Use a more secure secret in production
      signOptions: {
        expiresIn: 3600,  // Token expiration time in seconds
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, UserService],  // Export JwtStrategy and PassportModule for use in other modules
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: 3600 } }),
    TypeOrmModule.forFeature([AuthRepository])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

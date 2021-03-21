import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './dto/auth.dto';
import { JwtInterface } from './jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}
  async signup(authDtoData: AuthDto): Promise<void> {
    return this.authRepository.signup(authDtoData);
  }
  async signin(authDtoData: AuthDto): Promise<{ accessToken: string }> {
    const user = await this.authRepository.validateUserPassword(authDtoData);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload: JwtInterface = { username: user };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {}
  async signup(authDtoData: AuthDto): Promise<void> {
    return this.authRepository.signup(authDtoData);
  }
  async signin(authDtoData: AuthDto): Promise<void> {
    const user = await this.authRepository.validateUserPassword(authDtoData);
    if (!user) {
      throw new UnauthorizedException();
    }
  }
}

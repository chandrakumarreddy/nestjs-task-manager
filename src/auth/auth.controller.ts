import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(@Body(ValidationPipe) authDtoData: AuthDto): Promise<void> {
    return this.authService.signup(authDtoData);
  }
  @Post('/signin')
  async signin(@Body(ValidationPipe) authDtoData: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signin(authDtoData);
  }
}

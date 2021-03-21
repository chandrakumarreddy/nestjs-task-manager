import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}

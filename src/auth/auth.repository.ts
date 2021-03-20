import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthDto } from './dto/auth.dto';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async signup(authDtoData: AuthDto): Promise<void> {
    const { username, password } = authDtoData;
    const user = new Auth();
    user.username = username;
    user.password = password;
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

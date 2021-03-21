import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Auth } from './auth.entity';
import { AuthDto } from './dto/auth.dto';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async signup(authDtoData: AuthDto): Promise<void> {
    const { username, password } = authDtoData;
    const user = new Auth();
    user.username = username;
    user.salt = await bcrypt.genSalt(10);
    user.password = await this.hasPassword(password, user.salt);
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
  async validateUserPassword(authDtoData: AuthDto): Promise<string> {
    const { username, password } = authDtoData;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hasPassword(password: string, hash: string): Promise<string> {
    return await bcrypt.hash(password, hash);
  }
}

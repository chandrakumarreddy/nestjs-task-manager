import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import typeormConfig from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: 3600 } }),
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
    TasksModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

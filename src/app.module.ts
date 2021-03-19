import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()), TasksModule],
  controllers: [],
  providers: []
})
export class AppModule {}

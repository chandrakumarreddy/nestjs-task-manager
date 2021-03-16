import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/Task.entity';

export class FilterDataDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE])
  @IsOptional()
  status: TaskStatus;
}

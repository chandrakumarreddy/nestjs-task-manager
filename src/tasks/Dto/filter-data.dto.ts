import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class FilterDataDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE])
  @IsOptional()
  status: TaskStatus;
}

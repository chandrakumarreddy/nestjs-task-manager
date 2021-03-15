import { TaskStatus } from '../entities/Task.entity';

export class FilterDataDto {
  search: string;
  status: TaskStatus;
}

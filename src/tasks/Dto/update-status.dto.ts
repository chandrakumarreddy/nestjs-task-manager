import { TaskStatus } from '../entities/Task.entity';

export class UpdateStatusDto {
  status: TaskStatus;
}

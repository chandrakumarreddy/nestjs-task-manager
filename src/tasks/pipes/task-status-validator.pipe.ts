import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../entities/Task.entity';

export class TaskStatusValidator implements PipeTransform {
  private readonly taskStatus = [TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.DONE];
  transform(value: any) {
    if (!this.isValidTask(value)) {
      throw new BadRequestException(`${value} is not valid status`);
    }
    return value;
  }
  private isValidTask(value: any) {
    return this.taskStatus.includes(value);
  }
}

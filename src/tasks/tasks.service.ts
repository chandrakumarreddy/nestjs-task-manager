import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './Task.entity';
import { TaskRepository } from './Task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository
  ) {}

  async getById(taskId: number) {
    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`TaskId not found ${taskId}`);
    }
    return task;
  }
}

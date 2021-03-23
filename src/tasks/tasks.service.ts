import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';
import { CreateTaskDto } from './Dto/create-task.dto';
import { FilterDataDto } from './Dto/filter-data.dto';
import { TaskStatus } from './task-status.enum';

import { Task } from './Task.entity';
import { TaskRepository } from './Task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(filterDataDto: FilterDataDto, user: Auth): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDataDto, user);
  }

  async getById(taskId: number) {
    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`TaskId not found ${taskId}`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: Auth): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.taskRepository.delete(taskId);
  }

  async updateStatus(taskId: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(taskId);
    task.status = status;
    await task.save();
    return task;
  }
}

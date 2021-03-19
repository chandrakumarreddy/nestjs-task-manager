import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Task } from './Task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.tasksService.getById(taskId);
  }
}

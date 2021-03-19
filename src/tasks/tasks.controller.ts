import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Task } from './Task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './Dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.tasksService.getById(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createtaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createtaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}

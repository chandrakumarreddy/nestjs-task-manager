import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete } from '@nestjs/common';
import { Task } from './Task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './Dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.tasksService.getById(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }
}

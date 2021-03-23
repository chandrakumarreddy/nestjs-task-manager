import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Query,
  Patch,
  UseGuards
} from '@nestjs/common';
import { Task } from './Task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './Dto/create-task.dto';
import { FilterDataDto } from './Dto/filter-data.dto';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Auth } from 'src/auth/auth.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDataDto: FilterDataDto, @GetUser() user: Auth) {
    return this.tasksService.getTasks(filterDataDto, user);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.tasksService.getById(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: Auth): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') taskId: number, @Body('status', ValidationPipe) status: TaskStatus) {
    return this.tasksService.updateStatus(taskId, status);
  }
}

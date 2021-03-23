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
  UseGuards,
  Logger
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
  private logger = new Logger('TasksController');
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDataDto: FilterDataDto, @GetUser() user: Auth) {
    this.logger.verbose(`get all tasks for user ${user.id}`);
    return this.tasksService.getTasks(filterDataDto, user);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) taskId: number, @GetUser() user: Auth): Promise<Task> {
    return this.tasksService.getById(taskId, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: Auth): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) taskId: number, @GetUser() user: Auth): Promise<void> {
    this.logger.verbose(`delete taskId ${taskId} for user ${user.id}`);
    return this.tasksService.deleteTask(taskId, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') taskId: number,
    @Body('status', ValidationPipe) status: TaskStatus,
    @GetUser() user: Auth
  ): Promise<Task> {
    return this.tasksService.updateStatus(taskId, status, user);
  }
}

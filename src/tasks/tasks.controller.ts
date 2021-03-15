import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/Task.entity';
import { FilterDataDto } from './Dto/filter-data.dto';
import { CreateTaskDto } from './Dto/create-task.dto';
import { UpdateTaskDto } from './Dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterData: FilterDataDto): Task[] {
    return this.tasksService.getAllTasks(filterData);
  }

  @Get(':id')
  getTask(@Param('id') taskId: string): Task {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  createTask(@Body() taskData: CreateTaskDto): Task {
    return this.tasksService.createTask(taskData);
  }

  @Patch(':id')
  updateTask(@Param('id') taskId: string, @Body() taskData: UpdateTaskDto): Task {
    return this.tasksService.updateTask(taskId, taskData);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}

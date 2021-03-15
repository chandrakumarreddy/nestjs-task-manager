import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './entities/Task.entity';
import { FilterDataDto } from './Dto/filter-data.dto';
import { CreateTaskDto } from './Dto/create-task.dto';
import { UpdateTaskDto } from './Dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(filterData: FilterDataDto): Task[] {
    const { search, status } = filterData;
    let tasks = this.tasks;
    if (search) {
      tasks = tasks.filter(({ title, description }) =>
        [title.toLowerCase(), description.toLowerCase()].includes(search.toLowerCase())
      );
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  createTask(taskData: CreateTaskDto) {
    const { title, description } = taskData;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  getTask(taskId: string): Task {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new NotFoundException(`task Id not found ${taskId}`);
    }
    return task;
  }

  updateTask(taskId: string, taskData: UpdateTaskDto) {
    let task = this.getTask(taskId);
    task = { ...task, ...taskData };
    this.deleteTask(taskId);
    this.tasks.push(task);
    return task;
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateStatus(taskId: string, status: TaskStatus) {
    const task = this.getTask(taskId);
    task.status = status;
    this.deleteTask(taskId);
    this.tasks.push(task);
    return task;
  }
}

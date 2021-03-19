import { Injectable } from '@nestjs/common';
// import { Task } from './entities/Task.entity';
// import { TaskStatus } from './task-status.enum';
// import { FilterDataDto } from './Dto/filter-data.dto';
// import { CreateTaskDto } from './Dto/create-task.dto';
// import { UpdateTaskDto } from './Dto/update-task.dto';

@Injectable()
export class TasksService {
  // getAllTasks(filterData: FilterDataDto): Task[] {
  //   const { search, status } = filterData;
  //   let tasks = this.tasks;
  //   if (search) {
  //     tasks = tasks.filter(
  //       ({ title, description }) =>
  //         title.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   return tasks;
  // }
  // createTask(taskData: CreateTaskDto): Task {
  //   const { title, description } = taskData;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getTask(taskId: string): Task {
  //   const task = this.tasks.find((task) => task.id === taskId);
  //   if (!task) {
  //     throw new NotFoundException(`task Id not found ${taskId}`);
  //   }
  //   return task;
  // }
  // updateTask(taskId: string, taskData: UpdateTaskDto): Task {
  //   let task = this.getTask(taskId);
  //   task = { ...task, ...taskData };
  //   this.deleteTask(taskId);
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(taskId: string): void {
  //   const selectedTask = this.getTask(taskId);
  //   this.tasks = this.tasks.filter((task) => task.id !== selectedTask.id);
  // }
  // updateStatus(taskId: string, status: TaskStatus): Task {
  //   const task = this.getTask(taskId);
  //   task.status = status;
  //   this.deleteTask(taskId);
  //   this.tasks.push(task);
  //   return task;
  // }
}

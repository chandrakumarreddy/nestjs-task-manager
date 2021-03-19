import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './Dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './Task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createtaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createtaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}

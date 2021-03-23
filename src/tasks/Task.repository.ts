import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './Dto/create-task.dto';
import { FilterDataDto } from './Dto/filter-data.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './Task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(filterDataDto: FilterDataDto, user: Auth): Promise<Task[]> {
    const { search, status } = filterDataDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (search) {
      query.andWhere('(LOWER(task.title) LIKE :search OR Lower(task.description) LIKE :search)', {
        search: `%${search.toLowerCase()}%`
      });
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to fetch all tasks for user ${user.id}`);
      throw new InternalServerErrorException();
    }
  }
  async createTask(createtaskDto: CreateTaskDto, user: Auth): Promise<Task> {
    const { title, description } = createtaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to save task for user ${user.id}`);
      throw new InternalServerErrorException();
    }
    delete task.user;
    return task;
  }
}

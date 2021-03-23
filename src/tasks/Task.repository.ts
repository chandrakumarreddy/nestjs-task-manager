import { Auth } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './Dto/create-task.dto';
import { FilterDataDto } from './Dto/filter-data.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './Task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDataDto: FilterDataDto): Promise<Task[]> {
    const { search, status } = filterDataDto;
    const query = this.createQueryBuilder('task');
    if (search) {
      query.andWhere('(LOWER(task.title) LIKE :search OR Lower(task.description) LIKE :search)', {
        search: `%${search.toLowerCase()}%`
      });
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createtaskDto: CreateTaskDto, user: Auth): Promise<Task> {
    const { title, description } = createtaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}

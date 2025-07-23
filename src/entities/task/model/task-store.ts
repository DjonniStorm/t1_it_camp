import { makeAutoObservable, runInAction } from 'mobx';
import { tasksApi } from '@shared/api';
import type { Category, Priority, Status, Task } from '@shared/types';

type FilterParams = {
  status?: Status;
  priority?: Priority;
  category?: Category;
};

export class TasksStore {
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;
  filters: FilterParams = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async () => {
    console.log(this);
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const data = await tasksApi.getTasks();
      runInAction(() => {
        this.tasks = data;
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка загрузки';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  fetchTaskById = async (id: string) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    try {
      const data = await tasksApi.getTaskById(id);
      runInAction(() => {
        this.isLoading = false;
      });
      return data;
    } catch {
      runInAction(() => {
        this.error = 'Ошибка загрузки';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  createTask = async (task: Task) => {
    await tasksApi.createTask(task);
    this.fetchTasks();
  };

  updateTask = async (task: Task) => {
    await tasksApi.updateTask(task);
    this.fetchTasks();
  };

  deleteTask = async (id: string) => {
    await tasksApi.deleteTask(id);
    this.fetchTasks();
  };

  setFilters = (f: Partial<FilterParams>) => {
    this.filters = { ...this.filters, ...f };
  };

  get filteredTasks() {
    return this.tasks.filter((t) => {
      const { status, priority, category } = this.filters;
      return (
        (!status || t.status === status) &&
        (!priority || t.priority === priority) &&
        (!category || t.category === category)
      );
    });
  }
}

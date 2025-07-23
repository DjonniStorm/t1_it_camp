import { makeAutoObservable } from 'mobx';
import type { Category, Priority, Status, Task } from '@shared/types';

type FilterParams = {
  status?: Status;
  priority?: Priority;
  category?: Category;
};

export class TasksStore {
  filters: FilterParams = {};

  constructor() {
    makeAutoObservable(this);
  }

  setFilters = (f: Partial<FilterParams>) => {
    this.filters = { ...this.filters, ...f };
  };

  getFilteredTasks(tasks: Task[]): Task[] {
    return tasks.filter((t) => {
      const { status, priority, category } = this.filters;
      return (
        (!status || t.status === status) &&
        (!priority || t.priority === priority) &&
        (!category || t.category === category)
      );
    });
  }
}

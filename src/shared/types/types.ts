import type {
  categoryColors,
  priorityColors,
  statusColors,
} from '@shared/config';

export type Category = keyof typeof categoryColors;

export type Status = keyof typeof statusColors;

export type Priority = keyof typeof priorityColors;

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt?: string;
};

export type BadgeType = Category | Status | Priority;

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
};

export type BadgeType = Category | Status | Priority;

export const categoryColors = {
  Bug: 'red',
  Feature: 'teal',
  Documentation: 'grape',
  Refactor: 'yellow',
  Test: 'orange',
} as const;

export const statusColors = {
  TODO: 'rgba(51, 0, 255, 1)',
  InProgress: 'rgba(255, 0, 144, 1)',
  DONE: 'rgba(255, 128, 0, 1)',
} as const;

export const priorityColors = {
  LOW: 'rgba(0, 247, 255, 1)',
  MEDIUM: 'rgba(251, 0, 255, 1)',
  HIGH: 'rgba(255, 234, 0, 1)',
} as const;

export const badgeColor = {
  ...categoryColors,
  ...statusColors,
  ...priorityColors,
} as const;

import * as z from 'zod/v4';

import { categoryColors, priorityColors, statusColors } from '@shared/config';

export const CategoryScheme = z.enum(Object.keys(categoryColors), {
  error: 'Должна быть категория',
});
export const StatusScheme = z.enum([...Object.keys(statusColors)] as const, {
  error: 'Должен быть статус',
});
export const PriorityScheme = z.enum(Object.keys(priorityColors), {
  error: 'Должен быть приоритет',
});
export const TaskScheme = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Должен быть заголовок'),
  description: z.string().optional(),
  category: CategoryScheme,
  status: StatusScheme,
  priority: PriorityScheme,
  createdAt: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, { error: 'Неверный формат даты' }),
  updatedAt: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/)
    .optional(),
});

export const ApiErrorScheme = z.object({
  error: z.string(),
});

export const TasksArrayScheme = z.array(TaskScheme);

export type Task = z.infer<typeof TaskScheme>;

export type Category = z.infer<typeof CategoryScheme>;
export type Status = z.infer<typeof StatusScheme>;
export type Priority = z.infer<typeof PriorityScheme>;

export type BadgeType = Category | Status | Priority;

export type ApiError = z.infer<typeof ApiErrorScheme>;

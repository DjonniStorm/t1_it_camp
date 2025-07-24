import {
  badgeColor,
  categoryColors,
  priorityColors,
  statusColors,
} from '@shared/config';

export const getBadgeColor = <T extends keyof typeof badgeColor>(
  type: T,
): string => {
  return badgeColor[type];
};

export const availableStatusColors = Object.keys(statusColors);
export const availableCategoryColors = Object.keys(categoryColors);
export const availablePriorityColors = Object.keys(priorityColors);

import {
  badgeColor,
  categoryColors,
  priorityColors,
  statusColors,
} from '@shared/config';
import type { BadgeType } from '@shared/types';

export const getBadgeColor = <T extends BadgeType>(type: T): string => {
  return badgeColor[type];
};

export const availableStatusColors = Object.keys(statusColors);
export const availableCategoryColors = Object.keys(categoryColors);
export const availablePriorityColors = Object.keys(priorityColors);

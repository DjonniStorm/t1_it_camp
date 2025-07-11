import { badgeColor, type BadgeType } from '@/@types/types';

export const getBadgeColor = <T extends BadgeType>(type: T): string => {
  return badgeColor[type];
};

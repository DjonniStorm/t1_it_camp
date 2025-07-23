import type { badgeColor } from '@shared/config';
import { CategoryScheme, PriorityScheme, StatusScheme } from '@shared/types';

type BC = keyof typeof badgeColor;

export const safeBadgeColor = (value: string): value is BC => {
  return (
    CategoryScheme.safeParse(value).success ||
    StatusScheme.safeParse(value).success ||
    PriorityScheme.safeParse(value).success
  );
};

import type { Task } from '@/@types/types';
import { getBadgeColor } from '@/lib/badge-color';
import {
  ActionIcon,
  Badge,
  Card,
  Flex,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { IconPencil } from '@tabler/icons-react';

type TaskItemProps = Task & {
  onClick: (id: string) => void;
};

export const TaskItem = ({
  id,
  title,
  description,
  status,
  priority,
  category,
  onClick,
}: TaskItemProps): React.JSX.Element => {
  return (
    <Card withBorder radius="md">
      <Card.Section py="xs" px="xs">
        <Flex justify="space-between">
          <Flex gap="md">
            <Badge color={getBadgeColor(status)}>{status}</Badge>
            <Badge color={getBadgeColor(priority)}>{priority}</Badge>
            <Badge color={getBadgeColor(category)}>{category}</Badge>
          </Flex>
          <ActionIcon color="purple" type="button" onClick={() => onClick(id)}>
            <IconPencil />
          </ActionIcon>
        </Flex>
      </Card.Section>
      <Title size={'h3'}>{title}</Title>
      {description && (
        <Spoiler
          maxHeight={80}
          showLabel="Показать полностью"
          hideLabel="Свернуть"
        >
          <Text lineClamp={12} size="md">
            <span className="opacity-80 italic">описание: </span>
            {description}
          </Text>
        </Spoiler>
      )}
      {!description && <span className="opacity-80 italic">нет описания</span>}
    </Card>
  );
};

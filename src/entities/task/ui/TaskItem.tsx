import {
  ActionIcon,
  Badge,
  Card,
  Flex,
  Group,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { getBadgeColor } from '@entities/task';
import type { Task } from '@shared/types';

type TaskItemProps = Task & {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
};

export const TaskItem = ({
  id,
  title,
  description,
  status,
  priority,
  category,
  onEditClick,
  onDeleteClick,
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
          <Group align="center" justify="center">
            <ActionIcon
              color="purple"
              type="button"
              onClick={() => onEditClick(id)}
            >
              <IconPencil />
            </ActionIcon>
            <ActionIcon
              color="red"
              type="button"
              onClick={() => onDeleteClick(id)}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
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

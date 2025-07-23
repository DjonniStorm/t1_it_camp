import {
  ActionIcon,
  Badge,
  Card,
  Flex,
  Group,
  Space,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { getBadgeColor, safeBadgeColor } from '@entities/task';
import type { Task } from '@shared/types';

type TaskItemProps = Task & {
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
};

const badgeColor = (v: string) => {
  if (safeBadgeColor(v)) {
    return getBadgeColor(v);
  }
  return 'black';
};

export const TaskItem = ({
  id,
  title,
  description,
  status,
  priority,
  category,
  createdAt,
  updatedAt,
  onEditClick,
  onDeleteClick,
}: TaskItemProps): React.JSX.Element => {
  return (
    <Card withBorder radius="md">
      <Card.Section py="xs" px="xs">
        <Flex justify="space-between">
          <Flex gap="md">
            <Badge color={badgeColor(status)}>{status}</Badge>
            <Badge color={badgeColor(priority)}>{priority}</Badge>
            <Badge color={badgeColor(category)}>{category}</Badge>
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
      <Space p="sm">
        <Group gap={5}>
          <Badge bg="indigo">{createdAt}</Badge>
          <Badge bg="grape">{updatedAt}</Badge>
        </Group>
      </Space>
    </Card>
  );
};

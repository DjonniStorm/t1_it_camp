import { Button } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

type TaskCreateProps = {
  className?: string;
};

export const TaskCreate = ({
  className = '',
}: TaskCreateProps): React.JSX.Element => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/task/new');
  };

  return (
    <Button
      className={className}
      onClick={handleCreateClick}
      size="lg"
      radius="xl"
      variant="filled"
      style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50 }}
    >
      <IconPencil size={30} />
    </Button>
  );
};

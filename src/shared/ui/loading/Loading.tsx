import { Container, Flex, Image, Loader, Space, Text } from '@mantine/core';
import { useState } from 'react';

type LoadingProps = {
  text: string;
  isSadImageAllow: boolean;
};

export const Loading = ({
  text,
  isSadImageAllow,
}: LoadingProps): React.JSX.Element => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Container p="md" bdrs="md" flex="column">
      <Text ta="center" c="teal" size="lg" fw={1000}>
        {text}
      </Text>
      <Space h="md" />
      {(!imageLoaded || !isSadImageAllow) && (
        <Flex justify="center">
          <Loader size={100} />
        </Flex>
      )}
      {isSadImageAllow && (
        <Image
          src="https://media1.tenor.com/m/-CfhczC_cREAAAAC/angai313-spongebob-sad.gif"
          alt="грустная картинка для загрузки"
          radius="md"
          onLoad={() => setImageLoaded(true)}
          h={200}
        />
      )}
    </Container>
  );
};

import { Container, VStack, Text, Flex } from '@chakra-ui/react';
import Wrapper from '@/components/Wrapper';
import NavigationBar from '@/components/NavigationBar';
import ReportModal from '@/components/ReportModal';
import React from 'react';

const Test: React.FC<{}> = () => {
  const [show, setShow] = React.useState(true);

  return (
    <Container>
      <Flex h="full" justify="center">
        <button onClick={() => setShow(!show)}>Show</button>
        <ReportModal show={show} onClose={() => setShow(false)} />
      </Flex>
    </Container>
  );
};

export default Test;

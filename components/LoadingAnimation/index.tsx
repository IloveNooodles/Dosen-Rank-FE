import { Flex } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

const LoadingAnimation = () => {
  return (
    <Flex minH='70vh' justifyContent={'center'} alignItems='center'>
      <BeatLoader color="#39a5c6" size={18} aria-label="Loading Spinner" />
    </Flex>
  );
};

export default LoadingAnimation;

import { Box, Image } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const Wrapper = (prop: Props) => {
  return (
    <>
      <Box position="absolute" w="100%" h="100%" overflow="clip">
        <Image
          src="/graduation-cap-2.png"
          alt="Decoration"
          position="absolute"
          marginLeft="12%"
          marginTop="9%"
          w="11%"
          pointerEvents="none"
          userSelect="none"
        />
        <Image
          src="/graduation-cap-1.png"
          alt="Decoration"
          position="absolute"
          marginLeft="50%"
          marginTop="15%"
          w="45%"
          pointerEvents="none"
          userSelect="none"
        />
        <Image
          src="/halftone-dots.svg"
          alt="Decoration"
          position="absolute"
          marginLeft="30%"
          marginTop="-14%"
          w="24%"
          pointerEvents="none"
          userSelect="none"
        />
        <Image
          src="/halftone-dots.svg"
          alt="Decoration"
          position="absolute"
          marginLeft="24%"
          marginTop="39%"
          w="16%"
          pointerEvents="none"
          userSelect="none"
        />
      </Box>
      {prop.children}
    </>
  );
};

export default Wrapper;

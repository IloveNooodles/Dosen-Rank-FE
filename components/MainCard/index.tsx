import { Flex } from '@chakra-ui/react';

const MainCard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Flex justifyContent="center" w="full">
      <Flex
        w="full"
        marginTop={4}
        marginX={{ base: 4, sm: 8, md: 12, lg: 16 }}
        borderRadius={20}
        border="1px"
        bgColor="white"
        borderColor="gray.200"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default MainCard;

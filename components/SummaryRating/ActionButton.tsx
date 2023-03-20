import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const SummaryActionButton: React.FC<{ pagePath: string }> = ({ pagePath }) => {
  return (
    <Flex direction="row">
      {pagePath.includes('professors') || pagePath.includes('universities') ? (
        <Link href="/">
          <Text
            as="u"
            fontSize={{ base: 'sm', sm: 'lg' }}
            mr="4"
            ml={{ sm: '4', md: '8' }}
          >
            Lihat mata kuliah
          </Text>
        </Link>
      ) : null}
      {pagePath.includes('courses') || pagePath.includes('universities') ? (
        <Link href="/">
          <Text
            as="u"
            fontSize={{ base: 'sm', sm: 'lg' }}
            mr="4"
            ml={{ sm: '4', md: '8' }}
          >
            Lihat dosen
          </Text>
        </Link>
      ) : null}
    </Flex>
  );
};

export default SummaryActionButton;

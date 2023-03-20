import { dm_sans } from '@/fonts';
import { useRouter } from 'next/router';
import { FiGithub, FiGitlab } from 'react-icons/fi';
import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  HStack,
  Spacer,
  Icon,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

const Footer: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <Container py="1.5rem" px={{ base: '0.75rem', md: '2.5rem' }} h="auto">
      <VStack alignItems="start">
        <HStack gap="1.5rem">
          <Link href="https://github.com/IloveNooodles" target="_blank">
            <Icon as={FiGithub} color="biru.800" w="1.5rem" h="1.5rem" />
          </Link>
          <Link
            href="https://gitlab.informatika.org/if3250_2023_k01_06"
            target="_blank"
          >
            <Icon as={FiGitlab} color="biru.800" w="1.5rem" h="1.5rem" />
          </Link>
        </HStack>
        <Text color="biru.800" fontSize={{ base: '0.69rem', md: '0.88rem' }}>
          made with love by FGFGF
        </Text>
      </VStack>
    </Container>
  );
};

export default Footer;

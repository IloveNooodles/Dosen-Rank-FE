'use strict';

import LoadingAnimation from '@/components/LoadingAnimation';
import SearchBar from '@/components/SearchBar';
import SearchCard from '@/components/SearchCard';
import { University } from '@/interfaces';
import { useUnivSearch } from '@/services/search';
import { Container, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';


const Search: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data, isLoading, error } = useUnivSearch(name as string);

  const univData = data?.data as Array<University>;

  function renderSearch() {
    if (isLoading) return <LoadingAnimation />;
    if (error) return <p>Error when searching</p>;
    if (!univData)
      return (
        <Text
          fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
          fontWeight="bold"
          align={{ base: 'center', sm: 'center' }}
          color="biru.800"
          margin={'auto 0'}
        >
          Hasil tidak ditemukan
        </Text>
      );

    return univData?.map((univ: University) => {
      return (
        <SearchCard
          key={univ.id}
          searchResult={univ.name}
          slug={univ.slug}
          searchFor="university"
        />
      );
    });
  }

  return (
    <Container
      display={'flex'}
      flexDirection={'column'}
      // justifyContent={'flex'}
      alignItems={'center'}
      minH={'calc(92vh - 108px)'}
    >
      <Head>
        <title>Hasil Pencarian</title>
        <meta
            name="description"
            content="Cari Dosen is application that can helps you rate universities, professor, and courses"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container
        display={'flex'}
        flexDir={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Text
          fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
          fontWeight="bold"
          align={{ base: 'center', sm: 'left' }}
          color="biru.800"
          ml={{ base: 0, sm: '4', md: '8' }}
        >
          Hasil pencarian universitas
        </Text>
        <SearchBar />
      </Container>

      <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
        {renderSearch()}
      </Flex>
    </Container>
  );
};

export default Search;

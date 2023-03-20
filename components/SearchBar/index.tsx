import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Link from 'next/link';

const SearchBar: React.FC<{}> = () => {
  return (
    <InputGroup w={{ base: '20rem', md: '33rem' }}>
      <Input
        placeholder="Cari universitas, mata kuliah, atau dosen..."
        _placeholder={{ color: 'netral.400', fontWeight: 'light' }}
        borderColor="netral.300"
        fontSize={{ base: '0.7rem', md: '1rem' }}
        focusBorderColor="biru.800"
        borderRadius="1.5rem"
        backgroundColor={'whiteAlpha.700'}
        backgroundBlendMode="overlay"
      />
      <Link href={'/search?q=all'}>
        <InputRightElement>
          <Search2Icon color="netral.400" />
        </InputRightElement>
      </Link>
    </InputGroup>
  );
};

export default SearchBar;

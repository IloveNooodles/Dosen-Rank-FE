import { SelectOption } from '@/interfaces';
import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import ContentNotFound from '@/components/ContentNotFound';
import DosenCard from '@/components/DosenCard';
import MatkulCard from '@/components/MatkulCard';
import { apiInstance } from '@/utils/apiInstance';
import { Card } from '@chakra-ui/card';
import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface SearchAndFilterProps {
  courses: CoursesProps[];
  professors: ProfessorProps[];
  univName: string;
  page?: number;
  name?: string;
  sort?: string;
  majors?: string;
  faculty?: string;
  url?: string;
  facultiesArray?: FacultyProps[];
  majorsArray?: MajorProps[];
}

export interface CoursesProps {
  id: number;
  course_id: string;
  name: string;
  institute_id: number;
  institution_name: string;
  slug: string;
}

export interface ProfessorProps {
  id: number;
  name: string;
  institutionId: number;
  institutionName: string;
  slug: string;
  major_name: string;
  faculty_name: string;
}

export interface FacultyProps {
  id: number;
  name: string;
  code: number;
}

export interface MajorProps {
  id: number;
  name: string;
  code: number;
}

export async function getServerSideProps(context: {
  query: {
    univName: string;
    name?: string;
    page?: number;
    sort?: string;
    majors?: string;
    faculty?: string;
  };
}) {
  const { univName, name, page, sort, majors, faculty } = context.query;

  try {
    let url = `/search/${univName}/?page=${page ? page : 1}`;
    if (name) {
      url += `&name=${name}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (majors) {
      url += `&majors=${majors}`;
    }
    if (faculty) {
      url += `&faculty=${faculty}`;
    }
    const response = await apiInstance({})
      .get(url)
      .catch((e) => console.error(e));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { courses, professors } = await response.data.data;

    const props: Record<string, unknown> = {
      univName,
      courses,
      professors,
      page: page ? parseInt(page.toString(), 10) : 1,
      url,
    };

    if (name) {
      props.name = name;
    }
    if (sort) {
      props.sort = sort;
    }
    if (majors) {
      props.majors = majors;
    }
    if (faculty) {
      props.faculty = faculty;
    }

    // get faculties and majors
    const filterResponse = await apiInstance({})
      .get(`/search/faculty-major/${univName}`)
      .catch((e) => console.error(e));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { faculties, majors: majorsResponse } = await filterResponse.data
      .data;

    props.facultiesArray = faculties;
    props.majorsArray = majorsResponse;

    return { props };
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = (props) => {
  const {
    courses,
    professors,
    univName,
    page,
    name,
    sort,
    majors,
    faculty,
    url,
    facultiesArray,
    majorsArray,
  } = props;

  const [nameSearch, setNameSearch] = useState<string>(name ? name : '');
  const [currentPage, setCurrentPage] = useState<number>(page ? page : 1);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [sortBy, setSortBy] = useState<string>(sort ? sort : 'asc');
  const router = useRouter();
  const SelectInput = dynamic(() => import('../../components/SelectInput'), {
    ssr: false,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const facultyOption: Array<SelectOption> = facultiesArray!.map(
    ({ id, name }) => ({ label: name, value: id.toString() })
  );

  const handleClickNext = async () => {
    const { univName, name, page, majors, faculty } = router.query;
    const searchParams = new URLSearchParams();

    // add existing query params to searchParams
    if (name) {
      searchParams.set('name', name as string);
    }
    if (sort) {
      searchParams.set('sort', sort as string);
    }
    if (majors) {
      searchParams.set('majors', majors as string);
    }
    if (faculty) {
      searchParams.set('faculty', faculty as string);
    }

    if (page) {
      searchParams.set(
        'page',
        String(parseInt(page.toString(), 10) + 1) as string
      );
    } else {
      const tempPage = 1;
      searchParams.set(
        'page',
        String(parseInt(tempPage.toString(), 10)) as string
      );
    }

    // push new route with updated search params
    await router.push({
      pathname: `/search/${univName}`,
      search: searchParams.toString(),
    });
  };

  const handleClickPrev = async () => {
    const { univName, name, page, majors, faculty } = router.query;
    const searchParams = new URLSearchParams();

    // add existing query params to searchParams
    if (name) {
      searchParams.set('name', name as string);
    }
    if (sort) {
      searchParams.set('sort', sort as string);
    }
    if (majors) {
      searchParams.set('majors', majors as string);
    }
    if (faculty) {
      searchParams.set('faculty', faculty as string);
    }

    // add new sort query param to searchParams
    if (page) {
      searchParams.set(
        'page',
        String(parseInt(page.toString(), 10) - 1) as string
      );
    } else {
      const tempPage = 1;
      searchParams.set(
        'page',
        String(parseInt(tempPage.toString(), 10)) as string
      );
    }

    // push new route with updated search params
    await router.push({
      pathname: `/search/${univName}`,
      search: searchParams.toString(),
    });
  };

  const handleSortChange = (event: { target: { value: any } }) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    const { univName, name, page, majors, faculty } = router.query;
    const searchParams = new URLSearchParams();

    // add existing query params to searchParams
    if (name) {
      searchParams.set('name', name as string);
    }
    if (page) {
      searchParams.set('page', page as string);
    }
    if (majors) {
      searchParams.set('majors', majors as string);
    }
    if (faculty) {
      searchParams.set('faculty', faculty as string);
    }

    // add new sort query param to searchParams
    searchParams.set('sort', newSortBy);

    // push new route with updated search params
    router.push({
      pathname: `/search/${univName}`,
      search: searchParams.toString(),
    });
  };

  const handleFilterButton = () => {
    const { name } = router.query;
    const searchParams = new URLSearchParams();
    searchParams.set('faculty', selectedFaculty);
    searchParams.set('majors', selectedMajor);
    searchParams.set('page', '1');
    if (name) {
      searchParams.set('name', name as string);
    }

    router.push({
      pathname: `/search/${univName}`,
      search: searchParams.toString(),
    });
  };

  const renderFilterComponent = () => {
    return (
      <Show above="1080px">
        <Flex direction={'column'} maxW={'15rem'}>
          <Text fontSize="1rem" fontWeight="bold" mb="0.3rem">
            Filter
          </Text>
          <Card>
            <VStack>
              <VStack maxW={'85%'}>
                <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem">
                  Fakultas:
                </Text>
                <Select
                  placeholder="Pilih Fakultas"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  {facultiesArray!.map((faculty) => (
                    <option key={faculty.name} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </Select>
              </VStack>
              <VStack maxW={'85%'}>
                <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem" pt={4}>
                  Jurusan:
                </Text>
                <Select
                  placeholder="Pilih Jurusan"
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                >
                  {majorsArray!.map((major) => (
                    <option key={major.name} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </Select>
              </VStack>
              <Box>
                <Button
                  colorScheme="teal"
                  fontSize="sm"
                  size="sm"
                  fontWeight="bold"
                  variant="solid"
                  borderRadius="1rem"
                  my={5}
                  onClick={handleFilterButton}
                >
                  Apply
                </Button>
              </Box>
            </VStack>
          </Card>
        </Flex>
      </Show>
    );
  };

  const searchComponent = () => {
    return (
      <Box display={'flex'}>
        <InputGroup w={{ base: '20rem', md: '33rem' }} marginRight={'1.5rem'}>
          <Input
              id={'search-bar'}
            placeholder="Cari mata kuliah, atau dosen..."
            _placeholder={{
              color: 'netral.400',
              fontWeight: 'light',
            }}
            borderColor="netral.300"
            fontSize={{ base: '0.7rem', md: '1rem' }}
            focusBorderColor="biru.800"
            borderRadius="1.5rem"
            backgroundColor={'whiteAlpha.700'}
            backgroundBlendMode="overlay"
            onKeyUp={(e) => setNameSearch((e.target as HTMLInputElement).value)}
          />
          <Link href={`/search/${univName}/?name=${nameSearch}&page=1`}>
            <InputRightElement>
              <Search2Icon color="netral.400" />
            </InputRightElement>
          </Link>
        </InputGroup>
        {sortComponent()}
      </Box>
    );
  };

  const sortComponent = () => {
    return (
      <Box alignSelf={'flex-start'}>
        <HStack>
          <HStack>
            <Box>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                placeholder="Select option"
              >
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </Select>
            </Box>
            <Show below="1080px">
              <Box
                as="button"
                bg="transparent"
                border="none"
                p={0}
                m={0}
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                _active={{ outline: 'none' }}
                onClick={onOpen}
              >
                <Image
                  src={'/ic-filter.svg'}
                  alt={'filter logo'}
                  width={30}
                  height={30}
                ></Image>
              </Box>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign={'center'}>Filter</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack>
                      <VStack justifyContent="flex-start">
                        <Box w={80}>
                          <Select
                            placeholder="Pilih Fakultas"
                            value={selectedFaculty}
                            onChange={(e) => setSelectedFaculty(e.target.value)}
                          >
                            {facultiesArray!.map((faculty) => (
                              <option key={faculty.name} value={faculty.id}>
                                {faculty.name}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </VStack>
                      <VStack>
                        <Box w={80}>
                          <Select
                            placeholder="Pilih Jurusan"
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                          >
                            {majorsArray!.map((major) => (
                              <option key={major.name} value={major.id}>
                                {major.name}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </VStack>
                      <Box>
                        <Button
                          colorScheme="teal"
                          fontSize="sm"
                          size="sm"
                          fontWeight="bold"
                          variant="solid"
                          borderRadius="1rem"
                          my={5}
                          onClick={handleFilterButton}
                        >
                          Apply
                        </Button>
                      </Box>
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Show>
          </HStack>
        </HStack>
      </Box>
    );
  };

  const renderDosen = () => {
    return (
      <TabPanel>
        <Card
          display={'flex'}
          flexDir={'column'}
          flexWrap={'wrap'}
          overflowY={'hidden'}
          overflowX={'hidden'}
          justifyContent={'start'}
          minH={'25rem'}
        >
          {professors !== null ? (
            professors.map((professor, index) => (
              <DosenCard
                dosenName={professor.name}
                urlDosen={professor.slug}
                faculty={professor.faculty_name}
                major={professor.major_name}
                key={index}
              />
            ))
          ) : (
            <Box padding={'2rem'}>
              <ContentNotFound />
            </Box>
          )}
        </Card>
        <Box pt={4}>
          <Pagination>
            <Pagination.Prev onClick={handleClickPrev} />
            <Pagination.Next onClick={handleClickNext} />
          </Pagination>
        </Box>
      </TabPanel>
    );
  };

  const renderMatkul = () => {
    return (
      <TabPanel>
        <Card
          display={'flex'}
          flexDir={'column'}
          flexWrap={'wrap'}
          overflowY={'hidden'}
          overflowX="hidden"
          justifyContent={'start'}
          minH={'25rem'}
        >
          {courses !== null ? (
            courses.map((course, index) => (
              <MatkulCard
                key={index}
                matkulName={course.name}
                matkulCode={course.course_id}
                matkulSlug={course.slug}
              />
            ))
          ) : (
            <Box padding={'2rem'}>
              <ContentNotFound />
            </Box>
          )}
        </Card>
        <Box pt={4}>
          <Pagination>
            <Pagination.Prev onClick={handleClickPrev} />
            <Pagination.Next onClick={handleClickNext} />
          </Pagination>
        </Box>
      </TabPanel>
    );
  };

  const renderSearchResult = () => {
    return (
      <TabPanels>
        {renderDosen()}
        {renderMatkul()}
      </TabPanels>
    );
  };

  const renderSearchComponent = () => {
    return (
      <Box display={'flex'}>
        <VStack>
          <Tabs pt="1rem">
            <VStack>
              <Show above="md">
                <Flex justifyContent="start" w="100%" pb="1.5rem" pl="2rem">
                  <TabList>
                    <Tab>Dosen</Tab>
                    <Tab>Matkul</Tab>
                  </TabList>
                </Flex>
              </Show>
              {searchComponent()}
              <Show below="md">
                <Flex justify="center" w="18rem">
                  <TabList>
                    <Tab>Dosen</Tab>
                    <Tab>Matkul</Tab>
                  </TabList>
                </Flex>
              </Show>
              {renderSearchResult()}
            </VStack>
          </Tabs>
        </VStack>
      </Box>
    );
  };

  return (
    <Container>
      <Flex>
        {renderFilterComponent()}
        <Flex flexGrow={1} justifyContent={'center'}>
          {renderSearchComponent()}
        </Flex>
      </Flex>
    </Container>
  );
};

export default SearchAndFilter;

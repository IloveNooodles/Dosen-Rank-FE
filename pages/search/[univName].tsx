import React, {useState} from "react";
import {
    Box, Button,
    Container,
    Flex, HStack, Input, InputGroup, InputRightElement,
    Select, Show,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack, Wrap
} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import DosenCard from "@/components/DosenCard";
import MatkulCard from "@/components/MatkulCard";
import {apiInstance} from "@/utils/apiInstance";
import ContentNotFound from "@/components/ContentNotFound";
import Link from "next/link";
import {Search2Icon} from "@chakra-ui/icons";


export async function getServerSideProps(context: { query: { univName: string, name?: string, page?: number } }) {
    const {univName, name, page} = context.query;

    let totalCoursesPages;
    let totalProfessorsPages;
    try {
        const response = await apiInstance({})
            .get(name ? `/search/${univName}/?name=${name}&page=${page}` : `/search/${univName}/?page=${page? page : 1}`)
            .catch((e) => console.error(e));
        const {courses, professors} = await response?.data.data;

        if (!courses) {
            totalCoursesPages = 0;
        } else {
            totalCoursesPages = Math.ceil(courses.length / 12);
        }

        if (!professors) {
            totalProfessorsPages = 0;
        } else {
            totalProfessorsPages = Math.ceil(professors.length / 12);
        }

        if (!name || !page)  {
            return {props: {univName, courses, professors, totalCoursesPages, totalProfessorsPages}}
        }
        return {props: {univName, courses, professors, totalCoursesPages, totalProfessorsPages}}
    } catch (e) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
}

export interface SearchAndFilterProps {
    courses: CoursesProps[],
    professors: ProfessorProps[],
    univName: string,
    page?: number,
    totalCoursesPages: number,
    totalProfessorsPages: number,
    name?: string,
}

export interface CoursesProps {
    id: number,
    course_id: string,
    name: string,
    institute_id: number,
    institution_name: string,
    slug: string,
}

export interface ProfessorProps {
    id: number,
    name: string,
    institutionId: number,
    institutionName: string,
    slug: string,
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
                                                             courses,
                                                             professors,
                                                             univName,
                                                             page, totalCoursesPages, totalProfessorsPages, name
                                                         }) => {
    const [nameSearch, setNameSearch] = useState<string>(name ? name : '');
    const [currentPage, setCurrentPage] = useState<number>(page ? page : 1);
    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Flex justifyContent="center" w="full">
                <Box w="19rem" mt="1.6rem">
                    <Show above="md">
                        <Text fontSize="1rem" fontWeight="bold" mb="0.3rem">Filter</Text>
                        <Card>
                            <VStack>
                                <VStack justifyContent="flex-start">
                                    <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem">Fakultas:</Text>
                                    <Select placeholder='Select option'>
                                        <option value='option1'>Option 1</option>
                                    </Select>
                                </VStack>
                                <VStack>
                                    <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem" pt={4}>Jurusan:</Text>
                                    <Select placeholder='Select option'>
                                        <option value='option1'>Option 1</option>
                                    </Select>
                                </VStack>
                                <Box>
                                    <Button colorScheme="teal" fontSize="sm" size="sm" fontWeight="bold" variant="solid"
                                            borderRadius="1rem" my={5}>
                                        Apply
                                    </Button>
                                </Box>
                            </VStack>
                        </Card>
                    </Show>
                </Box>
                <Box w="97rem">
                    <VStack>
                        <Tabs pt="1rem">
                            <VStack>
                                <Show above="md">
                                    <Flex justifyContent="start" w="95%" pb="1.5rem">
                                        <TabList>
                                            <Tab>Dosen</Tab>
                                            <Tab>Matkul</Tab>
                                        </TabList>
                                    </Flex>
                                </Show>
                                <Box my={{sm: "0", md: "8rem"}}>
                                    <InputGroup w={{base: "20rem", md: "33rem"}}>
                                        <Input
                                            placeholder="Cari mata kuliah, atau dosen..."
                                            _placeholder={{color: "netral.400", fontWeight: "light"}}
                                            borderColor="netral.300"
                                            fontSize={{base: "0.7rem", md: "1rem"}}
                                            focusBorderColor="biru.800"
                                            borderRadius="1.5rem"
                                            backgroundColor={"whiteAlpha.700"}
                                            backgroundBlendMode="overlay"
                                            onKeyUp={(e) => setNameSearch(e.target.value)}
                                        />
                                        <Link href={`/search/${univName}/?name=${nameSearch}&page=1`}>
                                            <InputRightElement>
                                                <Search2Icon color="netral.400"/>
                                            </InputRightElement>
                                        </Link>
                                    </InputGroup>
                                </Box>
                                <Box pt="1.5rem">
                                    <HStack gap="38rem">
                                        <Show above="md">
                                            <Text></Text>
                                        </Show>
                                        <HStack>
                                            <Text fontWeight="bold">Urutkan:</Text>
                                            <Select placeholder='Select option'>
                                                <option value='option1'>A - Z</option>
                                                <option value='option2'>Z - A</option>
                                            </Select>
                                        </HStack>
                                    </HStack>
                                </Box>
                                <Show below="md">
                                    <Flex justify="center" w="18rem">
                                        <TabList>
                                            <Tab>Dosen</Tab>
                                            <Tab>Matkul</Tab>
                                        </TabList>
                                    </Flex>
                                </Show>
                                <TabPanels>
                                    <TabPanel h="35rem" w="100%" justifyContent="center" alignItems="center">
                                        <Card w={{base: "22rem", md: "57rem"}} h={{base: "27rem", md: "21rem"}}
                                              justify="center" align="center">
                                            {/* eslint-disable-next-line react/jsx-no-undef */}
                                            <Wrap w={{sm: "10%", md: "95%"}} h="95%" justify="center" align="center"
                                                  overflowY={"scroll"}>
                                                {(professors !== null) ? professors.map((professor) => (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <DosenCard dosenName={professor.name}
                                                                   urlDosen={professor.slug}></DosenCard>
                                                    )) :
                                                    <Box w="100%" h="100%" pt={"2rem"}>
                                                        <ContentNotFound/>
                                                    </Box>}
                                            </Wrap>
                                        </Card>
                                        <Box pt={4}>
                                            <nav aria-label="...">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item">
                                                        <span className="page-link">Previous</span>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">1</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" onClick={() => setCurrentPage(2)} href={`/search/${univName}/?name=${nameSearch}&page=2`}>2</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">3</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel h="35rem">
                                        <Card w={{base: "22rem", md: "57rem"}} h={{base: "27rem", md: "21rem"}}
                                              justify="center" align="center">
                                            <Wrap w={{sm: "10%", md: "95%"}} h="95%" justify="center" align="center"
                                                  overflowY={"scroll"}>
                                                {courses !== null ? courses.map((course) => (
                                                        <MatkulCard
                                                            key={courses.indexOf(course)} matkulName={course.name}
                                                            matkulCode={course.course_id}
                                                            urlMatkul={course.course_id}></MatkulCard>
                                                    )) :
                                                    <Box w="100%" h="100%" pt={{sm: "2rem", md: "2rem"}}>
                                                        <ContentNotFound/>
                                                    </Box>

                                                }
                                            </Wrap>
                                        </Card>
                                    </TabPanel>
                                </TabPanels>
                            </VStack>
                        </Tabs>
                    </VStack>
                </Box>
            </Flex>
        </Container>

    );
};

export default SearchAndFilter;
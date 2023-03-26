import React from "react";
import {
    Box, Button,
    Container,
    Flex, HStack,
    Select, Spacer,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack, Wrap
} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import SearchBar from "@/components/SearchBar";
import DosenCard from "@/components/DosenCard";
import MatkulCard from "@/components/MatkulCard";
import { apiInstance } from "@/utils/apiInstance";

export async function getServerSideProps(context: { query: { name: string } }) {
    const { name } = context.query;

    try {
        const response  = await apiInstance({})
            .get(`/search/${name}`)
            .catch((e) => console.error(e));
        const { courses, professors } = await response?.data.data;
        return { props: { courses, professors } };
    }
    catch (e) {
        console.log(e);
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
                                                         }) => {
    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Flex justifyContent="center" w="full">
                <Box w="19rem" mt="1.6rem">
                    <Text fontSize="1rem" fontWeight="bold" mb="0.3rem" >Filter</Text>
                    <Card>
                        <VStack>
                            <VStack justifyContent="flex-start">
                                <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem">Fakultas:</Text>
                                <Select placeholder='Select option'>
                                    <option value='option1'>Option 1</option>
                                </Select>
                            </VStack>
                            <VStack>
                                <Text fontSize="0.8rem" fontWeight="bold" mb="0.3rem"  pt={4}>Jurusan:</Text>
                                <Select placeholder='Select option'>
                                    <option value='option1'>Option 1</option>
                                </Select>
                            </VStack>
                            <Box>
                                <Button colorScheme="teal" fontSize="sm" size="sm" fontWeight="bold" variant="solid" borderRadius="1rem" my={5}>
                                    Apply
                                </Button>
                            </Box>
                        </VStack>

                    </Card>
                </Box>
                <Box w="97rem">
                    <VStack>
                        <Tabs pt="1rem">
                            <VStack>
                                <Flex justifyContent="start" w="95%" pb="1.5rem">
                                    <TabList>
                                        <Tab>Dosen</Tab>
                                        <Tab>Matkul</Tab>
                                    </TabList>
                                </Flex>
                                <Box my={8}>
                                    <SearchBar/>
                                </Box>
                                <Box pt="1.5rem">
                                    <HStack gap="38rem">
                                        <Text></Text>
                                        <HStack>
                                            <Text fontWeight="bold">Urutkan:</Text>
                                            <Select placeholder='Select option'>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                        </HStack>
                                    </HStack>
                                </Box>
                                <TabPanels h="35rem">
                                    <TabPanel h="35rem">
                                        <Card w="57rem" h="35rem">
                                            {/* eslint-disable-next-line react/jsx-no-undef */}
                                            <Wrap w="95%" h="95%" >
                                                {professors.map((professor) => (
                                                    // eslint-disable-next-line react/jsx-key
                                                        <DosenCard dosenName={professor.name}></DosenCard>
                                                ))
                                                }
                                            </Wrap>
                                        </Card>
                                    </TabPanel>
                                    <TabPanel h="35rem">
                                        <Card w="57rem" h="35rem">
                                            <Wrap w="95%" h="95%" >
                                                {courses.map((course) => (
                                                    <MatkulCard matkulName={course.name} matkulCode={course.course_id}></MatkulCard>
                                                ))
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
import React from "react";
import NavigationBar from "@/components/NavigationBar";
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
    VStack
} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import Search from "@/pages/search";
import SearchBar from "@/components/SearchBar";
import DosenCard from "@/components/DosenCard";
import MatkulCard from "@/components/MatkulCard";

const SearchAndFilter: React.FC<{}> = () => {
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
                                        <Card w="57rem">
                                            <DosenCard dosenName={"Rinaldi Munir"}></DosenCard>
                                        </Card>
                                    </TabPanel>
                                    <TabPanel h="35rem">
                                        <Card w="57rem">
                                            <MatkulCard matkulName={"Matematika Diskrit"} matkulCode={"IF2211"}></MatkulCard>
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
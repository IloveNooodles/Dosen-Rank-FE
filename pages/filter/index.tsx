import React from "react";
import NavigationBar from "@/components/NavigationBar";
import {
    Box,
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

const SearchAndFilter: React.FC<{}> = () => {
    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Flex justifyContent="center" w="full">
                <Box w="19rem">
                    <Text fontSize="1rem" fontWeight="bold" mb="0.3rem" pt={5}>Filter</Text>
                    <Card>
                        isi filter
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
                                    <HStack gap="33rem">
                                        <Text>
                                            Hasil pencarian untuk
                                        </Text>
                                        <HStack>
                                            <Text>Urutkan:</Text>
                                            <Select placeholder='Select option'>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                        </HStack>
                                    </HStack>
                                </Box>
                                <TabPanels>
                                    <TabPanel>
                                        <Card w="57rem">
                                            isi hasil pencarian
                                            <p>Dosen!</p>
                                        </Card>
                                    </TabPanel>
                                    <TabPanel>
                                        <Card w="57rem">
                                            isi hasil pencarian
                                            <p>Matkul!</p>
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
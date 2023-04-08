import { Flex, Spacer, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";
import ReportModal from "../ReportModal";

const SummaryTitle: React.FC<{
    title: string;
    reportFor: string;
    reportedId: number;
  }> = ({ title, reportFor, reportedId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems="center">
      <ReportModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reportFor={reportFor} reportedId={reportedId} />
      <Text
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
        fontWeight="bold"
        align={{ base: "center", sm: "left" }}
        color="biru.800"
        ml={{ base: 0, sm: "4", md: "8" }}
      >
        {title?.toLocaleUpperCase()}
      </Text>
      <Spacer />
      <Icon
        as={AiOutlineWarning}
        boxSize={{ base: 3, sm: 4, md: 6 }}
        color="gray.500"
        onClick={onOpen}
        _hover={{ cursor: "pointer", color: "red.600" }}
        aria-label={""}      />
    </Flex>
  );
};

export default SummaryTitle;

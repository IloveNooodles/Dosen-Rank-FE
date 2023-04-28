import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export interface SearchBarProps {
  setSearch?: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  // const setSearch = props.setSearch;
  const [nameSearch, setNameSearch] = useState<string>("");
  return (
    <InputGroup w={{ base: "20rem", md: "33rem" }}>
      <Input
          id={"search-bar"}
        placeholder="Cari universitas, mata kuliah, atau dosen..."
        _placeholder={{ color: "netral.400", fontWeight: "light" }}
        borderColor="netral.300"
        fontSize={{ base: "0.7rem", md: "1rem" }}
        focusBorderColor="biru.800"
        borderRadius="1.5rem"
        backgroundColor={"whiteAlpha.700"}
        backgroundBlendMode="overlay"
        onChange={(e) => setNameSearch(e.target.value)}
<<<<<<< components/SearchBar/index.tsx
        onKeyPress={(e) => {
              if (e.key === 'Enter') {
                  window.location.href = `/search?name=${nameSearch}`
              }
        }}
=======
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.href = `/search?name=${nameSearch}`}}
          }
>>>>>>> components/SearchBar/index.tsx
      />
      <Link id={"search-icon"} href={`/search?name=${nameSearch}`}>
        <InputRightElement>
          <Search2Icon color="netral.400" />
        </InputRightElement>
      </Link>
    </InputGroup>
  );
};

export default SearchBar;

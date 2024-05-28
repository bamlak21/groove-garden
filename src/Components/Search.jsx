import React from "react";
import styled from "@emotion/styled";
import { IoSearchOutline } from "react-icons/io5";
import { tab } from "../responsive";

const SearchBar = styled.div`
  margin: 70px 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  background-color: #19272e;

  ${tab({ marginTop: "140px", marginLeft: "-140px" })}
`;
const InputBar = styled.input`
  border: none;
  margin: 10px;
  outline: none;
  padding: 10px;
  text-transform: capitalize;
  color: #dcdcdc;

  background-color: #19272e;
`;

const Search = ({ query, setQuery }) => {
  return (
    <SearchBar htmlFor="search">
      <IoSearchOutline />
      <InputBar
        name="search"
        type="text"
        placeholder="Search Songs..."
        lowercase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </SearchBar>
  );
};

export default Search;

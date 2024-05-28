import React from "react";
import styled from "@emotion/styled";
import { CiCirclePlus, CiMusicNote1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { tab } from "../responsive";

const Aside = styled.aside`
  position: fixed;
  height: 100dvh;
  flex: 1;
  left: 0;
  top: 0;
  margin: 20px;
  margin-left: 0px;
  margin-top: 40px;
  padding: 40px 0;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
  background-color: #19272e;
  ${tab({
    flexDirection: "row",
    height: "50px",
    justifyContent: "center",
    width: "100%",
  })}
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  ${tab({ display: "none" })}
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #859097;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = () => {
  return (
    <Aside>
      <Title>Library</Title>
      <NavLink to="/">
        <CiMusicNote1 size={20} /> Songs
      </NavLink>
      <NavLink to="/create">
        <CiCirclePlus size={20} />
        Add Songs
      </NavLink>
    </Aside>
  );
};

export default Navbar;

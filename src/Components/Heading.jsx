import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(2px, -4px, 0);
  }

  70% {
    transform: translate3d(0, -1px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const Header = styled.div`
  background-color: #19272e;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: fixed;
  width: 100%;
  top: 0;
`;

const HeaderContent = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  animation: ${bounce} 1s ease infinite;
`;

const Heading = () => {
  return (
    <Header>
      <HeaderContent>Groove Garden</HeaderContent>
    </Header>
  );
};

export default Heading;

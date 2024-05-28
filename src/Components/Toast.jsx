import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
    0%{
        transform: translate(100%);
        opacity: 0;
    }
    100%{
        transform: translate(0);
        opacity: 1;
    }
`;

const ToastContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 10px 20px;
  border-radius: 12px;
  background-color: ${(props) => props.bg};

  animation: ${fadeIn} 0.3s ease-in;
`;
const ToastTxt = styled.p`
  color: white;
  text-transform: uppercase;
`;

const Toast = ({ bg, text }) => {
  return (
    <ToastContainer bg={bg}>
      <ToastTxt>{text}</ToastTxt>
    </ToastContainer>
  );
};

export default Toast;

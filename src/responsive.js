import { css } from "@emotion/react";

export const mobile = (props) => {
  return css`
    @media (max-width: 380px) {
      ${props}
    }
  `;
};

export const tab = (props) => {
  return css`
    @media (max-width: 768px) {
      ${props}
    }
  `;
};

export const med = (props) => {
  return css`
    @media (max-width: 550px) {
      ${props}
    }
  `;
};

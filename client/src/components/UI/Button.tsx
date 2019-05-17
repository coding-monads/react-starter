import styled, { css } from "styled-components";
import posed from "react-pose";

interface Props {
  readonly size?: string;
  readonly rounded?: boolean;
  readonly primary?: boolean;
}

export const Button = styled.button<Props>`
  border: none;
  font-size: 0.9rem;
  padding: 10px 20px;
  margin: 10px;
  border-radius: ${props => (props.rounded ? "10px" : "none")};
  color: ${({ theme }) => theme.colors.grayDark};
  background-color: ${({ theme }) => theme.colors.grayLight};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }

  ${props =>
    props.size === "small"
      ? css`
          padding: 5px 10px;
          font-size: 0.8rem;
        `
      : ""}
  ${props =>
    props.size === "large"
      ? css`
          padding: 15px 30px;
          font-size: 1rem;
        `
      : ""}
  ${props =>
    props.primary
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background-color: ${({ theme }) => theme.colors.primaryDark};

          &:hover {
            background-color: ${({ theme }) => theme.colors.primary};
          }
        `
      : ""}
`;

export const ButtonA = posed(Button)({
  pressable: true,
  hoverable: true,
  init: {
    scale: 1
  },
  hover: {
    scale: 1.1
  },
  press: {
    scale: 0.8
  }
});

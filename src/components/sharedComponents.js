import styled from "styled-components"
import theme from "./theme"

export const Container = styled.div`
  max-width: 800px;
  width: 80vw;
  margin: 0 auto;
`

export const Card = styled.div`
  border-radius: 0.6rem;
  color: ${theme.textPrimary};
  background-color: white;
`

export const Button = styled.button`
  background: ${theme.accentPrimary};
  color: white;
  outline: none;
  border: none;
  min-width: 12rem;
  padding: 0.5rem 0;
  border-radius: 0.6rem;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform-origin: right;
  will-change: opacity;
  line-height: 2rem;
  border-radius: 17px;
  box-shadow: 10px 10px 20px #b1b1b1, -10px -10px 20px #ffffff;

  &:not(:disabled) {
    &:active {
      box-shadow: inset 5px 5px 23px #d51918, inset -5px -5px 23px #ff2320;
    }
    &:hover,
    &:focus {
      background: #e31617;
    }
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`

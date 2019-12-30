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
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform-origin: right;

  &:hover,
  &:focus {
    background-color: #ff7d7c;
  }
`

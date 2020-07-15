import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Container } from "../components/sharedComponents"
import "./layout.css"
import { Navbar } from "./Navbar"

import githubIcon from "../images/github.svg"

const LayoutContainer = styled(Container)`
  min-height: 100vh;

  footer {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .github-button {
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        height: 1.1rem;
        width: 1.1rem;
        margin-bottom: 0;
        margin-right: 0.5rem;
      }
    }
  }
`

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <main>{children}</main>
      <footer>
        <span>
          made with ♥️ by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://workofutkarsh.com"
          >
            Utkarsh Bhimte
          </a>
        </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Utkarshbhimte/firebasenv"
          className="github-button"
        >
          <img src={githubIcon} alt="" />
          <span>Checkout the code</span>
        </a>
      </footer>
    </LayoutContainer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Container } from "../components/sharedComponents"
import "./layout.css"
import { Navbar } from "./Navbar"

const LayoutContainer = styled(Container)`
  min-height: 100vh;
`

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()},{` `}
        <a href="workofutkarsh.com">WorkOfUtkarsh</a>
      </footer>
    </LayoutContainer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

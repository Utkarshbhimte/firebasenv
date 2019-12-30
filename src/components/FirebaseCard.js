import React from "react"
import styled from "styled-components"
import theme from "./theme"
import envAlias from "./envAlias"
import { Container, Button } from "../components/sharedComponents"

const SectionContainer = styled(Container)`
  position: relative;
  border-radius: 1.5rem;
  margin-bottom: 4rem;

  pre {
    background-color: #f3f3f3;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    border-radius: 0.6rem;
    overflow-x: scroll;
  }
`

export const FirebaseCard = ({ data, setData }) => {
  const aliasMap = Object.keys(data.json).reduce((total, key) => {
    let envKey = envAlias[key]
    if (!!data.prefix && !!data.prefix.length) {
      envKey = data.prefix + "_" + envAlias[key]
    }

    return {
      ...total,
      [key]: envKey,
    }
  }, {})

  return (
    <SectionContainer>
      <div>
        <small>Copy this to your .env file</small>
        <pre>
          {Object.keys(data.json).map(
            key => `${aliasMap[key]}=${data.json[key]}\n`
          )}
        </pre>
        <small>Copy this to your firebaseConfig.js</small>
        <pre>
          {`const firebaseConfig = {${Object.keys(data.json).map(
            key => `\n\t${key}: process.env.${aliasMap[key]}`
          )}\n}`}
        </pre>
      </div>
      <Button style={{ float: "right" }} onClick={() => setData(null)}>
        Reset
      </Button>
    </SectionContainer>
  )
}

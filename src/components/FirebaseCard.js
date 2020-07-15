import React, { useState } from "react"
import styled from "styled-components"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { constantCase } from "change-case"

import { Container, Button } from "../components/sharedComponents"

import clipboardIcon from "../images/clipboard.svg"

const SectionContainer = styled(Container)`
  position: relative;
  border-radius: 1.5rem;
  margin-bottom: 4rem;
  min-height: 70vh;

  .card-header {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    justify-content: space-between;
    .card-heading {
      font-weight: bold;
    }
  }

  pre {
    margin-bottom: 2.5rem;
  }

  .copy-button {
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    img {
      height: 1rem;
      width: 1rem;
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
  }
`

const CardHeader = ({ children, value }) => {
  console.log("CardHeader -> value", value)
  const [hasCopied, setHasCopied] = useState(false)
  return (
    <div className="card-header">
      <div className="card-heading">{children}</div>

      <CopyToClipboard text={value}>
        <a
          className="copy-button"
          role="button"
          onClick={() => setHasCopied(true)}
        >
          {hasCopied ? (
            <span>Copied</span>
          ) : (
            <>
              {" "}
              <img src={clipboardIcon} alt="" />
              <span>Copy to Clipboard</span>
            </>
          )}
        </a>
      </CopyToClipboard>
    </div>
  )
}

export const FirebaseCard = ({ data, onResetClick }) => {
  const envContent = Object.keys(data.json).map(
    key => `${[data.prefix, constantCase(key)].join("_")}=${data.json[key]}\n`
  )

  const codeContent = `const firebaseConfig = {${Object.keys(data.json).map(
    key =>
      `\n\t${key}: process.env.${[data.prefix, constantCase(key)].join("_")}`
  )}\n}`
  return (
    <SectionContainer>
      <div>
        <CardHeader value={envContent}>Copy this to your .env file</CardHeader>
        <pre>{envContent}</pre>

        <CardHeader value={codeContent}>
          Copy this to your firebaseConfig.js
        </CardHeader>
        <pre>{codeContent}</pre>
      </div>
      <Button style={{ float: "right" }} onClick={onResetClick}>
        Go back
      </Button>
    </SectionContainer>
  )
}

const object = {
  name: "test",
}

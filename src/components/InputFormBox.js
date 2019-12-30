import React, { useState } from "react"
import styled from "styled-components"
import theme from "./theme"
import { Card, Container, Button } from "./sharedComponents"

// icons
import reactIcon from "../images/react.svg"
import vueIcon from "../images/vue.png"
import gatsbyIcon from "../images/gatsby.png"

const SectionContainer = styled(Container)`
  margin-bottom: 4rem;

  .button-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .prefix-options {
    display: grid;
    grid-gap: 0.4rem;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 2.5rem;

    button {
      outline: none;
      border: none;
      background: none;
    }

    img {
      width: 1.5rem;
      margin: 0;
      cursor: pointer;
    }
  }
`

const FormContainer = styled(Card)`
  background: white;
  padding: 0;
  max-width: 800px;
  width: 80vw;
  margin: 2rem auto 0;
  position: relative;
  overflow: hidden;
  color: ${theme.textPrimary};

  pre,
  input {
    border: none;
    outline: none;
    width: 100%;
  }

  label {
    display: block;
    position: relative;
    margin-bottom: 1rem;

    > span {
      font-size: 0.8rem;
    }

    &:after,
    &:before {
      content: "";
      display: block;
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
    }

    &:before {
      background-color: #cecece;
    }

    &:after {
      transform: scaleX(0);
      transition: all 0.3s ease-in-out;
      background-color: ${theme.accentSecondary};
      transform-origin: left;
    }

    &:focus-within {
      > span {
        color: ${theme.textPrimary};
      }
      &:after {
        transform: scaleX(1);
      }
    }
  }

  input {
    letter-spacing: 1px;
  }

  .error-text {
    color: ${theme.accentPrimary};
    transform: translateY(-10px);
    display: block;
    font-size: 12px;
  }
`

export const InputFormBox = ({ setData }) => {
  const [error, setError] = useState(null)

  const handleSubmit = event => {
    setError(null)
    try {
      event.preventDefault()
      const JsonInputDOM = document.querySelector(".json-input")
      let rawJSON = JsonInputDOM && JsonInputDOM.innerText

      if (!rawJSON || !rawJSON.length) {
        throw new Error("The JSON is not valid")
      }

      let sanitizedJSON = rawJSON
        // Replace all the space in between
        .replace(/\s/g, "")

        // Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*"([^"]*)"/g, function(match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"'
        })

        // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/:\s*'([^']*)'/g, function(match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"'
        })

        // Add double-quotes around any tokens before the remaining ":"
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

        // Turn "@colon@" back into ":"
        .replace(/@colon@/g, ":")

      try {
        sanitizedJSON = JSON.parse(sanitizedJSON)
      } catch (error) {
        console.error(error)
        throw new Error("The JSON is not valid")
      }

      const PrefixInputDOM = document.querySelector(".prefix-input")
      const selectedPrefix = (PrefixInputDOM && PrefixInputDOM.value) || ""
      setData({ json: sanitizedJSON, prefix: selectedPrefix })
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  const updatePrefix = prefix => {
    document.querySelector(".prefix-input").value = prefix
  }
  return (
    <SectionContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <label>
            <span>Firebase Config JSON</span>
            <pre contentEditable className="json-input"></pre>
          </label>
          {error && <small className="error-text">{error}</small>}

          <label>
            <span>Prefix</span>
            <input
              className="prefix-input"
              type="text"
              defaultValue="REACT_APP"
            />
          </label>
        </FormContainer>
        <div className="button-wrap">
          <div className="prefix-options">
            <a onClick={() => updatePrefix("REACT_APP")}>
              <img src={reactIcon} alt="react" />
            </a>
            <a onClick={() => updatePrefix("VUE_APP")}>
              <img src={vueIcon} alt="vue" />
            </a>
            <a onClick={() => updatePrefix("GATSBY_APP")}>
              <img src={gatsbyIcon} alt="gatsby" />
            </a>
          </div>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </SectionContainer>
  )
}

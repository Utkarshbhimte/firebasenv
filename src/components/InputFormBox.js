import React, { useState, useRef } from "react"
import styled from "styled-components"
import ContentEditable from "react-contenteditable"
import { Card, Container, Button } from "./sharedComponents"

// icons
import reactIcon from "../images/react.svg"
import vueIcon from "../images/vue.png"
import gatsbyIcon from "../images/gatsby.png"
import json5 from "json5"
import theme from "./theme"

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

    a {
      outline: none;
      border: none;
      will-change: opacity;
      background: none;
      filter: grayscale(1);
      opacity: 0.5;
      transition: all 0.3s ease-in-out;

      &.active {
        filter: grayscale(0);
        opacity: 1;
      }
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
  color: ${theme.textPrimary};

  pre,
  input {
    border: none;
    outline: none;
    width: 100%;
  }

  .json-input {
    margin-top: 0.5rem !important;
    white-space: pre;
    min-height: 10rem;
  }

  .label-text {
    font-weight: bold;
    font-size: 1rem;
  }

  label {
    display: block;
    position: relative;
    margin: 2rem 0 1rem;

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

const defaultValue = {
  appId: "akjhfjasdhfkajfbsndosldhfjnoalsjfasd",
}

export const InputFormBox = ({ data, submitData }) => {
  const [error, setError] = useState(null)
  const [jsonInputValue, setJsonInputValue] = useState(
    json5.stringify((data && data.json) || defaultValue, null, 4)
  )
  const [parsedContent, setParsedContent] = useState(
    (data && data.json) || defaultValue
  )
  const [activePrefix, setActivePrefix] = useState(
    (data && data.prefix) || "REACT_APP"
  )
  const isPrefixInvalid = !activePrefix || !activePrefix.length

  const jsonInputRef = useRef()

  const updatePrefix = prefix => {
    setActivePrefix(prefix)
  }

  const handleJsonInputChange = event => {
    try {
      let innerHtmlContent = event.target.value

      if (!innerHtmlContent) {
        return
      }

      setError(false)

      setJsonInputValue(innerHtmlContent)

      const el = document.createElement("div")
      el.innerHTML = innerHtmlContent

      const textValue = el.innerText

      try {
        const parsed = json5.parse(textValue)
        setParsedContent(parsed)
      } catch {
        setError("We are unable to parse this JSON")
      }
    } catch (error) {
      console.error(error)
      setError("Something expected happened")
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (error) {
      return
    }

    if (isPrefixInvalid) {
      return
    }

    if (!parsedContent || !Object.keys(parsedContent).length) {
      setError("The object is empty")
      return
    }
    submitData({
      json: parsedContent,
      prefix: activePrefix,
    })
  }

  const handleJsonInputKeyDown = e => {
    if (e.keyCode == 9) {
      e.persist()
      e.preventDefault()
      document.execCommand("insertHTML", false, "&#009")
    }
  }

  const handlePrefixChange = event => updatePrefix(event.target.value)

  return (
    <SectionContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <div>
            <span className="label-text heading">Paste your JSON here</span>
            <ContentEditable
              html={jsonInputValue}
              ref={jsonInputRef}
              className="json-input"
              contentEditable
              onChange={handleJsonInputChange}
              onKeyDown={handleJsonInputKeyDown}
              tagName="pre" // Use a custom HTML tag (uses a div by default)
            />
          </div>
          {error && <small className="error-text">{error}</small>}

          <label>
            <span className="label-text heading">Prefix</span>
            <input
              className="prefix-input"
              type="text"
              value={activePrefix}
              onChange={handlePrefixChange}
              defaultValue="REACT_APP"
            />
          </label>
        </FormContainer>
        <div className="button-wrap">
          <div className="prefix-options">
            <a
              className={activePrefix === "REACT_APP" ? "active" : ""}
              onClick={() => updatePrefix("REACT_APP")}
            >
              <img src={reactIcon} alt="react" />
            </a>
            <a
              className={activePrefix === "VUE_APP" ? "active" : ""}
              onClick={() => updatePrefix("VUE_APP")}
            >
              <img src={vueIcon} alt="vue" />
            </a>
            <a
              className={activePrefix === "GATSBY_APP" ? "active" : ""}
              onClick={() => updatePrefix("GATSBY_APP")}
            >
              <img src={gatsbyIcon} alt="gatsby" />
            </a>
          </div>
          <Button
            disabled={!!error || !!isPrefixInvalid}
            style={{
              float: "right",
            }}
            type="submit"
          >
            Generate
          </Button>
        </div>
      </form>
    </SectionContainer>
  )
}

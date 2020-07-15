import React, { useState } from "react"
import styled from "styled-components"

import { InputFormBox } from "../components/InputFormBox"
import { FirebaseCard } from "../components/FirebaseCard"
import Layout from "../components/layout"

import "../components/layout.css"

import screenshot from "../images/config-screenshot.png"
import { Container } from "../components/sharedComponents"

const HIWContainer = styled(Container)`
  .config-screenshot {
    border-radius: 1rem;
    margin-top: 1rem;
    width: 600px;
    max-width: 100%;
  }
`

const IndexPage = () => {
  const [data, setData] = useState(null)
  const [showForm, setShowForm] = useState(true)

  const submitData = submitData => {
    setData(submitData)
    setShowForm(false)
  }

  const handleResetClick = () => {
    setShowForm(true)
  }
  return (
    <Layout>
      {!showForm && !!data ? (
        <FirebaseCard onResetClick={handleResetClick} data={data} />
      ) : (
        <>
          <InputFormBox data={data} submitData={submitData} />
          <HIWContainer>
            <h2>How it works</h2>
            <ul>
              <li>
                Copy paste the config from your firebase settings
                <img className="config-screenshot" src={screenshot} alt="" />
              </li>
              <li>
                Paste it on the textbox above, select the prefix for every key
                and click Submit
              </li>
              <li>Copy the formatted data to the respective files</li>
            </ul>
          </HIWContainer>
        </>
      )}
    </Layout>
  )
}

export default IndexPage

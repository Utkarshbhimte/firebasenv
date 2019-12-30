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
  return (
    <Layout>
      {data ? (
        <FirebaseCard setData={setData} data={data} />
      ) : (
        <>
          <InputFormBox setData={setData} />
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

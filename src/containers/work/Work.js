import React, { useState, useEffect } from "react"

import ApolloClient from "apollo-boost"
import { gql } from "apollo-boost"
import "./Work.css"
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard"
import Button from "../../components/button/Button"
import { openSource } from "../../portfolio"

export default function Projects() {
  
  const [repo, setRepo] = useState([])

  useEffect(() => {
    getRepoData()
  }, [])
  
  function setRepoFunction(array) {
    setRepo(array)
  }

  function getRepoData() {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${openSource.githubConvertedToken}`
          }
        })
      }
    })

    client
      .query({
        query: gql`
          {
            repositoryOwner(login: "${openSource.githubUserName}") {
              ... on User {
                pinnedRepositories(first: 6) {
                  edges {
                    node {
                      nameWithOwner
                      description
                      forkCount
                      stargazers {
                        totalCount
                      }
                      url
                      id
                      diskUsage
                      primaryLanguage {
                        name
                        color
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
      .then(result => {
        setRepoFunction(result.data.repositoryOwner.pinnedRepositories.edges)
      })
  }
  
  return (
    <div className="main" id="work">
      <h1 className="project-title">Some Things I've Built</h1>
      <div className="repo-cards-div-main">
        {repo.map((v, i) => {
          return <GithubRepoCard repo={v} key={v.node.id} />
        })}
      </div>
      <Button text={"More Projects"} className="project-button" href="https://github.com/pratikms" newTab={true} />
    </div>
  )
}
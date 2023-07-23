/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-unresolved */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgess: 'INPROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    filteredId: languageFiltersData[0].id,
    apiList: [],
    apiStatus: apiStatusConstants.initial,
  }

  failureView = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  componentDidMount = () => {
    this.getAllData()
  }

  getAllData = async () => {
    const {filteredId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${filteredId}`,
    )

    const data = await response.json()
    const x = response.ok

    if (x) {
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        avatarUrl: each.avatar_url,

        forksCount: each.forks_count,

        issuesCount: each.issues_count,
        name: each.name,

        starsCount: each.starsCount,
      }))

      this.setState({
        apiList: updatedData,
        apiStatus: apiStatusConstants.success,
        // eslint-disable-next-line react/no-unused-state
      })
    } else {
      this.failureView()
    }
  }

  failureContainer = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="heading1">Something Went Wrong</h1>
    </div>
  )

  clickTabItem = id => {
    this.setState({filteredId: id})
  }

  loaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getRepositoryDetails = () => {
    const {apiList} = this.state
    return (
      <ul className="project-list-container">
        {apiList.map(each => (
          <RepositoryItem key={each.id} repositoryDetails={each} />
        ))}
      </ul>
    )
  }

  renderSwitch = param => {
    switch (param) {
      case apiStatusConstants.inProgess:
        return this.loaderView()
      case apiStatusConstants.success:
        return this.getRepositoryDetails()

      case apiStatusConstants.failure:
        return this.failureContainer()

      default:
        return null
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {filteredId, apiStatus} = this.state

    return (
      <div className="app-container">
        <h1 className="title">Popular</h1>

        <ul className="tabs-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem key={eachItem.id} languageDetails={eachItem} />
          ))}
        </ul>
        {this.renderSwitch(apiStatus)}
      </div>
    )
  }
}
export default GithubPopularRepos

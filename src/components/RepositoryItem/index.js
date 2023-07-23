/* eslint-disable no-unused-vars */
// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    id,
    forksCount,
    starsCount,
    issuesCount,
    name,
  } = repositoryDetails
  return (
    <li className="listItem">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="heading">{name}</h1>
      <div className="starsCount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p className="paragraph">{starsCount}</p>
      </div>
      <div className="starsCount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p className="paragraph">{forksCount}</p>
      </div>
      <div className="starsCount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p className="paragraph">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem

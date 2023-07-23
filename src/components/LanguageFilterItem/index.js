// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, clickTabItem} = props

  const {language, id} = languageDetails

  const onClickTabId = () => {
    clickTabItem(id)
  }

  return (
    <li className="list-item">
      <button className="button" type="button" onClick={onClickTabId}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

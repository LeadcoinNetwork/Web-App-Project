import React from "react"
import { connect } from "react-redux"
import * as _ from "lodash"

/**
 * This function get a text for translation
 * And create a component that contain this text.
 *
 * E.g. use
 *
 * <div>{t("Hello")}</div>
 *
 * @return ReactElement
 */
export default function t(textToTransalte) {
  return <T textToTransalte={textToTransalte} />
}

var mapStateToProps = state => {
  return {
    database: state.translate.database,
    current: state.translate.current,
  }
}

/**
 * This is a React element that connect text to translate to the state
 * It's uses internally. In your code use the function above.
 */
var T = connect(mapStateToProps)(function({
  database,
  current,
  textToTransalte,
}) {
  var value = _.get(database, [textToTransalte, current])
  if (value) {
    return <span title="this text in the database!">☑{value}</span>
  } else {
    return (
      <span
        style={{ textDecoration: "line-through" }}
        title="This text not translated yet. Please add to database"
      >
        {textToTransalte}
      </span>
    )
  }
})

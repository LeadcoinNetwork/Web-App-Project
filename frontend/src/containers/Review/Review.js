import React from "react"
import reviewStyle from "./Review.scss"
import Button from "Components/Button"
import { connect } from "react-redux"
import { review } from "Actions"
import t from "../../utils/translate/translate"
import Textarea from "../../components/Textarea"
import RatingCustom from "../../components/RatingCustom"
import * as moment from "moment"

/**
 *
 * @param mode - "new" - create new review, "view" - review read mode
 * @param text - review text
 * @param rating
 * @returns {*}
 * @constructor
 */
const Review = ({
  mode = "view",
  text = "",
  rating = 0,
  date = null,
  review,
  handleChange,
  submit,
  onSubmit,
}) => {
  const MAX_TEXT_SIZE = 500
  let dateStr = ""
  const dateParsed = date && new Date(date)
  if (dateParsed) {
    dateStr = moment(dateParsed).format("DD/MM/YYYY, h:mm:ss a")
  }

  const handleChangeValue = (key, value) => {
    handleChange({
      key,
      value,
    })
  }

  const send = () => {
    console.log("submit review")
    submit()
    onSubmit()
  }

  return (
    <div className="ldc-review">
      {mode === "new" && (
        <div className="ldc-review-new">
          <div className="ldc-review-new__title">
            <RatingCustom
              onChange={value => handleChangeValue("rating", value)}
              initialRating={review.rating}
            />
          </div>
          <div className="ldc-review-new__content">
            <Textarea
              placeholder={t("Text")}
              name="text"
              value={review.text}
              maxLength={MAX_TEXT_SIZE}
              onChange={e => handleChangeValue("text", e.target.value)}
            />
            <div className="ldc-review__control">
              <Button
                label={t("Send")}
                onClick={send}
                loading={review.loading}
                disabled={!review.text || !review.rating}
              />
            </div>
          </div>
        </div>
      )}
      {mode === "view" && (
        <div className="ldc-review-read">
          <div className="ldc-review-read__title">
            <RatingCustom readonly={true} initialRating={rating} />
            <span className="ldc-review-read__date">{dateStr}</span>
          </div>
          <p className="ldc-review-read__content">{text}</p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  review: state.review,
})

export default connect(
  mapStateToProps,
  {
    handleChange: review.reviewHandleChange,
    submit: review.reviewSubmit,
  },
)(Review)

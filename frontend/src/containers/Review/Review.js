import React from "react"
import reviewStyle from "./Review.scss"
import Button from "Components/Button"
import { connect } from "react-redux"
import { review } from "Actions"
import t from "../../utils/translate/translate"
import Textarea from "../../components/Textarea"
import RatingCustom from "../../components/RatingCustom"

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
  review,
  handleChange,
  submit,
}) => {
  const MAX_TEXT_SIZE = 500

  const handleChangeValue = (key, value) => {
    handleChange({
      key,
      value,
    })
  }

  const send = () => {
    console.log("submit review")
    submit()
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
            <Button
              label={t("Send")}
              onClick={send}
              loading={review.loading}
              disabled={!text}
            />
          </div>
        </div>
      )}
      {mode === "view" && (
        <div className="ldc-review-read">
          <div className="ldc-review-read__title">
            <RatingCustom readonly={true} initialRating={rating} />
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

import React from "react"
import reviewsStyle from "./ReviewsUser.scss"
import { connect } from "react-redux"
import { review } from "Actions"
import t from "../../utils/translate/translate"
import reviewsUser from "../../actions/reviewsUser"
import Review from "../Review/Review"

class ReviewsUser extends React.Component {
  componentDidMount() {
    this.props.reviewsUserStart()
  }

  renderReviews = reviews => {
    return reviews.map((review, index) => {
      return (
        <div key={index}>
          <Review
            text={review.comment}
            rating={+review.rating}
            date={review.date}
          />
        </div>
      )
    })
  }

  render() {
    const { reviews, loading } = this.props
    if (loading) {
      return <div>{t("Loading...")}</div>
    }
    if ((reviews && reviews.length === 0) || (!reviews && !loading))
      return <div> {t("This user has no reviews")}</div>
    return <div className="ldc-reviews-user">{this.renderReviews(reviews)}</div>
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews,
})

export default connect(
  mapStateToProps,
  {
    reviewsUserStart: reviewsUser.reviewsUserStart,
  },
)(ReviewsUser)

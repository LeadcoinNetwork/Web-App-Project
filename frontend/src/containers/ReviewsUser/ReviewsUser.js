import React from "react"
import reviewsStyle from "./ReviewsUser.scss"
import { connect } from "react-redux"
import { review } from "Actions"
import t from "../../utils/translate/translate"
import reviewsUser from "../../actions/reviewsUser"

class ReviewsUser extends React.Component {
  componentDidMount() {
    this.props.reviewsUserStart()
  }

  render() {
    const { reviews, loading } = this.props
    if (!reviews || loading) {
      return <div>{t("Loading...")}</div>
    }
    if (reviews.length === 0) return <div> {t("This user has no reviews")}</div>
    return <div className="ldc-reviews-user">Test reviews</div>
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

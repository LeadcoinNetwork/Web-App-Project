import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"
import RatingCustom from "../../components/RatingCustom"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import Review from "../Review/Review"
import ReviewsUser from "../ReviewsUser/ReviewsUser"
import reviewsUser from "../../actions/reviewsUser"

class Profile extends React.Component {
  items = [
    { key: "email", title: "Email" },
    { key: "fname", title: "First name" },
    { key: "lname", title: "Last Name" },
    { key: "country", title: "Country" },
    { key: "phone", title: "Phone" },
    { key: "company", title: "Company" },
  ]

  constructor(props) {
    super(props)
    this.state = {
      fname: props.user && props.user.fname ? props.user.fname : "",
      lname: props.user && props.user.lname ? props.user.lname : "",
      country: props.user && props.user.country ? props.user.country : "",
      phone: props.user && props.user.phone ? props.user.phone : "",
      company: props.user && props.user.company ? props.user.company : "",
      email: props.user && props.user.email ? props.user.email : "",
    }
    props.reviewsUserSetMode({ mode: "my" })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user) {
      return {
        ...state,
        fname: state.fname || props.user.fname || "",
        lname: state.lname || props.user.lname || "",
        country: state.country || props.user.country || "",
        phone: state.phone || props.user.phone || "",
        company: state.company || props.user.company || "",
        email: state.email || props.user.email || "",
      }
    }
    return state
  }

  render() {
    let rating = 0
    let { loading, error } = this.props.profile
    if (this.props.profile && this.props.profile.rating) {
      rating = this.props.profile.rating
    } else if (this.props.user && this.props.user.rating) {
      rating = this.props.user.rating
    }

    return (
      <section className="ldc-profile">
        <h1>{t("Profile")}</h1>
        <Tabs>
          <TabList>
            <Tab>{t("Info")}</Tab>
            <Tab>{t("Reviews")}</Tab>
          </TabList>
          <TabPanel>
            <div className="ldc-profile-rating">
              <RatingCustom readonly={true} initialRating={rating} />
            </div>
            {this.items.map((item, index) => (
              <div className="item-container" key={index}>
                <div className="item-title">{t(item.title)}</div>
                <div className="item-value">{this.state[item.key]}</div>
              </div>
            ))}
          </TabPanel>
          <TabPanel>
            <ReviewsUser />
          </TabPanel>
        </Tabs>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.userProfileSettings,
  user: state.user,
})

export default connect(
  mapStateToProps,
  {
    reviewsUserSetMode: reviewsUser.reviewsUserSetMode,
  },
)(Profile)

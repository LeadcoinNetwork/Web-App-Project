import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"
import RatingCustom from "../../components/RatingCustom"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import Review from "../Review/Review"

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
    console.log(this.state)
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
            <Review
              mode="view"
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              rating={3}
              key={1}
            />
            <Review
              mode="new"
              text={
                "Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Enim sed faucibus turpis in eu mi bibendum neque egestas. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Aliquam sem fringilla ut morbi. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Urna et pharetra pharetra massa massa. Cursus sit amet dictum sit amet. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Nascetur ridiculus mus mauris vitae. Ultrices sagittis orci a scelerisque purus semper. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Tempus quam pellentesque nec nam aliquam sem. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Lacinia at quis risus sed vulputate odio. Turpis tincidunt id aliquet risus feugiat in ante. Ipsum faucibus vitae aliquet nec ullamcorper sit amet. A erat nam at lectus urna duis convallis."
              }
              key={2}
            />
            <Review
              mode="view"
              text={
                "Velit egestas dui id ornare arcu odio ut sem nulla. Cras ornare arcu dui vivamus. Euismod nisi porta lorem mollis aliquam ut porttitor. Sodales neque sodales ut etiam sit amet. Malesuada fames ac turpis egestas sed tempus urna et. Suspendisse in est ante in nibh mauris cursus. Ac placerat vestibulum lectus mauris ultrices. Amet justo donec enim diam vulputate ut pharetra sit. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Egestas sed sed risus pretium quam vulputate dignissim. Rutrum tellus pellentesque eu tincidunt tortor aliquam. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Id porta nibh venenatis cras sed felis eget velit."
              }
              key={3}
            />
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
  {},
)(Profile)

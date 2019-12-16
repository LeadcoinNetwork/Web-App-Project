import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"
import RatingCustom from "../../components/RatingCustom"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

class Profile extends React.Component {
  items = [
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
      }
    }
    return state
  }

  render() {
    let { loading, error, rating } = this.props.profile

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
              <RatingCustom readonly={true} initialRating={rating || 3} />
            </div>
            {this.items.map((item, index) => (
              <div className="item-container" key={index}>
                <div className="item-title">{t(item.title)}</div>
                <div className="item-value">{this.state[item.key]}</div>
              </div>
            ))}
          </TabPanel>
          <TabPanel />
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

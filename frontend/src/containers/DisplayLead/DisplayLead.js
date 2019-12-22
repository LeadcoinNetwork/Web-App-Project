import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import { displayLead } from "Actions"
import t from "../../utils/translate/translate"
import { push, goBack } from "react-router-redux"
import HistoryLead from "../HistoryLead/HistoryLead"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import RatingCustom from "../../components/RatingCustom"
import Review from "../Review/Review"
import ReviewsUser from "../ReviewsUser/ReviewsUser"
import reviewsUser from "../../actions/reviewsUser"

class DisplayLead extends React.Component {
  constructor(props) {
    super(props)
    props.reviewsUserSetMode({ mode: "lead" })
  }

  renderFields(fieldsObj) {
    const data = fieldsObj
    return Object.keys(data).map(f => {
      return (
        <div key={f} className="line flexed">
          <div className="fieldLabel"> {f} </div>
          <div className="fieldValue"> {fieldsObj[f]} </div>
        </div>
      )
    })
  }

  back = () => {
    if (this.props.backFunction) {
      this.props.backFunction()
    } else {
      this.props.goBack()
    }
  }

  render() {
    let { isReview, private_fields, public_fields, noheader } = this.props.lead
    isReview = !!isReview
    let { isShowHistory = true, isShowReview = true } = this.props

    switch (this.props.pageName) {
      case "sell":
        break
      case "buy":
        isShowReview = true
        isReview = true
        break
      case "auction":
        isShowReview = true
        isReview = true
        break
      case "my":
        isShowReview = !isReview
        break
      default:
    }
    if (!private_fields) {
      return <div>{t("Loading...")}</div>
    }
    return (
      <div className="display-lead">
        <div className="back-wrapper">
          <div
            className="back"
            onClick={() => {
              this.back()
            }}
          >
            <div className="back-arrow" />
            <div className="back-text">Back</div>
          </div>
        </div>
        {!noheader && <h1>{t("Lead Details")}</h1>}
        <div className="main_container">
          <Tabs>
            <TabList>
              <Tab>{t("Info")}</Tab>
              {isShowHistory && <Tab>{t("History")}</Tab>}
              {isShowReview && <Tab>{t("Review")}</Tab>}
            </TabList>
            <TabPanel>
              <div className="personal">
                <div className="help_text">
                  <div className="header bigger">
                    {t("Personal Identification Information")}
                  </div>
                  <div className="header smaller">
                    {t("This information will remain hidden from other users.")}
                  </div>
                </div>
                <div className="fields">
                  {this.renderFields(private_fields)}
                </div>
              </div>
              <div className="public">
                <div className="help_text">
                  <div className="header bigger">{t("Public Fields")}</div>
                </div>
                <div className="fields">{this.renderFields(public_fields)}</div>
              </div>
            </TabPanel>
            {isShowHistory && (
              <TabPanel>
                <HistoryLead />
              </TabPanel>
            )}
            {isShowReview && (
              <TabPanel>
                <div className="display-lead__review-header">
                  {t("Review about the owner of the lead")}
                </div>
                {isReview === false && (
                  <div>
                    <Review mode="new" onSubmit={this.back} />
                  </div>
                )}
                {this.props.pageName !== "my" && (
                  <div>
                    <ReviewsUser />
                  </div>
                )}
              </TabPanel>
            )}
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lead: state.displayLead,
})

export default connect(
  mapStateToProps,
  {
    push,
    goBack,
    reviewsUserSetMode: reviewsUser.reviewsUserSetMode,
  },
)(DisplayLead)

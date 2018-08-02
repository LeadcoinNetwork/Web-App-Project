import Joyride from "react-joyride"
import { connect } from "react-redux"
import React from "react"

const DISABLE_STEPS = true

export class Steps extends React.Component {
  state = {
    run: false,
    steps: [],
  }

  componentDidMount() {
    this.setState({
      run: DISABLE_STEPS ? false : true,
      steps: [
        {
          name: "add",
          title: "title",
          selector: ".ldc-notification-element",
          content: "This if my awesome feature!",
          placement: "bottom",
        },
        {
          name: "add",
          title: "title",
          text: "the text",
          selector: ".ldc-user-menu",
          content: "This if my awesome feature!",
          placement: "bottom",
        },
      ],
    })
  }

  callback = data => {
    if (data.type == "step:before") {
      if (data.step.name == "add") {
        this.props.push("/sell-leads")
      }
    }
    const { action, index, type } = data
  }

  render() {
    // console.log("@render steps:", this.state)
    const { steps, run } = this.state
    /**
     * Docs: https://github.com/gilbarbara/react-joyride/tree/v1.11.4
     */
    return (
      <div className="steps">
        <Joyride
          ref="joyride"
          steps={steps}
          run={run}
          callback={this.callback}
        />
      </div>
    )
  }
}
import { push } from "react-router-redux"
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = {
  push,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps)

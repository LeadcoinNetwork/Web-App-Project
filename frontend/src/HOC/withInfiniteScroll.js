import React from "react"
import { throttle } from "lodash"

const withInfiniteScroll = onScrollBottom => WrappedComponent => {
  class WithInfiniteScroll extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        loading: false,
      }
    }
    componentDidMount() {
      this.onScrollThrottled = throttle(this.onScroll, 200)
      window.addEventListener("scroll", this.onScrollThrottled)
    }
    componentWillUnount() {
      window.removeEventListener("scroll", this.onScrollThrottled)
    }
    onScroll = () => {
      if (!this.state.loading) {
        let clientHeight = window.document.documentElement.clientHeight,
          rect = window.document.body.getBoundingClientRect()

        if (rect.height - Math.abs(rect.top) <= clientHeight + 20) {
          this.setState({
            loading: true,
          })

          this.props.onScrollBottom(() =>
            this.setState({
              loading: false,
            }),
          )
        }
      }
    }
    render() {
      const { onScrollBottom, ...passThroughProps } = this.props

      return (
        <>
          <WrappedComponent {...passThroughProps} />
          {this.state.loading ? <div>Loading...</div> : null}
        </>
      )
    }
  }

  WithInfiniteScroll.displayName = `WithInfiniteScroll(${WrappedComponent.name ||
    "Component"})`

  return WithInfiniteScroll
}

export default withInfiniteScroll

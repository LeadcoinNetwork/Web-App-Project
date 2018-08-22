import React from "react"
import LoadingDots from "Components/LoadingDots"
const debounce = require("lodash/debounce")

const withInfiniteScroll = onScrollBottom => WrappedComponent => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      if (this.props.onScrollBottom) {
        this.onScrollThrottled = debounce(this.onScroll, 100)
        window.addEventListener("scroll", this.onScrollThrottled)
      }
    }
    componentWillUnmount() {
      console.log("here@")
      window.removeEventListener("scroll", this.onScrollThrottled)
    }
    onScroll = () => {
      let { loading, fullyLoaded, onScrollBottom } = this.props

      if (!fullyLoaded && !loading) {
        let clientHeight = window.document.documentElement.clientHeight,
          rect = window.document.body.getBoundingClientRect()

        if (rect.height - Math.abs(rect.top) <= clientHeight + 20) {
          onScrollBottom()
        }
      }
    }
    render() {
      const {
        onScrollBottom,
        loading,
        fullyLoaded,
        ...passThroughProps
      } = this.props

      return (
        <>
          <WrappedComponent {...passThroughProps} />
          <div
            style={{
              opacity: this.props.loading ? 1 : 0,
              display: this.props.fullyLoaded ? "none" : "block",
            }}
          >
            <LoadingDots />
          </div>
        </>
      )
    }
  }

  WithInfiniteScroll.displayName = `WithInfiniteScroll(${WrappedComponent.name ||
    "Component"})`

  return WithInfiniteScroll
}

export default withInfiniteScroll

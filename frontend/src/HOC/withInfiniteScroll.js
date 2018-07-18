import React from "react"
import { throttle } from "lodash"
import LoadingDots from "Components/LoadingDots"

const withInfiniteScroll = onScrollBottom => WrappedComponent => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      if (this.props.onScrollBottom) {
        this.onScrollThrottled = throttle(this.onScroll, 200)
        window.addEventListener("scroll", this.onScrollThrottled)
      }
    }
    componentWillUnount() {
      window.removeEventListener("scroll", this.onScrollThrottled)
    }
    onScroll = () => {
      if (!this.props.loading) {
        let clientHeight = window.document.documentElement.clientHeight,
          rect = window.document.body.getBoundingClientRect()

        if (rect.height - Math.abs(rect.top) <= clientHeight + 20) {
          this.props.onScrollBottom()
        }
      }
    }
    render() {
      const { onScrollBottom, loading, ...passThroughProps } = this.props

      return (
        <>
          <WrappedComponent {...passThroughProps} />
          {this.props.loading ? <LoadingDots /> : null}
        </>
      )
    }
  }

  WithInfiniteScroll.displayName = `WithInfiniteScroll(${WrappedComponent.name ||
    "Component"})`

  return WithInfiniteScroll
}

export default withInfiniteScroll

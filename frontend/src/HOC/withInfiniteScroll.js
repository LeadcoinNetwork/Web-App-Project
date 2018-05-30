import React from 'react';

const withInfiniteScroll = () => WrappedComponent => {
  class WithInfiniteScroll extends React.Component {
    componentDidMount() {
      console.log(window.addEventListener('scroll', console.log))
    }
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  WithInfiniteScroll.displayName = `WithInfiniteScroll(${WrappedComponent.name || 'Component'})`;

  return WithInfiniteScroll;
}

export default withInfiniteScroll;
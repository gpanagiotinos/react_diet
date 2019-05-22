import React from 'react'

export default class InfinityScroll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollTopPrevious: 0,
      elementID: this.props.elementID,
      element: null
    }
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.handleElementOnScroll = this.handleElementOnScroll.bind(this)
  }
  componentDidMount () {
    if (this.state.elementID !== undefined) {
      const element = document.getElementById(this.state.elementID)
      element.addEventListener("scroll", this.handleElementOnScroll)
      this.setState((prevState, props) => {
        return {
          element: element
        }
      })
    } else {
      window.addEventListener("scroll", this.handleOnScroll)
    }
  }
  componentWillUnmount () {
    if (this.state.elementID !== undefined) {
      document.getElementById(this.state.elementID).addEventListener("scroll", this.handleElementOnScroll)
    } else {
      window.removeEventListener("scroll", this.handleOnScroll)
    }
    
  }
  handleElementOnScroll () {
    var scrollTop =
    (this.state.element && this.state.element.scrollTop) ||
    document.body.scrollTop
    var scrollHeight =
    (this.state.element && this.state.element.scrollHeight) ||
    document.body.scrollHeight
    var clientHeight =
    this.state.element.clientHeight || this.state.element.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom && (this.state.scrollTopPrevious < scrollTop)) {
      this.setState((prevState, props) => {
        return {scrollTopPrevious: scrollTop}
      })
      this.props.onLoadMore()
    }
  }
  handleOnScroll () {
    var scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop
    var scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight
    var clientHeight =
    document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    console.log(scrolledToBottom, this.state.scrollTopPrevious < scrollTop)
    if (scrolledToBottom && (this.state.scrollTopPrevious < scrollTop)) {
      this.setState((prevState, props) => {
        return {scrollTopPrevious: scrollTop}
      })
      this.props.onLoadMore()
    }
  }
  render() {
    return null
  }
}
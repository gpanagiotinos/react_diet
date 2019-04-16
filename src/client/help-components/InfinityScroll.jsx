import React from 'react'

export default class InfinityScroll extends React.Component {
  constructor (props) {
    super(props)
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }
  componentDidMount () {
    console.log('mount')
    window.addEventListener("scroll", this.handleOnScroll)
  }
  componentWillUnmount () {
    window.removeEventListener("scroll", this.handleOnScroll)
  }
  handleOnScroll () {
    var scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop
    var scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight
    var clientHeight =
    document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    console.log(scrolledToBottom)
    if (scrolledToBottom) {
    this.props.onLoadMore()
    }
  }
  render() {
    return null
  }
}
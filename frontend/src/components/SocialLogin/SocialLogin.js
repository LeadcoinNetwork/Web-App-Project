import React from "react"
import LoadingDots from "../LoadingDots"

class SocialLogin extends React.Component {
  closeUrl = ""
  options =
    "location=no,clearsessioncache=yes;clearcache=yes,hidenavigationbuttons=yes,hardwareback=no,hidden=yes"
  script = `
    document.cookie;
  `

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.processAuth = this.processAuth.bind(this)
    const urlStartIndex = process.env.FRONTEND.indexOf("://") + 3
    this.closeUrl = process.env.FRONTEND.substr(urlStartIndex)
  }

  isCorrectURL(url) {
    let index = url.indexOf("://")
    if (index === -1) return false
    index += 3
    let findUrl = url.substr(index, this.closeUrl.length)
    return findUrl === this.closeUrl
  }

  processAuth() {
    let redirectCounter = 0
    this.setState({ loading: true })
    const { provider } = this.props
    const url = `${
      process.env.BACKEND
    }/auth/${provider}?state=${encodeURIComponent(process.env.FRONTEND)}`
    let ref = cordova.InAppBrowser.open(url, "_blank", this.options)
    ref.addEventListener("loadstart", data => {
      if (data && this.isCorrectURL(data.url)) {
        ref.close()
        ref = undefined
        window.location.href = "index.html"
        // ref.executeScript({code: this.script}, (cookie) => {
        //   console.log('COOKIE :::', cookie);
        // });
      }
    })
    ref.addEventListener("loadstop", data => {
      this.setState({ loading: false })
      if (redirectCounter > 0) {
        ref.show()
      } else {
        redirectCounter++
      }
    })
    ref.addEventListener("loaderror", data => {
      this.setState({ loading: false })
    })
    ref.addEventListener("exit", data => {
      this.setState({ loading: false })
    })

    ref.addEventListener("message", data => {
      console.log("MESSAGE ::::: ", data)
    })
  }

  render() {
    const { connectWithText, provider } = this.props
    return (
      <>
        {!window.cordova && (
          <a
            className="ldc-social-login"
            href={`${
              process.env.BACKEND
            }/auth/${provider}?state=${encodeURIComponent(
              process.env.FRONTEND,
            )}`}
          >
            <i className={`fab fa-${provider}`} />
            {connectWithText} {provider}
          </a>
        )}
        {window.cordova && (
          <a className="ldc-social-login" onClick={this.processAuth}>
            <i className={`fab fa-${provider}`} />
            {connectWithText} {provider}
          </a>
        )}
      </>
    )
  }
}

export default SocialLogin

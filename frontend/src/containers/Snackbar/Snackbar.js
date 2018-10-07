import React from "react"
import { ToastContainer } from "react-toastify"
import { Flip } from "react-toastify"

const Snackbar = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar
    // closeButton={<div className="times" />}
    newestOnTop
    closeOnClick
    pauseOnHover
    transition={Flip}
  />
)

export default Snackbar

import "react-toastify/dist/ReactToastify.css"

import React from "react"
import { ToastContainer } from "react-toastify"
import { Flip } from "react-toastify"

const Snackbar = () => (
  <ToastContainer
    position="top-right"
    autoClose={6000}
    newestOnTop
    closeOnClick
    draggable
    pauseOnHover
    transition={Flip}
  />
)

export default Snackbar

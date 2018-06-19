import React from "react"
import { Link } from "react-router-dom"

const SideMenu = ({ path }) => {
  return (
    <nav className="ldc-side-menu">
      <Link to="/buy-leads">link</Link>
      <Link to="/sell-leads">link</Link>
      <Link to="/my-leads">link</Link>
    </nav>
  )
}

export default SideMenu

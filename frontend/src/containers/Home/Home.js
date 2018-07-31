import React from "react"
import { Link } from "react-router-dom"
const Home = () => (
  <div>
    <h1>Here will be the homepage</h1>
    <Link to="/buy-leads">-> Buy Leads</Link>
    <br />
    <hr />
    <br />
    <Link to="/sell-leads">-> Sell Leads</Link>
  </div>
)

export default Home

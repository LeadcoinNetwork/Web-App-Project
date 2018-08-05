import React from "react"
import { Link } from "react-router-dom"
const Home = () => (
  <div className="home">
    <div className="container">
      <Link to="/buy-leads" className="option buy">
        Buy Leads
      </Link>
      <Link to="/sell-leads" className="option sell">
        Sell Leads
      </Link>
    </div>
  </div>
)

export default Home

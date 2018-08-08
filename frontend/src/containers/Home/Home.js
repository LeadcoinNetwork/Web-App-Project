import React from "react"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import t from "../../utils/translate/translate"

const Home = () => (
  <div className="home">
    <p className="title">{t("Do you want to...")}</p>
    <div className="container">
      <Link to="/buy-leads" className="option buy no-underline">
        <Button label={t("Buy Leads")} />
        <p className="description">
          {t("Purchase hot leads for your business now!")}
        </p>
      </Link>
      <Link to="/sell-leads" className="option sell no-underline">
        <Button label={t("Sell Leads")} />
        <p className="description">
          {t("Earn money by selling your unused leads to other professionals.")}
        </p>
      </Link>
    </div>
  </div>
)

export default Home

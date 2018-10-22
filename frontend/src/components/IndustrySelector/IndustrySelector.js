import React from "react"
import Select from "../Select"
import t from "../../utils/translate/translate"

export const IndustrySelector = ({ className, industry, industryUpdate }) => (
  <Select
    className={`industry${className ? " " + className : ""}`}
    value={industry}
    onChange={e => {
      industryUpdate(e.target.value)
    }}
  >
    <option value="">{t("Choose Industry")}</option>
    <option value="Real Estate">{t("Real Estate")}</option>
    <option value="Design">{t("Design")}</option>
    <option value="Crypto" disabled>
      {t("Crypto")}
    </option>
    <option value="Insurance" disabled>
      {t("Insurance")}
    </option>
    <option value="Loans" disabled>
      {t("Loans")}
    </option>
  </Select>
)

export default IndustrySelector

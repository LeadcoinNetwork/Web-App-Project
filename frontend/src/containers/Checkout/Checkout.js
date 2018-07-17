import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"
import t from "../../utils/translate/translate"

const Checkout = ({ fields, checkout, buyLeads }) => (
  <div className="ldc-checkout">
    <h1>{t("Checkout")}</h1>

    <Table
      fields={fields.map(field => ({
        ...field,
        name: t(field.name),
      }))}
      records={buyLeads.list.filter(lead => buyLeads.selected.has(lead.id))}
      isSelectable={false}
    />

    <div className="checkout">
      <div className="total-price">
        {t("Total")}: {checkout.totalPrice}
      </div>

      <Button
        label={t("Buy")}
        loading={checkout.loading}
        loadingLabel={t("Processing")}
        appStyle={true}
        disabled={!buyLeads.selected.size}
      />
    </div>
  </div>
)

const mapStateToProps = state => ({
  fields: state.fields,
  checkout: state.checkout,
  buyLeads: state.buyLeads,
})

export default connect(mapStateToProps)(Checkout)

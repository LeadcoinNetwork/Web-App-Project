import React from "react"
import { connect } from "react-redux"
import * as Actions from "../../actions"
import Table from "Components/Table"
import Button from "Components/Button"
import t from "../../utils/translate/translate"

const Checkout = ({ fields, checkout, buyLeads }) => {
  let selectedLeads = buyLeads.list.filter(lead =>
    buyLeads.selected.has(lead.id),
  )

  return (
    <div className="ldc-checkout">
      <h1>{t("Checkout")}</h1>

      <Table
        fields={fields.map(field => ({
          ...field,
          name: t(field.name),
        }))}
        records={selectedLeads}
        isSelectable={false}
      />

      <div className="c-total">
        {t("Total")}:{" "}
        {selectedLeads.reduce((price, lead) => price + Math.abs(lead.price), 0)}
      </div>

      <Button
        label={t("Buy")}
        loading={checkout.loading}
        loadingLabel={t("Processing")}
        appStyle={true}
        disabled={!buyLeads.selected.size}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  fields: state.fields,
  checkout: state.checkout,
  buyLeads: state.buyLeads,
})

export default connect(mapStateToProps)(Checkout)

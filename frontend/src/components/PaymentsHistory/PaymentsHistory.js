import React, { Component } from "react"
import { Time } from "../../utils/time"
import * as Actions from "../../actions"

const PaymentsHistory = ({ onRefresh, payments, isDeleteable }) => (
  <div>
    {onRefresh && <div onClick={onRefresh}>_Referesh_</div>}
    {payments.list.map(p => (
      <div key={p.id}>
        <time>{Time.localeString(p.timestamp)}</time>
        <div>{p.message}</div>
        <div>
          <b>Escrow balance:</b>
          {p.escrowBalance}
        </div>
        <div>
          <b>Balance:</b>
          {p.balance}
        </div>
        <br />
      </div>
    ))}
    {isDeleteable && <div>Delete</div>}
    {payments.list.length ? "" : "Nothing to show"}
    {payments.loading ? "Loading..." : ""}
  </div>
)

export default PaymentsHistory

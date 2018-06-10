import React, { Component } from "react"
import { Time } from "../../utils/time"

const PaymentsHistory = ({ payments }) => (
  <div>
    {payments.list.map(p => (
      <div key={p.id}>
        <time>{new Date(p.timestamp).toLocaleString()}</time>
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
    {payments.loading ? "Loading..." : ""}
  </div>
)

export default PaymentsHistory

import React, { Component } from "react"
import { Time } from "../../utils/time"

const PaymentsHistory = props =>
  props.payments.map(payment => (
    <div key={payment.id}>
      <b>{Time.format(payment.timestamp)}</b> {payment.message}
    </div>
  ))

export default PaymentsHistory

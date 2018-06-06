import React, { Component } from "react";
import { format } from "../../utils/timeformat";

const PaymentsHistory = props =>
  props.payments.map(payment => (
    <div key={payment.id}>
      <b>{format(payment.timestamp)}</b> {payment.message}
    </div>
  ));

export default PaymentsHistory;

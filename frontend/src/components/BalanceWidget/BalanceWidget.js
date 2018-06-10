import React from "react";
import Button from "../Button";

const BalanceWidget = props => (
    <div className="balance-widget">
        <div className="balance-total">{props.balance.total}</div>
        <div className="balance-escrow">{'(' + props.balance.escrow + ' in Escrow)'}</div>
        <Button
            label="Withdraw"
            onClick={props.withdrawBalance}
        />
    </div>
)

export default BalanceWidget
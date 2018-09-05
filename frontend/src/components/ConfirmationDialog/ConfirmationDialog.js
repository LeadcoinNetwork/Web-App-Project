import React from "react"
import Button from "../Button"

const ConfirmationDialog = ({
  description,
  confirmText,
  dismissText,
  onConfirm,
  onDismiss,
}) => (
  <div className="ldc-dialog-background">
    <div className="ldc-dialog-body">
      <div className="ldc-dialog-description">{description}</div>
      <div className="ldc-dialog-selection">
        <Button appStyle={true} onClick={onConfirm}>
          {confirmText ? confirmText : "OK"}
        </Button>
        <Button appStyle={true} onClick={onDismiss}>
          {dismissText ? dismissText : "Cancel"}
        </Button>
      </div>
    </div>
  </div>
)

export default ConfirmationDialog

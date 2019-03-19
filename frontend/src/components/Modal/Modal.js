import React from "react"
import ReactModal from "react-modal"
import t from "../../utils/translate/translate"
import Button from "../../components/Button"

const Modal = ({
  isOpen,
  contentLabel,
  onRequestClose,
  shouldCloseOnOverlayClick,
  modalContent,
  onClose,
  onNext,
  isNext,
  isPrev,
  onPrev,
  isEnd,
  onEnd,
}) => {
  const btnClass = isPrev ? "align-between" : "align-end"

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="modal-container"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <div>
        <div className="close-button" onClick={onClose}>
          <i className="fas fa-times" />
        </div>
        {modalContent}
        <div className={"buttons-section " + btnClass}>
          {isPrev ? (
            <Button className="next-button" onClick={onPrev} appStyle={true}>
              {t("Previous")}
            </Button>
          ) : null}
          {isNext ? (
            <Button className="next-button" onClick={onNext} appStyle={true}>
              {t("Next")}
            </Button>
          ) : null}
          {isEnd ? (
            <Button className="next-button" onClick={onEnd} appStyle={true}>
              {t("End")}
            </Button>
          ) : null}
        </div>
      </div>
    </ReactModal>
  )
}

export default Modal

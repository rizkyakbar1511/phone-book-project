import { Icon } from "@iconify/react";
import { buttonBase } from "@/styles/button";
import { css } from "@emotion/react";
import { PRIMARY_COLOR } from "@/constants/color";
import { motion, AnimatePresence } from "framer-motion";

const styles = {
  modalBackdrop: css`
    position: fixed;
    inset: 0;
    background-color: rgba(37, 37, 37, 0.3);
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  modal: css`
    width: clamp(50%, 700px, 90%);
    height: min-content(50%, 300px);
    margin: auto;
    background: #fcfefe;
    box-shadow: 0px 1px 4px 0px rgba(37, 37, 37, 0.17);
    border-radius: 0.25rem;
    padding: 1rem;
  `,
  modalHeading: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  modalTitle: css`
    color: #252525;
    font-weight: 600;
  `,
  modalCloseButton: css`
    ${buttonBase}
  `,
  modalBody: css`
    margin-top: 1.25rem;
    margin-bottom: 4rem;
  `,
  modalFooter: css`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  `,
  modalCancelButton: css`
    ${buttonBase}
    color: rgba(37, 37, 37, 0.50);
  `,
  modalApplyButton: css`
    ${buttonBase}
    color: ${PRIMARY_COLOR};
  `,
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface ModalProps {
  id: string;
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onClose: () => void;
  withAction?: boolean;
}

const Modal: React.FC<ModalProps> = ({ id, isOpen, onClose, title, onClick, children, withAction }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={styles.modalBackdrop}
          onClick={onClose}
        >
          <motion.div
            css={styles.modal}
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {title && (
              <div css={styles.modalHeading}>
                <h4 css={styles.modalTitle}>{title}</h4>
                <button type="button" onClick={onClose} css={styles.modalCloseButton}>
                  <Icon icon="mdi:close" width={20} height={20} />
                </button>
              </div>
            )}
            <div css={styles.modalBody}>{children}</div>
            {withAction && (
              <div css={styles.modalFooter}>
                <button css={styles.modalCancelButton} onClick={onClose}>
                  Cancel
                </button>
                <button data-id={id} onClick={onClick} css={styles.modalApplyButton}>
                  Apply
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

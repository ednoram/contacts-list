import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import styles from "./delete_confirm.module.scss";

import {
  deleteContact,
  setCurrentPage,
  setConfirmingDelete,
} from "../../actions";
import { useHideOverflow } from "../../hooks";
import { selectContact, selectConfirmingDelete } from "../../selectors";

const DeleteConfirm = ({ contentRef }) => {
  const contact = useSelector(selectContact);
  const confirmingDelete = useSelector(selectConfirmingDelete);

  const dispatch = useDispatch();

  useHideOverflow(contentRef);

  const handleDelete = () => {
    dispatch(deleteContact(contact));
    dispatch(setCurrentPage("main"));
    dispatch(setConfirmingDelete(false));
  };

  return confirmingDelete ? (
    <div
      className={styles.confirm_background}
      onClick={() => dispatch(setConfirmingDelete(false))}
      style={{
        top:
          window.innerWidth <= 425
            ? window.scrollY
            : contentRef.current.scrollTop,
      }}
    >
      <div className={styles.confirm_delete}>
        <p className={styles.confirm_delete_message}>
          Are you sure you want to delete contact?
        </p>
        <div className="flex_space_between">
          <button className={styles.confirm_delete_btn} onClick={handleDelete}>
            Delete
          </button>
          <button
            className={styles.confirm_cancel_btn}
            onClick={() => dispatch(setConfirmingDelete(false))}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

DeleteConfirm.propTypes = {
  contentRef: PropTypes.object,
};

DeleteConfirm.defaultProps = {
  contentRef: {},
};

export default DeleteConfirm;

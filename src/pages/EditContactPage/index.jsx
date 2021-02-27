import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./edit_contact_page.module.scss";

import {
  updateContact,
  setCurrentPage,
  setConfirmingDelete,
} from "../../actions";
import { Form } from "../../components";
import { selectContact, selectCurrentPage } from "../../selectors";
import { contactDataIsValid, processContactData } from "../../utils/formUtils";

const EditContactPage = () => {
  const contact = useSelector(selectContact);
  const currentPage = useSelector(selectCurrentPage);

  const [contactData, setContactData] = useState(contact);

  const dispatch = useDispatch();

  const dataIsValid = contactDataIsValid(contactData);

  const handleCancel = () => dispatch(setCurrentPage("contact", contact));

  const handleDone = () => {
    const data = processContactData(contactData);

    if (dataIsValid) {
      dispatch(updateContact(contact, data));
      dispatch(setCurrentPage("contact", data));
    }
  };

  return (
    <div className={styles.edit_contact_page}>
      <div className={styles.header + " flex_space_between"}>
        <p role="button" onClick={handleCancel} className={styles.header_btn}>
          Cancel
        </p>
        <p
          role="button"
          onClick={handleDone}
          style={!dataIsValid ? { cursor: "default" } : {}}
          className={styles.header_btn + (!dataIsValid ? " color_gray" : "")}
        >
          Done
        </p>
      </div>
      <Form contactData={contactData} setContactData={setContactData} />
      {currentPage === "edit_contact" && (
        <div className="flex_space_between">
          <p
            role="button"
            className={styles.delete_contact_btn}
            onClick={() => dispatch(setConfirmingDelete(true))}
          >
            Delete Contact
          </p>
        </div>
      )}
    </div>
  );
};

export default EditContactPage;

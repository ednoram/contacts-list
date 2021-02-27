import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./add_contact_page.module.scss";

import { Form } from "../../components";
import { addContact, setCurrentPage } from "../../actions";
import { contactDataIsValid, processContactData } from "../../utils/formUtils";

const AddContactPage = () => {
  const initialContactData = {
    emails: [],
    company: "",
    lastName: "",
    firstName: "",
    phoneNumbers: [],
  };

  const [contactData, setContactData] = useState(initialContactData);

  const dispatch = useDispatch();

  const dataIsValid = contactDataIsValid(contactData);

  const handleCancel = () => dispatch(setCurrentPage("main"));

  const handleDone = () => {
    const data = processContactData(contactData);

    if (dataIsValid) {
      dispatch(addContact(data));
      dispatch(setCurrentPage("contact", data));
    }
  };

  return (
    <div className={styles.add_contact}>
      <div className={styles.header}>
        <p role="button" onClick={handleCancel} className={styles.header_btn}>
          Cancel
        </p>
        <p role="button" className={styles.header_title}>
          New Contact
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
    </div>
  );
};

export default AddContactPage;

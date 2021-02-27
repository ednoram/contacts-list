import React from "react";
import PropTypes from "prop-types";

import styles from "./form.module.scss";

import { ReactComponent as PlusIcon } from "../../assets/plus_icon.svg";
import { ReactComponent as MinusIcon } from "../../assets/minus_icon.svg";

const InputsList = ({ contactData, setContactData }) => {
  const addData = (property, value) => {
    setContactData((data) => ({ ...data, [property]: value }));
  };

  const addDataToArray = (property, index, value) => {
    setContactData((data) => ({
      ...data,
      [property]: [
        ...data[property].slice(0, index),
        value,
        ...data[property].slice(index + 1),
      ],
    }));
  };

  const addEmptyData = (property) => {
    setContactData((data) => ({
      ...data,
      [property]: [...data[property], ""],
    }));
  };

  const removeData = (property, index) => {
    setContactData((data) => ({
      ...data,
      [property]: [
        ...data[property].slice(0, index),
        ...data[property].slice(index + 1),
      ],
    }));
  };

  return (
    <ul className={styles.form_inputs_list}>
      <li>
        <input
          type="text"
          maxLength="14"
          placeholder="First Name"
          className={styles.form_input}
          value={contactData.firstName}
          onChange={(e) => addData("firstName", e.target.value)}
        />
      </li>
      <li>
        <input
          type="text"
          maxLength="14"
          placeholder="Last Name"
          value={contactData.lastName}
          className={styles.form_input}
          onChange={(e) => addData("lastName", e.target.value)}
        />
      </li>
      <li className={styles.company_input_li}>
        <input
          type="text"
          maxLength="28"
          placeholder="Company"
          value={contactData.company}
          className={styles.form_input}
          onChange={(e) => addData("company", e.target.value)}
        />
      </li>
      {contactData.phoneNumbers.map((phoneNumber, index) => (
        <li key={index}>
          <input
            type="text"
            maxLength="20"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) =>
              addDataToArray("phoneNumbers", index, e.target.value)
            }
            className={[styles.form_input, styles.removable_input].join(" ")}
          />
          <button
            className={styles.remove_input_btn}
            onClick={() => removeData("phoneNumbers", index)}
          >
            <MinusIcon />
          </button>
        </li>
      ))}
      <div>
        <span
          role="button"
          className={styles.add_input_btn}
          onClick={() => addEmptyData("phoneNumbers")}
        >
          <div className={styles.add_input_icon}>
            <PlusIcon />
          </div>
          Add Phone Number
        </span>
      </div>
      {contactData.emails.map((email, index) => (
        <li key={index}>
          <input
            type="email"
            value={email}
            maxLength="28"
            placeholder="Email Address"
            className={[styles.form_input, styles.removable_input].join(" ")}
            onChange={(e) => addDataToArray("emails", index, e.target.value)}
          />
          <button
            className={styles.remove_input_btn}
            onClick={() => removeData("emails", index)}
          >
            <MinusIcon />
          </button>
        </li>
      ))}
      <div>
        <span
          role="button"
          className={styles.add_input_btn}
          onClick={() => addEmptyData("emails")}
        >
          <div className={styles.add_input_icon}>
            <PlusIcon />
          </div>
          Add Email Address
        </span>
      </div>
    </ul>
  );
};

InputsList.propTypes = {
  contactData: PropTypes.object,
  setContactData: PropTypes.func,
};

InputsList.defaultProps = {
  contactData: {},
  setContactData: () => {},
};

export default InputsList;

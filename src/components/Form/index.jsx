import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import InputsList from "./InputsList";
import styles from "./form.module.scss";

import { selectCurrentPage } from "../../selectors";

const Form = ({ contactData, setContactData }) => {
  const currentPage = useSelector(selectCurrentPage);

  const fileInputRef = useRef();

  const addPhoto = (event) => {
    const photo = URL.createObjectURL(event.target.files[0]);

    setContactData((data) => ({ ...data, photo: photo }));
  };

  const contactPhotoDiv = (
    <div
      className={styles.contact_photo}
      onClick={() => fileInputRef.current.click()}
      style={
        contactData.photo
          ? {
              backgroundSize: "cover",
              backgroundImage: `URL('${contactData.photo}')`,
            }
          : {
              background:
                currentPage === "edit_contact" &&
                `${contactData.firstName} ${contactData.lastName}`.trim()
                  ? "none"
                  : "",
            }
      }
    >
      {!contactData.photo &&
        currentPage === "edit_contact" &&
        (
          `${contactData.firstName} ${contactData.lastName}`.trim()[0] || ""
        ).toUpperCase()}
    </div>
  );

  return (
    <form
      autoComplete="off"
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.photo_section}>
        {contactPhotoDiv}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={addPhoto}
        />
        <div className="flex_center">
          <p
            role="button"
            className={styles.add_photo_btn}
            onClick={() => fileInputRef.current.click()}
          >
            {contactData.photo ? "Change Photo" : "Add Photo"}
          </p>
        </div>
      </div>
      <InputsList contactData={contactData} setContactData={setContactData} />
    </form>
  );
};

Form.propTypes = {
  contactData: PropTypes.object,
  setContactData: PropTypes.func,
};

Form.defaultProps = {
  contactData: {},
  setContactData: () => {},
};

export default Form;

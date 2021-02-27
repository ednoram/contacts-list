import React from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import styles from "./contact_page.module.scss";

import { setCurrentPage } from "../../actions";
import { selectContact } from "../../selectors";
import { ReactComponent as CallIcon } from "../../assets/call_icon.svg";
import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg";
import { ReactComponent as EmailIcon } from "../../assets/email_icon.svg";

const ContactPage = () => {
  const contact = useSelector(selectContact);

  const dispatch = useDispatch();

  const fullName = `${contact.firstName} ${contact.lastName}`;

  const actions = (
    <ul>
      <li className={!contact.phoneNumbers[0] ? "hidden" : ""}>
        <a href={`tel: ${contact.phoneNumbers[0]}`}>
          <div className={styles.action_btn}>
            <CallIcon className={styles.action_btn_icon} />
            <p>Call</p>
          </div>
        </a>
      </li>
      <li className={!contact.emails[0] ? "hidden" : ""}>
        <a href={`mailto: ${contact.emails[0]}`}>
          <div className={styles.action_btn}>
            <EmailIcon className={styles.action_btn_icon} />
            <p>Email</p>
          </div>
        </a>
      </li>
    </ul>
  );

  const detailedInfoList = (
    <>
      {!contact.company && !contact.emails[0] && !contact.phoneNumbers[0] ? (
        <p className="text_align_center color_blue">No data</p>
      ) : (
        <ul>
          {contact.company && (
            <li className={styles.info_list_item}>
              <p>Company</p>
              <p className={styles.info_p}>{contact.company}</p>
            </li>
          )}
          {contact.phoneNumbers[0] &&
            contact.phoneNumbers.map((phoneNumber, index) => (
              <li key={nanoid()} className={styles.info_list_item}>
                <p>
                  Phone Number {contact.phoneNumbers.length > 1 && index + 1}
                </p>
                <a href={`tel: ${phoneNumber}`} className={styles.info_p}>
                  {phoneNumber}
                </a>
              </li>
            ))}
          {contact.emails[0] &&
            contact.emails.map((email, index) => (
              <li key={nanoid()} className={styles.info_list_item}>
                <p>Email {contact.emails.length > 1 && index + 1}</p>
                <a href={`mailto: ${email}`} className={styles.info_p}>
                  {email}
                </a>
              </li>
            ))}
        </ul>
      )}
    </>
  );

  const contactPhotoDiv = (
    <div
      className={styles.contact_photo}
      style={
        contact.photo
          ? {
              backgroundSize: "cover",
              backgroundImage: `URL('${contact.photo}')`,
            }
          : {}
      }
    >
      {!contact.photo && fullName.trim()[0] && fullName.trim()[0].toUpperCase()}
    </div>
  );

  return (
    <div className={styles.contact_page}>
      <div className={styles.header + " flex_space_between"}>
        <p
          role="button"
          className={styles.header_btn}
          onClick={() => dispatch(setCurrentPage("main"))}
        >
          <LeftArrow className={styles.left_arrow} />
          Contacts
        </p>
        <p
          role="button"
          className={styles.header_btn}
          onClick={() => dispatch(setCurrentPage("edit_contact", contact))}
        >
          Edit
        </p>
      </div>
      {contactPhotoDiv}
      <h2 className={styles.contact_name}>{fullName}</h2>
      <div className={styles.actions}>{actions}</div>
      <div className={styles.detailed_info}>{detailedInfoList}</div>
    </div>
  );
};

export default ContactPage;

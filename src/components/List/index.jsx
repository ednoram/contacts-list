import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import styles from "./list.module.scss";

import { setCurrentPage } from "../../actions";
import { selectSearchValue, selectAllContacts } from "../../selectors";

const List = () => {
  const contacts = useSelector(selectAllContacts);
  const searchValue = useSelector(selectSearchValue);

  const dispatch = useDispatch();

  const sortedContacts = searchValue
    ? {
        searchMatches: contacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ),
      }
    : contacts
        .sort((a, b) =>
          `${a.firstName} ${a.lastName}`
            .toLowerCase()
            .localeCompare(`${b.firstName} ${b.lastName}`.toLowerCase())
        )
        .reduce((object, contact) => {
          const fullName = `${contact.firstName} ${contact.lastName}`.trim();
          const key = fullName[0].toUpperCase();

          if (!object[key]) {
            object[key] = [];
          }

          object[key].push(contact);

          return object;
        }, {});

  const searchResults =
    searchValue &&
    (sortedContacts.searchMatches.length < 1 ? (
      <p className={styles.no_matches_p}>{`No Matches for "${searchValue}"`}</p>
    ) : (
      <>
        <p className={styles.showing_matches_p}>
          {`Showing matches for "${searchValue}":`}
        </p>
        {sortedContacts.searchMatches.map((contact) => (
          <div
            key={nanoid()}
            className={styles.list_item}
            onClick={() => dispatch(setCurrentPage("contact", contact))}
          >
            <p>{`${contact.firstName} ${contact.lastName}`}</p>
          </div>
        ))}
      </>
    ));

  return (
    <div className={styles.list}>
      {searchValue ? (
        searchResults
      ) : (
        <>
          {Object.keys(sortedContacts)
            .sort()
            .map((key) => (
              <div key={key} className={styles.list_group}>
                <div className={styles.first_char_bar}>
                  <p>{key}</p>
                </div>
                {sortedContacts[key].map((contact) => (
                  <div
                    key={nanoid()}
                    className={styles.list_item}
                    onClick={() => dispatch(setCurrentPage("contact", contact))}
                  >
                    <div
                      className={styles.contact_photo_div}
                      style={{ backgroundImage: `URL(${contact.photo})` }}
                    >
                      {!contact.photo &&
                        `${contact.firstName} ${contact.lastName}`
                          .trim()[0]
                          .toUpperCase()}
                    </div>
                    <p>{`${contact.firstName} ${contact.lastName}`}</p>
                  </div>
                ))}
              </div>
            ))}
          <p className={styles.contacts_count_p}>
            {(contacts.length === 0 ? "No " : contacts.length) + " Contacts"}
          </p>
        </>
      )}
    </div>
  );
};

export default List;

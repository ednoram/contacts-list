import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./main_page.module.scss";

import { setCurrentPage } from "../../actions";
import { List, Searchbox } from "../../components";
import { selectSearchValue } from "../../selectors";
import { ReactComponent as PlusIcon } from "../../assets/plus_icon.svg";

const MainPage = () => {
  const searchValue = useSelector(selectSearchValue);

  const dispatch = useDispatch();

  return (
    <div className={styles.main_page}>
      {!searchValue.trim() && (
        <div className={styles.main_page_header + " flex_space_between"}>
          <h1>Contacts</h1>
          <PlusIcon
            className={styles.add_contact_icon}
            onClick={() => dispatch(setCurrentPage("add_contact"))}
          />
        </div>
      )}
      <Searchbox />
      <List />
    </div>
  );
};

export default MainPage;

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./searchbox.module.scss";

import { setSearchValue } from "../../actions";
import { selectSearchValue } from "../../selectors";
import { ReactComponent as XIcon } from "../../assets/x_icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";

const Searchbox = () => {
  const searchValue = useSelector(selectSearchValue);

  const dispatch = useDispatch();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.searchbox}>
        <SearchIcon className={styles.search_icon} />
        <input
          type="text"
          maxLength="25"
          value={searchValue}
          placeholder="Search"
          className={styles.search_input}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
        />
        {searchValue && (
          <XIcon
            className={styles.x_icon}
            onClick={() => dispatch(setSearchValue(""))}
          />
        )}
      </div>
    </form>
  );
};

export default Searchbox;

import { SET_SEARCH_VALUE } from "../reducers/searchReducer";

export const setSearchValue = (value) => ({
  type: SET_SEARCH_VALUE,
  value: value,
});

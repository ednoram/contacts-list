import { createSelector } from "reselect";

const getSearchState = (state) => state.search;

export const selectSearchValue = createSelector(getSearchState, (search) =>
  search.value.replace(/\s\s+/g, " ").trim()
);

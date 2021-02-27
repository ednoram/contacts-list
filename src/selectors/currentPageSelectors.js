import { createSelector } from "reselect";

const getCurrentPageState = (state) => state.currentPage;

export const selectCurrentPage = createSelector(
  getCurrentPageState,
  (currentPage) => currentPage.page
);

export const selectContact = createSelector(
  getCurrentPageState,
  (currentPage) => currentPage.contact
);

export const selectConfirmingDelete = createSelector(
  getCurrentPageState,
  (currentPage) => currentPage.confirmingDelete
);

import { createSelector } from "reselect";

const getContactsState = (state) => state.contacts;

export const selectAllContacts = createSelector(
  getContactsState,
  (contacts) => contacts
);

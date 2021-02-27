import {
  SET_CURRENT_PAGE,
  SET_CONFIRMING_DELETE,
} from "../reducers/currentPageReducer";

export const setCurrentPage = (page, contact = {}) => ({
  type: SET_CURRENT_PAGE,
  page: page,
  contact: contact,
});

export const setConfirmingDelete = (confirming) => ({
  type: SET_CONFIRMING_DELETE,
  confirming: confirming,
});

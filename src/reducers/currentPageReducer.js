export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_CONFIRMING_DELETE = "SET_CONFIRMING_DELETE";

const INITIAL_STATE = {
  contact: {},
  page: "main",
  confirmingDelete: false,
};

const currentPageReducer = (
  state = INITIAL_STATE,
  { type, page, contact, confirming }
) => {
  switch (type) {
    case SET_CURRENT_PAGE:
      return { ...state, page: page, contact: contact };
    case SET_CONFIRMING_DELETE:
      return { ...state, confirmingDelete: confirming };
    default:
      return state;
  }
};

export default currentPageReducer;

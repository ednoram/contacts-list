import initialContactsData from "../utils/initialContactsData.json";

export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";

const contactsReducer = (
  state = initialContactsData,
  { type, contact, newContact }
) => {
  switch (type) {
    case ADD_CONTACT:
      return [...state, contact];
    case DELETE_CONTACT:
      return [
        ...state.slice(0, state.indexOf(contact)),
        ...state.slice(state.indexOf(contact) + 1),
      ];
    case UPDATE_CONTACT:
      return [
        ...state.slice(0, state.indexOf(contact)),
        newContact,
        ...state.slice(state.indexOf(contact) + 1),
      ];
    default:
      return state;
  }
};

export default contactsReducer;

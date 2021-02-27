import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
} from "../reducers/contactsReducer";

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  contact: contact,
});

export const deleteContact = (contact) => ({
  type: DELETE_CONTACT,
  contact: contact,
});

export const updateContact = (contact, newContact) => ({
  type: UPDATE_CONTACT,
  contact: contact,
  newContact: newContact,
});

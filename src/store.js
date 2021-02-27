import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { searchReducer, contactsReducer, currentPageReducer } from "./reducers";

const reducers = combineReducers({
  search: searchReducer,
  contacts: contactsReducer,
  currentPage: currentPageReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;

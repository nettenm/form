import { createStore, applyMiddleware } from "redux";
import addSupplierReducers from "./AddSupplier/reducers";
import thunkMiddleware from "redux-thunk";

const store = createStore(
  addSupplierReducers,
  applyMiddleware(thunkMiddleware)
);

export default store;

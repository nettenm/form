import axios from "axios";
import { API_URL } from "../../constants";
import {
  POST_SUPPLIER_FAILURE,
  POST_SUPPLIER_REQUEST,
  POST_SUPPLIER_SUCCESS,
} from "./actionTypes";

const postSupplierRequest = () => ({
  type: POST_SUPPLIER_REQUEST,
});

const postSupplierSuccess = (response) => ({
  type: POST_SUPPLIER_SUCCESS,
  payload: response,
});

const postSupplierFailure = (error) => ({
  type: POST_SUPPLIER_FAILURE,
  payload: error,
});

const postSupplierData = (supplierData) => {
  return (dispatch) => {
    dispatch(postSupplierRequest());
    axios
      .post(`${API_URL}/suppliers`, { supplierData })
      .then((response) => dispatch(postSupplierSuccess(response)))
      .catch((error) => dispatch(postSupplierFailure(error.message)));
  };
};

export default postSupplierData;

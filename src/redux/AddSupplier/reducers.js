import {
  POST_SUPPLIER_FAILURE,
  POST_SUPPLIER_REQUEST,
  POST_SUPPLIER_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  response: null,
  error: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case POST_SUPPLIER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    case POST_SUPPLIER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

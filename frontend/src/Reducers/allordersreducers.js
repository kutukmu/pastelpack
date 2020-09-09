import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ALL_ORDERS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

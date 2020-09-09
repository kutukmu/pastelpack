import {
  USER_ORDERS_SUCCESS,
  USER_ORDERS_REQUEST,
  USER_ORDERS_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ORDERS_REQUEST:
      return { loading: true };
    case USER_ORDERS_SUCCESS:
      return { laoding: false, orders: action.payload };
    case USER_ORDERS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

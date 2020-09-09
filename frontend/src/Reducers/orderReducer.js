import {
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return { loading: true };
    case USER_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case USER_ORDER_ERROR:
      return { loading: false, payload: action.payload };
    default:
      return state;
  }
};

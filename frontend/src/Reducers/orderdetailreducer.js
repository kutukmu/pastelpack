import {
  USER_ORDER_DETAIL_REQUEST,
  USER_ORDER_DETAIL_SUCCESS,
  USER_ORDER_DETAIL_ERROR,
} from "../Contants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_ORDER_DETAIL_REQUEST:
      return { loading: true };
    case USER_ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };
    case USER_ORDER_DETAIL_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
